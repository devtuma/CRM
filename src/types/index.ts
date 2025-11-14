export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  position?: string;
  value: number;
  status: string;
  stageId: string;
  assignedTo: string;
  createdAt: Date;
  updatedAt: Date;
  expectedCloseDate?: Date;
  tags: string[];
  customFields?: Record<string, any>;
  source?: string;
  priority?: 'low' | 'medium' | 'high';
}

export interface Stage {
  id: string;
  name: string;
  color: string;
  order: number;
  leads: Lead[];
}

export interface Interaction {
  id: string;
  leadId: string;
  type: 'call' | 'email' | 'whatsapp' | 'meeting' | 'note';
  content: string;
  date: Date;
  userId: string;
  userName: string;
  attachments?: string[];
}

export interface WhatsAppTemplate {
  id: string;
  name: string;
  content: string;
  category: string;
  variables?: string[];
  createdAt: Date;
  usageCount: number;
}

export interface FollowUp {
  id: string;
  leadId: string;
  title: string;
  description: string;
  dueDate: Date;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  type: 'call' | 'email' | 'whatsapp' | 'meeting';
  userId: string;
  createdAt: Date;
  completedAt?: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'sales';
  avatar?: string;
  active: boolean;
}

export interface ConversionMetrics {
  totalLeads: number;
  convertedLeads: number;
  conversionRate: number;
  averageDealValue: number;
  totalRevenue: number;
  averageTimeToClose: number;
}

export interface SalesReport {
  userId: string;
  userName: string;
  leadsCreated: number;
  leadsConverted: number;
  conversionRate: number;
  totalRevenue: number;
  averageDealValue: number;
  period: {
    start: Date;
    end: Date;
  };
}

export interface RevenueProjection {
  month: string;
  projected: number;
  confirmed: number;
  potential: number;
}

export interface GoogleContact {
  resourceName: string;
  name: string;
  email: string;
  phone: string;
  organization?: string;
}
