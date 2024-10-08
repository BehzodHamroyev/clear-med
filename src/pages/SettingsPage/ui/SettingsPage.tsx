import React, { useContext } from 'react';

import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import cls from './SettingsPage.module.scss';

import { getAuthUserData } from '@/features/Auth';
import { ButtonNavbar } from '@/entities/ButtonNavbar';
import { FileUploader } from '@/entities/FileUploader';
import { ListOfSettings } from '@/entities/ListOfSettings';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import { ListOfSettingsPassword } from '@/entities/ListOfSettingsPassword';

const SettingsPage = () => {
  const { t } = useTranslation();

  const {
    isOpenUploadLogo,
    isOpenThemeOrLanguage,
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
          "") : isOpenSettingsChangePassword ? (
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
