import { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../../../shared/design-system';
import { MenuIcon, HelpIcon, InfoIcon } from '../../../../shared/components/Icons';
import { HelpDrawer } from '../../../../shared/components/HelpDrawer';
import { AboutModal } from '../../../../shared/components/AboutModal';

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 64px;
  
  display: flex;
  align-items: center;
  padding: 0 ${theme.spacing[6]};
  gap: ${theme.spacing[4]};
  
  background: ${theme.colors.primary};
  color: ${theme.colors.text.inverse};
  box-shadow: ${theme.shadows.md};
  
  z-index: 30;
`;

const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: ${theme.borderRadius.lg};
  color: inherit;
  cursor: pointer;
  
  transition: background ${theme.transitions.duration.fast};
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const Title = styled.h1`
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.typography.fontWeight.semibold};
  margin: 0;
  
  span {
    font-weight: ${theme.typography.fontWeight.normal};
    opacity: 0.8;
  }
`;

const Spacer = styled.div`
  flex: 1;
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[2]};
`;

interface AppBarProps {
  onMenuClick: () => void;
}

export function AppBar({ onMenuClick }: AppBarProps) {
  const [helpOpen, setHelpOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  return (
    <>
      <Header>
        <IconButton onClick={onMenuClick} aria-label="Abrir menu">
          <MenuIcon />
        </IconButton>
        
        <Title>
          INMET <span>— Dados Meteorológicos</span>
        </Title>
        
        <Spacer />
        
        <HeaderActions>
          <IconButton 
            onClick={() => setAboutOpen(true)} 
            aria-label="Sobre o projeto"
            title="Sobre o Projeto"
          >
            <InfoIcon />
          </IconButton>
          
          <IconButton 
            onClick={() => setHelpOpen(true)} 
            aria-label="Ajuda"
            title="Ajuda e FAQ"
          >
            <HelpIcon />
          </IconButton>
        </HeaderActions>
      </Header>

      <HelpDrawer 
        isOpen={helpOpen} 
        onClose={() => setHelpOpen(false)}
        onOpenAbout={() => {
          setHelpOpen(false);
          setAboutOpen(true);
        }}
      />

      <AboutModal 
        isOpen={aboutOpen}
        onClose={() => setAboutOpen(false)}
      />
    </>
  );
}