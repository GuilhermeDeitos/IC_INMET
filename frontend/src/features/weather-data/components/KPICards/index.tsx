import { useMemo } from 'react';
import styled, { css } from 'styled-components';
import { theme } from '../../../../shared/design-system';
import { fadeInUp } from '../../../../shared/design-system/animations';
import { 
  ThermometerIcon, 
  DropletIcon, 
  WindIcon, 
  GaugeIcon 
} from '../../../../shared/components/Icons';
import { TableHeader } from '../../../../domain/weather/types';

// === STYLED COMPONENTS ===

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: ${theme.spacing[4]};
  margin-bottom: ${theme.spacing[6]};
`;

type TempGradient = 'hot' | 'cold' | 'neutral';

const Card = styled.div<{ gradient?: TempGradient }>`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: ${theme.spacing[5]};
  
  background: ${theme.colors.background};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.xl};
  
  overflow: hidden;
  
  animation: ${fadeInUp} 300ms ease-out;
  animation-fill-mode: both;
  
  &:nth-child(1) { animation-delay: 0ms; }
  &:nth-child(2) { animation-delay: 50ms; }
  &:nth-child(3) { animation-delay: 100ms; }
  &:nth-child(4) { animation-delay: 150ms; }
  
  transition: transform ${theme.transitions.duration.fast}, 
              box-shadow ${theme.transitions.duration.fast};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.md};
  }
  
  /* Gradiente sutil baseado no tipo de temperatura */
  ${({ gradient }) => gradient === 'hot' && css`
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 100%;
      background: linear-gradient(135deg, rgba(251, 146, 60, 0.08) 0%, transparent 60%);
      pointer-events: none;
    }
  `}
  
  ${({ gradient }) => gradient === 'cold' && css`
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 100%;
      background: linear-gradient(135deg, rgba(56, 189, 248, 0.08) 0%, transparent 60%);
      pointer-events: none;
    }
  `}
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${theme.spacing[3]};
`;

const CardTitle = styled.span`
  font-size: ${theme.typography.fontSize.xs};
  font-weight: ${theme.typography.fontWeight.semibold};
  text-transform: uppercase;
  letter-spacing: ${theme.typography.letterSpacing.wider};
  color: ${theme.colors.text.muted};
`;

const IconWrapper = styled.div<{ bgColor: string; isInactive?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  
  background: ${({ bgColor }) => bgColor};
  border-radius: ${theme.borderRadius.lg};
  
  opacity: ${({ isInactive }) => isInactive ? 0.4 : 1};
  transition: opacity ${theme.transitions.duration.fast};
`;

const CardValue = styled.div`
  display: flex;
  align-items: baseline;
  gap: ${theme.spacing[2]};
  margin-bottom: ${theme.spacing[2]};
`;

const MainValue = styled.span`
  font-size: 2rem;
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.text.primary};
  font-variant-numeric: tabular-nums;
  line-height: 1;
`;

const ValueUnit = styled.span`
  font-size: ${theme.typography.fontSize.md};
  font-weight: ${theme.typography.fontWeight.medium};
  color: ${theme.colors.text.muted};
`;

const CardSubtext = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing[3]};
  font-size: ${theme.typography.fontSize.xs};
  color: ${theme.colors.text.secondary};
`;

const SubItem = styled.span<{ color?: string }>`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing[1]};
  
  &::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${({ color }) => color || theme.colors.text.muted};
  }
`;

const WindDirectionIcon = styled.div<{ rotation: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(148, 163, 184, 0.1);
  border-radius: ${theme.borderRadius.lg};
  transform: rotate(${({ rotation }) => rotation}deg);
  transition: transform 0.5s ease-out;
`;

// === TYPES ===

interface KPIData {
  // Temperatura
  tempAvg: number | null;
  tempMax: number | null;
  tempMin: number | null;
  tempGradient: TempGradient;
  // Chuva
  rainTotal: number | null;
  rainDays: number;
  // Vento
  windAvg: number | null;
  windMax: number | null;
  windDirection: number;
  // Umidade
  humidityAvg: number | null;
  humidityMin: number | null;
}

interface KPICardsProps {
  data: TableHeader[];
}

// === HELPERS ===

function extractNumericValue(obj: unknown, ...keys: string[]): number | null {
  if (typeof obj !== 'object' || obj === null) return null;
  
  for (const key of keys) {
    const value = (obj as Record<string, unknown>)[key];
    if (typeof value === 'number' && !isNaN(value)) {
      return value;
    }
  }
  return null;
}

function calculateKPIs(data: TableHeader[]): KPIData {
  if (data.length === 0) {
    return {
      tempAvg: null, tempMax: null, tempMin: null, tempGradient: 'neutral',
      rainTotal: null, rainDays: 0,
      windAvg: null, windMax: null, windDirection: 0,
      humidityAvg: null, humidityMin: null,
    };
  }

  let tempSum = 0, tempCount = 0;
  let tempMax = -Infinity;
  let tempMin = Infinity;
  let rainTotal = 0;
  let rainDays = 0;
  let windSum = 0, windCount = 0;
  let windMax = -Infinity;
  let windDirSum = 0, windDirCount = 0;
  let humiditySum = 0, humidityCount = 0;
  let humidityMin = Infinity;

  data.forEach(row => {
    // Temperatura
    const temp = row['Temperatura'];
    const tInst = extractNumericValue(temp, 'Inst.', 'Med.', 'Med');
    const tMax = extractNumericValue(temp, 'Max.', 'Max');
    const tMin = extractNumericValue(temp, 'Min.', 'Min');
    
    if (tInst !== null) { tempSum += tInst; tempCount++; }
    if (tMax !== null && tMax > tempMax) tempMax = tMax;
    if (tMin !== null && tMin < tempMin) tempMin = tMin;

    // Chuva
    const rain = row['Chuva'];
    const rainValue = extractNumericValue(rain, '(mm)', 'mm');
    if (rainValue !== null) {
      rainTotal += rainValue;
      if (rainValue > 0) rainDays++;
    }

    // Vento
    const wind = row['Vento'];
    const windValue = extractNumericValue(wind, 'Vel. (m/s)', 'Vel.', 'Vel');
    const windRaj = extractNumericValue(wind, 'Raj. (m/s)', 'Raj.', 'Raj');
    const windDir = extractNumericValue(wind, 'Dir.', 'Dir');
    
    if (windValue !== null) { windSum += windValue; windCount++; }
    if (windRaj !== null && windRaj > windMax) windMax = windRaj;
    if (windValue !== null && windValue > windMax) windMax = windValue;
    if (windDir !== null) { windDirSum += windDir; windDirCount++; }

    // Umidade
    const humidity = row['Umidade'];
    const humValue = extractNumericValue(humidity, 'Inst.', 'Med.', 'Med');
    const humMin = extractNumericValue(humidity, 'Min.', 'Min');
    
    if (humValue !== null) { humiditySum += humValue; humidityCount++; }
    if (humMin !== null && humMin < humidityMin) humidityMin = humMin;
  });

  const tempAvg = tempCount > 0 ? tempSum / tempCount : null;
  
  // Determinar gradiente baseado na temperatura média
  let tempGradient: TempGradient = 'neutral';
  if (tempAvg !== null) {
    if (tempAvg > 25) tempGradient = 'hot';
    else if (tempAvg < 15) tempGradient = 'cold';
  }

  return {
    tempAvg,
    tempMax: tempMax === -Infinity ? null : tempMax,
    tempMin: tempMin === Infinity ? null : tempMin,
    tempGradient,
    rainTotal,
    rainDays,
    windAvg: windCount > 0 ? windSum / windCount : null,
    windMax: windMax === -Infinity ? null : windMax,
    windDirection: windDirCount > 0 ? windDirSum / windDirCount : 0,
    humidityAvg: humidityCount > 0 ? humiditySum / humidityCount : null,
    humidityMin: humidityMin === Infinity ? null : humidityMin,
  };
}

function formatValue(value: number | null, decimals = 1): string {
  if (value === null) return '—';
  return value.toFixed(decimals);
}

// === COMPONENT ===

export function KPICards({ data }: KPICardsProps) {
  const kpis = useMemo(() => calculateKPIs(data), [data]);

  const isRainInactive = kpis.rainTotal === 0 || kpis.rainTotal === null;

  return (
    <CardsContainer>
      {/* Card 1: Temperatura */}
      <Card gradient={kpis.tempGradient}>
        <CardHeader>
          <CardTitle>Temperatura no Período</CardTitle>
          <IconWrapper bgColor={
            kpis.tempGradient === 'hot' ? 'rgba(251, 146, 60, 0.15)' :
            kpis.tempGradient === 'cold' ? 'rgba(56, 189, 248, 0.15)' :
            'rgba(148, 163, 184, 0.1)'
          }>
            <ThermometerIcon 
              size={20} 
              color={
                kpis.tempGradient === 'hot' ? '#FB923C' :
                kpis.tempGradient === 'cold' ? '#38BDF8' :
                '#94A3B8'
              } 
            />
          </IconWrapper>
        </CardHeader>
        <CardValue>
          <MainValue>{formatValue(kpis.tempAvg)}</MainValue>
          <ValueUnit>°C</ValueUnit>
        </CardValue>
        <CardSubtext>
          <SubItem color="#FB923C">Máx: {formatValue(kpis.tempMax)}°</SubItem>
          <SubItem color="#38BDF8">Mín: {formatValue(kpis.tempMin)}°</SubItem>
        </CardSubtext>
      </Card>

      {/* Card 2: Pluviosidade */}
      <Card>
        <CardHeader>
          <CardTitle>Precipitação Acumulada</CardTitle>
          <IconWrapper 
            bgColor="rgba(99, 102, 241, 0.1)" 
            isInactive={isRainInactive}
          >
            <DropletIcon size={20} color="#6366F1" />
          </IconWrapper>
        </CardHeader>
        <CardValue>
          <MainValue>{formatValue(kpis.rainTotal, 1)}</MainValue>
          <ValueUnit>mm</ValueUnit>
        </CardValue>
        <CardSubtext>
          {isRainInactive ? (
            <SubItem color="#94A3B8">Tempo seco no período</SubItem>
          ) : (
            <SubItem color="#6366F1">{kpis.rainDays} dia(s) com chuva</SubItem>
          )}
        </CardSubtext>
      </Card>

      {/* Card 3: Ventos */}
      <Card>
        <CardHeader>
          <CardTitle>Intensidade dos Ventos</CardTitle>
          <WindDirectionIcon rotation={kpis.windDirection}>
            <WindIcon size={20} color="#64748B" />
          </WindDirectionIcon>
        </CardHeader>
        <CardValue>
          <MainValue>{formatValue(kpis.windAvg)}</MainValue>
          <ValueUnit>m/s</ValueUnit>
        </CardValue>
        <CardSubtext>
          <SubItem color="#94A3B8">
            Rajada máx: {formatValue(kpis.windMax)} m/s
          </SubItem>
        </CardSubtext>
      </Card>

      {/* Card 4: Umidade */}
      <Card>
        <CardHeader>
          <CardTitle>Umidade do Ar</CardTitle>
          <IconWrapper bgColor="rgba(14, 165, 233, 0.1)">
            <GaugeIcon size={20} color="#0EA5E9" />
          </IconWrapper>
        </CardHeader>
        <CardValue>
          <MainValue>{formatValue(kpis.humidityAvg, 0)}</MainValue>
          <ValueUnit>%</ValueUnit>
        </CardValue>
        <CardSubtext>
          <SubItem color="#0EA5E9">
            Mín registrada: {formatValue(kpis.humidityMin, 0)}%
          </SubItem>
        </CardSubtext>
      </Card>
    </CardsContainer>
  );
}