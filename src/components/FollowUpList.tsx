import React, { useState } from 'react';
import { useCRM } from '../context/CRMContext';
import { Plus, Check, Clock, AlertCircle, Calendar, Phone, Mail, MessageCircle, Users } from 'lucide-react';
import { format, isPast, isToday } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface FollowUpListProps {
  leadId: string;
}

const FollowUpList: React.FC<FollowUpListProps> = ({ leadId }) => {
  const { getLeadFollowUps, addFollowUp, completeFollowUp, deleteFollowUp, currentUser } = useCRM();
  const followUps = getLeadFollowUps(leadId);

  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
    type: 'call' as 'call' | 'email' | 'whatsapp' | 'meeting',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.dueDate) return;

    addFollowUp({
      leadId,
      title: formData.title,
      description: formData.description,
      dueDate: new Date(formData.dueDate),
      priority: formData.priority,
      type: formData.type,
      completed: false,
      userId: currentUser?.id || '1',
    });

    setFormData({
      title: '',
      description: '',
      dueDate: '',
      priority: 'medium',
      type: 'call',
    });
    setIsAdding(false);
  };

  const getStatusColor = (followUp: any) => {
    if (followUp.completed) return 'bg-green-50 border-green-200';
    if (isPast(new Date(followUp.dueDate)) && !isToday(new Date(followUp.dueDate))) {
      return 'bg-red-50 border-red-200';
    }
    if (isToday(new Date(followUp.dueDate))) return 'bg-yellow-50 border-yellow-200';
    return 'bg-white border-gray-200';
  };

  const getStatusIcon = (followUp: any) => {
    if (followUp.completed) return <Check className="text-green-600" size={18} />;
    if (isPast(new Date(followUp.dueDate)) && !isToday(new Date(followUp.dueDate))) {
      return <AlertCircle className="text-red-600" size={18} />;
    }
    if (isToday(new Date(followUp.dueDate))) return <Clock className="text-yellow-600" size={18} />;
    return <Clock className="text-blue-600" size={18} />;
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'call':
        return <Phone size={16} />;
      case 'email':
        return <Mail size={16} />;
      case 'whatsapp':
        return <MessageCircle size={16} />;
      case 'meeting':
        return <Users size={16} />;
      default:
        return <Calendar size={16} />;
    }
  };

  const getPriorityBadge = (priority: string) => {
    const styles = {
      high: 'bg-red-100 text-red-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-green-100 text-green-800',
    };
    const labels = {
      high: 'Alta',
      medium: 'Média',
      low: 'Baixa',
    };
    return (
      <span className={`text-xs px-2 py-1 rounded-full ${styles[priority as keyof typeof styles]}`}>
        {labels[priority as keyof typeof labels]}
      </span>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">Follow-ups</h3>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <Plus size={18} />
          Novo Follow-up
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="bg-gray-50 p-4 rounded-lg space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Título *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descrição
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Data *
              </label>
              <input
                type="date"
                required
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Prioridade
              </label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="low">Baixa</option>
                <option value="medium">Média</option>
                <option value="high">Alta</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tipo
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
              </select>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Criar
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

      <div className="space-y-2">
        {followUps.length === 0 ? (
          <p className="text-center text-gray-500 py-8">
            Nenhum follow-up agendado
          </p>
        ) : (
          followUps.map((followUp) => (
            <div
              key={followUp.id}
              className={`border rounded-lg p-4 transition ${getStatusColor(followUp)}`}
            >
              <div className="flex items-start gap-3">
                <div className="mt-1">{getStatusIcon(followUp)}</div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-gray-900">{followUp.title}</h4>
                      {getPriorityBadge(followUp.priority)}
                      <span className="flex items-center gap-1 text-sm text-gray-600">
                        {getTypeIcon(followUp.type)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">
                        {format(new Date(followUp.dueDate), 'dd/MM/yyyy', { locale: ptBR })}
                      </span>
                      {!followUp.completed && (
                        <button
                          onClick={() => completeFollowUp(followUp.id)}
                          className="text-green-600 hover:text-green-700 font-medium text-sm"
                        >
                          Concluir
                        </button>
                      )}
                    </div>
                  </div>
                  {followUp.description && (
                    <p className="text-gray-700 text-sm">{followUp.description}</p>
                  )}
                  {followUp.completed && followUp.completedAt && (
                    <p className="text-sm text-green-600 mt-2">
                      ✓ Concluído em {format(new Date(followUp.completedAt), 'dd/MM/yyyy', { locale: ptBR })}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FollowUpList;
