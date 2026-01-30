import { colors, typography, spacing, borderRadius, shadows, transitions } from './tokens';

/**
 * Theme configuration for styled-components
 */
export const theme = {
  colors: {
    // Primárias
    primary: colors.primary[500],
    primaryHover: colors.primary[600],
    primaryLight: colors.primary[100],
    primaryDark: colors.primary[700],

    // Superfícies
    background: colors.neutral[0],
    surface: colors.neutral[50],
    surfaceHover: colors.neutral[100],

    // Bordas
    border: colors.neutral[200],
    borderHover: colors.neutral[300],

    // Texto
    text: {
      primary: colors.neutral[900],
      secondary: colors.neutral[500],
      muted: colors.neutral[400],
      inverse: colors.neutral[0],
    },

    // Semânticas
    success: colors.semantic.success.main,
    warning: colors.semantic.warning.main,
    error: colors.semantic.error.main,
    info: colors.semantic.info.main,

    // Clima
    weather: colors.weather,
  },

  typography,
  spacing,
  borderRadius,
  shadows,
  transitions,

  // Breakpoints
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
} as const;

export type Theme = typeof theme;

// Helper para acessar cores do tema em styled-components
export const getColor = (path: string) => (props: { theme: Theme }) => {
  const keys = path.split('.');
  let value: unknown = props.theme.colors;
  
  for (const key of keys) {
    value = (value as Record<string, unknown>)[key];
  }
  
  return value as string;
};