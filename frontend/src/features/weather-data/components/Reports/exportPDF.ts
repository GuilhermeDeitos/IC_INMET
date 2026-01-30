import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { TableHeader, WeatherFilters } from '../../../../domain/weather/types';

// Adicione a tipagem para autoTable
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

interface QuickMetric {
  label: string;
  value: string;
}

export function exportToPDF(data: TableHeader[], filters: WeatherFilters, metrics: QuickMetric[]) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  
  // Título
  doc.setFontSize(18);
  doc.setTextColor(99, 102, 241); // Primary color
  doc.text('Relatório Meteorológico INMET', pageWidth / 2, 20, { align: 'center' });
  
  // Subtítulo
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text(`Estação: ${filters.estacao}`, 14, 32);
  doc.text(`Período: ${filters.dataInicio} a ${filters.dataFim}`, 14, 38);
  doc.text(`Gerado em: ${new Date().toLocaleDateString('pt-BR')}`, 14, 44);
  
  // Métricas resumidas
  doc.setFontSize(12);
  doc.setTextColor(0);
  doc.text('Resumo do Período', 14, 56);
  
  const metricsData = metrics.map(m => [m.label, m.value]);
  
  doc.autoTable({
    startY: 60,
    head: [['Indicador', 'Valor']],
    body: metricsData,
    theme: 'striped',
    headStyles: { fillColor: [99, 102, 241] },
    margin: { left: 14, right: 14 },
  });
  
  // Dados (primeiros 50 registros para não sobrecarregar)
  const tableData = data.slice(0, 50).map(row => {
    const temp = row['Temperatura'] as Record<string, unknown> | undefined;
    const rain = row['Chuva'] as Record<string, unknown> | undefined;
    const hum = row['Umidade'] as Record<string, unknown> | undefined;
    
    return [
      String(row['Data Medição'] || ''),
      temp?.['Inst.'] !== undefined ? `${temp['Inst.']}°C` : '—',
      temp?.['Max.'] !== undefined ? `${temp['Max.']}°C` : '—',
      temp?.['Min.'] !== undefined ? `${temp['Min.']}°C` : '—',
      rain?.['(mm)'] !== undefined ? `${rain['(mm)']} mm` : '—',
      hum?.['Inst.'] !== undefined ? `${hum['Inst.']}%` : '—',
    ];
  });
  
  doc.autoTable({
    startY: (doc as any).lastAutoTable.finalY + 10,
    head: [['Data', 'Temp.', 'Máx.', 'Mín.', 'Chuva', 'Umid.']],
    body: tableData,
    theme: 'grid',
    headStyles: { fillColor: [99, 102, 241] },
    styles: { fontSize: 8 },
    margin: { left: 14, right: 14 },
  });
  
  // Rodapé
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text(
      `Página ${i} de ${pageCount} | Sistema INMET - Unioeste`,
      pageWidth / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: 'center' }
    );
  }
  
  // Download
  doc.save(`INMET_${filters.estacao}_${filters.dataInicio}_${filters.dataFim}.pdf`);
}

