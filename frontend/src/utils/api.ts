import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:8000/api/',
});

export interface APIDataInterface {
  DC_NOME: string;
  HR_MEDICAO: string;
  PRE_INS: string;
  VL_LATITUDE: string;
  PRE_MAX: string;
  UF: string;
  RAD_GLO: string;
  PTO_INS: string;
  TEM_MIN: string;
  VL_LONGITUDE: string;
  UMD_MIN: string;
  PTO_MAX: string;
  DT_MEDICAO: string;
  CHUVA: string;
  PRE_MIN: string;
  UMD_MAX: string;
  VEN_VEL: string;
  PTO_MIN: string;
  TEM_MAX: string;
  TEM_INS: string;
  UMD_INS: string;
  CD_ESTACAO: string;
  TEM_MED: string;
}