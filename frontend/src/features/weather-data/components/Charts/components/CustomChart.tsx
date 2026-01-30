import { useMemo } from "react";
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Brush,
  ReferenceLine,
} from "recharts";
import styled from "styled-components";
import { theme } from "../../../../../shared/design-system";
import { ChartConfig, ChartDataPoint, AVAILABLE_VARIABLES } from "../types";

// === STYLED COMPONENTS ===

const ChartWrapper = styled.div`
  height: 350px;
  width: 100%;
`;

const CustomTooltipContainer = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing[3]} ${theme.spacing[4]};
  box-shadow: ${theme.shadows.lg};
  max-width: 250px;
`;

const TooltipDate = styled.div`
  font-size: ${theme.typography.fontSize.xs};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing[2]};
  padding-bottom: ${theme.spacing[2]};
  border-bottom: 1px solid ${theme.colors.border};
`;

const TooltipRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${theme.spacing[3]};
  padding: ${theme.spacing[1]} 0;
  font-size: ${theme.typography.fontSize.sm};
`;

const TooltipLabel = styled.span<{ color: string }>`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[2]};
  color: ${theme.colors.text.secondary};

  &::before {
    content: "";
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${({ color }) => color};
  }
`;

const TooltipValue = styled.span`
  font-weight: ${theme.typography.fontWeight.medium};
  color: ${theme.colors.text.primary};
  font-variant-numeric: tabular-nums;
`;

const TooltipDerived = styled.div`
  margin-top: ${theme.spacing[2]};
  padding-top: ${theme.spacing[2]};
  border-top: 1px dashed ${theme.colors.border};
  font-size: ${theme.typography.fontSize.xs};
  color: ${theme.colors.text.muted};
`;

// === TYPES ===

interface CustomChartProps {
  data: ChartDataPoint[];
  config: ChartConfig;
}

// === CUSTOM TOOLTIP ===

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;

  // Calcular valores derivados
  const tempMax = payload.find((p: any) => p.dataKey === "tempMax")?.value;
  const tempMin = payload.find((p: any) => p.dataKey === "tempMin")?.value;
  const amplitude =
    tempMax !== undefined && tempMin !== undefined
      ? (tempMax - tempMin).toFixed(1)
      : null;

  // Acumulado de chuva até este ponto
  const rain = payload.find((p: any) => p.dataKey === "rain")?.value;

  return (
    <CustomTooltipContainer>
      <TooltipDate>{label}</TooltipDate>
      {payload.map((entry: any, index: number) => {
        const variable = AVAILABLE_VARIABLES.find(
          (v) => v.key === entry.dataKey,
        );
        if (!variable) return null;

        return (
          <TooltipRow key={index}>
            <TooltipLabel color={entry.color}>{variable.label}</TooltipLabel>
            <TooltipValue>
              {entry.value?.toFixed(1) ?? "—"} {variable.unit}
            </TooltipValue>
          </TooltipRow>
        );
      })}

      {/* Valores derivados */}
      {amplitude && (
        <TooltipDerived>Amplitude Térmica: {amplitude}°C</TooltipDerived>
      )}
    </CustomTooltipContainer>
  );
};

// === COMPONENT ===

export function CustomChart({ data, config }: CustomChartProps) {
  const axisStyle = {
    fontSize: 11,
    fill: theme.colors.text.muted,
    fontFamily: theme.typography.fontFamily.sans,
  };

  const gridStyle = {
    strokeDasharray: "3 3",
    stroke: theme.colors.border,
  };

  // Gerar gradientes para as variáveis selecionadas
  const gradients = useMemo(
    () =>
      config.variables.map((varKey) => {
        const variable = AVAILABLE_VARIABLES.find((v) => v.key === varKey);
        return variable ? (
          <linearGradient
            key={varKey}
            id={`gradient-${varKey}`}
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop offset="5%" stopColor={variable.color} stopOpacity={0.3} />
            <stop offset="95%" stopColor={variable.color} stopOpacity={0} />
          </linearGradient>
        ) : null;
      }),
    [config.variables],
  );

  // Renderizar elementos do gráfico baseado no tipo
  const renderChartElements = () => {
    return config.variables.map((varKey) => {
      const variable = AVAILABLE_VARIABLES.find((v) => v.key === varKey);
      if (!variable) return null;

      const commonProps = {
        dataKey: varKey,
        name: variable.label,
        stroke: variable.color,
        strokeWidth: 2,
      };

      switch (config.type) {
        case "area":
          return (
            <Area
              key={varKey} // key separado
              {...commonProps}
              type="monotone"
              fill={`url(#gradient-${varKey})`}
              unit={variable.unit}
            />
          );
        case "line":
          return (
            <Line
              key={varKey} // key separado
              {...commonProps}
              type="monotone"
              dot={{ fill: variable.color, strokeWidth: 0, r: 2 }}
              activeDot={{ r: 4 }}
              unit={variable.unit}
            />
          );

        case "bar":
          return (
            <Bar
              key={varKey}
              dataKey={varKey}
              name={variable.label}
              fill={variable.color}
              radius={[4, 4, 0, 0]}
              unit={variable.unit}
            />
          );
        case "composed":
          // Para gráfico misto: chuva como barra, resto como linha
          if (variable.category === "precipitation") {
            return (
              <Bar
                key={varKey}
                dataKey={varKey}
                name={variable.label}
                fill={variable.color}
                radius={[4, 4, 0, 0]}
                yAxisId="right"
                unit={variable.unit}
              />
            );
          }
          return (
            <Line
              key={varKey} // key separado
              {...commonProps}
              type="monotone"
              dot={{ fill: variable.color, strokeWidth: 0, r: 2 }}
              yAxisId="left"
              unit={variable.unit}
            />
          );
        default:
          return null;
      }
    });
  };

  // Verificar se precisa de eixo Y duplo
  const needsDualAxis =
    config.type === "composed" &&
    config.variables.some(
      (v) =>
        AVAILABLE_VARIABLES.find((av) => av.key === v)?.category ===
        "precipitation",
    );

  const ChartComponent =
    {
      area: AreaChart,
      line: LineChart,
      bar: BarChart,
      composed: ComposedChart,
    }[config.type] || ComposedChart;

  return (
    <ChartWrapper>
      <ResponsiveContainer width="100%" height="100%">
        <ChartComponent
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <defs>{gradients}</defs>

          <CartesianGrid {...gridStyle} />
          <XAxis
            dataKey="date"
            tick={axisStyle}
            axisLine={{ stroke: theme.colors.border }}
          />

          {needsDualAxis ? (
            <>
              <YAxis
                yAxisId="left"
                tick={axisStyle}
                axisLine={{ stroke: theme.colors.border }}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                tick={axisStyle}
                axisLine={{ stroke: theme.colors.border }}
              />
            </>
          ) : (
            <YAxis
              tick={axisStyle}
              axisLine={{ stroke: theme.colors.border }}
            />
          )}

          <Tooltip content={<CustomTooltip />} />

          <Legend
            wrapperStyle={{ fontSize: 12, paddingTop: 16 }}
            formatter={(value) => (
              <span style={{ color: theme.colors.text.secondary }}>
                {value}
              </span>
            )}
          />

          {config.showReferenceLine &&
            config.referenceLineValue !== undefined && (
              <ReferenceLine
                y={config.referenceLineValue}
                stroke="#EF4444"
                strokeDasharray="5 5"
                label={{
                  value: `Alerta: ${config.referenceLineValue}`,
                  fill: "#EF4444",
                  fontSize: 11,
                }}
              />
            )}

          {renderChartElements()}

          {config.showBrush && (
            <Brush
              dataKey="date"
              height={30}
              stroke={theme.colors.primary}
              fill={theme.colors.surface}
            />
          )}
        </ChartComponent>
      </ResponsiveContainer>
    </ChartWrapper>
  );
}
