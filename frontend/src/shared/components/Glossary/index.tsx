import { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../design-system';
import { fadeInUp } from '../../design-system/animations';

// === STYLED COMPONENTS ===

const Container = styled.div`
  animation: ${fadeInUp} 200ms ease-out;
`;

const FilterContainer = styled.div`
  display: flex;
  gap: ${theme.spacing[2]};
  margin-bottom: ${theme.spacing[4]};
  padding-bottom: ${theme.spacing[3]};
  border-bottom: 1px solid ${theme.colors.border};
`;

const FilterButton = styled.button<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[1]};
  padding: ${theme.spacing[2]} ${theme.spacing[3]};
  
  font-size: ${theme.typography.fontSize.xs};
  font-weight: ${theme.typography.fontWeight.medium};
  
  color: ${({ $isActive }) => $isActive ? theme.colors.primary : theme.colors.text.secondary};
  background: ${({ $isActive }) => $isActive ? theme.colors.primaryLight : 'transparent'};
  border: 1px solid ${({ $isActive }) => $isActive ? theme.colors.primary : 'transparent'};
  border-radius: ${theme.borderRadius.full};
  
  cursor: pointer;
  transition: all ${theme.transitions.duration.fast};
  
  &:hover {
    background: ${theme.colors.primaryLight};
    color: ${theme.colors.primary};
  }
`;

const TermsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[3]};
`;

const GlossaryCard = styled.div`
  padding: ${theme.spacing[4]};
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.lg};
  
  transition: all ${theme.transitions.duration.fast};
  
  &:hover {
    border-color: ${theme.colors.primary}40;
    box-shadow: ${theme.shadows.sm};
  }
`;

const TermHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[2]};
  margin-bottom: ${theme.spacing[2]};
`;

const TermBadge = styled.code`
  font-size: ${theme.typography.fontSize.xs};
  font-family: ${theme.typography.fontFamily.mono};
  padding: ${theme.spacing[1]} ${theme.spacing[2]};
  background: ${theme.colors.primaryLight};
  color: ${theme.colors.primary};
  border-radius: ${theme.borderRadius.md};
  font-weight: ${theme.typography.fontWeight.semibold};
`;

const TermName = styled.h4`
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.text.primary};
  margin: 0;
`;

const TermDescription = styled.p`
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.text.secondary};
  line-height: ${theme.typography.lineHeight.relaxed};
  margin: 0;
`;

const TermTip = styled.div`
  margin-top: ${theme.spacing[2]};
  padding: ${theme.spacing[2]} ${theme.spacing[3]};
  
  font-size: ${theme.typography.fontSize.xs};
  color: ${theme.colors.text.muted};
  
  background: ${theme.colors.background};
  border-radius: ${theme.borderRadius.md};
  border-left: 3px solid ${theme.colors.primaryLight};
  
  &::before {
    content: '💡 Dica: ';
    font-weight: ${theme.typography.fontWeight.semibold};
  }
`;

const AgroAlert = styled.div`
  margin-top: ${theme.spacing[2]};
  padding: ${theme.spacing[2]} ${theme.spacing[3]};
  
  font-size: ${theme.typography.fontSize.xs};
  color: #16A34A;
  
  background: rgba(34, 197, 94, 0.08);
  border-radius: ${theme.borderRadius.md};
  border-left: 3px solid #22C55E;
  
  &::before {
    content: '🌾 Agro: ';
    font-weight: ${theme.typography.fontWeight.semibold};
  }
`;

const NoResults = styled.div`
  text-align: center;
  padding: ${theme.spacing[6]};
  color: ${theme.colors.text.muted};
  font-size: ${theme.typography.fontSize.sm};
`;

// === TYPES ===

type GlossaryCategory = 'all' | 'temperature' | 'radiation' | 'wind';

interface GlossaryTerm {
  code: string;
  name: string;
  description: string;
  tip?: string;
  agroNote?: string;
  category: GlossaryCategory;
}

// === GLOSSARY DATA ===

const CATEGORIES = [
  { id: 'all' as const, label: 'Todos', icon: '📋' },
  { id: 'temperature' as const, label: 'Temperatura', icon: '🌡️' },
  { id: 'radiation' as const, label: 'Radiação/Pressão', icon: '☀️' },
  { id: 'wind' as const, label: 'Vento/Chuva', icon: '🌬️' },
];

const GLOSSARY_TERMS: GlossaryTerm[] = [
  // Temperatura e Umidade
  {
    code: 'TEM_INS',
    name: 'Temperatura Instantânea',
    description: 'É a temperatura do ar registrada no momento exato da leitura do sensor.',
    category: 'temperature',
  },
  {
    code: 'TEM_MAX / TEM_MIN',
    name: 'Temperatura Máxima/Mínima',
    description: 'Os valores mais altos e mais baixos registrados no intervalo de uma hora. Essencial para calcular a amplitude térmica diária.',
    agroNote: 'Use para calcular Graus-Dia (GDD) e identificar estresse térmico em plantas.',
    category: 'temperature',
  },
  {
    code: 'PTO_INS',
    name: 'Ponto de Orvalho',
    description: 'A temperatura na qual o ar precisa ser resfriado para que o vapor de água se condense. Se estiver próximo da Temperatura Instantânea, a umidade está altíssima (perto de 100%).',
    tip: 'Valores próximos à temperatura do ar indicam risco de geada ou orvalho intenso.',
    agroNote: 'Indicador crucial para prever geadas e desenvolvimento de fungos em plantações.',
    category: 'temperature',
  },
  {
    code: 'UMD_INS',
    name: 'Umidade Relativa',
    description: 'A quantidade de vapor de água no ar em relação ao máximo que o ar poderia reter naquela temperatura.',
    tip: 'Valores abaixo de 30% indicam estado de atenção para saúde e manejo hídrico.',
    agroNote: 'Umidade acima de 90% por períodos prolongados aumenta o risco de doenças fúngicas.',
    category: 'temperature',
  },

  // Radiação e Pressão
  {
    code: 'RAD_GLO',
    name: 'Radiação Global',
    description: 'Mede a energia solar que atinge a superfície, em kJ/m². É o principal dado para calcular a Evapotranspiração.',
    tip: 'No gráfico, use o eixo Y secundário para melhor visualização junto com temperatura.',
    agroNote: 'Determina o quanto a planta "bebe" e perde de água para a atmosfera.',
    category: 'radiation',
  },
  {
    code: 'PRE_INS',
    name: 'Pressão Atmosférica',
    description: 'O "peso" do ar sobre nós, medido em milibares (mB). Quedas bruscas geralmente indicam chegada de frentes frias ou tempestades.',
    tip: 'Quedas de mais de 3 mB em 3 horas podem indicar tempestade se aproximando.',
    category: 'radiation',
  },

  // Vento e Chuva
  {
    code: 'CHUVA',
    name: 'Precipitação',
    description: 'Quantidade de chuva acumulada em milímetros (mm). No sistema, você pode ver o acumulado por dia, semana ou mês.',
    agroNote: 'Fundamental para balanço hídrico e decisões de irrigação.',
    category: 'wind',
  },
  {
    code: 'VEN_VEL',
    name: 'Velocidade do Vento',
    description: 'Velocidade média do vento medida em m/s. Influencia a evapotranspiração e dispersão de defensivos agrícolas.',
    agroNote: 'Velocidades acima de 3 m/s podem comprometer a eficiência de pulverizações.',
    category: 'wind',
  },
  {
    code: 'VEN_RAJ',
    name: 'Rajada de Vento',
    description: 'Velocidade máxima instantânea do vento em m/s. Importante para avaliar riscos de danos às culturas.',
    tip: 'Rajadas acima de 15 m/s podem causar acamamento em milho e trigo.',
    agroNote: 'Avalie riscos de tombamento de culturas e estruturas de estufas.',
    category: 'wind',
  },

  // Indicadores Calculados
  {
    code: 'GDD',
    name: 'Graus-Dia de Crescimento',
    description: 'Acúmulo de temperaturas médias diárias acima de uma temperatura base. Mede o calor disponível para o desenvolvimento das plantas.',
    tip: 'Para milho: Base 10°C, Corte 30°C. O milho precisa de ~2.700 GDD do plantio à maturidade.',
    agroNote: 'Usado para prever estágios fenológicos e agendar aplicações de defensivos.',
    category: 'temperature',
  },
];

// === COMPONENT ===

export function Glossary() {
  const [activeCategory, setActiveCategory] = useState<GlossaryCategory>('all');

  const filteredTerms = GLOSSARY_TERMS.filter(
    term => activeCategory === 'all' || term.category === activeCategory
  );

  return (
    <Container>
      <FilterContainer>
        {CATEGORIES.map(cat => (
          <FilterButton
            key={cat.id}
            $isActive={activeCategory === cat.id}
            onClick={() => setActiveCategory(cat.id)}
          >
            <span>{cat.icon}</span>
            {cat.label}
          </FilterButton>
        ))}
      </FilterContainer>

      <TermsList>
        {filteredTerms.length === 0 ? (
          <NoResults>Nenhum termo encontrado nesta categoria.</NoResults>
        ) : (
          filteredTerms.map((term) => (
            <GlossaryCard key={term.code}>
              <TermHeader>
                <TermBadge>{term.code}</TermBadge>
                <TermName>{term.name}</TermName>
              </TermHeader>
              <TermDescription>{term.description}</TermDescription>
              {term.tip && <TermTip>{term.tip}</TermTip>}
              {term.agroNote && <AgroAlert>{term.agroNote}</AgroAlert>}
            </GlossaryCard>
          ))
        )}
      </TermsList>
    </Container>
  );
}