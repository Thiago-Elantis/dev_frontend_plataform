import { TimeRange } from "../subcomponents/types";
import { parseTimeRange } from "./FilterConstants";

type SalesTimelineData = {
  date: string;
  contacts: number;
  deals: number;
};

// Essa lógica tem que ser pelo backend e só puxar os dados pedidos

export const Data: SalesTimelineData[] = [
  { date: "2025-05-01", contacts: 13, deals: 15 },
  { date: "2025-05-02", contacts: 14, deals: 13 },
  { date: "2025-05-03", contacts: 11, deals: 16 },
  { date: "2025-05-04", contacts: 8, deals: 13 },
  { date: "2025-05-05", contacts: 13, deals: 15 },
  { date: "2025-05-06", contacts: 11, deals: 14 },
  { date: "2025-05-07", contacts: 9, deals: 14 },
  { date: "2025-05-08", contacts: 10, deals: 13 },
  { date: "2025-05-09", contacts: 12, deals: 14 },
  { date: "2025-05-10", contacts: 12, deals: 13 },
  { date: "2025-05-11", contacts: 12, deals: 14 },
  { date: "2025-05-12", contacts: 11, deals: 15 },
  { date: "2025-05-13", contacts: 9, deals: 14 },
  { date: "2025-05-14", contacts: 11, deals: 12 },
  { date: "2025-05-15", contacts: 10, deals: 13 },
  { date: "2025-05-16", contacts: 10, deals: 14 },
  { date: "2025-05-17", contacts: 13, deals: 15 },
  { date: "2025-05-18", contacts: 10, deals: 13 },
  { date: "2025-05-19", contacts: 13, deals: 15 },
  { date: "2025-05-20", contacts: 12, deals: 13 },
  { date: "2025-05-21", contacts: 10, deals: 15 },
  { date: "2025-05-22", contacts: 11, deals: 14 },
  { date: "2025-05-23", contacts: 13, deals: 13 },
  { date: "2025-05-24", contacts: 12, deals: 15 },
  { date: "2025-05-25", contacts: 10, deals: 13 },
  { date: "2025-05-26", contacts: 11, deals: 14 },
  { date: "2025-05-27", contacts: 10, deals: 15 },
  { date: "2025-05-28", contacts: 9, deals: 13 },
  { date: "2025-05-29", contacts: 11, deals: 14 },
  { date: "2025-05-30", contacts: 13, deals: 13 },
  { date: "2025-05-31", contacts: 10, deals: 14 }
];


export function getFilteredData(range: TimeRange) {
  const days = parseTimeRange(range) ?? 1000;
  if (days === null) return Data;

  const now = new Date();
  const startDate = new Date();
startDate.setDate(now.getDate() - days);


  return Data.filter(({ date }) => {
    const [year, month, day] = date.split("-").map(Number);
    const itemDate = new Date(year, month - 1, day); // JS: mês é zero-based
    return itemDate >= startDate;
  });
}