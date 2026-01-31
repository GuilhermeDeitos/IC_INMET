import styled, { keyframes } from 'styled-components';
import { theme } from '../../../../shared/design-system';
import LogoImage from '../../../../assets/Logo.svg';

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing[16]} ${theme.spacing[8]};
  min-height: 60vh;
  
  text-align: center;
`;

const LogoSection = styled.div`
  margin-bottom: ${theme.spacing[8]};
  animation: ${float} 4s ease-in-out infinite;
`;

const Logo = styled.img`
  height: 80px;
  width: auto;
  margin-bottom: ${theme.spacing[4]};
`;

const BrandName = styled.h1`
  font-size: 3rem;
  font-weight: ${theme.typography.fontWeight.bold};
  letter-spacing: ${theme.typography.letterSpacing.tight};
  margin: 0 0 ${theme.spacing[2]};
  
  .uni {
    font-weight: 800;
    color: ${theme.colors.text.primary};
  }
  
  .met {
    font-weight: 300;
    color: ${theme.colors.primary};
  }
`;

const Slogan = styled.p`
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.typography.fontWeight.medium};
  color: ${theme.colors.text.secondary};
  margin: 0 0 ${theme.spacing[10]};
  max-width: 400px;
`;

const Divider = styled.div`
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, ${theme.colors.primary}, #38BDF8);
  border-radius: ${theme.borderRadius.full};
  margin-bottom: ${theme.spacing[10]};
`;

const InstructionCard = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[4]};
  padding: ${theme.spacing[5]} ${theme.spacing[6]};
  
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.xl};
  
  max-width: 480px;
`;

const InstructionIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  
  background: ${theme.colors.primaryLight};
  border-radius: ${theme.borderRadius.lg};
  color: ${theme.colors.primary};
`;

const InstructionText = styled.div`
  text-align: left;
`;

const InstructionTitle = styled.h3`
  font-size: ${theme.typography.fontSize.base};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.text.primary};
  margin: 0 0 ${theme.spacing[1]};
`;

const InstructionDescription = styled.p`
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.text.secondary};
  margin: 0;
`;

// Menu Icon SVG
const MenuIconSvg = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

interface EmptyStateProps {
  title?: string;
  description?: string;
}

export function EmptyState({ 
  title,
  description
}: EmptyStateProps) {
  return (
    <Container>
      <LogoSection>
        <BrandName>
          <span className="uni">UNI</span>
          <span className="met">MET</span>
        </BrandName>
        <Slogan>Dados climáticos para ciência e agricultura.</Slogan>
      </LogoSection>
      
      <Divider />
      
      <InstructionCard>
        <InstructionIcon>
          <MenuIconSvg />
        </InstructionIcon>
        <InstructionText>
          <InstructionTitle>Comece sua consulta</InstructionTitle>
          <InstructionDescription>
            Clique no menu para configurar a estação, período e frequência dos dados meteorológicos.
          </InstructionDescription>
        </InstructionText>
      </InstructionCard>
    </Container>
  );
}