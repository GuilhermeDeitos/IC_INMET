import styled, { css } from 'styled-components';
import { theme } from '../../../../../shared/design-system';
import { ChartConfig, AVAILABLE_VARIABLES, ChartType, AggregationType } from '../types';

// === STYLED COMPONENTS ===

const ControlsContainer = styled.div`
  background: ${theme.colors.background};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing[5]};
  margin-bottom: ${theme.spacing[4]};
`;

const ControlsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${theme.spacing[4]};
  padding-bottom: ${theme.spacing[3]};
  border-bottom: 1px solid ${theme.colors.border};
`;

const ControlsTitle = styled.h4`
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.text.primary};
  margin: 0;
`;

const ResetButton = styled.button`
  font-size: ${theme.typography.fontSize.xs};
  color: ${theme.colors.text.muted};
  background: none;
  border: none;
  cursor: pointer;
  
  &:hover {
    color: ${theme.colors.primary};
    text-decoration: underline;
  }
`;

const ControlsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${theme.spacing[5]};
`;

const ControlGroup = styled.div``;

const ControlLabel = styled.label`
  display: block;
  font-size: ${theme.typography.fontSize.xs};
  font-weight: ${theme.typography.fontWeight.semibold};
  text-transform: uppercase;
  letter-spacing: ${theme.typography.letterSpacing.wider};
  color: ${theme.colors.text.muted};
  margin-bottom: ${theme.spacing[2]};
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing[1]};
  background: ${theme.colors.surface};
  padding: ${theme.spacing[1]};
  border-radius: ${theme.borderRadius.lg};
`;

const ToggleButton = styled.button<{ isActive: boolean }>`
  padding: ${theme.spacing[2]} ${theme.spacing[3]};
  font-size: ${theme.typography.fontSize.xs};
  font-weight: ${theme.typography.fontWeight.medium};
  color: ${({ isActive }) => isActive ? theme.colors.primary : theme.colors.text.secondary};
  background: ${({ isActive }) => isActive ? theme.colors.background : 'transparent'};
  border: none;
  border-radius: ${theme.borderRadius.md};
  cursor: pointer;
  transition: all ${theme.transitions.duration.fast};
  
  ${({ isActive }) => isActive && css`
    box-shadow: ${theme.shadows.sm};
  `}
  
  &:hover {
    color: ${theme.colors.primary};
  }
`;

const ChipsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing[2]};
`;

const Chip = styled.button<{ $isSelected: boolean; $chipColor: string }>`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing[1]};
  padding: ${theme.spacing[1]} ${theme.spacing[3]};
  
  font-size: ${theme.typography.fontSize.xs};
  font-weight: ${theme.typography.fontWeight.medium};
  
  background: ${({ $isSelected, $chipColor }) => 
    $isSelected ? `${$chipColor}20` : theme.colors.surface};
  color: ${({ $isSelected, $chipColor }) => 
    $isSelected ? $chipColor : theme.colors.text.secondary};
  border: 1px solid ${({ $isSelected, $chipColor }) => 
    $isSelected ? `${$chipColor}40` : 'transparent'};
  border-radius: ${theme.borderRadius.full};
  
  cursor: pointer;
  transition: all ${theme.transitions.duration.fast};
  
  &:hover {
    background: ${({ $chipColor }) => `${$chipColor}15`};
    color: ${({ $chipColor }) => $chipColor};
  }
  
  &::before {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${({ $chipColor }) => $chipColor};
    opacity: ${({ $isSelected }) => $isSelected ? 1 : 0.4};
  }
`;

const CategoryTitle = styled.span`
  display: block;
  font-size: ${theme.typography.fontSize.xs};
  color: ${theme.colors.text.muted};
  margin: ${theme.spacing[3]} 0 ${theme.spacing[2]};
  
  &:first-of-type {
    margin-top: 0;
  }
`;

const ToggleRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[3]};
  margin-top: ${theme.spacing[3]};
`;

const Toggle = styled.button<{ $isActive: boolean }>`
  position: relative;
  width: 44px;
  height: 24px;
  
  background: ${({ $isActive }) => $isActive ? theme.colors.primary : theme.colors.border};
  border: none;
  border-radius: ${theme.borderRadius.full};
  cursor: pointer;
  transition: background ${theme.transitions.duration.fast};
  
  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: ${({ $isActive }) => $isActive ? '22px' : '2px'};
    width: 20px;
    height: 20px;
    background: white;
    border-radius: 50%;
    transition: left ${theme.transitions.duration.fast};
    box-shadow: ${theme.shadows.sm};
  }
`;


const ToggleLabel = styled.span`
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.text.secondary};
`;

const ReferenceInput = styled.input`
  width: 80px;
  padding: ${theme.spacing[2]} ${theme.spacing[3]};
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.text.primary};
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }
`;

// === TYPES ===

interface ChartControlsProps {
  config: ChartConfig;
  onChange: (config: ChartConfig) => void;
  onReset: () => void;
}

// === COMPONENT ===

export function ChartControls({ config, onChange, onReset }: ChartControlsProps) {
  const chartTypes: { value: ChartType; label: string }[] = [
    { value: 'area', label: 'Área' },
    { value: 'line', label: 'Linha' },
    { value: 'bar', label: 'Barras' },
    { value: 'composed', label: 'Misto' },
  ];

  const aggregations: { value: AggregationType; label: string }[] = [
    { value: 'hourly', label: 'Horário' },
    { value: 'daily', label: 'Diário' },
    { value: 'weekly', label: 'Semanal' },
    { value: 'monthly', label: 'Mensal' },
  ];

  const categories = [
    { key: 'temperature', label: 'Temperatura' },
    { key: 'precipitation', label: 'Precipitação' },
    { key: 'humidity', label: 'Umidade' },
    { key: 'wind', label: 'Vento' },
    { key: 'pressure', label: 'Pressão' },
    { key: 'radiation', label: 'Radiação' },
  ];

  const handleVariableToggle = (varKey: string) => {
    const newVariables = config.variables.includes(varKey)
      ? config.variables.filter(v => v !== varKey)
      : [...config.variables, varKey];
    
    onChange({ ...config, variables: newVariables });
  };

  return (
    <ControlsContainer>
      <ControlsHeader>
        <ControlsTitle>Configuração do Gráfico</ControlsTitle>
        <ResetButton onClick={onReset}>Restaurar padrão</ResetButton>
      </ControlsHeader>

      <ControlsGrid>
        {/* Tipo de Gráfico */}
        <ControlGroup>
          <ControlLabel>Tipo de Visualização</ControlLabel>
          <ButtonGroup>
            {chartTypes.map(({ value, label }) => (
              <ToggleButton
                key={value}
                isActive={config.type === value}
                onClick={() => onChange({ ...config, type: value })}
              >
                {label}
              </ToggleButton>
            ))}
          </ButtonGroup>
        </ControlGroup>

        {/* Agregação */}
        <ControlGroup>
          <ControlLabel>Granularidade</ControlLabel>
          <ButtonGroup>
            {aggregations.map(({ value, label }) => (
              <ToggleButton
                key={value}
                isActive={config.aggregation === value}
                onClick={() => onChange({ ...config, aggregation: value })}
              >
                {label}
              </ToggleButton>
            ))}
          </ButtonGroup>
        </ControlGroup>
      </ControlsGrid>

      {/* Variáveis */}
      <ControlGroup style={{ marginTop: theme.spacing[5] }}>
        <ControlLabel>Variáveis Exibidas</ControlLabel>
        
        {categories.map(cat => {
          const varsInCategory = AVAILABLE_VARIABLES.filter(v => v.category === cat.key);
          if (varsInCategory.length === 0) return null;
          
          return (
            <div key={cat.key}>
              <CategoryTitle>{cat.label}</CategoryTitle>
              <ChipsContainer>
                {varsInCategory.map(variable => (
                  <Chip
                    key={variable.key}
                    $isSelected={config.variables.includes(variable.key)}
                    $chipColor={variable.color}
                    onClick={() => handleVariableToggle(variable.key)}
                  >
                    {variable.label}
                  </Chip>
                ))}
              </ChipsContainer>
            </div>
          );
        })}
      </ControlGroup>

      {/* Opções Adicionais */}
      <ControlGroup style={{ marginTop: theme.spacing[5] }}>
        <ControlLabel>Opções Avançadas</ControlLabel>
        
        <ToggleRow>
          <Toggle
            $isActive={config.showBrush}
            onClick={() => onChange({ ...config, showBrush: !config.showBrush })}
          />
          <ToggleLabel>Navegação por Período (Brush)</ToggleLabel>
        </ToggleRow>
        
        <ToggleRow>
          <Toggle
            $isActive={config.showReferenceLine}
            onClick={() => onChange({ ...config, showReferenceLine: !config.showReferenceLine })}
          />
          <ToggleLabel>Linha de Referência</ToggleLabel>
          {config.showReferenceLine && (
            <ReferenceInput
              type="number"
              value={config.referenceLineValue ?? ''}
              onChange={(e) => onChange({ 
                ...config, 
                referenceLineValue: e.target.value ? Number(e.target.value) : undefined 
              })}
              placeholder="Valor"
            />
          )}
        </ToggleRow>
      </ControlGroup>
    </ControlsContainer>
  );
}