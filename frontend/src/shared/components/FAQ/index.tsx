import { useState, useMemo } from 'react';
import styled from 'styled-components';
import { theme } from '../../design-system';
import { fadeInUp } from '../../design-system/animations';

// === STYLED COMPONENTS ===

const Container = styled.div`
  animation: ${fadeInUp} 300ms ease-out;
`;

const SearchContainer = styled.div`
  margin-bottom: ${theme.spacing[6]};
`;

const SearchInput = styled.input`
  width: 100%;
  padding: ${theme.spacing[3]} ${theme.spacing[4]};
  padding-left: ${theme.spacing[10]};
  
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.text.primary};
  
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.xl};
  
  transition: all ${theme.transitions.duration.fast};
  
  &::placeholder {
    color: ${theme.colors.text.muted};
  }
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px ${theme.colors.primaryLight};
  }
`;

const SearchWrapper = styled.div`
  position: relative;
  
  &::before {
    content: '🔍';
    position: absolute;
    left: ${theme.spacing[4]};
    top: 50%;
    transform: translateY(-50%);
    font-size: 1rem;
    opacity: 0.5;
  }
`;

const CategorySection = styled.div`
  margin-bottom: ${theme.spacing[6]};
`;

const CategoryTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[2]};
  
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.text.primary};
  text-transform: uppercase;
  letter-spacing: ${theme.typography.letterSpacing.wide};
  
  margin: 0 0 ${theme.spacing[3]};
  padding-bottom: ${theme.spacing[2]};
  border-bottom: 1px solid ${theme.colors.border};
`;

const AccordionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[2]};
`;

const AccordionItem = styled.div`
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.lg};
  overflow: hidden;
  
  transition: all ${theme.transitions.duration.fast};
  
  &:hover {
    border-color: ${theme.colors.primary}40;
  }
`;

const AccordionButton = styled.button<{ $isOpen: boolean }>`
  width: 100%;
  padding: ${theme.spacing[4]};
  
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${theme.spacing[3]};
  
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.medium};
  color: ${theme.colors.text.primary};
  text-align: left;
  
  background: ${({ $isOpen }) => $isOpen ? theme.colors.primaryLight : 'transparent'};
  border: none;
  cursor: pointer;
  
  transition: background ${theme.transitions.duration.fast};
  
  &:hover {
    background: ${theme.colors.primaryLight};
  }
`;

const AccordionIcon = styled.span<{ $isOpen: boolean }>`
  font-size: 0.75rem;
  transition: transform ${theme.transitions.duration.fast};
  transform: rotate(${({ $isOpen }) => $isOpen ? '180deg' : '0deg'});
`;

const AccordionContent = styled.div<{ $isOpen: boolean }>`
  max-height: ${({ $isOpen }) => $isOpen ? '500px' : '0'};
  overflow: hidden;
  transition: max-height ${theme.transitions.duration.slow} ease-out;
`;

const AccordionAnswer = styled.div`
  padding: 0 ${theme.spacing[4]} ${theme.spacing[4]};
  
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.text.secondary};
  line-height: ${theme.typography.lineHeight.relaxed};
`;

const NoResults = styled.div`
  text-align: center;
  padding: ${theme.spacing[8]};
  color: ${theme.colors.text.muted};
  
  span {
    display: block;
    font-size: 2rem;
    margin-bottom: ${theme.spacing[2]};
  }
`;

const HighlightText = styled.mark`
  background: ${theme.colors.primaryLight};
  color: ${theme.colors.text.primary};
  padding: 0 2px;
  border-radius: 2px;
`;

// === TYPES ===

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  title: string;
  icon: string;
  items: FAQItem[];
}

interface FAQProps {
  categories?: FAQCategory[];
}

// === DEFAULT DATA ===

const DEFAULT_FAQ_DATA: FAQCategory[] = [
  {
    title: 'Dados e Fontes',
    icon: '📊',
    items: [
      {
        question: 'De onde vêm as informações meteorológicas?',
        answer: 'Todos os dados são oficiais, provenientes das estações automáticas e manuais do Instituto Nacional de Meteorologia (INMET). Os dados são coletados em tempo real através da API REST oficial.',
      },
      {
        question: 'Por que usar este sistema em vez do portal do INMET?',
        answer: 'Nosso sistema remove a barreira de tempo (limite de 6 meses por consulta no portal oficial), oferece gráficos interativos para pesquisadores agrícolas e exportação de dados já tratados para análise em Excel, R ou Python.',
      },
      {
        question: 'Por que alguns dados aparecem como "—"?',
        answer: 'Isso indica ausência de leitura pelo sensor da estação no momento da medição ou manutenção do equipamento pelo INMET. É um comportamento normal em estações meteorológicas.',
      },
    ],
  },
  {
    title: 'Funcionalidades Agrícolas',
    icon: '🌾',
    items: [
      {
        question: 'Como funciona a agregação semanal e mensal?',
        answer: 'O sistema soma (no caso de chuva/precipitação) ou calcula a média (no caso de temperatura, umidade, etc.) de todos os dados horários dentro do período selecionado, poupando o trabalho manual do pesquisador.',
      },
      {
        question: 'O que são as variáveis "Máxima", "Mínima" e "Instantânea"?',
        answer: 'Refletem o comportamento do sensor: Instantânea é o valor no momento exato da medição, enquanto Máxima/Mínima são os picos registrados no intervalo daquela hora específica.',
      },
      {
        question: 'O que é o "Modo Comparativo"?',
        answer: 'É uma função que permite sobrepor dados de diferentes períodos (anos ou meses) no mesmo gráfico para identificar padrões sazonais e comparar safras.',
      },
      {
        question: 'Como são calculados os Graus-Dia (GDD)?',
        answer: 'O GDD é calculado como a diferença entre a temperatura média diária e uma temperatura base (10°C para milho/soja). Aplicamos ajustes de limite inferior (mín ≥ base) e superior (máx ≤ 30°C) conforme metodologia agrícola padrão.',
      },
    ],
  },
  {
    title: 'Suporte Técnico',
    icon: '⚙️',
    items: [
      {
        question: 'Posso baixar os gráficos como imagem?',
        answer: 'Atualmente, a plataforma permite a exportação dos dados em CSV e XLSX para que você possa gerar seus próprios relatórios e gráficos personalizados em ferramentas como Excel ou R.',
      },
      {
        question: 'O sistema funciona para todas as cidades do Brasil?',
        answer: 'Funciona para todas as localidades que possuem estações meteorológicas (Automáticas ou Manuais) cadastradas no INMET. Use o campo de busca de estações para verificar a disponibilidade na sua região.',
      },
      {
        question: 'Posso usar esses dados em pesquisas acadêmicas?',
        answer: 'Sim! Os dados são oficiais do INMET. Recomendamos citar a fonte original (INMET) e, se desejar, mencionar esta ferramenta como meio de acesso facilitado.',
      },
    ],
  },
];

// === COMPONENT ===

export function FAQ({ categories = DEFAULT_FAQ_DATA }: FAQProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (key: string) => {
    setOpenItems(prev => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  const filteredCategories = useMemo(() => {
    if (!searchTerm.trim()) return categories;

    const term = searchTerm.toLowerCase();
    return categories
      .map(category => ({
        ...category,
        items: category.items.filter(
          item =>
            item.question.toLowerCase().includes(term) ||
            item.answer.toLowerCase().includes(term)
        ),
      }))
      .filter(category => category.items.length > 0);
  }, [categories, searchTerm]);

  const highlightText = (text: string) => {
    if (!searchTerm.trim()) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, i) =>
      regex.test(part) ? <HighlightText key={i}>{part}</HighlightText> : part
    );
  };

  const hasResults = filteredCategories.some(cat => cat.items.length > 0);

  return (
    <Container>
      <SearchContainer>
        <SearchWrapper>
          <SearchInput
            type="text"
            placeholder="Buscar nas perguntas frequentes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchWrapper>
      </SearchContainer>

      {!hasResults ? (
        <NoResults>
          <span>🔍</span>
          Nenhuma pergunta encontrada para "{searchTerm}"
        </NoResults>
      ) : (
        filteredCategories.map((category, catIndex) => (
          <CategorySection key={catIndex}>
            <CategoryTitle>
              <span>{category.icon}</span>
              {category.title}
            </CategoryTitle>
            
            <AccordionList>
              {category.items.map((item, itemIndex) => {
                const key = `${catIndex}-${itemIndex}`;
                const isOpen = openItems.has(key);
                
                return (
                  <AccordionItem key={key}>
                    <AccordionButton
                      $isOpen={isOpen}
                      onClick={() => toggleItem(key)}
                      aria-expanded={isOpen}
                    >
                      {highlightText(item.question)}
                      <AccordionIcon $isOpen={isOpen}>▼</AccordionIcon>
                    </AccordionButton>
                    
                    <AccordionContent $isOpen={isOpen}>
                      <AccordionAnswer>
                        {highlightText(item.answer)}
                      </AccordionAnswer>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </AccordionList>
          </CategorySection>
        ))
      )}
    </Container>
  );
}