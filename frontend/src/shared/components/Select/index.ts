import styled from 'styled-components';
import { theme } from '../../design-system';

export const SelectWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const SelectLabel = styled.label`
  display: block;
  font-size: ${theme.typography.fontSize.xs};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.text.secondary};
  text-transform: uppercase;
  letter-spacing: ${theme.typography.letterSpacing.wider};
  margin-bottom: ${theme.spacing[2]};
`;

export const StyledSelect = styled.select`
  width: 100%;
  padding: ${theme.spacing[3]} ${theme.spacing[4]};
  padding-right: ${theme.spacing[10]};
  
  font-family: ${theme.typography.fontFamily.sans};
  font-size: ${theme.typography.fontSize.base};
  color: ${theme.colors.text.primary};
  
  background: ${theme.colors.surfaceHover};
  border: 2px solid transparent;
  border-radius: ${theme.borderRadius.lg};
  
  cursor: pointer;
  appearance: none;
  
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2364748B' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right ${theme.spacing[3]} center;
  
  transition: all ${theme.transitions.duration.fast} ${theme.transitions.easing.easeInOut};
  
  &:hover:not(:disabled) {
    background-color: ${theme.colors.surface};
    border-color: ${theme.colors.border};
  }
  
  &:focus {
    outline: none;
    background-color: ${theme.colors.background};
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px ${theme.colors.primaryLight};
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

// Mini select para paginação
export const MiniSelect = styled.select`
  padding: ${theme.spacing[1]} ${theme.spacing[6]} ${theme.spacing[1]} ${theme.spacing[2]};
  
  font-family: ${theme.typography.fontFamily.sans};
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.text.primary};
  
  background: ${theme.colors.background};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  
  cursor: pointer;
  appearance: none;
  
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2364748B' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right ${theme.spacing[2]} center;
  
  transition: all ${theme.transitions.duration.fast};
  
  &:hover {
    border-color: ${theme.colors.borderHover};
  }
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }
`;