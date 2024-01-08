import React, { useContext } from 'react';

import { useTranslation } from 'react-i18next';
import { ButtonNavbar } from '@/entities/ButtonNavbar';
import { ListOfSettings } from '@/entities/ListOfSettings';
import { ListOfSettingsLangs } from '@/entities/ListOfSettingsLangs';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';

import cls from './SettingsPage.module.scss';
import { ListOfSettingsTheme } from '@/entities/ListOfSettingsTheme';

const SettingsPage = () => {
  const { t } = useTranslation();

  const { isOpenThemeOrLanguage, setIsOpenThemeOrLanguage } =
    useContext(ButtonsContext);

  return (
    <div className={cls.SettingsPageWrapper}>
      <ButtonNavbar TableTitle={t('Sozlamalar')} />

      <div className={cls.SettingsList}>
        <ListOfSettings />

        {isOpenThemeOrLanguage ? (
          <ListOfSettingsLangs />
        ) : (
          <ListOfSettingsTheme />
        )}
      </div>
    </div>
  );
};

export default SettingsPage;
