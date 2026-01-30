import styled, { css } from 'styled-components';
import { theme } from '../../design-system';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  isLoading?: boolean;
}

const sizeStyles = {
  sm: css`
    padding: ${theme.spacing[2]} ${theme.spacing[3]};
    font-size: ${theme.typography.fontSize.sm};
  `,
  md: css`
    padding: ${theme.spacing[2]} ${theme.spacing[4]};
    font-size: ${theme.typography.fontSize.base};
  `,
  lg: css`
    padding: ${theme.spacing[3]} ${theme.spacing[6]};
    font-size: ${theme.typography.fontSize.md};
  `,
};

const variantStyles = {
  primary: css`
    background: ${theme.colors.primary};
    color: ${theme.colors.text.inverse};
    border: 1px solid ${theme.colors.primary};

    &:hover:not(:disabled) {
      background: ${theme.colors.primaryHover};
      border-color: ${theme.colors.primaryHover};
    }

    &:active:not(:disabled) {
      background: ${theme.colors.primaryDark};
    }
  `,
  secondary: css`
    background: transparent;
    color: ${theme.colors.primary};
    border: 1px solid ${theme.colors.primary};

    &:hover:not(:disabled) {
      background: ${theme.colors.primaryLight};
    }
  `,
  ghost: css`
    background: transparent;
    color: ${theme.colors.text.secondary};
    border: 1px solid transparent;

    &:hover:not(:disabled) {
      background: ${theme.colors.surfaceHover};
      color: ${theme.colors.text.primary};
    }
  `,
  danger: css`
    background: ${theme.colors.error};
    color: ${theme.colors.text.inverse};
    border: 1px solid ${theme.colors.error};

    &:hover:not(:disabled) {
      background: #DC2626;
    }
  `,
};

export const Button = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing[2]};
  
  font-family: ${theme.typography.fontFamily.sans};
  font-weight: ${theme.typography.fontWeight.medium};
  line-height: 1;
  
  border-radius: ${theme.borderRadius.lg};
  cursor: pointer;
  
  transition: all ${theme.transitions.duration.fast} ${theme.transitions.easing.easeInOut};
  
  ${({ size = 'md' }) => sizeStyles[size]}
  ${({ variant = 'primary' }) => variantStyles[variant]}
  ${({ fullWidth }) => fullWidth && css`width: 100%;`}
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: 2px;
  }

  ${({ isLoading }) =>
    isLoading &&
    css`
      pointer-events: none;
      opacity: 0.7;
    `}
`;

// Split Button para Export
export const SplitButtonContainer = styled.div`
  display: inline-flex;
  border-radius: ${theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${theme.shadows.sm};
`;

export const SplitButtonMain = styled(Button)`
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-right: 1px solid rgba(255, 255, 255, 0.2);
`;

export const SplitButtonDropdown = styled(Button)`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  padding-left: ${theme.spacing[2]};
  padding-right: ${theme.spacing[2]};
`;