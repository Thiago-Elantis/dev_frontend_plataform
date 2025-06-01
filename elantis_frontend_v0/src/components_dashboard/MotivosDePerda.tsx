"use client";

import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";

type MotivoData = {
  motivo: string;
  total: number;
};

const motivos: MotivoData[] = [
  { motivo: "Falta de Orçamento", total: 8 },
  { motivo: "Prazo", total: 9 },
  { motivo: "Sem Resposta", total: 11 },
  { motivo: "Sem Interesse", total: 17 },
  { motivo: "Concorrência", total: 22 },
  { motivo: "Decisão Postergada", total: 6 },
  { motivo: "Produto Inadequado", total: 5 },
  { motivo: "Problemas Internos do Cliente", total: 4 },
  { motivo: "Mudança de Escopo", total: 3 },
  { motivo: "Outros", total: 7 },
];

// Tooltip elegante
const CustomTooltip = ({ active, payload, label }: {
  active?: boolean;
  payload?: any;
  label?: string;
}) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200 text-sm">
      <p className="font-semibold text-gray-800">{label}</p>
      <p className="text-red-600 font-medium">
        {payload[0].value} ocorrência{payload[0].value !== 1 && 's'}
      </p>
    </div>
  );
};

// Barra com cantos arredondados
const RoundedBar = ({ fill, x, y, width, height }: any) => (
  <rect x={x} y={y} width={width} height={height} rx={6} ry={6} fill={fill} />
);

export default function MotivosDePerda() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null | undefined>(null);

  const sorted = [...motivos].sort((a, b) => b.total - a.total);
  const max = Math.max(...sorted.map(m => m.total), 1);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
      <div className="flex justify-between items-center mb-5">
        <h4 className="text-lg font-bold text-gray-800">Motivos de Perda</h4>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500" />
          <span className="text-xs text-gray-500">Ocorrências</span>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={sorted}
            margin={{ top: 15, right: 20, left: 0, bottom: 5 }}
            onMouseMove={({ isTooltipActive, activeTooltipIndex }) =>
              setHoveredIndex(isTooltipActive ? activeTooltipIndex : null)
            }
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
            <XAxis
              dataKey="motivo"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#6b7280", fontSize: 12 }}
              tickMargin={10}
            />
            <YAxis
              allowDecimals={false}
              domain={[0, max + 2]}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6b7280", fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(239, 68, 68, 0.05)" }} />
            <Bar dataKey="total" shape={<RoundedBar />} barSize={32}>
              {sorted.map((item, index) => {
                const intensity = 0.6 + (item.total / max) * 0.4;
                const fill = hoveredIndex === index
                  ? "#dc2626"
                  : `rgba(239, 68, 68, ${intensity.toFixed(2)})`;
                return <Cell key={index} fill={fill} />;
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="grid grid-cols-3 gap-4 text-center">
          {sorted.slice(0, 3).map((item, index) => (
            <div key={index}>
              <div className="text-xl font-bold text-red-600">{item.total}</div>
              <div className="text-xs text-gray-500 mt-1">{item.motivo}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
