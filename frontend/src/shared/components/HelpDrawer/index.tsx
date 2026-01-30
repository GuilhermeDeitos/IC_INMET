import { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../design-system';
import { FAQ } from '../FAQ';
import { Glossary } from '../Glossary';

// === STYLED COMPONENTS ===

const Overlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(2px);
  
  opacity: ${({ $isOpen }) => $isOpen ? 1 : 0};
  visibility: ${({ $isOpen }) => $isOpen ? 'visible' : 'hidden'};
  
  transition: opacity ${theme.transitions.duration.normal}, 
              visibility ${theme.transitions.duration.normal};
  
  z-index: 999;
`;

const Drawer = styled.aside<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 450px;
  max-width: 90vw;
  
  display: flex;
  flex-direction: column;
  
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.xl};
  
  transform: translateX(${({ $isOpen }) => $isOpen ? '0' : '100%'});
  transition: transform ${theme.transitions.duration.slow} ${theme.transitions.easing.easeOut};
  
  z-index: 1000;
`;

const DrawerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${theme.spacing[4]} ${theme.spacing[5]};
  
  background: ${theme.colors.primary};
  color: white;
`;

const DrawerTitle = styled.h2`
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.typography.fontWeight.semibold};
  margin: 0;
`;

const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  
  font-size: 1.25rem;
  color: white;
  
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: ${theme.borderRadius.lg};
  cursor: pointer;
  
  transition: background ${theme.transitions.duration.fast};
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const TabsContainer = styled.div`
  display: flex;
  background: ${theme.colors.surface};
  border-bottom: 1px solid ${theme.colors.border};
`;

const Tab = styled.button<{ $isActive: boolean }>`
  flex: 1;
  padding: ${theme.spacing[3]} ${theme.spacing[4]};
  
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.medium};
  color: ${({ $isActive }) => $isActive ? theme.colors.primary : theme.colors.text.secondary};
  
  background: ${({ $isActive }) => $isActive ? theme.colors.background : 'transparent'};
  border: none;
  border-bottom: 2px solid ${({ $isActive }) => $isActive ? theme.colors.primary : 'transparent'};
  cursor: pointer;
  
  transition: all ${theme.transitions.duration.fast};
  
  &:hover {
    color: ${theme.colors.primary};
    background: ${theme.colors.primaryLight};
  }
`;

const DrawerContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${theme.spacing[5]};
  
  /* Custom scrollbar */
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

const QuickLink = styled.a`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[3]};
  padding: ${theme.spacing[4]};
  margin-top: ${theme.spacing[4]};
  
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.text.secondary};
  text-decoration: none;
  
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.lg};
  
  transition: all ${theme.transitions.duration.fast};
  
  &:hover {
    color: ${theme.colors.primary};
    border-color: ${theme.colors.primary};
    background: ${theme.colors.primaryLight};
  }
  
  span:first-child {
    font-size: 1.25rem;
  }
`;

// === TYPES ===

type TabType = 'faq' | 'glossary';

interface HelpDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAbout?: () => void;
}

// === COMPONENT ===

export function HelpDrawer({ isOpen, onClose, onOpenAbout }: HelpDrawerProps) {
  const [activeTab, setActiveTab] = useState<TabType>('faq');

  return (
    <>
      <Overlay $isOpen={isOpen} onClick={onClose} />
      
      <Drawer $isOpen={isOpen}>
        <DrawerHeader>
          <DrawerTitle>Central de Ajuda</DrawerTitle>
          <CloseButton onClick={onClose} aria-label="Fechar">
            ✕
          </CloseButton>
        </DrawerHeader>

        <TabsContainer>
          <Tab
            $isActive={activeTab === 'faq'}
            onClick={() => setActiveTab('faq')}
          >
            ❓ Perguntas Frequentes
          </Tab>
          <Tab
            $isActive={activeTab === 'glossary'}
            onClick={() => setActiveTab('glossary')}
          >
            📚 Glossário
          </Tab>
        </TabsContainer>

        <DrawerContent>
          {activeTab === 'faq' ? <FAQ /> : <Glossary />}
          
          {onOpenAbout && (
            <QuickLink href="#" onClick={(e) => { e.preventDefault(); onOpenAbout(); }}>
              <span>ℹ️</span>
              <div>
                <strong>Sobre o Projeto</strong>
                <br />
                Conheça a história e os diferenciais técnicos
              </div>
            </QuickLink>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}