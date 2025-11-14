import React, { useState } from 'react';
import { useCRM } from '../context/CRMContext';
import {
  TrendingUp,
  DollarSign,
  Users,
  Target,
  Clock,
  BarChart3,
  Download,
} from 'lucide-react';
import {
  calculateConversionMetrics,
  calculateRevenueProjection,
  calculateSalesReport,
  formatCurrency,
  formatPercentage,
} from '../utils/calculations';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { startOfMonth, endOfMonth, subMonths } from 'date-fns';

const Dashboard: React.FC = () => {
  const { leads, users, stages, exportData } = useCRM();
  const [selectedPeriod, setSelectedPeriod] = useState<'month' | 'quarter' | 'year'>('month');

  const metrics = calculateConversionMetrics(leads);
  const projections = calculateRevenueProjection(leads, 6);

  // Calculate data for current month
  const currentDate = new Date();
  const startDate = startOfMonth(selectedPeriod === 'month' ? currentDate : subMonths(currentDate, 3));
  const endDate = endOfMonth(currentDate);

  const salesReports = users.map(user =>
    calculateSalesReport(leads, user.id, user.name, startDate, endDate)
  );

  // Stage distribution data
  const stageData = stages.map(stage => ({
    name: stage.name,
    value: leads.filter(l => l.stageId === stage.id).length,
    revenue: leads.filter(l => l.stageId === stage.id).reduce((sum, l) => sum + l.value, 0),
  }));

  const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#22c55e'];

  const handleExport = () => {
    exportData();
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Visão geral de vendas e performance</p>
        </div>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <Download size={18} />
          Exportar Dados
        </button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <Users className="text-blue-600" size={24} />
          </div>
          <h3 className="text-gray-600 text-sm font-medium">Total de Leads</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">{metrics.totalLeads}</p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <Target className="text-green-600" size={24} />
          </div>
          <h3 className="text-gray-600 text-sm font-medium">Taxa de Conversão</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            {formatPercentage(metrics.conversionRate)}
          </p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="text-green-600" size={24} />
          </div>
          <h3 className="text-gray-600 text-sm font-medium">Receita Total</h3>
          <p className="text-2xl font-bold text-gray-900 mt-2">
            {formatCurrency(metrics.totalRevenue)}
          </p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="text-purple-600" size={24} />
          </div>
          <h3 className="text-gray-600 text-sm font-medium">Ticket Médio</h3>
          <p className="text-2xl font-bold text-gray-900 mt-2">
            {formatCurrency(metrics.averageDealValue)}
          </p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <Clock className="text-orange-600" size={24} />
          </div>
          <h3 className="text-gray-600 text-sm font-medium">Tempo Médio</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            {Math.round(metrics.averageTimeToClose)} dias
          </p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Projection */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <BarChart3 size={20} />
            Previsão de Faturamento
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={projections}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip
                formatter={(value: number) => formatCurrency(value)}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="projected"
                stroke="#3b82f6"
                name="Projetado"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="confirmed"
                stroke="#22c55e"
                name="Confirmado"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="potential"
                stroke="#f59e0b"
                name="Potencial"
                strokeWidth={2}
                strokeDasharray="5 5"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Stage Distribution */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Distribuição por Etapa</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={stageData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {stageData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Sales Performance by User */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Performance por Vendedor
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Vendedor
                </th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">
                  Leads Criados
                </th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">
                  Leads Convertidos
                </th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">
                  Taxa de Conversão
                </th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">
                  Receita Total
                </th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">
                  Ticket Médio
                </th>
              </tr>
            </thead>
            <tbody>
              {salesReports.map((report) => (
                <tr key={report.userId} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="font-medium text-gray-900">{report.userName}</div>
                  </td>
                  <td className="text-right py-3 px-4 text-gray-900">
                    {report.leadsCreated}
                  </td>
                  <td className="text-right py-3 px-4 text-gray-900">
                    {report.leadsConverted}
                  </td>
                  <td className="text-right py-3 px-4">
                    <span className={`font-semibold ${
                      report.conversionRate >= 30 ? 'text-green-600' :
                      report.conversionRate >= 15 ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {formatPercentage(report.conversionRate)}
                    </span>
                  </td>
                  <td className="text-right py-3 px-4 font-semibold text-green-600">
                    {formatCurrency(report.totalRevenue)}
                  </td>
                  <td className="text-right py-3 px-4 text-gray-900">
                    {formatCurrency(report.averageDealValue)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {salesReports.length === 0 && (
          <p className="text-center text-gray-500 py-8">
            Nenhum dado de vendas disponível para o período selecionado
          </p>
        )}
      </div>

      {/* Stage Performance */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Performance por Etapa
        </h3>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={stageData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis yAxisId="left" orientation="left" stroke="#3b82f6" />
            <YAxis yAxisId="right" orientation="right" stroke="#22c55e" />
            <Tooltip
              formatter={(value: number, name: string) => {
                if (name === 'Receita') return formatCurrency(value);
                return value;
              }}
            />
            <Legend />
            <Bar yAxisId="left" dataKey="value" fill="#3b82f6" name="Quantidade de Leads" />
            <Bar yAxisId="right" dataKey="revenue" fill="#22c55e" name="Receita" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
