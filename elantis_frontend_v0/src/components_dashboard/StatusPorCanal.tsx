"use client";

import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

const dataPorPeriodo = {
  7: [
    { canal: "Inbound", ganhos: 6, perdidos: 4 },
    { canal: "Outbound", ganhos: 3, perdidos: 6 },
    { canal: "Campanha", ganhos: 2, perdidos: 8 },
    { canal: "Tráfego Pago", ganhos: 4, perdidos: 5 },
    { canal: "Fidelização", ganhos: 9, perdidos: 2 },
  ],
  30: [
    { canal: "Inbound", ganhos: 14, perdidos: 8 },
    { canal: "Outbound", ganhos: 10, perdidos: 5 },
    { canal: "Campanha", ganhos: 8, perdidos: 10 },
    { canal: "Tráfego Pago", ganhos: 7, perdidos: 12 },
    { canal: "Fidelização", ganhos: 18, perdidos: 3 },
  ],
  90: [
    { canal: "Inbound", ganhos: 24, perdidos: 12 },
    { canal: "Outbound", ganhos: 19, perdidos: 9 },
    { canal: "Campanha", ganhos: 14, perdidos: 17 },
    { canal: "Tráfego Pago", ganhos: 12, perdidos: 22 },
    { canal: "Fidelização", ganhos: 28, perdidos: 5 },
  ],
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    const ganhos = payload.find((item: any) => item.dataKey === "ganhos")?.value || 0;
    const perdidos = payload.find((item: any) => item.dataKey === "perdidos")?.value || 0;
    const total = ganhos + perdidos;
    const taxaConversao = total > 0 ? ((ganhos / total) * 100).toFixed(1) : "0";

    return (
      <div className="bg-white p-3 shadow-md rounded-lg border border-gray-100 text-sm space-y-2">
        <p className="font-semibold text-gray-800">{label}</p>
        <div className="flex justify-between items-center">
          <span className="flex items-center text-green-600">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2" />
            Ganhos:
          </span>
          <span className="font-medium">
            {ganhos} <span className="text-gray-400">({taxaConversao}%)</span>
          </span>
        </div>
        <div className="flex justify-between items-center text-red-600">
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
  }
  return null;
};

const renderLegend = ({ payload }: any) => (
  <div className="flex justify-center gap-6 text-sm mb-2">
    {payload.map((entry: any, index: number) => (
      <div key={index} className="flex items-center text-gray-600">
        <div
          className="w-3 h-3 mr-2 rounded-sm"
          style={{ backgroundColor: entry.color }}
        />
        {entry.value}
      </div>
    ))}
  </div>
);

export default function StatusPorCanal() {
  const [periodo, setPeriodo] = useState<7 | 30 | 90>(30);

  const data = [...dataPorPeriodo[periodo]].sort((a, b) => {
    const taxaA = a.ganhos / (a.ganhos + a.perdidos || 1);
    const taxaB = b.ganhos / (b.ganhos + b.perdidos || 1);
    return taxaB - taxaA;
  });

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-md font-bold text-gray-800">Status por Canal de Contato</h4>
          <p className="text-xs text-gray-500 mt-1">Desempenho por período selecionado</p>
        </div>
        <div className="flex gap-2 text-xs">
          {[7, 30, 90].map((dias) => (
            <button
              key={dias}
              onClick={() => setPeriodo(dias as 7 | 30 | 90)}
              className={`px-3 py-1 rounded-full border ${
                periodo === dias
                  ? "bg-gray-800 text-white border-gray-800"
                  : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
              } transition`}
            >
              Últimos {dias} dias
            </button>
          ))}
        </div>
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

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-center">
        {data.map((item, i) => {
          const total = item.ganhos + item.perdidos;
          const taxa = total > 0 ? ((item.ganhos / total) * 100).toFixed(0) : "0";
          return (
            <div
              key={i}
              className="bg-gray-50 px-3 py-2 rounded-lg border border-gray-100"
            >
              <div className="text-xs text-gray-500 truncate">{item.canal}</div>
              <div className="text-lg font-bold text-gray-800">{taxa}%</div>
              <div className="text-xs text-gray-500">conversão</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
