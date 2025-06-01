"use client";

import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Sector,
} from "recharts";

const datasets = {
  7: [
    { name: "Patrocínio Bronze", value: 10 },
    { name: "Patrocínio Prata", value: 8 },
    { name: "Espaço Expositivo", value: 18 },
    { name: "Workshop", value: 4 },
  ],
  30: [
    { name: "Patrocínio Bronze", value: 25 },
    { name: "Patrocínio Prata", value: 22 },
    { name: "Patrocínio Ouro", value: 55 },
    { name: "Espaço Expositivo", value: 70 },
    { name: "Workshop", value: 8 },
  ],
  90: [
    { name: "Patrocínio Bronze", value: 32 },
    { name: "Patrocínio Prata", value: 25 },
    { name: "Patrocínio Ouro", value: 126 },
    { name: "Espaço Expositivo", value: 200 },
    { name: "Workshop", value: 9 },
  ],
};

const generateColor = (index: number, total: number) => {
  const hue = (Math.cos(Math.pow(index, 1.19)) * 136.508) % 360;
  const lightness = 0.7;
  const chroma = 0.38 + 0.2 * Math.sin(index);
  return `oklch(${lightness} ${chroma.toFixed(3)} ${hue.toFixed(2)})`;
};

const renderActiveShape = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius - 3}
        outerRadius={outerRadius + 6}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius - 8}
        outerRadius={outerRadius + 3}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        opacity={0.3}
      />
    </g>
  );
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload?.length) {
    const item = payload[0];
    const total = item.payload?.totalValue || 0;
    const percent = ((item.value / total) * 100).toFixed(1);

    return (
      <div className="bg-white p-3 shadow-md rounded-lg border border-gray-100 text-sm">
        <p className="font-semibold text-gray-800">{item.name}</p>
        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-lg font-bold" style={{ color: item.color }}>
            {item.value}
          </span>
          <span className="text-gray-500">({percent}%)</span>
        </div>
      </div>
    );
  }
  return null;
};

export default function NegociosPorProduto() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [periodo, setPeriodo] = useState<7 | 30 | 90>(30);

  const data = datasets[periodo];
  const sortedData = [...data].sort((a, b) => b.value - a.value);
  const totalValue = sortedData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-md font-bold text-gray-800">
            Quantidade de Ganhos por Produto
          </h4>
          <p className="text-xs text-gray-500 mt-1">
            Total de contratos no período selecionado
          </p>
        </div>
        <div className="flex gap-2 text-xs">
          {[7, 30, 90].map((dias) => (
            <button
              key={dias}
              onClick={() => setPeriodo(dias as 7 | 30 | 90)}
              className={`px-3 py-1 rounded-full border transition ${
                periodo === dias
                  ? "bg-gray-800 text-white border-gray-800"
                  : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
              }`}
            >
              Últimos {dias} dias
            </button>
          ))}
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              activeIndex={activeIndex ?? undefined}
              activeShape={renderActiveShape}
              data={sortedData.map((item) => ({ ...item, totalValue }))}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={3}
              dataKey="value"
              onMouseEnter={(_, index) => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              {sortedData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={generateColor(index, sortedData.length)}
                  stroke="#fff"
                  strokeWidth={2}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-3 text-center">
        {sortedData.map((item, i) => {
          const percentage = ((item.value / totalValue) * 100).toFixed(1);
          return (
            <div
              key={i}
              className="bg-gray-50 px-3 py-2 rounded-lg border border-gray-100"
            >
              <div className="text-xs text-gray-500 truncate">{item.name}</div>
              <div className="text-lg font-bold text-gray-800">{item.value}</div>
              <div className="text-xs text-gray-500">{percentage}% do total</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
