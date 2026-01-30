import styled, { css } from 'styled-components';
import { theme } from '../../design-system';

interface InputWrapperProps {
  hasError?: boolean;
  isFocused?: boolean;
}

export const InputWrapper = styled.div<InputWrapperProps>`
  position: relative;
  width: 100%;
`;

export const InputLabel = styled.label`
  display: block;
  font-size: ${theme.typography.fontSize.xs};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.text.secondary};
  text-transform: uppercase;
  letter-spacing: ${theme.typography.letterSpacing.wider};
  margin-bottom: ${theme.spacing[2]};
`;

export const StyledInput = styled.input<{ hasError?: boolean }>`
  width: 100%;
  padding: ${theme.spacing[3]} ${theme.spacing[4]};
  
  font-family: ${theme.typography.fontFamily.sans};
  font-size: ${theme.typography.fontSize.base};
  color: ${theme.colors.text.primary};
  
  background: ${theme.colors.surfaceHover};
  border: 2px solid transparent;
  border-radius: ${theme.borderRadius.lg};
  
  transition: all ${theme.transitions.duration.fast} ${theme.transitions.easing.easeInOut};
  
  &::placeholder {
    color: ${theme.colors.text.muted};
  }
  
  &:hover:not(:disabled) {
    background: ${theme.colors.surface};
    border-color: ${theme.colors.border};
  }
  
  &:focus {
    outline: none;
    background: ${theme.colors.background};
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px ${theme.colors.primaryLight};
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  ${({ hasError }) =>
    hasError &&
    css`
      border-color: ${theme.colors.error};
      
      &:focus {
        border-color: ${theme.colors.error};
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.15);
      }
    `}
`;

export const InputError = styled.span`
  display: block;
  font-size: ${theme.typography.fontSize.xs};
  color: ${theme.colors.error};
  margin-top: ${theme.spacing[1]};
`;

export const InputHint = styled.span`
  display: block;
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.text.muted};
  margin-top: ${theme.spacing[1]};
`;