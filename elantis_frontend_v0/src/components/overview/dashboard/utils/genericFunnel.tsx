"use client";

import { useState, useMemo } from "react";
import { FunnelChart, Funnel, LabelList, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { ChartHeader, CategoryFilter } from "../subcomponents/DashboardChartHeader";
import { Resumo } from "../subcomponents/DashboardResumo";

interface FunnelDataItem {
  etapa: string;
  value: number;
  taxa?: string;
}

interface GenericFunnelProps {
  title: string;
  subtitle: string;
  categories: string[];
  initialCategory: string;
  getData: (category: string) => {
    funnelData: FunnelDataItem[];
    summaryData: Record<string, number | string>;
  };
  baseColor?: string;
  opacityRange?: number;
}

export default function GenericFunnel({
  title,
  subtitle,
  categories,
  initialCategory,
  getData,
  baseColor = "#0369a1",
  opacityRange = 0.7
}: GenericFunnelProps) {
  const [categoria, setCategoria] = useState<string>(initialCategory);
  
  const { funnelData, summaryData } = useMemo(
    () => getData(categoria),
    [categoria, getData]
  );

if (funnelData.length === 0) {
  return <div>Nenhum dado disponível para esta categoria</div>;
}

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 space-y-6">
      <div className="flex items-center justify-between">
        <ChartHeader title={title} subtitle={subtitle} />
        <CategoryFilter 
          categories={categories} 
          selected={categoria} 
          onSelect={setCategoria} 
        />
      </div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <FunnelChart margin={{ top: 10, right: 40 }}>
            <Tooltip
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null;
                const d = payload[0].payload;
                return (
                  <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-md text-sm">
                    <p className="font-semibold text-gray-800">{d.etapa}</p>
                    <p className="text-gray-600">
                      Categoria: <span className="font-medium">{categoria}</span>
                    </p>
                    <p className="text-gray-600">
                      Quantidade: <span className="font-medium">{d.value}</span>
                    </p>
                    {d.taxa && (
                      <p className="text-gray-600">
                        Taxa: <span className="font-medium">{d.taxa}</span>
                      </p>
                    )}
                  </div>
                );
              }}
            />
            <Funnel
              dataKey="value"
              data={funnelData}
              isAnimationActive
              lastShapeType="rectangle"
            >
              {funnelData.map((_, i) => {
                const opacity = 1 - (i / (funnelData.length - 1)) * opacityRange;
                const colorValue = Math.round(opacity * 255)
                  .toString(16)
                  .padStart(2, "0");
                const fill = `${baseColor}${colorValue}`;
                
                return <Cell key={i} fill={fill} />;
              })}
              <LabelList
                dataKey="etapa"
                position="center"
                fill="#010a17"
                fontSize={14}
                fontWeight={600}
              />
              <LabelList
                dataKey="taxa"
                position="right"
                fill="#4b5563"
                fontSize={12}
                offset={30}
              />
            </Funnel>
          </FunnelChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {Object.entries(summaryData).map(([label, value]) => (
          <Resumo key={label} label={label} value={value} />
        ))}
      </div>
    </div>
  );
}