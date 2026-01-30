import { useState, useCallback } from 'react';
import { api } from '../../../utils/api';
import { 
  WeatherFilters, 
  AutomaticWeatherData, 
  ManualWeatherData,
  TableHeader,
  HeaderConfig 
} from '../../../domain/weather/types';

interface UseWeatherDataReturn {
  data: TableHeader[];
  columns: string[];
  headerConfig: HeaderConfig;
  isLoading: boolean;
  error: string | null;
  hasData: boolean;
  fetchData: (filters: WeatherFilters) => Promise<void>;
  clearData: () => void;
}

// Helper para converter string para número
function toNumber(value: string | number | undefined | null): number {
  if (value === undefined || value === null || value === '') return 0;
  const num = typeof value === 'string' ? parseFloat(value) : value;
  return isNaN(num) ? 0 : num;
}

// Transform functions
function createAutomaticHeader(row: AutomaticWeatherData): TableHeader {
  return {
    Nome: row.DC_NOME,
    UF: row.UF,
    'Hora Medição': { UTC: row.HR_MEDICAO },
    'Data Medição': row.DT_MEDICAO,
    Latitude: toNumber(row.VL_LATITUDE),
    Longitude: toNumber(row.VL_LONGITUDE),
    Pressão: {
      'Inst.': toNumber(row.PRE_INS),
      'Max.': toNumber(row.PRE_MAX),
      'Min.': toNumber(row.PRE_MIN),
    },
    'Ponto de Orvalho': {
      'Inst.': toNumber(row.PTO_INS),
      'Max.': toNumber(row.PTO_MAX),
      'Min.': toNumber(row.PTO_MIN),
    },
    Temperatura: {
      'Max.': toNumber(row.TEM_MAX),
      'Min.': toNumber(row.TEM_MIN),
      'Inst.': toNumber(row.TEM_INS),
    },
    Umidade: {
      'Max.': toNumber(row.UMD_MAX),
      'Min.': toNumber(row.UMD_MIN),
      'Inst.': toNumber(row.UMD_INS),
    },
    Chuva: { '(mm)': toNumber(row.CHUVA) },
    Radiação: { 'Kj/m²': toNumber(row.RAD_GLO) },
    Vento: { 
      'Vel. (m/s)': toNumber(row.VEN_VEL),
      'Dir.': toNumber(row.VEN_DIR),
      'Raj. (m/s)': toNumber(row.VEN_RAJ),
    },
  };
}

function createManualHeader(row: ManualWeatherData): TableHeader {
  return {
    Nome: row.DC_NOME,
    UF: row.UF,
    'Data Medição': row.DT_MEDICAO,
    Latitude: toNumber(row.VL_LATITUDE),
    Longitude: toNumber(row.VL_LONGITUDE),
    Chuva: { '(mm)': toNumber(row.CHUVA) },
    Temperatura: {
      Hora: row.TEMP_HORA,
      'Max.': toNumber(row.TEMP_MAX),
      'Med.': toNumber(row.TEMP_MED),
      'Min.': toNumber(row.TEMP_MIN),
    },
    Umidade: {
      Hora: row.UMID_HORA,
      'Med.': toNumber(row.UMID_MED),
    },
    Vento: {
      'Dir.': row.VENT_DIR,
      'Vel.': toNumber(row.VENT_VEL),
    },
    Pressão: { hPa: toNumber(row.PRESS_EST) },
    Insolação: { h: row.INSO_HORA },
    Nebulosidade: { Décimos: row.NEBU_HORA },
  };
}

function createHeaderConfig(rows: TableHeader[]): HeaderConfig {
  if (rows.length === 0) return {};

  const firstRow = rows[0];
  const config: HeaderConfig = {};

  Object.keys(firstRow).forEach((key) => {
    const value = firstRow[key];
    if (typeof value === 'object' && value !== null) {
      config[key] = Object.keys(value);
    } else {
      config[key] = [''];
    }
  });

  return config;
}

export function useWeatherData(): UseWeatherDataReturn {
  const [data, setData] = useState<TableHeader[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [headerConfig, setHeaderConfig] = useState<HeaderConfig>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (filters: WeatherFilters) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.post('/interval/', {
        dataInicio: filters.dataInicio,
        dataFinal: filters.dataFim,
        codigoEstacao: filters.estacao,
        frequencia: filters.frequencia,
      });

      const rawData = response.data.data;

      // Transform data based on station type
      const transformedData: TableHeader[] = rawData.map((row: AutomaticWeatherData | ManualWeatherData) =>
        filters.tipoEstacao === 'automaticas'
          ? createAutomaticHeader(row as AutomaticWeatherData)
          : createManualHeader(row as ManualWeatherData)
      );

      // Create header config
      const config = createHeaderConfig(transformedData);

      // Get columns, filtering out "Hora Medição" if not hourly
      let cols = Object.keys(config);
      if (filters.frequencia !== 'horario' && cols.includes('Hora Medição')) {
        cols = cols.filter((col) => col !== 'Hora Medição');
      }

      setData(transformedData);
      setColumns(cols);
      setHeaderConfig(config);
    } catch (err) {
      setError('Erro ao buscar os dados. Tente novamente.');
      console.error('Error fetching weather data:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearData = useCallback(() => {
    setData([]);
    setColumns([]);
    setHeaderConfig({});
    setError(null);
  }, []);

  return {
    data,
    columns,
    headerConfig,
    isLoading,
    error,
    hasData: data.length > 0,
    fetchData,
    clearData,
  };
}