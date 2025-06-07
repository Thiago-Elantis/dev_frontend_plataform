import { TimeRange } from "../subcomponents/types";
//Filtros de Funil 

//|-> Geral + 3 Principais Pipelines Em quantidade de Deals

export const CATEGORIES_SALES_ITEMS = ['Geral(<?>)', 'Estandes', 'Palestras', 'Patrocinios'] as const;

//|-> Etapas do Funil, para funcionar Geral os pipelines precisam ter a mesma estrutura, ou modificam todos juntos ou não mostra geral. Cada ITEM (Pipe) tem etapas diferentes, que devem ser puxadas;

export const ETAPAS = ['Leads', 'Contatos Qualificados', 'Reuniões', 'Propostas', 'Fechamentos'] as const;

//Filtro de gráficos
export const TIME_RANGES = ["Visão Geral", "7 Dias" , "1 Mês", "6 Meses"] as const;

export const DEFAULT_TIME_RANGE_DAYS = 1000;

export function parseTimeRange(range: TimeRange): number | null {
  if (range === TIME_RANGES[0]) return DEFAULT_TIME_RANGE_DAYS;

  const match = range.match(/^(\d+)\s*(Dia[s]?|M[eê]s(es)?|Ano[s]?)$/i);
  if (!match) return null;

  const [, numStr, unidade] = match;
  const num = parseInt(numStr, 10);

  switch (unidade.toLowerCase()) {
    case "dia":
    case "dias":
      return num;
    case "mês":
    case "meses":
    case "mêses": // ortografia alternativa
      return num * 30;
    case "ano":
    case "anos":
      return num * 365;
    default:
      return null;
  }
}

