import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';

interface SearchBarProps {
  onSearch: (term: string) => void;
  onFilter: (filters: FilterOptions) => void;
}

export interface FilterOptions {
  priority?: 'all' | 'high' | 'medium' | 'low';
  assignedTo?: string;
  minValue?: number;
  maxValue?: number;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    priority: 'all',
    assignedTo: '',
    minValue: undefined,
    maxValue: undefined,
  });

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    onSearch(value);
  };

  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  const clearFilters = () => {
    const defaultFilters: FilterOptions = {
      priority: 'all',
      assignedTo: '',
      minValue: undefined,
      maxValue: undefined,
    };
    setFilters(defaultFilters);
    onFilter(defaultFilters);
  };

  const hasActiveFilters = filters.priority !== 'all' || filters.assignedTo || filters.minValue || filters.maxValue;

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Buscar leads por nome, empresa, email..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
            hasActiveFilters
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
          }`}
        >
          <Filter size={18} />
          Filtros
          {hasActiveFilters && (
            <span className="bg-white text-blue-600 text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
              !
            </span>
          )}
        </button>
      </div>

      {showFilters && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-3">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-semibold text-gray-900">Filtros Avançados</h4>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
              >
                <X size={16} />
                Limpar
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Prioridade
              </label>
              <select
                value={filters.priority}
                onChange={(e) => handleFilterChange('priority', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Todas</option>
                <option value="high">Alta</option>
                <option value="medium">Média</option>
                <option value="low">Baixa</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Valor Mínimo
              </label>
              <input
                type="number"
                placeholder="R$ 0"
                value={filters.minValue || ''}
                onChange={(e) => handleFilterChange('minValue', e.target.value ? Number(e.target.value) : undefined)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Valor Máximo
              </label>
              <input
                type="number"
                placeholder="R$ 100.000"
                value={filters.maxValue || ''}
                onChange={(e) => handleFilterChange('maxValue', e.target.value ? Number(e.target.value) : undefined)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Responsável
              </label>
              <input
                type="text"
                placeholder="Filtrar por vendedor"
                value={filters.assignedTo}
                onChange={(e) => handleFilterChange('assignedTo', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
