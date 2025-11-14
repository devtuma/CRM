import React, { useState } from 'react';
import { useCRM } from '../context/CRMContext';
import { Lead } from '../types';
import { Copy, Plus, Edit2, Trash2, TrendingUp } from 'lucide-react';

interface WhatsAppTemplateSelectorProps {
  lead: Lead;
}

const WhatsAppTemplateSelector: React.FC<WhatsAppTemplateSelectorProps> = ({ lead }) => {
  const { templates, addTemplate, updateTemplate, deleteTemplate, useTemplate, addInteraction, currentUser } = useCRM();
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [messagePreview, setMessagePreview] = useState('');
  const [isCreatingTemplate, setIsCreatingTemplate] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<string | null>(null);

  const [templateForm, setTemplateForm] = useState({
    name: '',
    content: '',
    category: '',
  });

  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplate(templateId);

    const replacements = {
      nome: lead.name,
      empresa: lead.company || '[Empresa]',
      vendedor: currentUser?.name || '[Vendedor]',
      valor: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(lead.value),
    };

    const preview = useTemplate(templateId, lead.id, replacements);
    setMessagePreview(preview);
  };

  const handleCopyMessage = () => {
    if (messagePreview) {
      navigator.clipboard.writeText(messagePreview);

      // Registrar interação
      addInteraction({
        leadId: lead.id,
        type: 'whatsapp',
        content: `Template utilizado:\n${messagePreview}`,
        date: new Date(),
        userId: currentUser?.id || '1',
        userName: currentUser?.name || 'Usuário',
      });

      alert('Mensagem copiada para a área de transferência!');
    }
  };

  const handleCreateTemplate = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingTemplate) {
      updateTemplate(editingTemplate, templateForm);
      setEditingTemplate(null);
    } else {
      addTemplate(templateForm);
    }

    setTemplateForm({ name: '', content: '', category: '' });
    setIsCreatingTemplate(false);
  };

  const handleEditTemplate = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setTemplateForm({
        name: template.name,
        content: template.content,
        category: template.category,
      });
      setEditingTemplate(templateId);
      setIsCreatingTemplate(true);
    }
  };

  const handleDeleteTemplate = (templateId: string) => {
    if (window.confirm('Tem certeza que deseja excluir este template?')) {
      deleteTemplate(templateId);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">Templates de WhatsApp</h3>
        <button
          onClick={() => {
            setIsCreatingTemplate(!isCreatingTemplate);
            setEditingTemplate(null);
            setTemplateForm({ name: '', content: '', category: '' });
          }}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          <Plus size={18} />
          Novo Template
        </button>
      </div>

      {isCreatingTemplate && (
        <form onSubmit={handleCreateTemplate} className="bg-gray-50 p-4 rounded-lg space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nome do Template *
            </label>
            <input
              type="text"
              required
              value={templateForm.name}
              onChange={(e) => setTemplateForm({ ...templateForm, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Ex: Primeiro Contato"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Categoria
            </label>
            <input
              type="text"
              value={templateForm.category}
              onChange={(e) => setTemplateForm({ ...templateForm, category: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Ex: Inicial, Follow-up, Pós-venda"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Conteúdo da Mensagem *
            </label>
            <textarea
              required
              value={templateForm.content}
              onChange={(e) => setTemplateForm({ ...templateForm, content: e.target.value })}
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Use variáveis: {{nome}}, {{empresa}}, {{vendedor}}, {{valor}}"
            />
            <p className="text-xs text-gray-500 mt-1">
              Variáveis disponíveis: {'{{nome}}'}, {'{{empresa}}'}, {'{{vendedor}}'}, {'{{valor}}'}
            </p>
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {editingTemplate ? 'Atualizar' : 'Criar'}
            </button>
            <button
              type="button"
              onClick={() => {
                setIsCreatingTemplate(false);
                setEditingTemplate(null);
                setTemplateForm({ name: '', content: '', category: '' });
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 gap-3">
        {templates.map((template) => (
          <div
            key={template.id}
            className={`border rounded-lg p-4 cursor-pointer transition ${
              selectedTemplate === template.id
                ? 'border-green-500 bg-green-50'
                : 'border-gray-200 hover:border-green-300'
            }`}
            onClick={() => handleSelectTemplate(template.id)}
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-semibold text-gray-900">{template.name}</h4>
                <span className="text-xs text-gray-500">{template.category}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 text-xs text-gray-500">
                  <TrendingUp size={12} />
                  {template.usageCount}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditTemplate(template.id);
                  }}
                  className="text-blue-600 hover:text-blue-700 p-1"
                >
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteTemplate(template.id);
                  }}
                  className="text-red-600 hover:text-red-700 p-1"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            <p className="text-sm text-gray-600 whitespace-pre-wrap line-clamp-3">
              {template.content}
            </p>
          </div>
        ))}
      </div>

      {messagePreview && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2">Prévia da Mensagem</h4>
          <div className="bg-white rounded-lg p-3 mb-3">
            <p className="text-gray-800 whitespace-pre-wrap">{messagePreview}</p>
          </div>
          <button
            onClick={handleCopyMessage}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition w-full justify-center"
          >
            <Copy size={18} />
            Copiar Mensagem
          </button>
          <p className="text-xs text-gray-600 mt-2 text-center">
            A mensagem será copiada e registrada no histórico de interações
          </p>
        </div>
      )}

      {templates.length === 0 && !isCreatingTemplate && (
        <div className="text-center py-8 text-gray-500">
          <p>Nenhum template criado ainda.</p>
          <p className="text-sm">Crie seu primeiro template para começar!</p>
        </div>
      )}
    </div>
  );
};

export default WhatsAppTemplateSelector;
