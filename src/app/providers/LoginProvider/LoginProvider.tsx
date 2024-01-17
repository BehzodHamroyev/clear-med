import { ReactNode } from 'react';
import { LoginContext, store } from '@/shared/lib/context/LoginContext';

interface LoginProviderProps {
  children: ReactNode;
}

export const LoginProvider = ({ children }: LoginProviderProps) => {
  return (
    <LoginContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        store,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};
