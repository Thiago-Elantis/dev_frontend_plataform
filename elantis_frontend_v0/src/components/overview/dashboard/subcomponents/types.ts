import { ReactNode } from "react";
import { CATEGORIAS, ETAPAS, TIME_RANGES} from "../constants/FilterConstants";

export type ResumoProps = {
  label: string;
  value: string | number;
  percentage?: number;
  color?: string;
};

export type ChartHeaderProps = {
  title: string;
  subtitle?: string;
};

export type CategoryFilterProps<T extends string = string> = {
  categories: readonly T[];
  selected: T;
  onSelect: (cat: T) => void;
};


export interface CardMetric {
  title: string;
  value: number | string;
  change?: string;
  isPositive?: boolean;
  icon: React.ReactNode;
  color: string;
  formatNumber?: (num: number) => string;
  currency?: string;
}


export interface CardProps {
  title: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  icon: React.ReactNode;
  color: string;
  formatNumber?: (num: number) => string;
  currency?: string;

}



export type Categoria = typeof CATEGORIAS[number];

export type Etapa = typeof ETAPAS[number];

export type TimeRange = typeof TIME_RANGES[number];