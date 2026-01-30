/**
 * Types do domínio meteorológico
 */

export interface WeatherStation {
  CD_ESTACAO: string;
  DC_NOME: string;
  SG_ESTADO: string;
  VL_LATITUDE: number;
  VL_LONGITUDE: number;
  VL_ALTITUDE?: number;
}

export interface AutomaticWeatherData {
  DC_NOME: string;
  UF: string;
  DT_MEDICAO: string;
  HR_MEDICAO: string;
  VL_LATITUDE: string;
  VL_LONGITUDE: string;
  CD_ESTACAO: string;
  // Pressão
  PRE_INS: string;
  PRE_MAX: string;
  PRE_MIN: string;
  // Ponto de Orvalho
  PTO_INS: string;
  PTO_MAX: string;
  PTO_MIN: string;
  // Temperatura
  TEM_INS: string;
  TEM_MAX: string;
  TEM_MIN: string;
  TEM_MED?: string;
  TEM_SEN?: string;
  // Umidade
  UMD_INS: string;
  UMD_MAX: string;
  UMD_MIN: string;
  // Outros
  CHUVA: string;
  RAD_GLO: string;
  VEN_VEL: string;
  VEN_DIR?: string;
  VEN_RAJ?: string;
  // Status da estação
  TEN_BAT?: string;
  TEM_CPU?: string;
}

export interface ManualWeatherData {
  DC_NOME: string;
  UF: string;
  DT_MEDICAO: string;
  VL_LATITUDE: string | number;
  VL_LONGITUDE: string | number;
  CHUVA: string | number;
  TEMP_HORA: string;
  TEMP_MAX: string | number;
  TEMP_MED: string | number;
  TEMP_MIN: string | number;
  UMID_HORA: string;
  UMID_MED: string | number;
  VENT_DIR: string;
  VENT_VEL: string | number;
  PRESS_EST: string | number;
  INSO_HORA: string;
  NEBU_HORA: string;
}

export type WeatherData = AutomaticWeatherData | ManualWeatherData;

export type StationType = 'automaticas' | 'manuais';
export type FrequencyType = 'horario' | 'diario' | 'semanal' | 'mensal';

export interface WeatherFilters {
  tipoEstacao: StationType;
  estado: string;
  estacao: string;
  dataInicio: string;
  dataFim: string;
  frequencia: FrequencyType;
}

export interface TableHeader {
  Nome: string;
  UF: string;
  'Data Medição': string;
  Latitude: string | number;
  Longitude: string | number;
  [key: string]: string | number | Record<string, string | number>;
}

export type HeaderConfig = Record<string, string[]>;