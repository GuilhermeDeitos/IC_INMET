import { useMemo } from "react";
import styled from "styled-components";
import { theme } from "../../../../shared/design-system";
import { fadeInUp } from "../../../../shared/design-system/animations";
import { TableHeader } from "../../../../domain/weather/types";

// === STYLED COMPONENTS ===

const Container = styled.div`
  background: ${theme.colors.background};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.xl};
  overflow: hidden;

  animation: ${fadeInUp} 300ms ease-out;
`;

const Header = styled.div`
  padding: ${theme.spacing[4]} ${theme.spacing[5]};
  background: ${theme.colors.surface};
  border-bottom: 1px solid ${theme.colors.border};
`;

const Title = styled.h3`
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.text.primary};
  margin: 0;
`;

const Subtitle = styled.p`
  font-size: ${theme.typography.fontSize.xs};
  color: ${theme.colors.text.muted};
  margin: ${theme.spacing[1]} 0 0;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`;

const StatCard = styled.div`
  padding: ${theme.spacing[4]} ${theme.spacing[5]};
  border-right: 1px solid ${theme.colors.border};
  border-bottom: 1px solid ${theme.colors.border};

  &:last-child {
    border-right: none;
  }
`;

const StatLabel = styled.div`
  font-size: ${theme.typography.fontSize.xs};
  font-weight: ${theme.typography.fontWeight.medium};
  color: ${theme.colors.text.muted};
  text-transform: uppercase;
  letter-spacing: ${theme.typography.letterSpacing.wide};
  margin-bottom: ${theme.spacing[2]};
`;

const StatValue = styled.div`
  font-size: ${theme.typography.fontSize.xl};
  font-weight: ${theme.typography.fontWeight.bold};
  font-family: ${theme.typography.fontFamily.mono};
  color: ${theme.colors.text.primary};
`;

const StatUnit = styled.span`
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.normal};
  color: ${theme.colors.text.muted};
  margin-left: ${theme.spacing[1]};
`;

const StatDescription = styled.div`
  font-size: ${theme.typography.fontSize.xs};
  color: ${theme.colors.text.secondary};
  margin-top: ${theme.spacing[1]};
`;

const AgriculturalSection = styled.div`
  padding: ${theme.spacing[4]} ${theme.spacing[5]};
  background: linear-gradient(
    135deg,
    rgba(34, 197, 94, 0.05) 0%,
    transparent 100%
  );
  border-top: 1px solid ${theme.colors.border};
`;

const AgroTitle = styled.h4`
  font-size: ${theme.typography.fontSize.xs};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: #22c55e;
  text-transform: uppercase;
  letter-spacing: ${theme.typography.letterSpacing.wider};
  margin: 0 0 ${theme.spacing[3]};
  display: flex;
  align-items: center;
  gap: ${theme.spacing[2]};

  &::before {
    content: "🌱";
  }
`;

const AgroGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: ${theme.spacing[4]};
`;

const AgroCard = styled.div`
  background: ${theme.colors.background};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing[3]};
  border: 1px solid rgba(34, 197, 94, 0.2);
`;

const CropBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing[1]};
  margin-left: ${theme.spacing[2]};
  padding: 2px ${theme.spacing[2]};
  
  font-size: 0.625rem;
  font-weight: ${theme.typography.fontWeight.semibold};
  text-transform: none;
  letter-spacing: normal;
  
  color: #F59E0B;
  background: rgba(245, 158, 11, 0.1);
  border-radius: ${theme.borderRadius.full};
`;

const GDDProgressContainer = styled.div`
  margin-top: ${theme.spacing[2]};
`;

const GDDProgressBar = styled.div`
  height: 4px;
  background: rgba(34, 197, 94, 0.2);
  border-radius: ${theme.borderRadius.full};
  overflow: hidden;
`;

const GDDProgressFill = styled.div<{ $percent: number }>`
  height: 100%;
  width: ${({ $percent }) => Math.min($percent, 100)}%;
  background: linear-gradient(90deg, #22C55E 0%, #16A34A 100%);
  border-radius: ${theme.borderRadius.full};
  transition: width 500ms ease-out;
`;

const GDDProgressLabel = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${theme.spacing[1]};
  font-size: 0.625rem;
  color: ${theme.colors.text.muted};
`;

// Componente de progresso
function GDDProgress({ value, target }: { value: number | null; target: number }) {
  if (value === null) return null;
  
  const percent = (value / target) * 100;
  
  return (
    <GDDProgressContainer>
      <GDDProgressBar>
        <GDDProgressFill $percent={percent} />
      </GDDProgressBar>
      <GDDProgressLabel>
        <span>{percent.toFixed(0)}% do ciclo</span>
        <span>Meta: {target.toLocaleString()} GDD</span>
      </GDDProgressLabel>
    </GDDProgressContainer>
  );
}

// === TYPES ===

interface StatsData {
  // Estatísticas gerais
  recordCount: number;
  dateRange: string;

  // Temperatura
  tempAvg: number | null;
  tempMax: number | null;
  tempMin: number | null;
  tempStdDev: number | null;

  // Chuva
  rainTotal: number | null;
  rainMax: number | null;
  rainDays: number;

  // Agrícola
  gdd: number | null; // Graus-Dia de Crescimento
  chillHours: number; // Horas de Frio
  evapotranspiration: number | null;
}

interface StatsSummaryProps {
  data: TableHeader[];
  dateStart: string;
  dateEnd: string;
}

// === HELPERS ===

function extractNumericValue(obj: unknown, ...keys: string[]): number | null {
  if (typeof obj !== "object" || obj === null) return null;
  for (const key of keys) {
    const value = (obj as Record<string, unknown>)[key];
    if (typeof value === "number" && !isNaN(value)) return value;
  }
  return null;
}

function calculateStdDev(values: number[]): number {
  if (values.length === 0) return 0;
  const avg = values.reduce((a, b) => a + b, 0) / values.length;
  const squareDiffs = values.map((value) => Math.pow(value - avg, 2));
  const avgSquareDiff =
    squareDiffs.reduce((a, b) => a + b, 0) / squareDiffs.length;
  return Math.sqrt(avgSquareDiff);
}

function calculateStats(
  data: TableHeader[],
  dateStart: string,
  dateEnd: string,
): StatsData {
  const baseTemp = 10; // Temperatura base para GDD (°C)
  const cutoffTemp = 30; // Temperatura de corte superior (°C) - milho

  const chillThreshold = 7; // Limiar para horas de frio (°C)

  const tempValues: number[] = [];
  let tempMaxValue = -Infinity;
  let tempMinValue = Infinity;
  let rainTotal = 0;
  let rainMax = -Infinity;
  let rainDays = 0;
  let chillHours = 0;
  let radiationSum = 0;
  let radiationCount = 0;
  let windSum = 0;
  let windCount = 0;

  // Agrupar dados por dia para calcular GDD corretamente
  const dailyData: Record<string, { maxTemp: number; minTemp: number }> = {};

  data.forEach((row) => {
    const temp = row["Temperatura"];
    const rain = row["Chuva"];
    const radiation = row["Radiação"];
    const wind = row["Vento"];

    // Extrair data (ignorar hora)
    const dateValue = row["Data Medição"];
    const dateStr =
      typeof dateValue === "string"
        ? dateValue.split(" ")[0].split("T")[0]
        : "";

    // Temperatura
    const tInst = extractNumericValue(temp, "Inst.", "Med.", "Med");
    const tMax = extractNumericValue(temp, "Max.", "Max");
    const tMin = extractNumericValue(temp, "Min.", "Min");

    if (tInst !== null) tempValues.push(tInst);
    if (tMax !== null && tMax > tempMaxValue) tempMaxValue = tMax;
    if (tMin !== null && tMin < tempMinValue) tempMinValue = tMin;

    // Agrupar temp max/min por dia para GDD
    if (dateStr && tMax !== null && tMin !== null) {
      if (!dailyData[dateStr]) {
        dailyData[dateStr] = { maxTemp: -Infinity, minTemp: Infinity };
      }
      if (tMax > dailyData[dateStr].maxTemp) {
        dailyData[dateStr].maxTemp = tMax;
      }
      if (tMin < dailyData[dateStr].minTemp) {
        dailyData[dateStr].minTemp = tMin;
      }
    }

    // Horas de Frio (cada registro horário com temp < threshold)
    if (tInst !== null && tInst < chillThreshold) {
      chillHours++;
    }

    // Chuva
    const rainValue = extractNumericValue(rain, "(mm)", "mm");
    if (rainValue !== null) {
      rainTotal += rainValue;
      if (rainValue > rainMax) rainMax = rainValue;
      if (rainValue > 0) rainDays++;
    }

    // Radiação e Vento (para evapotranspiração)
    const radValue = extractNumericValue(radiation, "Kj/m²", "kJ/m²");
    const windValue = extractNumericValue(wind, "Vel. (m/s)", "Vel.", "Vel");

    if (radValue !== null) {
      radiationSum += radValue;
      radiationCount++;
    }
    if (windValue !== null) {
      windSum += windValue;
      windCount++;
    }
  });

  // Calcular GDD corretamente: um valor por dia
  let gdd = 0;
  Object.values(dailyData).forEach((day) => {
    if (day.maxTemp !== -Infinity && day.minTemp !== Infinity) {
      // Aplicar limite inferior: se Temp Min < Base, usar Base
      const adjustedMin = Math.max(day.minTemp, baseTemp);

      // Aplicar limite superior: se Temp Max > Corte, usar Corte
      const adjustedMax = Math.min(day.maxTemp, cutoffTemp);

      // Calcular temperatura média ajustada
      const avgTemp = (adjustedMax + adjustedMin) / 2;

      // GDD só é positivo se média > base
      if (avgTemp > baseTemp) {
        gdd += avgTemp - baseTemp;
      }
    }
  });

  // Calcular evapotranspiração estimada (Penman simplificado)
  let evapotranspiration: number | null = null;
  if (radiationCount > 0 && windCount > 0 && tempValues.length > 0) {
    const avgRad = radiationSum / radiationCount;
    const avgWind = windSum / windCount;
    const avgTemp = tempValues.reduce((a, b) => a + b, 0) / tempValues.length;
    // Fórmula simplificada de evapotranspiração
    evapotranspiration =
      0.0023 * (avgTemp + 17.8) * avgRad * 0.0864 * (1 + 0.1 * avgWind);
  }

  return {
    recordCount: data.length,
    dateRange: `${formatDateDisplay(dateStart)} - ${formatDateDisplay(dateEnd)}`,
    tempAvg:
      tempValues.length > 0
        ? tempValues.reduce((a, b) => a + b, 0) / tempValues.length
        : null,
    tempMax: tempMaxValue === -Infinity ? null : tempMaxValue,
    tempMin: tempMinValue === Infinity ? null : tempMinValue,
    tempStdDev: tempValues.length > 0 ? calculateStdDev(tempValues) : null,
    rainTotal,
    rainMax: rainMax === -Infinity ? null : rainMax,
    rainDays,
    gdd,
    chillHours,
    evapotranspiration,
  };
}

function formatDateDisplay(date: string): string {
  if (!date) return "";
  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
}

function formatValue(value: number | null, decimals = 1): string {
  if (value === null) return "—";
  return value.toFixed(decimals);
}

// === COMPONENT ===

export function StatsSummary({ data, dateStart, dateEnd }: StatsSummaryProps) {
  const stats = useMemo(
    () => calculateStats(data, dateStart, dateEnd),
    [data, dateStart, dateEnd],
  );

  return (
    <Container>
      <Header>
        <Title>Resumo Estatístico</Title>
        <Subtitle>
          {stats.recordCount} registros • {stats.dateRange}
        </Subtitle>
      </Header>

      <StatsGrid>
        <StatCard>
          <StatLabel>Temp. Média</StatLabel>
          <StatValue>
            {formatValue(stats.tempAvg)}
            <StatUnit>°C</StatUnit>
          </StatValue>
          <StatDescription>
            σ = {formatValue(stats.tempStdDev)}°C
          </StatDescription>
        </StatCard>

        <StatCard>
          <StatLabel>Temp. Máxima</StatLabel>
          <StatValue>
            {formatValue(stats.tempMax)}
            <StatUnit>°C</StatUnit>
          </StatValue>
          <StatDescription>
            Mínima: {formatValue(stats.tempMin)}°C
          </StatDescription>
        </StatCard>

        <StatCard>
          <StatLabel>Precipitação Total</StatLabel>
          <StatValue>
            {formatValue(stats.rainTotal)}
            <StatUnit>mm</StatUnit>
          </StatValue>
          <StatDescription>{stats.rainDays} dia(s) com chuva</StatDescription>
        </StatCard>

        <StatCard>
          <StatLabel>Máx. Precipitação</StatLabel>
          <StatValue>
            {formatValue(stats.rainMax)}
            <StatUnit>mm</StatUnit>
          </StatValue>
          <StatDescription>Em um único registro</StatDescription>
        </StatCard>
      </StatsGrid>

      {/* Seção Agrícola */}
      <AgriculturalSection>
        <AgroTitle>Indicadores Agrícolas</AgroTitle>
        <AgroGrid>
          <AgroCard>
            <StatLabel>
              Graus-Dia (GDD)
              <CropBadge>🌽 Milho</CropBadge>
            </StatLabel>
            <StatValue>
              {formatValue(stats.gdd, 0)}
              <StatUnit>°C·d</StatUnit>
            </StatValue>
            <StatDescription>Base 10°C • Corte 30°C</StatDescription>
            <GDDProgress value={stats.gdd} target={2700} />
          </AgroCard>

          <AgroCard>
            <StatLabel>Horas de Frio</StatLabel>
            <StatValue>
              {stats.chillHours}
              <StatUnit>h</StatUnit>
            </StatValue>
            <StatDescription>&lt; 7°C</StatDescription>
          </AgroCard>

          <AgroCard>
            <StatLabel>Evapotranspiração</StatLabel>
            <StatValue>
              {formatValue(stats.evapotranspiration)}
              <StatUnit>mm/d</StatUnit>
            </StatValue>
            <StatDescription>Estimada</StatDescription>
          </AgroCard>
        </AgroGrid>
      </AgriculturalSection>
    </Container>
  );
}
