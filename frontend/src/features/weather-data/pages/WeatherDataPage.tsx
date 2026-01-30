import { useState, useCallback } from 'react';
import styled from 'styled-components';
import { theme } from '../../../shared/design-system';
import { fadeInUp } from '../../../shared/design-system/animations';
import { AppBar } from '../components/AppBar';
import { Sidebar } from '../components/Sidebar';
import { DataTable } from '../components/DataTable';
import { KPICards } from '../components/KPICards';
import { Charts } from '../components/Charts';
import { Reports } from '../components/Reports';
import { EmptyState } from '../components/EmptyState';
import { ProgressBar, TableSkeleton } from '../components/Loading';
import { useWeatherData } from '../hooks/useWeatherData';
import { WeatherFilters } from '../../../domain/weather/types';

// === STYLED COMPONENTS ===

const PageContainer = styled.div`
  min-height: 100vh;
  background: ${theme.colors.surface};
`;

const MainContent = styled.main`
  padding-top: 64px;
  min-height: calc(100vh - 64px);
`;

const ContentWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: ${theme.spacing[6]};
`;

const TabsContainer = styled.div`
  display: flex;
  gap: ${theme.spacing[1]};
  margin-bottom: ${theme.spacing[6]};
  border-bottom: 1px solid ${theme.colors.border};
  overflow-x: auto;
  
  /* Hide scrollbar */
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const PageTab = styled.button<{ isActive: boolean }>`
  position: relative;
  padding: ${theme.spacing[3]} ${theme.spacing[5]};
  white-space: nowrap;
  
  font-family: ${theme.typography.fontFamily.sans};
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.medium};
  
  color: ${({ isActive }) => isActive ? theme.colors.primary : theme.colors.text.secondary};
  background: transparent;
  border: none;
  
  cursor: pointer;
  transition: all ${theme.transitions.duration.fast};
  
  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 2px;
    background: ${({ isActive }) => isActive ? theme.colors.primary : 'transparent'};
    transition: background ${theme.transitions.duration.fast};
  }
  
  &:hover {
    color: ${theme.colors.primary};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ContentCard = styled.div`
  background: ${theme.colors.background};
  border-radius: ${theme.borderRadius.xl};
  box-shadow: ${theme.shadows.sm};
  overflow: hidden;
  
  animation: ${fadeInUp} 300ms ease-out;
`;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 64px;
  left: 0;
  right: 0;
  z-index: 25;
`;

// === TYPES ===

type TabType = 'dados' | 'graficos' | 'relatorios';

const todayDate = new Date().toISOString().split('T')[0];

// === COMPONENT ===

export function WeatherDataPage() {
  const [activeTab, setActiveTab] = useState<TabType>('dados');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filters, setFilters] = useState<WeatherFilters>({
    tipoEstacao: 'automaticas',
    estado: 'ALL',
    estacao: '',
    dataInicio: todayDate,
    dataFim: todayDate,
    frequencia: 'horario',
  });

  const { 
    data, 
    columns, 
    headerConfig, 
    isLoading, 
    hasData,
    fetchData 
  } = useWeatherData();

  const handleSubmit = useCallback(() => {
    fetchData(filters);
    setSidebarOpen(false);
  }, [filters, fetchData]);

  const tabs: { id: TabType; label: string }[] = [
    { id: 'dados', label: 'Tabela de Dados' },
    { id: 'graficos', label: 'Gráficos' },
    { id: 'relatorios', label: 'Relatórios' },
  ];

  return (
    <PageContainer>
      <AppBar onMenuClick={() => setSidebarOpen(true)} />
      
      {isLoading && (
        <LoadingOverlay>
          <ProgressBar />
        </LoadingOverlay>
      )}

      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        filters={filters}
        onFiltersChange={setFilters}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />

      <MainContent>
        <ContentWrapper>
          {/* Show tabs only after loading data */}
          {hasData && (
            <TabsContainer>
              {tabs.map((tab) => (
                <PageTab
                  key={tab.id}
                  isActive={activeTab === tab.id}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </PageTab>
              ))}
            </TabsContainer>
          )}

          {/* Empty State */}
          {!hasData && !isLoading && (
            <ContentCard>
              <EmptyState />
            </ContentCard>
          )}

          {/* Loading State */}
          {isLoading && (
            <ContentCard>
              <div style={{ padding: theme.spacing[5] }}>
                <TableSkeleton rows={8} />
              </div>
            </ContentCard>
          )}

          {/* Data Tab */}
          {hasData && !isLoading && activeTab === 'dados' && (
            <>
              <KPICards data={data} />
              <DataTable
                data={data}
                columns={columns}
                headerConfig={headerConfig}
                filters={filters}
              />
            </>
          )}

          {/* Charts Tab */}
          {hasData && !isLoading && activeTab === 'graficos' && (
            <>
              <KPICards data={data} />
              <Charts data={data} />
            </>
          )}

          {/* Reports Tab */}
          {hasData && !isLoading && activeTab === 'relatorios' && (
            <Reports data={data} filters={filters} />
          )}
        </ContentWrapper>
      </MainContent>
    </PageContainer>
  );
}