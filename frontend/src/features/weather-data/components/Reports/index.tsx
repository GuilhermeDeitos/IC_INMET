import { useMemo } from "react";
import styled from "styled-components";
import { theme } from "../../../../shared/design-system";
import { fadeInUp } from "../../../../shared/design-system/animations";
import { TableHeader, WeatherFilters } from "../../../../domain/weather/types";
import { Charts } from "../Charts";
import { StatsSummary } from "../StatsSummary";
import { Button } from "../../../../shared/components/Button";
import { DownloadIcon, PDFIcon } from "../../../../shared/components/Icons";

// === STYLED COMPONENTS ===

const ReportsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[6]};
`;

const ReportHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${theme.spacing[5]};
  background: ${theme.colors.background};
  border-radius: ${theme.borderRadius.xl};
  box-shadow: ${theme.shadows.sm};

  animation: ${fadeInUp} 300ms ease-out;
`;

const HeaderInfo = styled.div``;

const ReportTitle = styled.h2`
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.text.primary};
  margin: 0;
`;

const ReportSubtitle = styled.p`
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.text.secondary};
  margin: ${theme.spacing[1]} 0 0;
`;

const ExportButtons = styled.div`
  display: flex;
  gap: ${theme.spacing[2]};
`;

const ExportButton = styled(Button)`
  gap: ${theme.spacing[2]};
`;

const SectionTitle = styled.h3`
  font-size: ${theme.typography.fontSize.md};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.text.primary};
  margin: 0 0 ${theme.spacing[4]};
`;

const GridSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: ${theme.spacing[6]};

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const ChartSection = styled.div``;

const SidePanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[4]};
`;

const QuickMetrics = styled.div`
  background: ${theme.colors.background};
  border-radius: ${theme.borderRadius.xl};
  box-shadow: ${theme.shadows.sm};
  overflow: hidden;
`;

const MetricHeader = styled.div`
  padding: ${theme.spacing[4]} ${theme.spacing[5]};
  background: ${theme.colors.surface};
  border-bottom: 1px solid ${theme.colors.border};

  h4 {
    font-size: ${theme.typography.fontSize.sm};
    font-weight: ${theme.typography.fontWeight.semibold};
    color: ${theme.colors.text.primary};
    margin: 0;
  }
`;

const MetricList = styled.div``;

const MetricItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${theme.spacing[3]} ${theme.spacing[5]};
  border-bottom: 1px solid ${theme.colors.border};

  &:last-child {
    border-bottom: none;
  }
`;

const MetricLabel = styled.span`
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.text.secondary};
`;

const MetricValue = styled.span`
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.semibold};
  font-family: ${theme.typography.fontFamily.mono};
  color: ${theme.colors.text.primary};
`;

// === TYPES ===

interface ReportsProps {
  data: TableHeader[];
  filters: WeatherFilters;
}

interface QuickMetric {
  label: string;
  value: string;
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

function calculateQuickMetrics(data: TableHeader[]): QuickMetric[] {
  if (data.length === 0) return [];

  let tempSum = 0,
    tempCount = 0;
  let humSum = 0,
    humCount = 0;
  let rainTotal = 0;
  let windSum = 0,
    windCount = 0;
  let pressSum = 0,
    pressCount = 0;

  data.forEach((row) => {
    const tInst = extractNumericValue(
      row["Temperatura"],
      "Inst.",
      "Med.",
      "Med",
    );
    const hInst = extractNumericValue(row["Umidade"], "Inst.", "Med.", "Med");
    const rain = extractNumericValue(row["Chuva"], "(mm)", "mm");
    const wind = extractNumericValue(row["Vento"], "Vel. (m/s)", "Vel.", "Vel");
    const press = extractNumericValue(row["Pressão"], "Inst.", "Med.");

    if (tInst !== null) {
      tempSum += tInst;
      tempCount++;
    }
    if (hInst !== null) {
      humSum += hInst;
      humCount++;
    }
    if (rain !== null) rainTotal += rain;
    if (wind !== null) {
      windSum += wind;
      windCount++;
    }
    if (press !== null) {
      pressSum += press;
      pressCount++;
    }
  });

  return [
    {
      label: "Temperatura Média",
      value: tempCount > 0 ? `${(tempSum / tempCount).toFixed(1)}°C` : "—",
    },
    {
      label: "Umidade Média",
      value: humCount > 0 ? `${(humSum / humCount).toFixed(0)}%` : "—",
    },
    {
      label: "Precipitação Total",
      value: `${rainTotal.toFixed(1)} mm`,
    },
    {
      label: "Vento Médio",
      value: windCount > 0 ? `${(windSum / windCount).toFixed(1)} m/s` : "—",
    },
    {
      label: "Pressão Média",
      value: pressCount > 0 ? `${(pressSum / pressCount).toFixed(1)} hPa` : "—",
    },
    {
      label: "Total de Registros",
      value: data.length.toString(),
    },
  ];
}

function exportToPDF(data: TableHeader[], filters: WeatherFilters) {
  // TODO: Implementar exportação PDF com jsPDF
  console.log("Exportando PDF...", { data, filters });
  alert("Exportação PDF será implementada em breve!");
}

function exportToJSON(data: TableHeader[], filters: WeatherFilters) {
  const exportData = {
    metadata: {
      estacao: filters.estacao,
      periodo: `${filters.dataInicio} a ${filters.dataFim}`,
      frequencia: filters.frequencia,
      tipoEstacao: filters.tipoEstacao,
      geradoEm: new Date().toISOString(),
    },
    dados: data,
  };

  const blob = new Blob([JSON.stringify(exportData, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `INMET_${filters.estacao}_relatorio.json`;
  link.click();
  URL.revokeObjectURL(url);
}

// === COMPONENT ===

export function Reports({ data, filters }: ReportsProps) {
  const quickMetrics = useMemo(() => calculateQuickMetrics(data), [data]);

  return (
    <ReportsContainer>
      {/* Header com ações de exportação */}
      <ReportHeader>
        <HeaderInfo>
          <ReportTitle>Relatório de Análise Meteorológica</ReportTitle>
          <ReportSubtitle>
            Estação {filters.estacao} • {filters.dataInicio} a {filters.dataFim}
          </ReportSubtitle>
        </HeaderInfo>
        <ExportButtons>
          <ExportButton
            variant="ghost"
            size="sm"
            onClick={() => exportToJSON(data, filters)}
          >
            <DownloadIcon size={16} />
            JSON
          </ExportButton>
          <ExportButton
            variant="primary"
            size="sm"
            onClick={() => exportToPDF(data, filters)}
          >
            <PDFIcon size={16} />
            Exportar PDF
          </ExportButton>
        </ExportButtons>
      </ReportHeader>

      {/* Resumo Estatístico */}
      <StatsSummary
        data={data}
        dateStart={filters.dataInicio}
        dateEnd={filters.dataFim}
      />

      {/* Layout principal: Gráfico + Painel lateral */}
      <GridSection>
        <ChartSection>
          <SectionTitle>Visualização de Dados</SectionTitle>
          <Charts data={data} />
        </ChartSection>

        <SidePanel>
          {/* Métricas Rápidas */}
          <QuickMetrics>
            <MetricHeader>
              <h4>Métricas do Período</h4>
            </MetricHeader>
            <MetricList>
              {quickMetrics.map((metric, index) => (
                <MetricItem key={index}>
                  <MetricLabel>{metric.label}</MetricLabel>
                  <MetricValue>{metric.value}</MetricValue>
                </MetricItem>
              ))}
            </MetricList>
          </QuickMetrics>
        </SidePanel>
      </GridSection>
    </ReportsContainer>
  );
}
