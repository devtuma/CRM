import React, { useState } from 'react';
import { CRMProvider } from './context/CRMContext';
import Layout from './components/Layout';
import KanbanBoard from './components/KanbanBoard';
import Dashboard from './components/Dashboard';
import GoogleContactsIntegration from './components/GoogleContactsIntegration';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'kanban':
        return <KanbanBoard />;
      case 'google':
        return <GoogleContactsIntegration />;
      case 'leads':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Gestão de Leads</h2>
            <p className="text-gray-600">
              Visualize e gerencie seus leads através do Funil de Vendas (Kanban)
            </p>
          </div>
        );
      case 'templates':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Templates de WhatsApp</h2>
            <p className="text-gray-600">
              Acesse os templates através de cada lead no Funil de Vendas
            </p>
          </div>
        );
      case 'reports':
        return <Dashboard />;
      case 'settings':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Configurações</h2>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Configurações do Sistema</h3>
              <p className="text-gray-600 mb-4">
                Use o botão "Configurar Etapas" no Funil de Vendas para personalizar as etapas do seu processo de vendas.
              </p>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Recursos Disponíveis:</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>Funil de vendas customizável com drag-and-drop</li>
                    <li>Cadastro completo de leads e clientes</li>
                    <li>Histórico detalhado de interações</li>
                    <li>Templates de mensagens para WhatsApp</li>
                    <li>Automação de follow-ups</li>
                    <li>Cálculo de taxa de conversão em tempo real</li>
                    <li>Previsão de faturamento</li>
                    <li>Importação de contatos via CSV</li>
                    <li>Relatórios de performance por vendedor</li>
                    <li>Exportação de dados</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <CRMProvider>
      <Layout currentView={currentView} onViewChange={setCurrentView}>
        {renderView()}
      </Layout>
    </CRMProvider>
  );
}

export default App;
