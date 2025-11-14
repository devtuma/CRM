import { Lead, FollowUp } from '../types';
import { addDays, isPast, isToday } from 'date-fns';

export interface AutomationRule {
  id: string;
  name: string;
  enabled: boolean;
  trigger: 'stage_change' | 'time_in_stage' | 'no_activity' | 'value_change';
  condition: {
    stageId?: string;
    days?: number;
    operator?: 'greater' | 'less' | 'equal';
    value?: number;
  };
  action: {
    type: 'create_followup' | 'send_email' | 'change_stage' | 'notify_manager';
    params: any;
  };
}

export const checkAutomationRules = (
  lead: Lead,
  previousLead: Lead | null,
  rules: AutomationRule[]
): FollowUp[] => {
  const newFollowUps: FollowUp[] = [];

  rules.filter(rule => rule.enabled).forEach(rule => {
    let shouldTrigger = false;

    switch (rule.trigger) {
      case 'stage_change':
        if (previousLead && previousLead.stageId !== lead.stageId) {
          if (!rule.condition.stageId || lead.stageId === rule.condition.stageId) {
            shouldTrigger = true;
          }
        }
        break;

      case 'time_in_stage':
        const daysInStage = Math.floor(
          (new Date().getTime() - new Date(lead.updatedAt).getTime()) / (1000 * 60 * 60 * 24)
        );
        if (rule.condition.days && daysInStage >= rule.condition.days) {
          shouldTrigger = true;
        }
        break;

      case 'no_activity':
        // This would check interactions, simplified here
        shouldTrigger = false;
        break;

      case 'value_change':
        if (previousLead && previousLead.value !== lead.value) {
          shouldTrigger = true;
        }
        break;
    }

    if (shouldTrigger && rule.action.type === 'create_followup') {
      const followUp: FollowUp = {
        id: `auto_${Date.now()}_${Math.random()}`,
        leadId: lead.id,
        title: rule.action.params.title || `Follow-up automático: ${rule.name}`,
        description: rule.action.params.description || '',
        dueDate: addDays(new Date(), rule.action.params.daysFromNow || 1),
        completed: false,
        priority: rule.action.params.priority || 'medium',
        type: rule.action.params.type || 'call',
        userId: lead.assignedTo,
        createdAt: new Date(),
      };
      newFollowUps.push(followUp);
    }
  });

  return newFollowUps;
};

export const getDefaultAutomationRules = (): AutomationRule[] => {
  return [
    {
      id: '1',
      name: 'Follow-up após 3 dias sem mudança de stage',
      enabled: true,
      trigger: 'time_in_stage',
      condition: { days: 3 },
      action: {
        type: 'create_followup',
        params: {
          title: 'Verificar progresso do lead',
          description: 'Lead está há 3 dias no mesmo estágio',
          daysFromNow: 0,
          priority: 'medium',
          type: 'call',
        },
      },
    },
    {
      id: '2',
      name: 'Follow-up ao mover para Proposta',
      enabled: true,
      trigger: 'stage_change',
      condition: { stageId: '4' },
      action: {
        type: 'create_followup',
        params: {
          title: 'Acompanhar proposta enviada',
          description: 'Verificar se o cliente recebeu e analisou a proposta',
          daysFromNow: 2,
          priority: 'high',
          type: 'call',
        },
      },
    },
    {
      id: '3',
      name: 'Follow-up ao mover para Negociação',
      enabled: true,
      trigger: 'stage_change',
      condition: { stageId: '5' },
      action: {
        type: 'create_followup',
        params: {
          title: 'Negociar condições finais',
          description: 'Discutir valores, prazos e condições de pagamento',
          daysFromNow: 1,
          priority: 'high',
          type: 'meeting',
        },
      },
    },
  ];
};

export const getOverdueFollowUps = (followUps: FollowUp[]): FollowUp[] => {
  return followUps.filter(f => !f.completed && isPast(new Date(f.dueDate)) && !isToday(new Date(f.dueDate)));
};

export const getTodayFollowUps = (followUps: FollowUp[]): FollowUp[] => {
  return followUps.filter(f => !f.completed && isToday(new Date(f.dueDate)));
};

export const getUpcomingFollowUps = (followUps: FollowUp[], days: number = 7): FollowUp[] => {
  const future = addDays(new Date(), days);
  return followUps.filter(f => {
    const dueDate = new Date(f.dueDate);
    return !f.completed && dueDate > new Date() && dueDate <= future && !isToday(dueDate);
  });
};
