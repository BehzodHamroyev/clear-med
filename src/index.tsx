import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { ThemeProvider } from '@/app/providers/ThemeProvider';
import { StoreProvider } from '@/app/providers/StoreProvider';
import App from './app/App';
import '@/app/styles/index.scss';
import './shared/config/i18n/i18n';
import { ErrorBoundary } from './app/providers/ErrorBoundary';
import { ForceUpdateProvider } from '@/shared/lib/render/forceUpdate';
import ButtonsProvider from './app/providers/ButtonsProvider/ButtonsProvider';
import { LoginProvider } from './app/providers/LoginProvider/LoginProvider';

const container = document.getElementById('root');

if (!container) {
  throw new Error(
    'Контейнер root не найден. НЕ удалось вмонтировать реакт приложение',
  );
}

const root = createRoot(container);

root.render(
  <ButtonsProvider>
    <LoginProvider>
      <BrowserRouter>
        <StoreProvider>
          <ErrorBoundary>
            <ForceUpdateProvider>
              <ThemeProvider>
                <App />
              </ThemeProvider>
            </ForceUpdateProvider>
          </ErrorBoundary>
        </StoreProvider>
      </BrowserRouter>
    </LoginProvider>
  </ButtonsProvider>,
);
export { Theme } from '@/shared/const/theme';
