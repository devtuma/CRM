import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Lead, Stage, Interaction, WhatsAppTemplate, FollowUp, User } from '../types';
import { storage } from '../utils/storage';
import { checkAutomationRules, getDefaultAutomationRules, AutomationRule } from '../utils/automation';

interface CRMContextType {
  // State
  leads: Lead[];
  stages: Stage[];
  interactions: Interaction[];
  templates: WhatsAppTemplate[];
  followUps: FollowUp[];
  users: User[];
  currentUser: User | null;
  automationRules: AutomationRule[];

  // Lead actions
  addLead: (lead: Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateLead: (id: string, updates: Partial<Lead>) => void;
  deleteLead: (id: string) => void;
  moveLead: (leadId: string, newStageId: string) => void;

  // Stage actions
  addStage: (stage: Omit<Stage, 'id' | 'leads'>) => void;
  updateStage: (id: string, updates: Partial<Stage>) => void;
  deleteStage: (id: string) => void;
  reorderStages: (stages: Stage[]) => void;

  // Interaction actions
  addInteraction: (interaction: Omit<Interaction, 'id'>) => void;
  getLeadInteractions: (leadId: string) => Interaction[];

  // Template actions
  addTemplate: (template: Omit<WhatsAppTemplate, 'id' | 'createdAt' | 'usageCount'>) => void;
  updateTemplate: (id: string, updates: Partial<WhatsAppTemplate>) => void;
  deleteTemplate: (id: string) => void;
  useTemplate: (id: string, leadId: string, replacements: Record<string, string>) => string;

  // Follow-up actions
  addFollowUp: (followUp: Omit<FollowUp, 'id' | 'createdAt'>) => void;
  updateFollowUp: (id: string, updates: Partial<FollowUp>) => void;
  deleteFollowUp: (id: string) => void;
  completeFollowUp: (id: string) => void;
  getLeadFollowUps: (leadId: string) => FollowUp[];

  // User actions
  addUser: (user: Omit<User, 'id'>) => void;
  updateUser: (id: string, updates: Partial<User>) => void;
  setCurrentUser: (user: User) => void;

  // Data management
  exportData: () => void;
  importData: (data: any) => void;
}

const CRMContext = createContext<CRMContextType | undefined>(undefined);

export const CRMProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [stages, setStages] = useState<Stage[]>([]);
  const [interactions, setInteractions] = useState<Interaction[]>([]);
  const [templates, setTemplates] = useState<WhatsAppTemplate[]>([]);
  const [followUps, setFollowUps] = useState<FollowUp[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUserState] = useState<User | null>(null);
  const [automationRules] = useState<AutomationRule[]>(getDefaultAutomationRules());

  // Load data from localStorage on mount
  useEffect(() => {
    setLeads(storage.getLeads());
    setStages(storage.getStages());
    setInteractions(storage.getInteractions());
    setTemplates(storage.getTemplates());
    setFollowUps(storage.getFollowUps());
    setUsers(storage.getUsers());

    const savedUser = storage.getCurrentUser();
    if (savedUser) {
      setCurrentUserState(savedUser);
    } else {
      // Set default user if none exists
      const defaultUsers = storage.getUsers();
      if (defaultUsers.length > 0) {
        setCurrentUserState(defaultUsers[0]);
        storage.setCurrentUser(defaultUsers[0]);
      }
    }
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    storage.saveLeads(leads);
  }, [leads]);

  useEffect(() => {
    storage.saveStages(stages);
  }, [stages]);

  useEffect(() => {
    storage.saveInteractions(interactions);
  }, [interactions]);

  useEffect(() => {
    storage.saveTemplates(templates);
  }, [templates]);

  useEffect(() => {
    storage.saveFollowUps(followUps);
  }, [followUps]);

  useEffect(() => {
    storage.saveUsers(users);
  }, [users]);

  // Lead actions
  const addLead = (leadData: Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newLead: Lead = {
      ...leadData,
      id: `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setLeads(prev => [...prev, newLead]);

    // Check automation rules
    const newFollowUps = checkAutomationRules(newLead, null, automationRules);
    if (newFollowUps.length > 0) {
      setFollowUps(prev => [...prev, ...newFollowUps]);
    }
  };

  const updateLead = (id: string, updates: Partial<Lead>) => {
    setLeads(prev => {
      const index = prev.findIndex(l => l.id === id);
      if (index === -1) return prev;

      const oldLead = prev[index];
      const updatedLead = {
        ...oldLead,
        ...updates,
        updatedAt: new Date(),
      };

      // Check automation rules
      const newFollowUps = checkAutomationRules(updatedLead, oldLead, automationRules);
      if (newFollowUps.length > 0) {
        setFollowUps(current => [...current, ...newFollowUps]);
      }

      const newLeads = [...prev];
      newLeads[index] = updatedLead;
      return newLeads;
    });
  };

  const deleteLead = (id: string) => {
    setLeads(prev => prev.filter(l => l.id !== id));
    setInteractions(prev => prev.filter(i => i.leadId !== id));
    setFollowUps(prev => prev.filter(f => f.leadId !== id));
  };

  const moveLead = (leadId: string, newStageId: string) => {
    updateLead(leadId, { stageId: newStageId });
  };

  // Stage actions
  const addStage = (stageData: Omit<Stage, 'id' | 'leads'>) => {
    const newStage: Stage = {
      ...stageData,
      id: `stage_${Date.now()}`,
      leads: [],
    };
    setStages(prev => [...prev, newStage]);
  };

  const updateStage = (id: string, updates: Partial<Stage>) => {
    setStages(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  const deleteStage = (id: string) => {
    setStages(prev => prev.filter(s => s.id !== id));
    // Move leads from deleted stage to first stage
    const firstStage = stages[0];
    if (firstStage) {
      setLeads(prev => prev.map(l => l.stageId === id ? { ...l, stageId: firstStage.id } : l));
    }
  };

  const reorderStages = (newStages: Stage[]) => {
    setStages(newStages);
  };

  // Interaction actions
  const addInteraction = (interactionData: Omit<Interaction, 'id'>) => {
    const newInteraction: Interaction = {
      ...interactionData,
      id: `int_${Date.now()}`,
    };
    setInteractions(prev => [...prev, newInteraction]);

    // Update lead's updatedAt
    updateLead(interactionData.leadId, {});
  };

  const getLeadInteractions = (leadId: string): Interaction[] => {
    return interactions.filter(i => i.leadId === leadId).sort((a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  };

  // Template actions
  const addTemplate = (templateData: Omit<WhatsAppTemplate, 'id' | 'createdAt' | 'usageCount'>) => {
    const newTemplate: WhatsAppTemplate = {
      ...templateData,
      id: `tpl_${Date.now()}`,
      createdAt: new Date(),
      usageCount: 0,
    };
    setTemplates(prev => [...prev, newTemplate]);
  };

  const updateTemplate = (id: string, updates: Partial<WhatsAppTemplate>) => {
    setTemplates(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
  };

  const deleteTemplate = (id: string) => {
    setTemplates(prev => prev.filter(t => t.id !== id));
  };

  const useTemplate = (id: string, leadId: string, replacements: Record<string, string>): string => {
    const template = templates.find(t => t.id === id);
    if (!template) return '';

    let content = template.content;
    Object.entries(replacements).forEach(([key, value]) => {
      content = content.replace(new RegExp(`{{${key}}}`, 'g'), value);
    });

    // Update usage count
    updateTemplate(id, { usageCount: template.usageCount + 1 });

    return content;
  };

  // Follow-up actions
  const addFollowUp = (followUpData: Omit<FollowUp, 'id' | 'createdAt'>) => {
    const newFollowUp: FollowUp = {
      ...followUpData,
      id: `fu_${Date.now()}`,
      createdAt: new Date(),
    };
    setFollowUps(prev => [...prev, newFollowUp]);
  };

  const updateFollowUp = (id: string, updates: Partial<FollowUp>) => {
    setFollowUps(prev => prev.map(f => f.id === id ? { ...f, ...updates } : f));
  };

  const deleteFollowUp = (id: string) => {
    setFollowUps(prev => prev.filter(f => f.id !== id));
  };

  const completeFollowUp = (id: string) => {
    updateFollowUp(id, { completed: true, completedAt: new Date() });
  };

  const getLeadFollowUps = (leadId: string): FollowUp[] => {
    return followUps.filter(f => f.leadId === leadId).sort((a, b) =>
      new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
    );
  };

  // User actions
  const addUser = (userData: Omit<User, 'id'>) => {
    const newUser: User = {
      ...userData,
      id: `user_${Date.now()}`,
    };
    setUsers(prev => [...prev, newUser]);
  };

  const updateUser = (id: string, updates: Partial<User>) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, ...updates } : u));
  };

  const setCurrentUser = (user: User) => {
    setCurrentUserState(user);
    storage.setCurrentUser(user);
  };

  // Data management
  const exportData = () => {
    const data = storage.exportData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `crm-export-${new Date().toISOString()}.json`;
    a.click();
  };

  const importData = (data: any) => {
    storage.importData(data);
    setLeads(storage.getLeads());
    setStages(storage.getStages());
    setInteractions(storage.getInteractions());
    setTemplates(storage.getTemplates());
    setFollowUps(storage.getFollowUps());
    setUsers(storage.getUsers());
  };

  const value: CRMContextType = {
    leads,
    stages,
    interactions,
    templates,
    followUps,
    users,
    currentUser,
    automationRules,
    addLead,
    updateLead,
    deleteLead,
    moveLead,
    addStage,
    updateStage,
    deleteStage,
    reorderStages,
    addInteraction,
    getLeadInteractions,
    addTemplate,
    updateTemplate,
    deleteTemplate,
    useTemplate,
    addFollowUp,
    updateFollowUp,
    deleteFollowUp,
    completeFollowUp,
    getLeadFollowUps,
    addUser,
    updateUser,
    setCurrentUser,
    exportData,
    importData,
  };

  return <CRMContext.Provider value={value}>{children}</CRMContext.Provider>;
};

export const useCRM = () => {
  const context = useContext(CRMContext);
  if (!context) {
    throw new Error('useCRM must be used within a CRMProvider');
  }
  return context;
};
