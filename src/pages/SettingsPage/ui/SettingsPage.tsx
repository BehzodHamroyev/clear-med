import React, { useContext } from 'react';
import { useSelector } from 'react-redux';

import { useTranslation } from 'react-i18next';
import { ButtonNavbar } from '@/entities/ButtonNavbar';
import { ListOfSettings } from '@/entities/ListOfSettings';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';

import cls from './SettingsPage.module.scss';
import { ListOfSettingsTheme } from '@/entities/ListOfSettingsTheme';
import { ListOfSettingsPassword } from '@/entities/ListOfSettingsPassword';
import { FileUploader } from '@/entities/FileUploader';
import { getAuthUserData } from '@/features/Auth';

const SettingsPage = () => {
  const { t } = useTranslation();

  const {
    isOpenThemeOrLanguage,
    isOpenUploadLogo,
    isOpenSettingsChangePassword,
  } = useContext(ButtonsContext);

  const authUserData = useSelector(getAuthUserData);

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

        {isOpenUploadLogo && authUserData && authUserData?.role === 'admin' ? (
          <FileUploader />
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default SettingsPage;
