import { createGlobalStyle } from 'styled-components';
import { theme } from '../shared/design-system';

export const GlobalStyles = createGlobalStyle`
  /* Inter Font - Import from Google Fonts */
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap');

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    font-family: ${theme.typography.fontFamily.sans};
    font-size: ${theme.typography.fontSize.base};
    line-height: ${theme.typography.lineHeight.normal};
    color: ${theme.colors.text.primary};
    background: ${theme.colors.surface};
  }

  /* Focus visible for accessibility */
  :focus-visible {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: 2px;
  }

  :focus:not(:focus-visible) {
    outline: none;
  }

  /* Scrollbar styling */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${theme.colors.surface};
  }

  ::-webkit-scrollbar-thumb {
    background: ${theme.colors.border};
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${theme.colors.borderHover};
  }

  /* Selection */
  ::selection {
    background: ${theme.colors.primaryLight};
    color: ${theme.colors.primary};
  }

  /* Remove default button styles */
  button {
    font-family: inherit;
  }

  /* Links */
  a {
    color: ${theme.colors.primary};
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }

  /* Tables */
  table {
    border-collapse: collapse;
  }

  /* Images */
  img {
    max-width: 100%;
    height: auto;
  }
`;