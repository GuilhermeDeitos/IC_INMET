/**
 * Utilitários para formatação de dados na tabela
 */

export function formatDate(dateString: string | undefined): string {
  if (!dateString) return '—';
  
  // Se já estiver no formato DD/MM/YYYY
  if (dateString.includes('/')) return dateString;
  
  // Converte de YYYY-MM-DD para DD/MM/YYYY
  const [year, month, day] = dateString.split('-');
  if (!year || !month || !day) return dateString;
  
  return `${day}/${month}/${year}`;
}

export function formatNumber(value: number | string | undefined, decimals = 1): string {
  if (value === undefined || value === null || value === '') return '—';
  
  const num = typeof value === 'string' ? parseFloat(value) : value;
  
  if (isNaN(num)) return '—';
  
  return num.toFixed(decimals);
}

export function formatTemperature(value: number | undefined): string {
  if (value === undefined) return '—';
  return `${value.toFixed(1)}°`;
}

export function formatHumidity(value: number | undefined): string {
  if (value === undefined) return '—';
  return `${value.toFixed(0)}%`;
}

export function formatWind(value: number | undefined): string {
  if (value === undefined) return '—';
  return `${value.toFixed(1)} m/s`;
}