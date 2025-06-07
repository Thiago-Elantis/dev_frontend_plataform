"use client";

import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

import { Resumo } from "./subcomponents/DashboardResumo";
import { ChartHeader, CategoryFilter } from "./subcomponents/DashboardChartHeader";
import { TimeRange } from "./subcomponents/types";
import { TIME_RANGES } from "./constants/FilterConstants";
import { getFilteredData } from "./constants/SalesTimelineConstants";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border border-gray-200 shadow-lg rounded-lg">
        <p className="font-medium text-gray-900">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p
            key={index}
            className={`text-sm ${
              index === 0 ? "text-blue-500" : "text-green-500"
            }`}
          >
            <span className="font-medium">{entry.name}:</span> {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const renderColorfulLegendText = (value: string, entry: any) => {
  const { color } = entry;
  return (
    <span style={{ color, fontWeight: 500, padding: "10px" }}>{value}</span>
  );
};

export default function SalesTimeline() {
  const [timeRange, setTimeRange] = useState<TimeRange>(TIME_RANGES[0]);
  const filteredData = getFilteredData(timeRange);

  const totals = filteredData.reduce(
    (acc, curr) => ({
      contacts: acc.contacts + curr.contacts,
      deals: acc.deals + curr.deals,
    }),
    { contacts: 0, deals: 0 }
  );

  const conversionRate =
    totals.contacts > 0 ? ((totals.deals / totals.contacts) * 100).toFixed(1) : "0.0";

  return (
    <section className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 space-y-6">
      <div className="flex items-center justify-between">
        <ChartHeader title="Timeline de Sales" subtitle="Evolução de contatos e negócios" />
        <CategoryFilter categories={TIME_RANGES} selected={timeRange} onSelect={setTimeRange} />
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={filteredData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorContacts" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="colorDeals" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="date"
              tickFormatter={(value: string) => {
                const date = parseISO(value);
                return format(date, "MMM/yy", { locale: ptBR });
              }}
              tick={{ fontSize: 12 }}
            />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip content={<CustomTooltip />} />
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <Area
              type="monotone"
              dataKey="contacts"
              stroke="#3b82f6"
              fill="url(#colorContacts)"
              name="Contatos"
            />
            <Area
              type="monotone"
              dataKey="deals"
              stroke="#10b981"
              fill="url(#colorDeals)"
              name="Negócios"
            />
            <Legend formatter={renderColorfulLegendText} wrapperStyle={{ paddingTop: '10px' }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Resumo label="Total Contatos" value={totals.contacts} />
        <Resumo label="Total Negócios" value={totals.deals} />
        <Resumo label="Taxa de Conversão" value={`${conversionRate}%`} />
        <Resumo label="Média Contatos/Mês" value={(totals.contacts / filteredData.length).toFixed(0)} />
      </div>
    </section>
  );
}
