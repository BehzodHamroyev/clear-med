import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import cls from './ListOfSettingsTheme.module.scss';

import { Theme } from '@/shared/const/theme';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { AutoIcon, LightIcon, DarkIcon } from '@/shared/assets/Pages/Settings';

const ListOfSettingsTheme = () => {
  const { t } = useTranslation();

  // const themeLocalstorage = localStorage.getItem(LOCAL_STORAGE_THEME_KEY);

  const themeActive = localStorage.getItem('themeIsActive');

  const { toggleTheme, theme } = useTheme();

  useEffect(() => {
    if (themeActive === '1') {
      const autoSwitchTheme = () => {
        const hours = new Date().getHours();
        const isDayTime = hours >= 8 && hours <= 18;

        toggleTheme(isDayTime ? Theme.LIGHT : Theme.DARK);
      };

      autoSwitchTheme();

      const timer = setInterval(autoSwitchTheme, 60 * 60 * 1000);
      return () => clearInterval(timer);
    }

    return console.log("don't remove");
  }, [themeActive, toggleTheme]);

  const autoTheme = () => {
    toggleTheme(Theme.AUTO);
    localStorage.setItem('themeIsActive', '1');
  };

  const lightTheme = () => {
    toggleTheme(Theme.LIGHT);
    localStorage.setItem('themeIsActive', '2');
  };

  const darkTheme = () => {
    toggleTheme(Theme.DARK);
    localStorage.setItem('themeIsActive', '3');
  };

  return (
    <div className={cls.ListOfSettingsThemeWrapper}>
      <div
        onClick={autoTheme}
        className={`${cls.ListOfSettingsLangs} ${
          themeActive === '1' ? cls.ActiveTheme : ''
        }`}
      >
        <img src={AutoIcon} alt="#" />

        {t('Avto')}
      </div>

      <div
        onClick={lightTheme}
        className={`${cls.ListOfSettingsLangs} ${
          themeActive === '2' ? cls.ActiveTheme : ''
        }`}
      >
        <img src={LightIcon} alt="#" />

        {t('Yorqin')}
      </div>

      <div
        onClick={darkTheme}
        className={`${cls.ListOfSettingsLangs} ${
          themeActive === '3' ? cls.ActiveTheme : ''
        }`}
      >
        <img src={DarkIcon} alt="#" />

        {t('Qorong‘i')}
      </div>
    </div>
  );
};

export default ListOfSettingsTheme;
