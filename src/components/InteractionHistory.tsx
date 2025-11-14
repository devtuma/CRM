import React, { useState } from 'react';
import { useCRM } from '../context/CRMContext';
import { Phone, Mail, MessageCircle, Users, FileText, Plus } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface InteractionHistoryProps {
  leadId: string;
}

const InteractionHistory: React.FC<InteractionHistoryProps> = ({ leadId }) => {
  const { getLeadInteractions, addInteraction, currentUser } = useCRM();
  const interactions = getLeadInteractions(leadId);

  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    type: 'call' as 'call' | 'email' | 'whatsapp' | 'meeting' | 'note',
    content: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.content.trim()) return;

    addInteraction({
      leadId,
      type: formData.type,
      content: formData.content,
      date: new Date(),
      userId: currentUser?.id || '1',
      userName: currentUser?.name || 'Usuário',
    });

    setFormData({ type: 'call', content: '' });
    setIsAdding(false);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'call':
        return <Phone size={18} className="text-blue-600" />;
      case 'email':
        return <Mail size={18} className="text-green-600" />;
      case 'whatsapp':
        return <MessageCircle size={18} className="text-green-500" />;
      case 'meeting':
        return <Users size={18} className="text-purple-600" />;
      case 'note':
        return <FileText size={18} className="text-gray-600" />;
      default:
        return <FileText size={18} className="text-gray-600" />;
    }
  };

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      call: 'Ligação',
      email: 'E-mail',
      whatsapp: 'WhatsApp',
      meeting: 'Reunião',
      note: 'Nota',
    };
    return labels[type] || type;
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">Histórico de Interações</h3>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <Plus size={18} />
          Nova Interação
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="bg-gray-50 p-4 rounded-lg space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tipo de Interação
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="call">Ligação</option>
              <option value="email">E-mail</option>
              <option value="whatsapp">WhatsApp</option>
              <option value="meeting">Reunião</option>
              <option value="note">Nota</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descrição
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows={4}
              placeholder="Descreva o que foi discutido..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Salvar
            </button>
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

      <div className="space-y-3">
        {interactions.length === 0 ? (
          <p className="text-center text-gray-500 py-8">
            Nenhuma interação registrada ainda
          </p>
        ) : (
          interactions.map((interaction) => (
            <div
              key={interaction.id}
              className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition"
            >
              <div className="flex items-start gap-3">
                <div className="mt-1">{getIcon(interaction.type)}</div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="font-semibold text-gray-900">
                        {getTypeLabel(interaction.type)}
                      </span>
                      <span className="text-sm text-gray-500 ml-2">
                        por {interaction.userName}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {format(new Date(interaction.date), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                    </span>
                  </div>
                  <p className="text-gray-700 whitespace-pre-wrap">{interaction.content}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default InteractionHistory;
