import { createContext } from 'react';
// eslint-disable-next-line ulbi-tv-plugin/public-api-imports
import LoginStore from '@/features/Authentication/loginStore/loginStore';

interface State {
  store: LoginStore;
}

export const store = new LoginStore();

export const LoginContext = createContext<State>({
  store,
});
