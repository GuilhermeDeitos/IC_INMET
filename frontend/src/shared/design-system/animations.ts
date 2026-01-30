import { keyframes, css } from 'styled-components';

/**
 * Animações reutilizáveis
 */

// Fade animations
export const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

export const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const fadeInDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Scale animations
export const scaleIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

// Slide animations
export const slideInFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const slideInFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

// Loading animations
export const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
`;

export const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

// Progress bar animation
export const progressIndeterminate = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(400%);
  }
`;

// Reusable animation mixins
export const animationMixins = {
  fadeIn: css`
    animation: ${fadeIn} 200ms ease-out;
  `,
  fadeInUp: css`
    animation: ${fadeInUp} 300ms ease-out;
  `,
  scaleIn: css`
    animation: ${scaleIn} 200ms ease-out;
  `,
  shimmer: css`
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255, 255, 255, 0.4) 50%,
      transparent 100%
    );
    background-size: 200% 100%;
    animation: ${shimmer} 1.5s infinite;
  `,
  pulse: css`
    animation: ${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  `,
};