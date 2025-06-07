export interface FunnelDataItem {
  etapa: string;
  value: number;
  taxa?: string;
}

export interface FunnelAnalysisResult {
  funnelData: FunnelDataItem[];
  summaryData: Record<string, string | number>;
  melhorEtapa: string;
  melhorTaxa: number;
}

/**
 * Calcula métricas completas para um funil de conversão
 * 
 * @param rawData - Dados brutos do funil (etapas e valores)
 * @param categoria - Nome da categoria para personalização dos resultados
 * @returns Objeto com dados processados e métricas calculadas
 */

export function analyzeFunnelData(
  rawData: FunnelDataItem[],
  categoria: string
): FunnelAnalysisResult {
  // Caso especial: dados vazios
  if (rawData.length === 0) {
    return {
      funnelData: [],
      summaryData: {
        [`Total ${categoria}`]: 0,
        "Conversão Total": "0%",
        "Perda Total": 0,
        "Melhor Etapa": "N/A",
      },
      melhorEtapa: "N/A",
      melhorTaxa: 0,
    };
  }

  // 1. Calcula taxas de conversão
  const funnelData = rawData.map((item, index) => {
    if (index === 0) {
      return { ...item, taxa: "100%" };
    }
    
    const primeiroValor = rawData[0].value;
    const taxaPercentual = primeiroValor > 0 
      ? (item.value / primeiroValor) * 100
      : 0;
      
    return {
      ...item,
      taxa: `${taxaPercentual.toFixed(1)}%`,
    };
  });

  // 2. Encontra a melhor etapa (maior conversão entre etapas consecutivas)
  let melhorEtapa = "";
  let melhorTaxa = 0;

  for (let i = 1; i < rawData.length; i++) {
    const valorAtual = rawData[i].value;
    const valorAnterior = rawData[i - 1].value;
    
    // Evita divisão por zero
    const taxaConversao = valorAnterior > 0 
      ? valorAtual / valorAnterior
      : 0;
    
    if (taxaConversao > melhorTaxa) {
      melhorTaxa = taxaConversao;
      melhorEtapa = rawData[i].etapa;
    }
  }

  // Caso especial: apenas 1 etapa
  if (rawData.length === 1) {
    melhorEtapa = rawData[0].etapa;
    melhorTaxa = 1;
  }

  // 3. Calcula métricas de resumo
  const primeiroValor = rawData[0].value;
  const ultimoValor = rawData[rawData.length - 1].value;
  
  const perdaTotal = primeiroValor - ultimoValor;

  const summaryData = {
    [`Total ${categoria}`]: primeiroValor,
    "Perda Total": perdaTotal,
    "Melhor Etapa": melhorEtapa,
    "Melhor Conversão": `${(melhorTaxa * 100).toFixed(1)}%`,
  };

  return { 
    funnelData, 
    summaryData, 
    melhorEtapa, 
    melhorTaxa 
  };
}