import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { StoreProvider } from '@/app/providers/StoreProvider';
import App from './app/App';
import '@/app/styles/index.scss';
import './shared/config/i18n/i18n';
import { ErrorBoundary } from './app/providers/ErrorBoundary';
import { ForceUpdateProvider } from '@/shared/lib/render/forceUpdate';
import ButtonsProvider from './app/providers/ButtonsProvider/ButtonsProvider';

const container = document.getElementById('root');

if (!container) {
  throw new Error(
    'The root container was not found. Failed to mount react application',
  );
}

const root = createRoot(container);

root.render(
  <ButtonsProvider>
    <BrowserRouter>
      <StoreProvider>
        <ErrorBoundary>
          <ForceUpdateProvider>
            <App />
          </ForceUpdateProvider>
        </ErrorBoundary>
      </StoreProvider>
    </BrowserRouter>
  </ButtonsProvider>,
);
export { Theme } from '@/shared/const/theme';
