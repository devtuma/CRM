import React, { useState } from 'react';
import { useCRM } from '../context/CRMContext';
import { Download, Upload, Users, CheckCircle, AlertCircle } from 'lucide-react';

const GoogleContactsIntegration: React.FC = () => {
  const { addLead, stages, currentUser } = useCRM();
  const [isImporting, setIsImporting] = useState(false);
  const [importStatus, setImportStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  // Simulate Google Contacts OAuth (in production, this would use real OAuth)
  const handleGoogleLogin = () => {
    alert('Em produção, isso abriria o OAuth do Google para autorização.\n\nPara demonstração, você pode usar a importação via CSV.');
  };

  const handleFileImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const lines = text.split('\n');
        let imported = 0;

        // Skip header line
        for (let i = 1; i < lines.length; i++) {
          const line = lines[i].trim();
          if (!line) continue;

          const [name, email, phone, company] = line.split(',').map(s => s.trim());

          if (name && email) {
            addLead({
              name,
              email,
              phone: phone || '',
              company: company || '',
              position: '',
              value: 0,
              stageId: stages[0]?.id || '1',
              assignedTo: currentUser?.name || 'Administrador',
              status: 'active',
              tags: ['Importado do Google'],
              source: 'Google Contacts',
            });
            imported++;
          }
        }

        setImportStatus({
          type: 'success',
          message: `${imported} contatos importados com sucesso!`,
        });
      } catch (error) {
        setImportStatus({
          type: 'error',
          message: 'Erro ao importar arquivo. Verifique o formato.',
        });
      } finally {
        setIsImporting(false);
      }
    };

    reader.readAsText(file);
  };

  const downloadSampleCSV = () => {
    const sample = `Nome,Email,Telefone,Empresa
João Silva,joao@exemplo.com,(11) 99999-9999,Empresa ABC
Maria Santos,maria@exemplo.com,(11) 88888-8888,Empresa XYZ
Pedro Oliveira,pedro@exemplo.com,(11) 77777-7777,Empresa 123`;

    const blob = new Blob([sample], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'exemplo-importacao.csv';
    link.click();
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Integração com Google Contacts
        </h2>
        <p className="text-gray-600">
          Importe seus contatos do Google diretamente para o CRM
        </p>
      </div>

      {importStatus.type && (
        <div
          className={`p-4 rounded-lg flex items-start gap-3 ${
            importStatus.type === 'success'
              ? 'bg-green-50 border border-green-200'
              : 'bg-red-50 border border-red-200'
          }`}
        >
          {importStatus.type === 'success' ? (
            <CheckCircle className="text-green-600 flex-shrink-0" size={20} />
          ) : (
            <AlertCircle className="text-red-600 flex-shrink-0" size={20} />
          )}
          <div>
            <p
              className={`font-medium ${
                importStatus.type === 'success' ? 'text-green-900' : 'text-red-900'
              }`}
            >
              {importStatus.message}
            </p>
          </div>
        </div>
      )}

      {/* Google OAuth Integration */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Users size={20} />
          Conectar com Google
        </h3>

        <p className="text-gray-600 mb-4">
          Conecte sua conta Google para sincronizar automaticamente seus contatos.
        </p>

        <button
          onClick={handleGoogleLogin}
          className="flex items-center gap-3 px-6 py-3 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium text-gray-700"
        >
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Conectar com Google
        </button>

        <p className="text-xs text-gray-500 mt-3">
          * Em ambiente de produção, isso utilizaria OAuth 2.0 do Google
        </p>
      </div>

      {/* CSV Import */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Upload size={20} />
          Importar via CSV
        </h3>

        <p className="text-gray-600 mb-4">
          Importe seus contatos através de um arquivo CSV. O arquivo deve conter as colunas:
          Nome, Email, Telefone, Empresa.
        </p>

        <div className="space-y-3">
          <div className="flex gap-3">
            <label className="flex-1">
              <input
                type="file"
                accept=".csv"
                onChange={handleFileImport}
                disabled={isImporting}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-lg file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100
                  disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </label>
          </div>

          <button
            onClick={downloadSampleCSV}
            className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
          >
            <Download size={18} />
            Baixar arquivo de exemplo
          </button>
        </div>

        {isImporting && (
          <div className="mt-4 flex items-center gap-2 text-blue-600">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
            <span>Importando contatos...</span>
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h4 className="font-semibold text-blue-900 mb-2">Como usar</h4>
        <ol className="list-decimal list-inside space-y-2 text-blue-800 text-sm">
          <li>Exporte seus contatos do Google Contacts em formato CSV</li>
          <li>Ou use o botão "Conectar com Google" para sincronização automática</li>
          <li>Os contatos importados serão adicionados como novos leads</li>
          <li>Você pode então qualificar e movê-los pelo funil de vendas</li>
        </ol>
      </div>
    </div>
  );
};

export default GoogleContactsIntegration;
