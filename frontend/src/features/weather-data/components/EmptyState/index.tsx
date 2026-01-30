import styled from 'styled-components';
import { theme } from '../../../../shared/design-system';
import { fadeIn } from '../../../../shared/design-system/animations';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing[16]} ${theme.spacing[8]};
  
  text-align: center;
  animation: ${fadeIn} 500ms ease-out;
`;

const Illustration = styled.div`
  margin-bottom: ${theme.spacing[6]};
  opacity: 0.8;
`;

const Title = styled.h2`
  font-size: ${theme.typography.fontSize.xl};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.text.primary};
  margin: 0 0 ${theme.spacing[2]};
`;

const Description = styled.p`
  font-size: ${theme.typography.fontSize.base};
  color: ${theme.colors.text.secondary};
  margin: 0;
  max-width: 360px;
`;

// SVG Illustration - Atmosfera/Dados
const WeatherIllustration = () => (
  <svg width="200" height="160" viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Cloud 1 */}
    <path 
      d="M60 60C60 46.7452 70.7452 36 84 36C94.4 36 103.2 42.8 106.4 52C108 51.2 109.9 50.8 112 50.8C120.8 50.8 128 58 128 66.8C128 67.6 128 68.4 127.8 69.2C134.2 71.6 138.8 77.8 138.8 85C138.8 94.4 131.2 102 121.8 102H68C55.2 102 44.8 91.6 44.8 78.8C44.8 68 52.4 59 62 56.8C60.8 54.6 60 52.4 60 50V60Z" 
      fill="#E2E8F0"
    />
    {/* Cloud 2 */}
    <path 
      d="M140 80C140 70.06 148.06 62 158 62C165.8 62 172.4 67 175.2 74C176.4 73.4 177.8 73.2 179.2 73.2C185.6 73.2 191 78.6 191 85C191 85.6 191 86.2 190.8 86.8C195.4 88.6 198.6 93.2 198.6 98.6C198.6 105.6 192.8 111.4 185.8 111.4H147C137.06 111.4 129 103.34 129 93.4C129 85.2 134.6 78.2 142 76.6C141.2 75 140.6 73.2 140.4 71.4" 
      fill="#F1F5F9"
    />
    {/* Sun rays */}
    <circle cx="100" cy="100" r="24" fill="#FCD34D" opacity="0.3"/>
    <circle cx="100" cy="100" r="16" fill="#FCD34D" opacity="0.5"/>
    <circle cx="100" cy="100" r="8" fill="#F59E0B"/>
    
    {/* Data lines */}
    <rect x="30" y="120" width="140" height="4" rx="2" fill="#E2E8F0"/>
    <rect x="30" y="130" width="100" height="4" rx="2" fill="#E2E8F0"/>
    <rect x="30" y="140" width="120" height="4" rx="2" fill="#E2E8F0"/>
    
    {/* Accent dots */}
    <circle cx="20" cy="122" r="4" fill="#6366F1"/>
    <circle cx="20" cy="132" r="4" fill="#6366F1" opacity="0.6"/>
    <circle cx="20" cy="142" r="4" fill="#6366F1" opacity="0.3"/>
  </svg>
);

interface EmptyStateProps {
  title?: string;
  description?: string;
}

export function EmptyState({ 
  title = 'Selecione os filtros',
  description = 'Configure a estação, período e frequência no painel lateral para visualizar os dados meteorológicos.'
}: EmptyStateProps) {
  return (
    <Container>
      <Illustration>
        <WeatherIllustration />
      </Illustration>
      <Title>{title}</Title>
      <Description>{description}</Description>
    </Container>
  );
}