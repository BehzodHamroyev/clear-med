import { useContext } from 'react';
import { LOCAL_STORAGE_THEME_KEY } from '@/shared/const/localstorage';
import { ThemeContext } from '../../context/ThemeContext';
import { Theme } from '../../../const/theme';

interface UseThemeResult {
  toggleTheme: (newTheme: Theme) => void;
  theme: Theme;
}

export function useTheme(): UseThemeResult {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = (theme: Theme) => {
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, JSON.stringify(theme));
    setTheme?.(theme || Theme.LIGHT);
  };

  return {
    theme: theme || Theme.LIGHT,
    toggleTheme,
  };
}
