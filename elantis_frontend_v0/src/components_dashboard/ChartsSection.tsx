//ChartsSection.tsx
"use client";

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
import React from "react";

const data = [
  { name: "Jan", contatos: 400, negocios: 240, faturamento: 2400 },
  { name: "Fev", contatos: 300, negocios: 139, faturamento: 2210 },
  { name: "Mar", contatos: 200, negocios: 980, faturamento: 2290 },
  { name: "Abr", contatos: 278, negocios: 390, faturamento: 2000 },
  { name: "Mai", contatos: 189, negocios: 480, faturamento: 2181 },
  { name: "Jun", contatos: 239, negocios: 380, faturamento: 2500 },
];

const contactMethods = [
  { label: "Inbound", color: "bg-blue-500" },
  { label: "Outbound", color: "bg-green-500" },
  { label: "Fidelização", color: "bg-purple-500" },
  { label: "Tráfego Pago", color: "bg-orange-500" },
  { label: "Campanhas", color: "bg-pink-500" },
];

export default function ChartsSection() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Gráfico de Performance */}
      <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow-md">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">
          Novos Contatos / Negócios / Ganhos
        </h4>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorContatos" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorNegocios" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorFaturamento" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <CartesianGrid strokeDasharray="3 3" />
              <Area
                type="monotone"
                dataKey="contatos"
                stroke="#3b82f6"
                fillOpacity={1}
                fill="url(#colorContatos)"
              />
              <Area
                type="monotone"
                dataKey="negocios"
                stroke="#10b981"
                fillOpacity={1}
                fill="url(#colorNegocios)"
              />
              <Area
                type="monotone"
                dataKey="faturamento"
                stroke="#f59e0b"
                fillOpacity={1}
                fill="url(#colorFaturamento)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Método de Contato */}
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">
          Método de Contato
        </h4>
        <ul className="space-y-3">
          {contactMethods.map((method, idx) => (
            <li key={idx} className="flex items-center">
              <span className={`w-3 h-3 rounded-full mr-3 ${method.color}`}></span>
              <span className="text-sm text-gray-700">{method.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
