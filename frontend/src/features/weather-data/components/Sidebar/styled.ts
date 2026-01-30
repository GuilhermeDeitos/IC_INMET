import styled, { css } from 'styled-components';
import { theme } from '../../../../shared/design-system';
import { slideInFromLeft, fadeIn } from '../../../../shared/design-system/animations';

export const SidebarOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.4);
  backdrop-filter: blur(4px);
  z-index: 40;
  
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  transition: all ${theme.transitions.duration.normal};
`;

export const SidebarContainer = styled.aside<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 340px;
  max-width: 100vw;
  
  display: flex;
  flex-direction: column;
  
  /* Glassmorphism */
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-right: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: ${theme.shadows.glass};
  
  z-index: 50;
  
  transform: translateX(${({ isOpen }) => (isOpen ? '0' : '-100%')});
  transition: transform ${theme.transitions.duration.slow} ${theme.transitions.easing.easeInOut};
  
  ${({ isOpen }) => isOpen && css`
    animation: ${slideInFromLeft} 300ms ease-out;
  `}
`;

export const SidebarHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${theme.spacing[5]};
  border-bottom: 1px solid ${theme.colors.border};
  flex-shrink: 0;
`;

export const SidebarTitle = styled.h2`
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.text.primary};
  margin: 0;
`;

export const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  
  background: transparent;
  border: none;
  border-radius: ${theme.borderRadius.lg};
  color: ${theme.colors.text.secondary};
  cursor: pointer;
  
  transition: all ${theme.transitions.duration.fast};
  
  &:hover {
    background: ${theme.colors.surface};
    color: ${theme.colors.text.primary};
  }
`;

export const SidebarContent = styled.div`
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

export const SidebarSection = styled.section`
  margin-bottom: ${theme.spacing[6]};
  
  animation: ${fadeIn} 300ms ease-out;
  animation-fill-mode: both;
  
  &:nth-child(1) { animation-delay: 50ms; }
  &:nth-child(2) { animation-delay: 100ms; }
  &:nth-child(3) { animation-delay: 150ms; }
`;

export const SectionTitle = styled.h3`
  font-size: ${theme.typography.fontSize.xs};
  font-weight: ${theme.typography.fontWeight.semibold};
  text-transform: uppercase;
  letter-spacing: ${theme.typography.letterSpacing.wider};
  color: ${theme.colors.text.muted};
  margin: 0 0 ${theme.spacing[3]};
`;

export const TabGroup = styled.div`
  display: flex;
  background: ${theme.colors.surfaceHover};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing[1]};
`;

export const Tab = styled.button<{ isActive: boolean }>`
  flex: 1;
  padding: ${theme.spacing[2]} ${theme.spacing[3]};
  
  font-family: ${theme.typography.fontFamily.sans};
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.medium};
  
  border: none;
  border-radius: ${theme.borderRadius.md};
  cursor: pointer;
  
  transition: all ${theme.transitions.duration.fast};
  
  ${({ isActive }) => isActive
    ? css`
        background: ${theme.colors.background};
        color: ${theme.colors.primary};
        box-shadow: ${theme.shadows.sm};
      `
    : css`
        background: transparent;
        color: ${theme.colors.text.secondary};
        
        &:hover {
          color: ${theme.colors.text.primary};
        }
      `
  }
`;

export const FieldGroup = styled.div`
  margin-bottom: ${theme.spacing[4]};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

/* Footer fixo na parte inferior */
export const SidebarFooter = styled.footer`
  padding: ${theme.spacing[5]};
  border-top: 1px solid ${theme.colors.border};
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  flex-shrink: 0;
`;