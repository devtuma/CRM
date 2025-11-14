import { Lead, Stage, Interaction, WhatsAppTemplate, FollowUp, User } from '../types';

const STORAGE_KEYS = {
  LEADS: 'crm_leads',
  STAGES: 'crm_stages',
  INTERACTIONS: 'crm_interactions',
  TEMPLATES: 'crm_templates',
  FOLLOWUPS: 'crm_followups',
  USERS: 'crm_users',
  CURRENT_USER: 'crm_current_user',
};

export const storage = {
  // Leads
  getLeads: (): Lead[] => {
    const data = localStorage.getItem(STORAGE_KEYS.LEADS);
    return data ? JSON.parse(data, dateReviver) : [];
  },

  saveLeads: (leads: Lead[]): void => {
    localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(leads));
  },

  // Stages
  getStages: (): Stage[] => {
    const data = localStorage.getItem(STORAGE_KEYS.STAGES);
    return data ? JSON.parse(data, dateReviver) : getDefaultStages();
  },

  saveStages: (stages: Stage[]): void => {
    localStorage.setItem(STORAGE_KEYS.STAGES, JSON.stringify(stages));
  },

  // Interactions
  getInteractions: (): Interaction[] => {
    const data = localStorage.getItem(STORAGE_KEYS.INTERACTIONS);
    return data ? JSON.parse(data, dateReviver) : [];
  },

  saveInteractions: (interactions: Interaction[]): void => {
    localStorage.setItem(STORAGE_KEYS.INTERACTIONS, JSON.stringify(interactions));
  },

  // WhatsApp Templates
  getTemplates: (): WhatsAppTemplate[] => {
    const data = localStorage.getItem(STORAGE_KEYS.TEMPLATES);
    return data ? JSON.parse(data, dateReviver) : getDefaultTemplates();
  },

  saveTemplates: (templates: WhatsAppTemplate[]): void => {
    localStorage.setItem(STORAGE_KEYS.TEMPLATES, JSON.stringify(templates));
  },

  // Follow-ups
  getFollowUps: (): FollowUp[] => {
    const data = localStorage.getItem(STORAGE_KEYS.FOLLOWUPS);
    return data ? JSON.parse(data, dateReviver) : [];
  },

  saveFollowUps: (followUps: FollowUp[]): void => {
    localStorage.setItem(STORAGE_KEYS.FOLLOWUPS, JSON.stringify(followUps));
  },

  // Users
  getUsers: (): User[] => {
    const data = localStorage.getItem(STORAGE_KEYS.USERS);
    return data ? JSON.parse(data) : getDefaultUsers();
  },

  saveUsers: (users: User[]): void => {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  },

  // Current User
  getCurrentUser: (): User | null => {
    const data = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return data ? JSON.parse(data) : null;
  },

  setCurrentUser: (user: User): void => {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
  },

  // Export all data
  exportData: () => {
    return {
      leads: storage.getLeads(),
      stages: storage.getStages(),
      interactions: storage.getInteractions(),
      templates: storage.getTemplates(),
      followUps: storage.getFollowUps(),
      users: storage.getUsers(),
      exportDate: new Date(),
    };
  },

  // Import data
  importData: (data: any) => {
    if (data.leads) storage.saveLeads(data.leads);
    if (data.stages) storage.saveStages(data.stages);
    if (data.interactions) storage.saveInteractions(data.interactions);
    if (data.templates) storage.saveTemplates(data.templates);
    if (data.followUps) storage.saveFollowUps(data.followUps);
    if (data.users) storage.saveUsers(data.users);
  },

  // Clear all data
  clearAll: () => {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  },
};

// Helper to revive Date objects from JSON
function dateReviver(key: string, value: any) {
  const dateFields = ['createdAt', 'updatedAt', 'date', 'dueDate', 'completedAt', 'expectedCloseDate'];
  if (dateFields.includes(key) && typeof value === 'string') {
    return new Date(value);
  }
  return value;
}

function getDefaultStages(): Stage[] {
  return [
    { id: '1', name: 'Novo Lead', color: '#3b82f6', order: 0, leads: [] },
    { id: '2', name: 'Contato Inicial', color: '#8b5cf6', order: 1, leads: [] },
    { id: '3', name: 'Qualificação', color: '#ec4899', order: 2, leads: [] },
    { id: '4', name: 'Proposta', color: '#f59e0b', order: 3, leads: [] },
    { id: '5', name: 'Negociação', color: '#10b981', order: 4, leads: [] },
    { id: '6', name: 'Fechado', color: '#22c55e', order: 5, leads: [] },
  ];
}

function getDefaultTemplates(): WhatsAppTemplate[] {
  return [
    {
      id: '1',
      name: 'Primeiro Contato',
      content: 'Olá {{nome}}! Sou {{vendedor}} da {{empresa}}. Vi que você demonstrou interesse em nossos produtos/serviços. Quando podemos conversar?',
      category: 'Inicial',
      variables: ['nome', 'vendedor', 'empresa'],
      createdAt: new Date(),
      usageCount: 0,
    },
    {
      id: '2',
      name: 'Follow-up Proposta',
      content: 'Oi {{nome}}! Enviei a proposta por email. Teve a chance de analisar? Estou à disposição para esclarecer dúvidas!',
      category: 'Follow-up',
      variables: ['nome'],
      createdAt: new Date(),
      usageCount: 0,
    },
    {
      id: '3',
      name: 'Agradecimento Fechamento',
      content: 'Parabéns {{nome}}! É um prazer tê-lo(a) como cliente. Vamos começar nossa parceria da melhor forma. Qualquer dúvida, estou aqui!',
      category: 'Pós-venda',
      variables: ['nome'],
      createdAt: new Date(),
      usageCount: 0,
    },
  ];
}

function getDefaultUsers(): User[] {
  return [
    {
      id: '1',
      name: 'Administrador',
      email: 'admin@crm.com',
      role: 'admin',
      active: true,
    },
  ];
}
