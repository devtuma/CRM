import React from 'react';
import { Lead } from '../types';
import { Building2, Mail, Phone, Calendar, DollarSign, User } from 'lucide-react';
import { formatCurrency } from '../utils/calculations';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface LeadCardProps {
  lead: Lead;
  isDragging: boolean;
}

const LeadCard: React.FC<LeadCardProps> = ({ lead, isDragging }) => {
  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div
      className={`bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-200 ${
        isDragging ? 'shadow-lg rotate-2' : ''
      }`}
    >
      <div className="flex justify-between items-start mb-3">
        <h4 className="font-semibold text-gray-900 text-lg">{lead.name}</h4>
        {lead.priority && (
          <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(lead.priority)}`}>
            {lead.priority === 'high' ? 'Alta' : lead.priority === 'medium' ? 'Média' : 'Baixa'}
          </span>
        )}
      </div>

      <div className="space-y-2">
        {lead.company && (
          <div className="flex items-center text-sm text-gray-600">
            <Building2 size={14} className="mr-2" />
            <span className="truncate">{lead.company}</span>
          </div>
        )}

        <div className="flex items-center text-sm text-gray-600">
          <Mail size={14} className="mr-2" />
          <span className="truncate">{lead.email}</span>
        </div>

        <div className="flex items-center text-sm text-gray-600">
          <Phone size={14} className="mr-2" />
          <span>{lead.phone}</span>
        </div>

        <div className="flex items-center text-sm font-semibold text-green-600 mt-3">
          <DollarSign size={14} className="mr-1" />
          <span>{formatCurrency(lead.value)}</span>
        </div>

        {lead.expectedCloseDate && (
          <div className="flex items-center text-xs text-gray-500">
            <Calendar size={12} className="mr-1" />
            <span>
              Prev: {format(new Date(lead.expectedCloseDate), 'dd/MM/yyyy', { locale: ptBR })}
            </span>
          </div>
        )}

        {lead.tags && lead.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {lead.tags.slice(0, 3).map((tag, idx) => (
              <span key={idx} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                {tag}
              </span>
            ))}
            {lead.tags.length > 3 && (
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                +{lead.tags.length - 3}
              </span>
            )}
          </div>
        )}
      </div>

      <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center">
          <User size={12} className="mr-1" />
          <span>{lead.assignedTo}</span>
        </div>
        <span>{format(new Date(lead.createdAt), 'dd/MM', { locale: ptBR })}</span>
      </div>
    </div>
  );
};

export default LeadCard;
