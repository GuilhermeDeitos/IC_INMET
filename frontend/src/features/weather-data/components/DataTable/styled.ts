import styled, { css } from 'styled-components';
import { theme } from '../../../../shared/design-system';
import { fadeInUp } from '../../../../shared/design-system/animations';

export const TableContainer = styled.div`
  width: 100%;
  background: ${theme.colors.background};
  border-radius: ${theme.borderRadius.xl};
  box-shadow: ${theme.shadows.md};
  overflow: hidden;
  animation: ${fadeInUp} 300ms ease-out;
`;

// Adicionar novo wrapper para scroll
export const TableScrollWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  overflow-y: visible;
  
  /* Custom scrollbar */
  &::-webkit-scrollbar {
    height: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${theme.colors.surface};
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${theme.colors.border};
    border-radius: ${theme.borderRadius.full};
    
    &:hover {
      background: ${theme.colors.text.muted};
    }
  }
`;



export const HeaderBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${theme.spacing[4]} ${theme.spacing[5]};
  border-bottom: 1px solid ${theme.colors.border};
  background: ${theme.colors.surface};
`;

export const HeaderInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[4]};
  
  > span {
    font-size: ${theme.typography.fontSize.sm};
    color: ${theme.colors.text.secondary};
  }
`;

export const DateBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing[2]};
  padding: ${theme.spacing[1]} ${theme.spacing[3]};
  
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.medium};
  color: ${theme.colors.primary};
  
  background: ${theme.colors.primaryLight};
  border-radius: ${theme.borderRadius.full};
`;

export const StyledTable = styled.table`
  width: 100%;
  min-width: 1200px; /* Largura mínima para forçar scroll */
  border-collapse: collapse;
  font-family: ${theme.typography.fontFamily.sans};
`;

export const TableHeader = styled.thead`
  position: sticky;
  top: 0;
  z-index: 10;
  
  /* Glassmorphism effect */
  background: rgba(248, 250, 252, 0.85);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
`;

export const TableHeaderRow = styled.tr<{ isSubHeader?: boolean }>`
  ${({ isSubHeader }) => isSubHeader && css`
    background: rgba(241, 245, 249, 0.9);
  `}
`;

export const TableHeaderCell = styled.th<{ 
  isSubHeader?: boolean;
  isSecondary?: boolean;
}>`
  padding: ${({ isSubHeader }) => 
    isSubHeader ? theme.spacing[2] : theme.spacing[3]} ${theme.spacing[3]};
  
  font-size: ${theme.typography.fontSize.xs};
  font-weight: ${theme.typography.fontWeight.semibold};
  text-transform: uppercase;
  letter-spacing: ${theme.typography.letterSpacing.wider};
  text-align: center;
  white-space: nowrap;
  
  color: ${({ isSecondary }) => 
    isSecondary ? theme.colors.text.muted : theme.colors.text.secondary};
  
  border-bottom: 1px solid ${theme.colors.border};
  
  ${({ isSubHeader }) => isSubHeader && css`
    font-size: 0.6875rem;
    font-weight: ${theme.typography.fontWeight.medium};
    text-transform: none;
    letter-spacing: normal;
    color: ${theme.colors.text.muted};
  `}
`;

export const TableBody = styled.tbody`
  /* Zebra striping muito sutil */
  tr:nth-child(even) {
    background: rgba(248, 250, 252, 0.5);
  }
`;

export const TableRow = styled.tr`
  transition: background ${theme.transitions.duration.fast};
  
  &:hover {
    background: ${theme.colors.primaryLight} !important;
  }
`;

export const TableCell = styled.td<{ isNumeric?: boolean }>`
  padding: ${theme.spacing[4]} ${theme.spacing[3]};
  
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.text.primary};
  text-align: center;
  white-space: nowrap;
  
  border-bottom: 1px solid ${theme.colors.border};
  
  /* Tabular nums para números alinhados */
  ${({ isNumeric }) => isNumeric && css`
    font-family: ${theme.typography.fontFamily.mono};
    font-variant-numeric: tabular-nums;
    font-size: ${theme.typography.fontSize.xs};
  `}
`;

export const TableFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${theme.spacing[3]} ${theme.spacing[5]};
  
  background: ${theme.colors.surface};
  border-top: 1px solid ${theme.colors.border};
`;

export const FooterInfo = styled.span`
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.text.secondary};
`;

export const FooterActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[3]};
`;