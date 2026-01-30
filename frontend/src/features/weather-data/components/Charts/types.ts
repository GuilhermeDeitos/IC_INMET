export type ChartType = 'area' | 'line' | 'bar' | 'composed';
export type AggregationType = 'hourly' | 'daily' | 'weekly' | 'monthly';

export interface ChartVariable {
  key: string;
  label: string;
  unit: string;
  color: string;
  category: 'temperature' | 'precipitation' | 'wind' | 'humidity' | 'pressure' | 'radiation';
}

export interface ChartConfig {
  type: ChartType;
  variables: string[];
  aggregation: AggregationType;
  showBrush: boolean;
  showReferenceLine: boolean;
  referenceLineValue?: number;
  comparisonMode: boolean;
  comparisonPeriods?: string[];
}

export interface ChartDataPoint {
  date: string;
  dateRaw: string;
  [key: string]: number | string | null;
}

// Variáveis disponíveis para seleção
export const AVAILABLE_VARIABLES: ChartVariable[] = [
  // Temperatura
  { key: 'tempMax', label: 'Temperatura Máxima', unit: '°C', color: '#FB923C', category: 'temperature' },
  { key: 'tempMin', label: 'Temperatura Mínima', unit: '°C', color: '#38BDF8', category: 'temperature' },
  { key: 'tempInst', label: 'Temperatura Instantânea', unit: '°C', color: '#F97316', category: 'temperature' },
  { key: 'dewPoint', label: 'Ponto de Orvalho', unit: '°C', color: '#06B6D4', category: 'temperature' },
  
  // Precipitação
  { key: 'rain', label: 'Precipitação', unit: 'mm', color: '#6366F1', category: 'precipitation' },
  
  // Umidade
  { key: 'humidityMax', label: 'Umidade Máxima', unit: '%', color: '#0EA5E9', category: 'humidity' },
  { key: 'humidityMin', label: 'Umidade Mínima', unit: '%', color: '#7DD3FC', category: 'humidity' },
  { key: 'humidityInst', label: 'Umidade Instantânea', unit: '%', color: '#0284C7', category: 'humidity' },
  
  // Vento
  { key: 'windSpeed', label: 'Velocidade do Vento', unit: 'm/s', color: '#64748B', category: 'wind' },
  { key: 'windGust', label: 'Rajada de Vento', unit: 'm/s', color: '#94A3B8', category: 'wind' },
  
  // Pressão
  { key: 'pressureMax', label: 'Pressão Máxima', unit: 'hPa', color: '#8B5CF6', category: 'pressure' },
  { key: 'pressureMin', label: 'Pressão Mínima', unit: 'hPa', color: '#A78BFA', category: 'pressure' },
  
  // Radiação
  { key: 'radiation', label: 'Radiação Global', unit: 'kJ/m²', color: '#FBBF24', category: 'radiation' },
];

export const DEFAULT_CHART_CONFIG: ChartConfig = {
  type: 'area',
  variables: ['tempMax', 'tempMin'],
  aggregation: 'daily',
  showBrush: false,
  showReferenceLine: false,
  comparisonMode: false,
};