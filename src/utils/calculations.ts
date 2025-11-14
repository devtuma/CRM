import { Lead, ConversionMetrics, RevenueProjection, SalesReport } from '../types';
import { differenceInDays, startOfMonth, endOfMonth, isWithinInterval, format, addMonths } from 'date-fns';

export const calculateConversionMetrics = (leads: Lead[]): ConversionMetrics => {
  const totalLeads = leads.length;
  const convertedLeads = leads.filter(lead => lead.status === 'won').length;
  const conversionRate = totalLeads > 0 ? (convertedLeads / totalLeads) * 100 : 0;

  const wonLeads = leads.filter(lead => lead.status === 'won');
  const totalRevenue = wonLeads.reduce((sum, lead) => sum + lead.value, 0);
  const averageDealValue = wonLeads.length > 0 ? totalRevenue / wonLeads.length : 0;

  // Calculate average time to close
  const closedDeals = wonLeads.filter(lead => lead.updatedAt);
  const totalDays = closedDeals.reduce((sum, lead) => {
    return sum + differenceInDays(new Date(lead.updatedAt), new Date(lead.createdAt));
  }, 0);
  const averageTimeToClose = closedDeals.length > 0 ? totalDays / closedDeals.length : 0;

  return {
    totalLeads,
    convertedLeads,
    conversionRate,
    averageDealValue,
    totalRevenue,
    averageTimeToClose,
  };
};

export const calculateSalesReport = (
  leads: Lead[],
  userId: string,
  userName: string,
  startDate: Date,
  endDate: Date
): SalesReport => {
  const userLeads = leads.filter(lead => {
    const inPeriod = isWithinInterval(new Date(lead.createdAt), { start: startDate, end: endDate });
    return lead.assignedTo === userId && inPeriod;
  });

  const leadsCreated = userLeads.length;
  const leadsConverted = userLeads.filter(lead => lead.status === 'won').length;
  const conversionRate = leadsCreated > 0 ? (leadsConverted / leadsCreated) * 100 : 0;

  const totalRevenue = userLeads
    .filter(lead => lead.status === 'won')
    .reduce((sum, lead) => sum + lead.value, 0);

  const averageDealValue = leadsConverted > 0 ? totalRevenue / leadsConverted : 0;

  return {
    userId,
    userName,
    leadsCreated,
    leadsConverted,
    conversionRate,
    totalRevenue,
    averageDealValue,
    period: { start: startDate, end: endDate },
  };
};

export const calculateRevenueProjection = (leads: Lead[], monthsAhead: number = 6): RevenueProjection[] => {
  const projections: RevenueProjection[] = [];
  const today = new Date();

  for (let i = 0; i < monthsAhead; i++) {
    const targetMonth = addMonths(today, i);
    const monthStart = startOfMonth(targetMonth);
    const monthEnd = endOfMonth(targetMonth);

    const monthLeads = leads.filter(lead => {
      if (!lead.expectedCloseDate) return false;
      return isWithinInterval(new Date(lead.expectedCloseDate), { start: monthStart, end: monthEnd });
    });

    const confirmed = monthLeads
      .filter(lead => lead.status === 'won')
      .reduce((sum, lead) => sum + lead.value, 0);

    const potential = monthLeads
      .filter(lead => lead.status !== 'won' && lead.status !== 'lost')
      .reduce((sum, lead) => sum + lead.value, 0);

    // Projected = confirmed + (potential * average conversion rate)
    const allLeads = leads.length > 0 ? leads : [];
    const historicalConversionRate = calculateConversionMetrics(allLeads).conversionRate / 100;
    const projected = confirmed + (potential * historicalConversionRate);

    projections.push({
      month: format(targetMonth, 'MMM yyyy'),
      projected: Math.round(projected),
      confirmed: Math.round(confirmed),
      potential: Math.round(potential),
    });
  }

  return projections;
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

export const formatPercentage = (value: number): string => {
  return `${value.toFixed(1)}%`;
};

export const getLeadsByStage = (leads: Lead[], stageId: string): Lead[] => {
  return leads.filter(lead => lead.stageId === stageId);
};

export const calculateStageConversion = (leads: Lead[], fromStageId: string, toStageId: string): number => {
  const fromLeads = leads.filter(lead => {
    // Count leads that were ever in the from stage
    return lead.stageId === fromStageId || lead.status === 'won' || lead.status === 'lost';
  });

  const toLeads = leads.filter(lead => lead.stageId === toStageId);

  return fromLeads.length > 0 ? (toLeads.length / fromLeads.length) * 100 : 0;
};
