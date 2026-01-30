import { useState, useMemo } from 'react';
import {
  SidebarOverlay,
  SidebarContainer,
  SidebarHeader,
  SidebarTitle,
  CloseButton,
  SidebarContent,
  SidebarSection,
  SectionTitle,
  TabGroup,
  Tab,
  FieldGroup,
  SidebarFooter,
} from './styled';
import { Button } from '../../../../shared/components/Button';
import { StyledSelect, SelectLabel } from '../../../../shared/components/Select';
import { StyledInput, InputLabel, InputError } from '../../../../shared/components/Input';
import { Autocomplete, AutocompleteOption } from '../../../../shared/components/Autocomplete';
import { XIcon } from '../../../../shared/components/Icons';
import { WeatherFilters, StationType, FrequencyType } from '../../../../domain/weather/types';
import { estados, estacoesAutomaticas, estacoesManuais } from '../../../../utils/estacoes';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  filters: WeatherFilters;
  onFiltersChange: (filters: WeatherFilters) => void;
  onSubmit: () => void;
  isLoading?: boolean;
}

export function Sidebar({
  isOpen,
  onClose,
  filters,
  onFiltersChange,
  onSubmit,
  isLoading,
}: SidebarProps) {
  const [dateError, setDateError] = useState<string | null>(null);

  const handleFieldChange = (field: keyof WeatherFilters, value: string) => {
    // Validação de datas
    if (field === 'dataFim' && value < filters.dataInicio) {
      setDateError('Data final não pode ser anterior à inicial');
      return;
    }
    if (field === 'dataInicio' && value > filters.dataFim) {
      setDateError('Data inicial não pode ser posterior à final');
      return;
    }
    
    setDateError(null);
    onFiltersChange({ ...filters, [field]: value });
  };

  const handleStationTypeChange = (type: StationType) => {
    onFiltersChange({ 
      ...filters, 
      tipoEstacao: type,
      estacao: '' // Reset station when type changes
    });
  };

  // Prepare station options for Autocomplete
  const stationOptions: AutocompleteOption[] = useMemo(() => {
    const stations = filters.tipoEstacao === 'automaticas' 
      ? estacoesAutomaticas 
      : estacoesManuais;

    const filteredStations = filters.estado === 'ALL'
      ? stations
      : stations.filter(s => s.SG_ESTADO === filters.estado);

    return filteredStations.map(station => ({
      value: station.CD_ESTACAO,
      label: station.DC_NOME,
      state: station.SG_ESTADO,
    }));
  }, [filters.tipoEstacao, filters.estado]);

  const frequencies: { value: FrequencyType; label: string }[] = [
    { value: 'horario', label: 'Horário' },
    { value: 'diario', label: 'Diário' },
    { value: 'semanal', label: 'Semanal' },
    { value: 'mensal', label: 'Mensal' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dateError && filters.estacao) {
      onSubmit();
    }
  };

  const canSubmit = filters.estacao && !dateError && !isLoading;

  return (
    <>
      <SidebarOverlay isOpen={isOpen} onClick={onClose} />
      
      <SidebarContainer isOpen={isOpen}>
        <SidebarHeader>
          <SidebarTitle>Filtros</SidebarTitle>
          <CloseButton onClick={onClose} type="button">
            <XIcon size={20} />
          </CloseButton>
        </SidebarHeader>

        <SidebarContent as="form" onSubmit={handleSubmit}>
          {/* Station Type */}
          <SidebarSection>
            <SectionTitle>Tipo de Estação</SectionTitle>
            <TabGroup>
              <Tab 
                isActive={filters.tipoEstacao === 'automaticas'}
                onClick={() => handleStationTypeChange('automaticas')}
                type="button"
              >
                Automáticas
              </Tab>
              <Tab 
                isActive={filters.tipoEstacao === 'manuais'}
                onClick={() => handleStationTypeChange('manuais')}
                type="button"
              >
                Manuais
              </Tab>
            </TabGroup>
          </SidebarSection>

          {/* Location */}
          <SidebarSection>
            <SectionTitle>Localização</SectionTitle>
            
            <FieldGroup>
              <SelectLabel>Estado</SelectLabel>
              <StyledSelect
                value={filters.estado}
                onChange={(e) => {
                  handleFieldChange('estado', e.target.value);
                  // Reset station when state changes
                  onFiltersChange({ ...filters, estado: e.target.value, estacao: '' });
                }}
              >
                {Object.entries(estados).map(([sigla, nome]) => (
                  <option key={sigla} value={sigla}>{nome}</option>
                ))}
              </StyledSelect>
            </FieldGroup>

            <FieldGroup>
              <SelectLabel>Estação</SelectLabel>
              <Autocomplete
                options={stationOptions}
                value={filters.estacao}
                onChange={(value) => handleFieldChange('estacao', value)}
                placeholder="Buscar estação por nome ou código..."
              />
            </FieldGroup>
          </SidebarSection>

          {/* Time Period */}
          <SidebarSection>
            <SectionTitle>Período</SectionTitle>
            
            <FieldGroup>
              <SelectLabel>Frequência</SelectLabel>
              <StyledSelect
                value={filters.frequencia}
                onChange={(e) => handleFieldChange('frequencia', e.target.value)}
              >
                {frequencies.map(({ value, label }) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </StyledSelect>
            </FieldGroup>

            <FieldGroup>
              <InputLabel>Data Inicial</InputLabel>
              <StyledInput
                type="date"
                value={filters.dataInicio}
                onChange={(e) => handleFieldChange('dataInicio', e.target.value)}
                max={new Date().toISOString().split('T')[0]}
              />
            </FieldGroup>

            <FieldGroup>
              <InputLabel>Data Final</InputLabel>
              <StyledInput
                type="date"
                value={filters.dataFim}
                onChange={(e) => handleFieldChange('dataFim', e.target.value)}
                max={new Date().toISOString().split('T')[0]}
                hasError={!!dateError}
              />
              {dateError && <InputError>{dateError}</InputError>}
            </FieldGroup>
          </SidebarSection>
        </SidebarContent>

        {/* Fixed Footer */}
        <SidebarFooter>
          <Button 
            type="submit" 
            fullWidth 
            isLoading={isLoading}
            disabled={!canSubmit}
            onClick={handleSubmit}
          >
            {isLoading ? 'Carregando...' : 'Gerar Tabela'}
          </Button>
        </SidebarFooter>
      </SidebarContainer>
    </>
  );
}