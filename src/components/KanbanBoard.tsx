import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { useCRM } from '../context/CRMContext';
import { Lead } from '../types';
import { Plus, Settings } from 'lucide-react';
import LeadCard from './LeadCard';
import LeadModal from './LeadModal';
import StageSettings from './StageSettings';
import { formatCurrency } from '../utils/calculations';

const KanbanBoard: React.FC = () => {
  const { leads, stages, moveLead } = useCRM();
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isAddingLead, setIsAddingLead] = useState(false);
  const [newLeadStageId, setNewLeadStageId] = useState<string | null>(null);
  const [showStageSettings, setShowStageSettings] = useState(false);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { draggableId, destination } = result;
    const leadId = draggableId;
    const newStageId = destination.droppableId;

    moveLead(leadId, newStageId);
  };

  const getLeadsByStage = (stageId: string): Lead[] => {
    return leads.filter(lead => lead.stageId === stageId);
  };

  const getStageTotal = (stageId: string): number => {
    return getLeadsByStage(stageId).reduce((sum, lead) => sum + lead.value, 0);
  };

  const handleAddLead = (stageId: string) => {
    setNewLeadStageId(stageId);
    setIsAddingLead(true);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-4 px-4 pt-4">
        <h2 className="text-2xl font-bold text-gray-800">Funil de Vendas</h2>
        <button
          onClick={() => setShowStageSettings(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
        >
          <Settings size={18} />
          Configurar Etapas
        </button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex-1 overflow-x-auto">
          <div className="flex gap-4 p-4 h-full min-w-max">
            {stages.map((stage) => {
              const stageLeads = getLeadsByStage(stage.id);
              const stageTotal = getStageTotal(stage.id);

              return (
                <Droppable key={stage.id} droppableId={stage.id}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`flex flex-col w-80 bg-gray-50 rounded-lg transition-colors ${
                        snapshot.isDraggingOver ? 'bg-blue-50' : ''
                      }`}
                    >
                      <div
                        className="p-4 rounded-t-lg"
                        style={{ backgroundColor: stage.color }}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-semibold text-white text-lg">
                            {stage.name}
                          </h3>
                          <button
                            onClick={() => handleAddLead(stage.id)}
                            className="p-1 hover:bg-white/20 rounded transition"
                          >
                            <Plus size={20} className="text-white" />
                          </button>
                        </div>
                        <div className="flex justify-between text-white text-sm">
                          <span>{stageLeads.length} leads</span>
                          <span className="font-semibold">{formatCurrency(stageTotal)}</span>
                        </div>
                      </div>

                      <div className="flex-1 overflow-y-auto p-2 space-y-2">
                        {stageLeads.map((lead, index) => (
                          <Draggable key={lead.id} draggableId={lead.id} index={index}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                onClick={() => setSelectedLead(lead)}
                              >
                                <LeadCard lead={lead} isDragging={snapshot.isDragging} />
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    </div>
                  )}
                </Droppable>
              );
            })}
          </div>
        </div>
      </DragDropContext>

      {(selectedLead || isAddingLead) && (
        <LeadModal
          lead={selectedLead}
          isOpen={true}
          onClose={() => {
            setSelectedLead(null);
            setIsAddingLead(false);
            setNewLeadStageId(null);
          }}
          defaultStageId={newLeadStageId || undefined}
        />
      )}

      {showStageSettings && (
        <StageSettings onClose={() => setShowStageSettings(false)} />
      )}
    </div>
  );
};

export default KanbanBoard;
