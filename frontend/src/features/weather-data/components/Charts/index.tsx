import { useState, useMemo } from 'react';
import styled from 'styled-components';
import { theme } from '../../../../shared/design-system';
import { fadeInUp } from '../../../../shared/design-system/animations';
import { TableHeader } from '../../../../domain/weather/types';
import { ChartControls } from './components/ChartControls';
import { CustomChart } from './components/CustomChart';
import { 
  ChartConfig, 
  ChartDataPoint, 
  DEFAULT_CHART_CONFIG,
  AggregationType,
  AVAILABLE_VARIABLES,
} from './types';

// === STYLED COMPONENTS ===

const ChartsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[4]};
`;

const ChartCard = styled.div`
  background: ${theme.colors.background};
  border-radius: ${theme.borderRadius.xl};
  box-shadow: ${theme.shadows.sm};
  padding: ${theme.spacing[5]};
  
  animation: ${fadeInUp} 300ms ease-out;
`;

const ChartHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${theme.spacing[4]};
`;

const ChartTitle = styled.h3`
  font-size: ${theme.typography.fontSize.md};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.text.primary};
  margin: 0;
`;

const ToggleControlsButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing[2]};
  padding: ${theme.spacing[2]} ${theme.spacing[3]};
  
  font-size: ${theme.typography.fontSize.xs};
  font-weight: ${theme.typography.fontWeight.medium};
  color: ${theme.colors.text.secondary};
  
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.lg};
  cursor: pointer;
  
  transition: all ${theme.transitions.duration.fast};
  
  &:hover {
    background: ${theme.colors.surfaceHover};
    color: ${theme.colors.primary};
  }
`;

const NoDataMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  color: ${theme.colors.text.muted};
  font-size: ${theme.typography.fontSize.sm};
`;

// === TYPES ===

interface ChartsProps {
  data: TableHeader[];
}

// === HELPERS ===

function extractNumericValue(obj: unknown, ...keys: string[]): number | null {
  if (typeof obj !== 'object' || obj === null) return null;
  for (const key of keys) {
    const value = (obj as Record<string, unknown>)[key];
    if (typeof value === 'number' && !isNaN(value)) return value;
  }
  return null;
}

function formatDateLabel(dateStr: string): string {
  if (!dateStr) return '';
  
  // Formato YYYY-MM-DD ou YYYY-MM-DDTHH:mm
  if (dateStr.includes('-')) {
    const parts = dateStr.split('T')[0].split('-');
    
    // Se tem apenas YYYY-MM (agregação mensal)
    if (parts.length === 2) {
      const [year, month] = parts;
      const monthNames = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 
                          'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
      const monthIndex = parseInt(month, 10) - 1;
      return `${monthNames[monthIndex]}/${year.slice(2)}`;
    }
    
    // Se tem YYYY-MM-DD completo
    if (parts.length === 3) {
      const [, month, day] = parts;
      return `${day}/${month}`;
    }
  }
  
  // Formato DD/MM ou DD/MM/YYYY
  if (dateStr.includes('/')) {
    const [day, month] = dateStr.split('/');
    return `${day}/${month}`;
  }
  
  return dateStr;
}

function transformDataForCharts(data: TableHeader[]): ChartDataPoint[] {
  return data.map(row => {
    const dateValue = row['Data Medição'];
    const dateRaw = typeof dateValue === 'string' ? dateValue.split(' ')[0] : '';
    
    const temp = row['Temperatura'];
    const rain = row['Chuva'];
    const humidity = row['Umidade'];
    const wind = row['Vento'];
    const pressure = row['Pressão'];
    const dewPoint = row['Ponto de Orvalho'];
    const radiation = row['Radiação'];
    
    return {
      date: formatDateLabel(dateRaw),
      dateRaw,
      tempMax: extractNumericValue(temp, 'Max.', 'Max'),
      tempMin: extractNumericValue(temp, 'Min.', 'Min'),
      tempInst: extractNumericValue(temp, 'Inst.', 'Med.', 'Med'),
      rain: extractNumericValue(rain, '(mm)', 'mm'),
      humidityMax: extractNumericValue(humidity, 'Max.', 'Max'),
      humidityMin: extractNumericValue(humidity, 'Min.', 'Min'),
      humidityInst: extractNumericValue(humidity, 'Inst.', 'Med.', 'Med'),
      windSpeed: extractNumericValue(wind, 'Vel. (m/s)', 'Vel.', 'Vel'),
      windGust: extractNumericValue(wind, 'Raj. (m/s)', 'Raj.', 'Raj'),
      pressureMax: extractNumericValue(pressure, 'Max.', 'Max'),
      pressureMin: extractNumericValue(pressure, 'Min.', 'Min'),
      dewPoint: extractNumericValue(dewPoint, 'Inst.', 'Med.'),
      radiation: extractNumericValue(radiation, 'Kj/m²', 'kJ/m²'),
    };
  });
}

function aggregateData(data: ChartDataPoint[], aggregation: AggregationType): ChartDataPoint[] {
  if (aggregation === 'hourly' || data.length === 0) return data;

  // Agrupar por período
  const groups: Record<string, ChartDataPoint[]> = {};
  
  data.forEach(point => {
    let key = point.dateRaw;
    
    if (aggregation === 'weekly') {
      // Agrupar por semana (simplificado)
      const date = new Date(point.dateRaw);
      const weekStart = new Date(date);
      weekStart.setDate(date.getDate() - date.getDay());
      key = weekStart.toISOString().split('T')[0];
    } else if (aggregation === 'monthly') {
      // Agrupar por mês
      key = point.dateRaw.substring(0, 7); // YYYY-MM
    }
    
    if (!groups[key]) groups[key] = [];
    groups[key].push(point);
  });

  // Calcular agregações
  return Object.entries(groups).map(([key, points]) => {
    const aggregated: ChartDataPoint = {
      date: formatDateLabel(key),
      dateRaw: key,
    };

    // Para cada variável, calcular média ou soma
    AVAILABLE_VARIABLES.forEach(variable => {
      const values = points
        .map(p => p[variable.key] as number | null)
        .filter((v): v is number => v !== null);
      
      if (values.length === 0) {
        aggregated[variable.key] = null;
        return;
      }

      // Chuva é soma, resto é média
      if (variable.category === 'precipitation') {
        aggregated[variable.key] = values.reduce((a, b) => a + b, 0);
      } else {
        aggregated[variable.key] = values.reduce((a, b) => a + b, 0) / values.length;
      }
    });

    return aggregated;
  });
}

// === COMPONENT ===

export function Charts({ data }: ChartsProps) {
  const [showControls, setShowControls] = useState(false);
  const [config, setConfig] = useState<ChartConfig>(DEFAULT_CHART_CONFIG);

  const chartData = useMemo(() => {
    const transformed = transformDataForCharts(data);
    return aggregateData(transformed, config.aggregation);
  }, [data, config.aggregation]);

  const handleReset = () => {
    setConfig(DEFAULT_CHART_CONFIG);
  };

  if (chartData.length === 0) {
    return (
      <ChartCard>
        <NoDataMessage>Nenhum dado disponível para visualização</NoDataMessage>
      </ChartCard>
    );
  }

  return (
    <ChartsContainer>
      <ChartCard>
        <ChartHeader>
          <ChartTitle>Análise de Dados Meteorológicos</ChartTitle>
          <ToggleControlsButton onClick={() => setShowControls(!showControls)}>
            ⚙️ {showControls ? 'Ocultar' : 'Personalizar'}
          </ToggleControlsButton>
        </ChartHeader>

        {showControls && (
          <ChartControls
            config={config}
            onChange={setConfig}
            onReset={handleReset}
          />
        )}

        {config.variables.length > 0 ? (
          <CustomChart data={chartData} config={config} />
        ) : (
          <NoDataMessage>Selecione pelo menos uma variável para visualizar</NoDataMessage>
        )}
      </ChartCard>
    </ChartsContainer>
  );
}