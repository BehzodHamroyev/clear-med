import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Upload } from '@mui/icons-material';
import cls from './ListOfSettings.module.scss';
import {
  RightIcon,
  ThemeIcon,
  PassWordIcon,
} from '@/shared/assets/Pages/Settings';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import { getAuthUserData } from '@/features/Auth';

const ListOfSettings = () => {
  const { t } = useTranslation();

  const {
    isOpenThemeOrLanguage,
    setIsOpenThemeOrLanguage,
    isOpenSettingsChangePassword,
    setIsOpenSettingsChangePassword,
    setIsOpenUploadLogo,
    isOpenUploadLogo,
  } = useContext(ButtonsContext);

  const authUserData = useSelector(getAuthUserData);

  return (
    <div className={cls.ListOfSettingsWrapper}>
      {/* <div
        className={`${cls.Language} ${isOpenThemeOrLanguage ? cls.IsOpen : ''}`}
        onClick={() => {
          setIsOpenThemeOrLanguage(true);
          setIsOpenSettingsChangePassword(false);
        }}
      >
        <div className={cls.LanguageLeft}>
          <LanguageIcon />
          <p>{t('Tilni o‘zgartirish')}</p>
        </div>
        <RightIcon className={cls.span} />
      </div> */}

      <div
        onClick={() => {
          setIsOpenThemeOrLanguage(false);
          setIsOpenSettingsChangePassword(false);
          setIsOpenUploadLogo(false);
        }}
        className={`${cls.Theme} ${
          !isOpenThemeOrLanguage && !isOpenSettingsChangePassword
            ? cls.IsOpen
            : ''
        }`}
      >
        <div className={cls.ThemeLeft}>
          <ThemeIcon />
          <p>{t('Mavzuni o‘zgartirish')}</p>
        </div>
        <RightIcon className={cls.span} />
      </div>

      <div
        onClick={() => {
          setIsOpenThemeOrLanguage(false);
          setIsOpenUploadLogo(false);

          setIsOpenSettingsChangePassword(true);
        }}
        className={`${cls.Theme} ${
          isOpenSettingsChangePassword ? cls.IsOpen : ''
        }`}
      >
        <div className={cls.ThemeLeft}>
          <PassWordIcon />
          <p>{t("Parolni o'zgartirish")}</p>
        </div>
        <RightIcon className={cls.span} />
      </div>

      {authUserData?.role === 'admin' && (
        <div
          onClick={() => {
            setIsOpenThemeOrLanguage(true);
            setIsOpenSettingsChangePassword(false);
            setIsOpenUploadLogo(true);
          }}
          className={`${cls.Theme} ${isOpenUploadLogo ? cls.IsOpen : ''} `}
        >
          <div className={cls.ThemeLeft}>
            <Upload />
            <p>{t('Update center information')}</p>
          </div>
          <RightIcon className={cls.span} />
        </div>
      )}
    </div>
  );
};

export default ListOfSettings;
