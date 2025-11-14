import React, { useState } from 'react';
import {
  LayoutDashboard,
  KanbanSquare,
  Users,
  MessageSquare,
  BarChart3,
  Settings,
  Menu,
  X,
  Bell,
  Calendar,
} from 'lucide-react';
import { useCRM } from '../context/CRMContext';
import { getOverdueFollowUps, getTodayFollowUps } from '../utils/automation';

interface LayoutProps {
  children: React.ReactNode;
  currentView: string;
  onViewChange: (view: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentView, onViewChange }) => {
  const { currentUser, followUps, leads } = useCRM();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const overdueFollowUps = getOverdueFollowUps(followUps);
  const todayFollowUps = getTodayFollowUps(followUps);
  const totalNotifications = overdueFollowUps.length + todayFollowUps.length;

  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'kanban', icon: KanbanSquare, label: 'Funil de Vendas' },
    { id: 'leads', icon: Users, label: 'Leads' },
    { id: 'templates', icon: MessageSquare, label: 'Templates WhatsApp' },
    { id: 'reports', icon: BarChart3, label: 'Relatórios' },
    { id: 'google', icon: Users, label: 'Google Contacts' },
    { id: 'settings', icon: Settings, label: 'Configurações' },
  ];

  const getLeadById = (leadId: string) => {
    return leads.find(l => l.id === leadId);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`bg-white border-r border-gray-200 transition-all duration-300 ${
          sidebarOpen ? 'w-64' : 'w-20'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          {sidebarOpen ? (
            <>
              <h1 className="text-xl font-bold text-blue-600">CRM Kanban</h1>
              <button
                onClick={() => setSidebarOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </>
          ) : (
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-gray-500 hover:text-gray-700 mx-auto"
            >
              <Menu size={20} />
            </button>
          )}
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  isActive
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
                title={!sidebarOpen ? item.label : undefined}
              >
                <Icon size={20} />
                {sidebarOpen && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {sidebarOpen && currentUser && (
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                {currentUser.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 truncate">{currentUser.name}</p>
                <p className="text-sm text-gray-500 truncate">{currentUser.email}</p>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-semibold text-gray-900">
                {menuItems.find(item => item.id === currentView)?.label || 'CRM'}
              </h2>
            </div>

            <div className="flex items-center gap-4">
              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                >
                  <Bell size={20} />
                  {totalNotifications > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                      {totalNotifications}
                    </span>
                  )}
                </button>

                {notificationsOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="p-4 border-b border-gray-200">
                      <h3 className="font-semibold text-gray-900">Notificações</h3>
                    </div>

                    <div className="max-h-96 overflow-y-auto">
                      {overdueFollowUps.length > 0 && (
                        <div className="p-3 border-b border-gray-100">
                          <p className="text-xs font-semibold text-red-600 mb-2">
                            ATRASADOS
                          </p>
                          {overdueFollowUps.slice(0, 5).map((followUp) => {
                            const lead = getLeadById(followUp.leadId);
                            return (
                              <div key={followUp.id} className="mb-2 text-sm">
                                <p className="font-medium text-gray-900">{followUp.title}</p>
                                <p className="text-xs text-gray-500">
                                  {lead?.name} - Vencido
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {todayFollowUps.length > 0 && (
                        <div className="p-3">
                          <p className="text-xs font-semibold text-yellow-600 mb-2">
                            HOJE
                          </p>
                          {todayFollowUps.slice(0, 5).map((followUp) => {
                            const lead = getLeadById(followUp.leadId);
                            return (
                              <div key={followUp.id} className="mb-2 text-sm">
                                <p className="font-medium text-gray-900">{followUp.title}</p>
                                <p className="text-xs text-gray-500">{lead?.name}</p>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {totalNotifications === 0 && (
                        <div className="p-8 text-center text-gray-500">
                          <Calendar size={32} className="mx-auto mb-2 opacity-50" />
                          <p className="text-sm">Nenhuma notificação</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
