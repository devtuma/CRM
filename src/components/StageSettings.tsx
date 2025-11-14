import React, { useState } from 'react';
import { useCRM } from '../context/CRMContext';
import { X, Plus, GripVertical, Edit2, Trash2 } from 'lucide-react';
import { Stage } from '../types';

interface StageSettingsProps {
  onClose: () => void;
}

const StageSettings: React.FC<StageSettingsProps> = ({ onClose }) => {
  const { stages, addStage, updateStage, deleteStage, reorderStages } = useCRM();
  const [editingStage, setEditingStage] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    color: '#3b82f6',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingStage) {
      updateStage(editingStage, formData);
      setEditingStage(null);
    } else {
      addStage({
        name: formData.name,
        color: formData.color,
        order: stages.length,
      });
      setIsAdding(false);
    }

    setFormData({ name: '', color: '#3b82f6' });
  };

  const handleEdit = (stage: Stage) => {
    setFormData({
      name: stage.name,
      color: stage.color,
    });
    setEditingStage(stage.id);
    setIsAdding(true);
  };

  const handleDelete = (stageId: string) => {
    if (stages.length <= 1) {
      alert('Você precisa ter pelo menos uma etapa no funil!');
      return;
    }

    if (window.confirm('Tem certeza que deseja excluir esta etapa? Os leads serão movidos para a primeira etapa.')) {
      deleteStage(stageId);
    }
  };

  const moveStage = (index: number, direction: 'up' | 'down') => {
    const newStages = [...stages];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;

    if (targetIndex < 0 || targetIndex >= newStages.length) return;

    [newStages[index], newStages[targetIndex]] = [newStages[targetIndex], newStages[index]];

    // Update order
    newStages.forEach((stage, idx) => {
      stage.order = idx;
    });

    reorderStages(newStages);
  };

  const colorOptions = [
    { name: 'Azul', value: '#3b82f6' },
    { name: 'Roxo', value: '#8b5cf6' },
    { name: 'Rosa', value: '#ec4899' },
    { name: 'Laranja', value: '#f59e0b' },
    { name: 'Verde', value: '#10b981' },
    { name: 'Verde Escuro', value: '#22c55e' },
    { name: 'Vermelho', value: '#ef4444' },
    { name: 'Índigo', value: '#6366f1' },
    { name: 'Ciano', value: '#06b6d4' },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">Configurar Etapas do Funil</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="mb-6">
            <button
              onClick={() => {
                setIsAdding(!isAdding);
                setEditingStage(null);
                setFormData({ name: '', color: '#3b82f6' });
              }}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              <Plus size={18} />
              Nova Etapa
            </button>
          </div>

          {isAdding && (
            <form onSubmit={handleSubmit} className="bg-gray-50 p-4 rounded-lg mb-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome da Etapa *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Ex: Qualificação"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cor da Etapa
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {colorOptions.map((color) => (
                    <button
                      key={color.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, color: color.value })}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg border-2 transition ${
                        formData.color === color.value
                          ? 'border-gray-900'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div
                        className="w-6 h-6 rounded"
                        style={{ backgroundColor: color.value }}
                      />
                      <span className="text-sm">{color.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {editingStage ? 'Atualizar' : 'Criar'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsAdding(false);
                    setEditingStage(null);
                    setFormData({ name: '', color: '#3b82f6' });
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancelar
                </button>
              </div>
            </form>
          )}

          <div className="space-y-2">
            {stages.map((stage, index) => (
              <div
                key={stage.id}
                className="bg-white border border-gray-200 rounded-lg p-4 flex items-center gap-3"
              >
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => moveStage(index, 'up')}
                    disabled={index === 0}
                    className={`${
                      index === 0 ? 'text-gray-300' : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    ▲
                  </button>
                  <button
                    onClick={() => moveStage(index, 'down')}
                    disabled={index === stages.length - 1}
                    className={`${
                      index === stages.length - 1 ? 'text-gray-300' : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    ▼
                  </button>
                </div>

                <GripVertical className="text-gray-400" size={20} />

                <div
                  className="w-8 h-8 rounded"
                  style={{ backgroundColor: stage.color }}
                />

                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{stage.name}</h4>
                  <p className="text-sm text-gray-500">Ordem: {stage.order + 1}</p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(stage)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded transition"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(stage.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded transition"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 border-t">
          <button
            onClick={onClose}
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
          >
            Concluir
          </button>
        </div>
      </div>
    </div>
  );
};

export default StageSettings;
