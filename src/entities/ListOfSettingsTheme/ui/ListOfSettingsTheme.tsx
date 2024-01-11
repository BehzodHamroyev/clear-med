import React from 'react';
import { useTranslation } from 'react-i18next';

import { AutoIcon, LightIcon, DarkIcon } from '@/shared/assets/Pages/Settings';

import cls from './ListOfSettingsTheme.module.scss';
import { Theme } from '@/shared/const/theme';
import { LOCAL_STORAGE_THEME_KEY } from '@/shared/const/localstorage';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';

const ListOfSettingsTheme = () => {
  const { t } = useTranslation();

  const themeLocalstorage = localStorage.getItem(LOCAL_STORAGE_THEME_KEY);

  const { toggleTheme, theme } = useTheme();

  return (
    <div className={cls.ListOfSettingsThemeWrapper}>
      <div
        onClick={() => toggleTheme(Theme.AUTO)}
        className={`${cls.ListOfSettingsLangs} ${
          theme === 'app_auto_theme' ? cls.ActiveTheme : ''
        }`}
      >
        <img src={AutoIcon} alt="#" />

        {t('Avto')}
      </div>

      <div
        onClick={() => toggleTheme(Theme.LIGHT)}
        className={`${cls.ListOfSettingsLangs} ${
          theme === 'app_light_theme' ? cls.ActiveTheme : ''
        }`}
      >
        <img src={LightIcon} alt="#" />

        {t('Yorqin')}
      </div>

      <div
        onClick={() => toggleTheme(Theme.DARK)}
        className={`${cls.ListOfSettingsLangs} ${
          theme === 'app_dark_theme' ? cls.ActiveTheme : ''
        }`}
      >
        <img src={DarkIcon} alt="#" />

        {t('Qorong‘i')}
      </div>
    </div>
  );
};

export default ListOfSettingsTheme;
