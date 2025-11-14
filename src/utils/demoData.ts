import { Lead, Interaction, FollowUp } from '../types';

export const getDemoLeads = (): Lead[] => {
  const now = new Date();
  const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
  const nextMonth = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

  return [
    {
      id: 'demo_lead_1',
      name: 'João Silva',
      email: 'joao.silva@empresa.com.br',
      phone: '(11) 98765-4321',
      company: 'Tech Solutions Ltda',
      position: 'CTO',
      value: 45000,
      status: 'active',
      stageId: '2',
      assignedTo: 'Administrador',
      createdAt: lastWeek,
      updatedAt: yesterday,
      expectedCloseDate: nextMonth,
      tags: ['Enterprise', 'Tecnologia', 'Quente'],
      source: 'LinkedIn',
      priority: 'high',
    },
    {
      id: 'demo_lead_2',
      name: 'Maria Santos',
      email: 'maria@startup.io',
      phone: '(21) 99876-5432',
      company: 'Startup Inovadora',
      position: 'CEO',
      value: 28000,
      status: 'active',
      stageId: '3',
      assignedTo: 'Administrador',
      createdAt: lastWeek,
      updatedAt: now,
      expectedCloseDate: nextWeek,
      tags: ['Startup', 'SaaS', 'Urgente'],
      source: 'Indicação',
      priority: 'high',
    },
    {
      id: 'demo_lead_3',
      name: 'Pedro Oliveira',
      email: 'pedro@comercio.com',
      phone: '(11) 97654-3210',
      company: 'Comércio Digital SA',
      position: 'Diretor de TI',
      value: 52000,
      status: 'active',
      stageId: '4',
      assignedTo: 'Administrador',
      createdAt: new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000),
      updatedAt: yesterday,
      expectedCloseDate: nextWeek,
      tags: ['E-commerce', 'Grande Porte'],
      source: 'Site',
      priority: 'high',
    },
    {
      id: 'demo_lead_4',
      name: 'Ana Costa',
      email: 'ana.costa@industria.com.br',
      phone: '(48) 98765-1234',
      company: 'Indústria SC',
      position: 'Gerente de Projetos',
      value: 35000,
      status: 'active',
      stageId: '5',
      assignedTo: 'Administrador',
      createdAt: new Date(now.getTime() - 21 * 24 * 60 * 60 * 1000),
      updatedAt: now,
      expectedCloseDate: nextWeek,
      tags: ['Indústria', 'Negociação'],
      source: 'Google Ads',
      priority: 'medium',
    },
    {
      id: 'demo_lead_5',
      name: 'Carlos Mendes',
      email: 'carlos@consultoria.com',
      phone: '(31) 99123-4567',
      company: 'Consultoria MG',
      position: 'Sócio',
      value: 68000,
      status: 'won',
      stageId: '6',
      assignedTo: 'Administrador',
      createdAt: new Date(now.getTime() - 45 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
      expectedCloseDate: yesterday,
      tags: ['Consultoria', 'Cliente VIP', 'Fechado'],
      source: 'Indicação',
      priority: 'high',
    },
    {
      id: 'demo_lead_6',
      name: 'Juliana Ferreira',
      email: 'juliana@servicos.com.br',
      phone: '(85) 98234-5678',
      company: 'Serviços Nordeste',
      position: 'Diretora Comercial',
      value: 22000,
      status: 'active',
      stageId: '1',
      assignedTo: 'Administrador',
      createdAt: yesterday,
      updatedAt: yesterday,
      expectedCloseDate: new Date(now.getTime() + 45 * 24 * 60 * 60 * 1000),
      tags: ['Novo', 'Serviços'],
      source: 'Facebook Ads',
      priority: 'medium',
    },
    {
      id: 'demo_lead_7',
      name: 'Roberto Alves',
      email: 'roberto@financeira.com',
      phone: '(11) 97123-4567',
      company: 'Financeira SP',
      position: 'VP de Tecnologia',
      value: 95000,
      status: 'active',
      stageId: '3',
      assignedTo: 'Administrador',
      createdAt: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000),
      updatedAt: now,
      expectedCloseDate: new Date(now.getTime() + 20 * 24 * 60 * 60 * 1000),
      tags: ['Financeiro', 'Enterprise', 'Alto Valor'],
      source: 'Evento',
      priority: 'high',
    },
    {
      id: 'demo_lead_8',
      name: 'Fernanda Lima',
      email: 'fernanda@varejo.com.br',
      phone: '(21) 98345-6789',
      company: 'Varejo Carioca',
      position: 'Gerente de TI',
      value: 18000,
      status: 'active',
      stageId: '2',
      assignedTo: 'Administrador',
      createdAt: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000),
      updatedAt: yesterday,
      expectedCloseDate: new Date(now.getTime() + 15 * 24 * 60 * 60 * 1000),
      tags: ['Varejo', 'Médio Porte'],
      source: 'Site',
      priority: 'low',
    },
  ];
};

export const getDemoInteractions = (): Interaction[] => {
  const now = new Date();
  const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const twoDaysAgo = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000);
  const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  return [
    {
      id: 'demo_int_1',
      leadId: 'demo_lead_1',
      type: 'call',
      content: 'Primeira ligação de prospecção. Cliente demonstrou interesse em nossos serviços de consultoria. Agendada reunião para próxima semana.',
      date: lastWeek,
      userId: '1',
      userName: 'Administrador',
    },
    {
      id: 'demo_int_2',
      leadId: 'demo_lead_1',
      type: 'meeting',
      content: 'Reunião online via Zoom. Apresentada proposta inicial. Cliente pediu tempo para avaliar com a equipe técnica.',
      date: yesterday,
      userId: '1',
      userName: 'Administrador',
    },
    {
      id: 'demo_int_3',
      leadId: 'demo_lead_2',
      type: 'whatsapp',
      content: 'Enviado orçamento detalhado via WhatsApp. Cliente respondeu com dúvidas sobre prazos de implementação.',
      date: twoDaysAgo,
      userId: '1',
      userName: 'Administrador',
    },
    {
      id: 'demo_int_4',
      leadId: 'demo_lead_3',
      type: 'email',
      content: 'Enviada proposta comercial completa. Incluídos cases de sucesso e ROI esperado. Aguardando retorno.',
      date: twoDaysAgo,
      userId: '1',
      userName: 'Administrador',
    },
    {
      id: 'demo_int_5',
      leadId: 'demo_lead_5',
      type: 'call',
      content: 'Negociação finalizada! Cliente aceitou proposta com desconto de 10%. Contrato será enviado ainda hoje.',
      date: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
      userId: '1',
      userName: 'Administrador',
    },
  ];
};

export const getDemoFollowUps = (): FollowUp[] => {
  const now = new Date();
  const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

  return [
    {
      id: 'demo_fu_1',
      leadId: 'demo_lead_1',
      title: 'Ligar para verificar análise da proposta',
      description: 'Cliente pediu 1 semana para avaliar. Fazer follow-up para verificar andamento.',
      dueDate: tomorrow,
      completed: false,
      priority: 'high',
      type: 'call',
      userId: '1',
      createdAt: new Date(now.getTime() - 24 * 60 * 60 * 1000),
    },
    {
      id: 'demo_fu_2',
      leadId: 'demo_lead_2',
      title: 'Enviar documentação técnica adicional',
      description: 'Cliente solicitou mais detalhes sobre integração com sistemas legados.',
      dueDate: now,
      completed: false,
      priority: 'high',
      type: 'email',
      userId: '1',
      createdAt: new Date(now.getTime() - 48 * 60 * 60 * 1000),
    },
    {
      id: 'demo_fu_3',
      leadId: 'demo_lead_3',
      title: 'Agendar reunião de negociação final',
      description: 'Discutir condições de pagamento e prazos de entrega.',
      dueDate: tomorrow,
      completed: false,
      priority: 'high',
      type: 'meeting',
      userId: '1',
      createdAt: new Date(now.getTime() - 24 * 60 * 60 * 1000),
    },
    {
      id: 'demo_fu_4',
      leadId: 'demo_lead_7',
      title: 'Enviar proposta atualizada com desconto',
      description: 'Cliente solicitou proposta com condições especiais para fechamento rápido.',
      dueDate: nextWeek,
      completed: false,
      priority: 'medium',
      type: 'email',
      userId: '1',
      createdAt: new Date(now.getTime() - 24 * 60 * 60 * 1000),
    },
  ];
};

export const initializeDemoData = () => {
  const hasData = localStorage.getItem('crm_leads');

  if (!hasData) {
    localStorage.setItem('crm_leads', JSON.stringify(getDemoLeads()));
    localStorage.setItem('crm_interactions', JSON.stringify(getDemoInteractions()));
    localStorage.setItem('crm_followups', JSON.stringify(getDemoFollowUps()));
    return true;
  }

  return false;
};
