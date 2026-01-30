import { WeatherFilters, TableHeader } from '../../../../domain/weather/types';

export function formatDate(dateString: string | undefined): string {
  if (!dateString) return '';
  if (dateString.includes('/')) return dateString;
  
  const [year, month, day] = dateString.split('-');
  return `${day}/${month}/${year}`;
}

export class ExcelExport {
  private filters: WeatherFilters;
  private data: TableHeader[];

  constructor(filters: WeatherFilters, data: TableHeader[]) {
    this.filters = filters;
    this.data = data;
  }

  async onDowndloadExcel() {
    // Importação dinâmica do XLSX (se estiver usando)
    const XLSX = await import('xlsx').catch(() => null);
    
    if (!XLSX) {
      console.error('XLSX library not available');
      return;
    }

    const flatData = this.flattenData();
    const worksheet = XLSX.utils.json_to_sheet(flatData);
    const workbook = XLSX.utils.book_new();
    
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Dados Meteorológicos');
    
    const fileName = this.generateFileName('xlsx');
    XLSX.writeFile(workbook, fileName);
  }

  private flattenData() {
    return this.data.map(row => {
      const flat: Record<string, unknown> = {};
      
      Object.entries(row).forEach(([key, value]) => {
        if (typeof value === 'object' && value !== null) {
          Object.entries(value).forEach(([subKey, subValue]) => {
            flat[`${key} - ${subKey}`] = subValue;
          });
        } else {
          flat[key] = value;
        }
      });
      
      return flat;
    });
  }

  private generateFileName(extension: string): string {
    const station = this.filters.estacao;
    const dateStart = this.filters.dataInicio.replace(/-/g, '');
    const dateEnd = this.filters.dataFim.replace(/-/g, '');
    
    return `INMET_${station}_${dateStart}_${dateEnd}.${extension}`;
  }
}

export class CSVExport {
  private filters: WeatherFilters;
  private data: TableHeader[];

  constructor(filters: WeatherFilters, data: TableHeader[]) {
    this.filters = filters;
    this.data = data;
  }

  onDowndloadCSV() {
    const flatData = this.flattenData();
    
    if (flatData.length === 0) return;
    
    const headers = Object.keys(flatData[0]);
    const csvContent = [
      headers.join(';'),
      ...flatData.map(row => 
        headers.map(h => {
          const val = row[h];
          // Escape values with semicolons or quotes
          if (typeof val === 'string' && (val.includes(';') || val.includes('"'))) {
            return `"${val.replace(/"/g, '""')}"`;
          }
          return val ?? '';
        }).join(';')
      )
    ].join('\n');

    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    link.href = url;
    link.download = this.generateFileName('csv');
    link.click();
    
    URL.revokeObjectURL(url);
  }

  private flattenData() {
    return this.data.map(row => {
      const flat: Record<string, unknown> = {};
      
      Object.entries(row).forEach(([key, value]) => {
        if (typeof value === 'object' && value !== null) {
          Object.entries(value).forEach(([subKey, subValue]) => {
            flat[`${key} - ${subKey}`] = subValue;
          });
        } else {
          flat[key] = value;
        }
      });
      
      return flat;
    });
  }

  private generateFileName(extension: string): string {
    const station = this.filters.estacao;
    const dateStart = this.filters.dataInicio.replace(/-/g, '');
    const dateEnd = this.filters.dataFim.replace(/-/g, '');
    
    return `INMET_${station}_${dateStart}_${dateEnd}.${extension}`;
  }
}