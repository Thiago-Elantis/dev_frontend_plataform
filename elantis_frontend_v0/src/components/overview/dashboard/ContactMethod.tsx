"use client";

import {
  PieChart,
  Pie,
  Cell,
  Sector,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import React, { useState } from "react";

// Types
type ContactMethod = {
  label: string;
  color: string;
  value: number;
};

// Example data
const contactMethods: ContactMethod[] = [
  { label: "Inbound", color: "#3b82f6", value: 1200 },
  { label: "Outbound", color: "#10b981", value: 800 },
  { label: "Fidelização", color: "#8b5cf6", value: 600 },
  { label: "Trafégo Pago", color: "#f59e0b", value: 400 },
  { label: "Campanhas", color: "#ec4899", value: 300 },
];

// Tooltip
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const payloadItem = payload[0];
    const percentage = (
      (payloadItem.value / payloadItem.payload.totalValue) *
      100
    ).toFixed(1);
    return (
      <div className="bg-white p-4 border border-gray-200 shadow-lg rounded-lg">
        <p className="font-medium text-gray-900">{payloadItem.name}</p>
        <p className="text-sm" style={{ color: payloadItem.color }}>
          <span className="font-medium">Contatos:</span> {payloadItem.value}
        </p>
        <p className="text-sm text-gray-500">{percentage}% do total</p>
      </div>
    );
  }
  return null;
};

const generateColor = (index: number) => {
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

export default function ContactMethod() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const totalValue = contactMethods.reduce((acc, curr) => acc + curr.value, 0);
  const sortedContactMethods = [...contactMethods].sort(
    (a, b) => b.value - a.value
  );

  return (
    <section className="mb-8">
      {/* Contact Method */}
      <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-lg font-semibold text-gray-800">
            Métodos de Contato
          </h4>
          <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
            Total: {totalValue}
          </span>
        </div>

        <div className="h-48 mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                activeIndex={activeIndex ?? undefined}
                activeShape={renderActiveShape}
                data={sortedContactMethods.map((item) => ({
                  ...item,
                  totalValue,
                  name: item.label,
                }))}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
                onMouseEnter={(_, index) => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                {sortedContactMethods.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={generateColor(index)}
                    stroke="#fff"
                    strokeWidth={2}
                    opacity={
                      activeIndex === null || activeIndex === index ? 1 : 0.5
                    }
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 gap-3 text-center">
          {sortedContactMethods.map((item, i) => {
            const percentage = ((item.value / totalValue) * 100).toFixed(1);
            return (
              <div
                key={i}
                className={`bg-gray-50 px-3 py-2 rounded-lg border border-gray-100 transition-transform duration-200 cursor-pointer ${
                  activeIndex === i ? "scale-[1.03]" : ""
                }`}
                onMouseEnter={() => setActiveIndex(i)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                <div className="text-xs text-gray-500 truncate">
                  {item.label}
                </div>
                <div className="text-lg font-bold text-gray-800">
                  {item.value}
                </div>
                <div className="text-xs text-gray-500">{percentage}%</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}