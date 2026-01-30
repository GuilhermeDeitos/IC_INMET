import { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { theme } from '../../design-system';



const slideUp = keyframes`
  from { 
    opacity: 0; 
    transform: translateY(20px) scale(0.98); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0) scale(1); 
  }
`;

// === STYLED COMPONENTS ===

const Overlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  inset: 0;
  
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing[4]};
  
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  
  opacity: ${({ $isOpen }) => $isOpen ? 1 : 0};
  visibility: ${({ $isOpen }) => $isOpen ? 'visible' : 'hidden'};
  
  transition: opacity 250ms ease, visibility 250ms ease;
  z-index: 999;
`;

const ModalContainer = styled.div<{ $isOpen: boolean }>`
  width: 100%;
  max-width: 720px;
  max-height: 90vh;
  
  background: ${theme.colors.background};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.xl};
  box-shadow: 
    0 25px 50px -12px rgba(0, 0, 0, 0.25),
    0 0 0 1px rgba(255, 255, 255, 0.05);
  
  overflow: hidden;
  
  animation: ${({ $isOpen }) => $isOpen ? slideUp : 'none'} 300ms ease-out;
`;

// Header
const ModalHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${theme.spacing[5]} ${theme.spacing[6]};
  
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid ${theme.colors.border};
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[3]};
`;

const LogoMark = styled.div`
  width: 40px;
  height: 40px;
  
  display: flex;
  align-items: center;
  justify-content: center;
  
  background: ${theme.colors.text.primary};
  border-radius: ${theme.borderRadius.lg};
  
  svg {
    color: white;
  }
`;

const HeaderText = styled.div``;

const ModalTitle = styled.h2`
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.text.primary};
  margin: 0;
  letter-spacing: ${theme.typography.letterSpacing.tight};
`;

const VersionBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing[1]};
  margin-top: 2px;
  
  font-size: ${theme.typography.fontSize.xs};
  font-weight: ${theme.typography.fontWeight.medium};
  color: ${theme.colors.text.muted};
  
  &::before {
    content: '';
    width: 6px;
    height: 6px;
    background: #22C55E;
    border-radius: 50%;
  }
`;

const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  
  color: ${theme.colors.text.secondary};
  
  background: transparent;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.lg};
  cursor: pointer;
  
  transition: all ${theme.transitions.duration.fast};
  
  &:hover {
    background: ${theme.colors.surface};
    color: ${theme.colors.text.primary};
    border-color: ${theme.colors.text.muted};
  }
`;

// Content
const ModalContent = styled.div`
  overflow-y: auto;
  max-height: calc(90vh - 180px);
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${theme.colors.border};
    border-radius: ${theme.borderRadius.full};
  }
`;

// Intro Section
const IntroSection = styled.section`
  padding: ${theme.spacing[6]};
  border-bottom: 1px solid ${theme.colors.border};
`;

const InstitutionRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[2]};
  margin-bottom: ${theme.spacing[4]};
`;

const InstitutionTag = styled.span`
  font-size: ${theme.typography.fontSize.xs};
  font-weight: ${theme.typography.fontWeight.medium};
  color: ${theme.colors.text.muted};
  text-transform: uppercase;
  letter-spacing: ${theme.typography.letterSpacing.wider};
`;

const Divider = styled.span`
  width: 1px;
  height: 12px;
  background: ${theme.colors.border};
`;

const IntroTitle = styled.h3`
  font-size: ${theme.typography.fontSize.xl};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.text.primary};
  margin: 0 0 ${theme.spacing[3]};
  line-height: ${theme.typography.lineHeight.tight};
`;

const IntroText = styled.p`
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.text.secondary};
  line-height: ${theme.typography.lineHeight.relaxed};
  margin: 0;
  max-width: 560px;
`;

// Problem/Solution Grid
const DualGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1px;
  background: ${theme.colors.border};
  border-top: 1px solid ${theme.colors.border};
  border-bottom: 1px solid ${theme.colors.border};
  
  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

const GridCard = styled.div<{ $variant: 'problem' | 'solution' }>`
  padding: ${theme.spacing[5]};
  background: ${theme.colors.background};
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[2]};
  margin-bottom: ${theme.spacing[3]};
`;

const CardIcon = styled.div<{ $variant: 'problem' | 'solution' }>`
  width: 32px;
  height: 32px;
  
  display: flex;
  align-items: center;
  justify-content: center;
  
  color: ${({ $variant }) => $variant === 'problem' ? '#DC2626' : '#16A34A'};
  background: ${({ $variant }) => $variant === 'problem' ? '#FEF2F2' : '#F0FDF4'};
  border-radius: ${theme.borderRadius.md};
`;

const CardLabel = styled.span<{ $variant: 'problem' | 'solution' }>`
  font-size: ${theme.typography.fontSize.xs};
  font-weight: ${theme.typography.fontWeight.semibold};
  text-transform: uppercase;
  letter-spacing: ${theme.typography.letterSpacing.wider};
  color: ${({ $variant }) => $variant === 'problem' ? '#DC2626' : '#16A34A'};
`;

const CardTitle = styled.h4`
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.text.primary};
  margin: 0 0 ${theme.spacing[2]};
`;

const CardText = styled.p`
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.text.secondary};
  line-height: ${theme.typography.lineHeight.relaxed};
  margin: 0;
`;

// Pipeline Section
const PipelineSection = styled.section`
  padding: ${theme.spacing[6]};
  border-bottom: 1px solid ${theme.colors.border};
`;

const SectionLabel = styled.span`
  display: block;
  font-size: ${theme.typography.fontSize.xs};
  font-weight: ${theme.typography.fontWeight.semibold};
  text-transform: uppercase;
  letter-spacing: ${theme.typography.letterSpacing.wider};
  color: ${theme.colors.text.muted};
  margin-bottom: ${theme.spacing[4]};
`;

const PipelineSteps = styled.div`
  display: flex;
  align-items: stretch;
  gap: ${theme.spacing[3]};
  
  @media (max-width: 560px) {
    flex-direction: column;
  }
`;

const PipelineStep = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: ${theme.spacing[4]};
  
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.lg};
  
  transition: all ${theme.transitions.duration.fast};
  
  &:hover {
    border-color: ${theme.colors.text.muted};
    box-shadow: ${theme.shadows.sm};
  }
`;

const StepHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[3]};
  margin-bottom: ${theme.spacing[2]};
`;

const StepNumber = styled.span`
  font-size: ${theme.typography.fontSize.xs};
  font-weight: ${theme.typography.fontWeight.bold};
  font-family: ${theme.typography.fontFamily.mono};
  color: ${theme.colors.text.muted};
`;

const StepIcon = styled.div`
  width: 36px;
  height: 36px;
  
  display: flex;
  align-items: center;
  justify-content: center;
  
  color: ${theme.colors.text.secondary};
  background: ${theme.colors.background};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
`;

const StepTitle = styled.h5`
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.text.primary};
  margin: 0;
`;

const StepDescription = styled.p`
  font-size: ${theme.typography.fontSize.xs};
  color: ${theme.colors.text.muted};
  line-height: ${theme.typography.lineHeight.relaxed};
  margin: ${theme.spacing[2]} 0 0;
`;

const PipelineConnector = styled.div`
  display: flex;
  align-items: center;
  color: ${theme.colors.border};
  
  @media (max-width: 560px) {
    justify-content: center;
    transform: rotate(90deg);
    margin: -${theme.spacing[2]} 0;
  }
`;

// Quote Section
const QuoteSection = styled.section`
  padding: ${theme.spacing[5]} ${theme.spacing[6]};
  background: ${theme.colors.surface};
  border-bottom: 1px solid ${theme.colors.border};
`;

const Quote = styled.blockquote`
  position: relative;
  margin: 0;
  padding-left: ${theme.spacing[4]};
  border-left: 2px solid ${theme.colors.text.muted};
  
  font-size: ${theme.typography.fontSize.sm};
  font-style: italic;
  color: ${theme.colors.text.secondary};
  line-height: ${theme.typography.lineHeight.relaxed};
`;

const QuoteSource = styled.cite`
  display: block;
  margin-top: ${theme.spacing[2]};
  font-size: ${theme.typography.fontSize.xs};
  font-style: normal;
  font-weight: ${theme.typography.fontWeight.medium};
  color: ${theme.colors.text.muted};
`;

// Footer
const ModalFooter = styled.footer`
  padding: ${theme.spacing[5]} ${theme.spacing[6]};
  background: ${theme.colors.background};
`;

const ResearcherRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${theme.spacing[4]};
  
  @media (max-width: 560px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const ResearcherInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[3]};
`;

const ResearcherAvatar = styled.div`
  width: 48px;
  height: 48px;
  
  display: flex;
  align-items: center;
  justify-content: center;
  
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.text.inverse};
  
  background: linear-gradient(135deg, #1E293B 0%, #334155 100%);
  border-radius: ${theme.borderRadius.lg};
`;

const ResearcherDetails = styled.div``;

const ResearcherName = styled.h4`
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.text.primary};
  margin: 0;
`;

const ResearcherRole = styled.p`
  font-size: ${theme.typography.fontSize.xs};
  color: ${theme.colors.text.muted};
  margin: 2px 0 0;
`;

const LinksRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[2]};
`;

const ExternalLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing[2]};
  padding: ${theme.spacing[2]} ${theme.spacing[4]};
  
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.medium};
  text-decoration: none;
  
  border-radius: ${theme.borderRadius.lg};
  cursor: pointer;
  
  transition: all ${theme.transitions.duration.fast};
`;

const PrimaryLink = styled(ExternalLink)`
  color: white;
  background: ${theme.colors.text.primary};
  border: 1px solid ${theme.colors.text.primary};
  
  &:hover {
    background: #334155;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const SecondaryLink = styled(ExternalLink)`
  color: ${theme.colors.text.secondary};
  background: transparent;
  border: 1px solid ${theme.colors.border};
  
  &:hover {
    color: ${theme.colors.text.primary};
    border-color: ${theme.colors.text.muted};
    background: ${theme.colors.surface};
    transform: translateY(-2px);
  }
`;

const IconLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  
  color: ${theme.colors.text.muted};
  background: transparent;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.lg};
  
  transition: all ${theme.transitions.duration.fast};
  
  &:hover {
    color: #0A66C2;
    border-color: #0A66C2;
    background: rgba(10, 102, 194, 0.05);
    transform: translateY(-2px);
  }
`;

// === ICONS (SVG inline para não depender de biblioteca externa) ===

const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

const DataIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M3 5v14a9 3 0 0 0 18 0V5" />
    <path d="M3 12a9 3 0 0 0 18 0" />
  </svg>
);

const AlertIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 8v4M12 16h.01" />
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const CloudIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
  </svg>
);

const SettingsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const ChartIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 3v18h18" />
    <path d="m19 9-5 5-4-4-3 3" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const ExternalIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

// === COMPONENT ===

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AboutModal({ isOpen, onClose }: AboutModalProps) {
  // Fechar com ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <Overlay $isOpen={isOpen} onClick={handleOverlayClick}>
      <ModalContainer $isOpen={isOpen}>
        {/* Header */}
        <ModalHeader>
          <HeaderLeft>
            <LogoMark>
              <DataIcon />
            </LogoMark>
            <HeaderText>
              <ModalTitle>Sobre o Projeto</ModalTitle>
              <VersionBadge>Versão Acadêmica 1.0</VersionBadge>
            </HeaderText>
          </HeaderLeft>
          <CloseButton onClick={onClose} aria-label="Fechar">
            <CloseIcon />
          </CloseButton>
        </ModalHeader>

        <ModalContent>
          {/* Intro */}
          <IntroSection>
            <InstitutionRow>
              <InstitutionTag>Unioeste</InstitutionTag>
              <Divider />
              <InstitutionTag>CCET</InstitutionTag>
              <Divider />
              <InstitutionTag>Iniciação Científica</InstitutionTag>
            </InstitutionRow>
            <IntroTitle>
              Plataforma de Acesso a Dados Meteorológicos do INMET
            </IntroTitle>
            <IntroText>
              Sistema desenvolvido para superar as limitações de consulta do portal oficial, 
              permitindo análises históricas extensas e processamento automatizado de dados 
              climáticos para aplicações agrícolas e científicas.
            </IntroText>
          </IntroSection>

          {/* Problem / Solution */}
          <DualGrid>
            <GridCard $variant="problem">
              <CardHeader>
                <CardIcon $variant="problem">
                  <AlertIcon />
                </CardIcon>
                <CardLabel $variant="problem">Limitação</CardLabel>
              </CardHeader>
              <CardTitle>Restrição de 6 meses por consulta</CardTitle>
              <CardText>
                O portal do INMET limita as consultas a intervalos de seis meses, 
                dificultando análises históricas e correlações de longo prazo.
              </CardText>
            </GridCard>

            <GridCard $variant="solution">
              <CardHeader>
                <CardIcon $variant="solution">
                  <CheckIcon />
                </CardIcon>
                <CardLabel $variant="solution">Solução</CardLabel>
              </CardHeader>
              <CardTitle>Consultas sem limitação temporal</CardTitle>
              <CardText>
                Processamento de grandes volumes de dados via API REST, 
                com agregações automáticas e exportação em múltiplos formatos.
              </CardText>
            </GridCard>
          </DualGrid>

          {/* Pipeline */}
          <PipelineSection>
            <SectionLabel>Fluxo de Dados</SectionLabel>
            <PipelineSteps>
              <PipelineStep>
                <StepHeader>
                  <StepNumber>01</StepNumber>
                  <StepIcon>
                    <CloudIcon />
                  </StepIcon>
                </StepHeader>
                <StepTitle>Extração via API</StepTitle>
                <StepDescription>
                  Conexão direta com o banco de dados oficial do INMET através de API REST.
                </StepDescription>
              </PipelineStep>

              <PipelineConnector>
                <ArrowRightIcon />
              </PipelineConnector>

              <PipelineStep>
                <StepHeader>
                  <StepNumber>02</StepNumber>
                  <StepIcon>
                    <SettingsIcon />
                  </StepIcon>
                </StepHeader>
                <StepTitle>Tratamento de Dados</StepTitle>
                <StepDescription>
                  Algoritmos de agregação que transformam dados horários em resumos diários, semanais e mensais.
                </StepDescription>
              </PipelineStep>

              <PipelineConnector>
                <ArrowRightIcon />
              </PipelineConnector>

              <PipelineStep>
                <StepHeader>
                  <StepNumber>03</StepNumber>
                  <StepIcon>
                    <ChartIcon />
                  </StepIcon>
                </StepHeader>
                <StepTitle>Análise Visual</StepTitle>
                <StepDescription>
                  Gráficos interativos e indicadores agrícolas para suporte à decisão.
                </StepDescription>
              </PipelineStep>
            </PipelineSteps>
          </PipelineSection>

          {/* Quote */}
          <QuoteSection>
            <Quote>
              "A ferramenta representa uma contribuição significativa para o acesso 
              automatizado a dados meteorológicos e poderá servir de base para futuras 
              expansões e integrações com sistemas de apoio à decisão agrícola."
              <QuoteSource>— Resumo Expandido, ICV/PRPPG/Unioeste</QuoteSource>
            </Quote>
          </QuoteSection>
        </ModalContent>

        {/* Footer */}
        <ModalFooter>
          <ResearcherRow>
            <ResearcherInfo>
              <ResearcherAvatar>GD</ResearcherAvatar>
              <ResearcherDetails>
                <ResearcherName>Guilherme Augusto Deitos Alves</ResearcherName>
                <ResearcherRole>
                  Bolsista ICV/PRPPG • Orientação: Profa. Dra. Adriana Postal
                </ResearcherRole>
              </ResearcherDetails>
            </ResearcherInfo>

            <LinksRow>
              <IconLink 
                href="https://www.linkedin.com/in/guilhermedeitos/" 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <LinkedInIcon />
              </IconLink>
              
              <SecondaryLink 
                href="http://lattes.cnpq.br/6399928456538096" 
                target="_blank"
                rel="noopener noreferrer"
              >
                Lattes
                <ExternalIcon />
              </SecondaryLink>
              
              <PrimaryLink 
                href="https://guilhermedeitosdev.vercel.app" 
                target="_blank"
                rel="noopener noreferrer"
              >
                Portfólio
                <ExternalIcon />
              </PrimaryLink>
            </LinksRow>
          </ResearcherRow>
        </ModalFooter>
      </ModalContainer>
    </Overlay>
  );
}