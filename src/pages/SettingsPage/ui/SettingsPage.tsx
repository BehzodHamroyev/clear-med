import React, { useContext } from 'react';

import { useTranslation } from 'react-i18next';
import { ButtonNavbar } from '@/entities/ButtonNavbar';
import { ListOfSettings } from '@/entities/ListOfSettings';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';

import cls from './SettingsPage.module.scss';
import { ListOfSettingsTheme } from '@/entities/ListOfSettingsTheme';
import { ListOfSettingsPassword } from '@/entities/ListOfSettingsPassword';

const SettingsPage = () => {
  const { t } = useTranslation();

  const { isOpenThemeOrLanguage, isOpenSettingsChangePassword } =
    useContext(ButtonsContext);

  console.log('render');

  return (
    <div className={cls.SettingsPageWrapper}>
      <ButtonNavbar TableTitle={t('Sozlamalar')} />

      <div className={cls.SettingsList}>
        <ListOfSettings />

        {isOpenThemeOrLanguage && !isOpenSettingsChangePassword ? (
          // <ListOfSettingsLangs />
          ''
        ) : !isOpenThemeOrLanguage && !isOpenSettingsChangePassword ? (
          <ListOfSettingsTheme />
        ) : isOpenSettingsChangePassword ? (
          <ListOfSettingsPassword />
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default SettingsPage;
