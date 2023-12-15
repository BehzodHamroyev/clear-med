import React from 'react';
import { useTranslation } from 'react-i18next';

import { AutoIcon, LightIcon, DarkIcon } from '@/shared/assets/Pages/Settings';

import cls from './ListOfSettingsTheme.module.scss';

const ListOfSettingsTheme = () => {
  const { t } = useTranslation();

  return (
    <div className={cls.ListOfSettingsThemeWrapper}>
      <div className={cls.ListOfSettingsLangs}>
        <img src={AutoIcon} alt="#" />

        {t('Avto')}
      </div>

      <div className={cls.ListOfSettingsLangs}>
        <img src={LightIcon} alt="#" />

        {t('Yorqin')}
      </div>
      <div className={cls.ListOfSettingsLangs}>
        <img src={DarkIcon} alt="#" />

        {t('Qorong‘i')}
      </div>
    </div>
  );
};

export default ListOfSettingsTheme;
