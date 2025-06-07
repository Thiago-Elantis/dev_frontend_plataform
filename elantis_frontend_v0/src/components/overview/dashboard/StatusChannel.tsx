"use client";

import { useMemo, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend, CartesianGrid,} from "recharts";
import { TooltipProps } from 'recharts';

import { ChartHeader, CategoryFilter } from "./subcomponents/DashboardChartHeader";
import { Resumo } from "./subcomponents/DashboardResumo";
import { TimeRange } from "./subcomponents/types";
import { TIME_RANGES, parseTimeRange } from "./constants/FilterConstants";
import { Data, StatusChannelData, ChannelData } from "./constants/StatusChannelConstants";

const agruparDadosPorCanal = (registros: StatusChannelData[], dias: number): ChannelData[] => {
  const limite = new Date();
  limite.setDate(limite.getDate() - dias);

  const mapa = new Map<string, { ganhos: number; perdidos: number }>();

  registros.forEach(({ timestamp, canal, ganho, perdido }) => {
    const data = new Date(timestamp);
    if (data >= limite) {
      const atual = mapa.get(canal) || { ganhos: 0, perdidos: 0 };
      if (ganho) atual.ganhos += ganho;
      if (perdido) atual.perdidos += perdido;
      mapa.set(canal, atual);
    }
  });

  return Array.from(mapa.entries()).map(([canal, { ganhos, perdidos }]) => ({
    canal,
    ganhos,
    perdidos,
  }));
};

const CustomTooltip = ({ active, payload, label }: TooltipProps<number,string>) => {
  if (!active || !payload?.length) return null;

  const ganhos = payload.find((item: any) => item.dataKey === "ganhos")?.value || 0;
  const perdidos = payload.find((item: any) => item.dataKey === "perdidos")?.value || 0;
  const total = ganhos + perdidos;
  const taxa = total > 0 ? ((ganhos / total) * 100).toFixed(1) : "0";

  return (
    <div className="bg-white p-3 shadow-md rounded-lg border border-gray-100 text-sm space-y-2">
      <p className="font-semibold text-gray-800">{label}</p>
      <div className="flex justify-between text-green-600">
        <span className="flex items-center">
          <div className="w-3 h-3 bg-green-500 rounded-full mr-2" />
          Ganhos:
        </span>
        <span className="font-medium">{ganhos} <span className="text-gray-400">({taxa}%)</span></span>
      </div>
      <div className="flex justify-between text-red-600">
        <span className="flex items-center">
          <div className="w-3 h-3 bg-red-500 rounded-full mr-2" />
          Perdidos:
        </span>
        <span className="font-medium">{perdidos}</span>
      </div>
      <div className="border-t pt-2 mt-2 text-gray-700 flex justify-between font-semibold">
        <span>Total:</span>
        <span>{total}</span>
      </div>
    </div>
  );
};

const renderLegend = ({ payload }: any) => {
  if (!payload) return null;

  return (
    <div className="flex justify-center gap-6 text-sm mb-2">
      {payload.map((entry: any, index: number) => (
        <div key={index} className="flex items-center text-gray-600">
          <div className="w-3 h-3 mr-2 rounded-sm" style={{ backgroundColor: entry.color }} />
          {entry.value}
        </div>
      ))}
    </div>
  );
};

export default function StatusChannel() {
  const [timeRange, setTimeRange] = useState<TimeRange>(TIME_RANGES[0]);
  const dias = parseTimeRange(timeRange) ?? 1000;

  const data = useMemo(() => {
  return agruparDadosPorCanal(Data, dias).sort((a, b) => {
    const taxaA = a.ganhos / ((a.ganhos + a.perdidos) || 1);
    const taxaB = b.ganhos / ((b.ganhos + b.perdidos )|| 1);
    return taxaB - taxaA;
  });
}, [dias]);


  return (
    <section className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 space-y-6">
      <div className="flex items-center justify-between">
        <ChartHeader title="Status por Canal" subtitle="Desempenho por período selecionado" />
        <CategoryFilter categories={TIME_RANGES} selected={timeRange} onSelect={setTimeRange} />
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 10, right: 20, left: 10, bottom: 5 }}
            barCategoryGap={12}
          >
            <CartesianGrid strokeDasharray="2 2" horizontal={false} stroke="#f3f4f6" />
            <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: "#6b7280", fontSize: 12 }} />
            <YAxis dataKey="canal" type="category" axisLine={false} tickLine={false} tick={{ fill: "#6b7280", fontSize: 12 }} width={90} />
            <Tooltip content={<CustomTooltip />} />
            <Legend content={renderLegend} verticalAlign="top" />
            <Bar dataKey="ganhos" name="Ganhos" fill="#10b981" radius={[0, 4, 4, 0]} barSize={20} />
            <Bar dataKey="perdidos" name="Perdidos" fill="#ef4444" radius={[0, 4, 4, 0]} barSize={20} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {data.map(({ canal, ganhos, perdidos }) => {
          const total = ganhos + perdidos;
          const taxa = total > 0 ? ((ganhos / total) * 100).toFixed(1) : "0";
          return <Resumo key={canal} label={canal} value={`${taxa}%`} />;
        })}
      </div>
    </section>
  );
}
