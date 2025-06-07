import { analyzeFunnelData, FunnelDataItem } from "@/components/overview/dashboard/utils/analyzeFunnelData";
export const rawSalesData: Record<string, FunnelDataItem[]> = {
  Geral: [
    { etapa: "Leads", value: 1200 },
    { etapa: "Propostas", value: 800 },
    { etapa: "Negociação", value: 450 },
    { etapa: "Fechamento", value: 220 },
  ],
  Estandes: [
    { etapa: "Leads", value: 1500 },
    { etapa: "Propostas", value: 950 },
    { etapa: "Negociação", value: 620 },
    { etapa: "Fechamento", value: 310 },
  ],
  Palestras: [
    { etapa: "Leads", value: 1200 },
    { etapa: "Propostas", value: 800 },
    { etapa: "Negociação", value: 450 },
    { etapa: "Fechamento", value: 220 },
  ],
  Patrocínios: [
    { etapa: "Leads", value: 1500 },
    { etapa: "Propostas", value: 950 },
    { etapa: "Negociação", value: 620 },
    { etapa: "Fechamento", value: 310 },
  ],
};

export const getSalesData = (category: string) => {
  const data = rawSalesData[category as keyof typeof rawSalesData] || rawSalesData["Geral"];
  return analyzeFunnelData(data, category);
};