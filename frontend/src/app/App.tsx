import { ThemeProvider } from 'styled-components';
import { theme } from '../shared/design-system';
import { WeatherDataPage } from '../features/weather-data/pages/WeatherDataPage';
import { GlobalStyles } from './GlobalStyles';

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <WeatherDataPage />
    </ThemeProvider>
  );
}