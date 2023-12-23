import React from 'react';

import { useTranslation } from 'react-i18next';
import cls from './ListOfSettingsLangs.module.scss';
import { EngIcon, RuIcon, UzIcon } from '@/shared/assets/Pages/Settings';

const ListOfSettingsLangs = () => {
  const { t, i18n } = useTranslation();

  const toggle = async (lang: string) => {
    i18n.changeLanguage(lang);
  };

  const LangValue = localStorage.getItem('i18nextLng');

  return (
    <div className={cls.ListOfSettingsLangsWrapper}>
      <div
        onClick={() => {
          toggle('uz');
        }}
        className={`${cls.ListOfSettingsLangs} ${
          LangValue === 'uz' ? cls.activeLang : ''
        }`}
      >
        <img src={UzIcon} alt="#" />

        {t("O'zbek (Lotin)")}
      </div>

      <div
        onClick={() => {
          toggle('kr');
        }}
        className={`${cls.ListOfSettingsLangs} ${
          LangValue === 'kr' ? cls.activeLang : ''
        }`}
      >
        <img src={UzIcon} alt="#" />

        {t('Ўзбек (Кирил)')}
      </div>
      <div
        onClick={() => {
          toggle('ru');
        }}
        className={`${cls.ListOfSettingsLangs} ${
          LangValue === 'ru' ? cls.activeLang : ''
        }`}
      >
        <img src={RuIcon} alt="#" />

        {t('Русский')}
      </div>
      <div
        onClick={() => {
          toggle('eng');
        }}
        className={`${cls.ListOfSettingsLangs} ${
          LangValue === 'eng' ? cls.activeLang : ''
        }`}
      >
        <img src={EngIcon} alt="#" />

        {t('English')}
      </div>
    </div>
  );
};

export default ListOfSettingsLangs;
