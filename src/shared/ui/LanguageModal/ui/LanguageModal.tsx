import React from 'react';
import { useTranslation } from 'react-i18next';

import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import { UzIcon, RuIcon, EngIcon } from '@/shared/assets/Pages/Settings';

import cls from './LanguageModal.module.scss';

const LanguageModal = () => {
  /* useTranslation */
  const { t, i18n } = useTranslation();

  const toggle = async (lang: string) => {
    i18n.changeLanguage(lang);
  };

  /* ButtonsContext */
  const { setisOpenLanugagePopup } = React.useContext(ButtonsContext);

  /* localStorage */
  const LangValue = localStorage.getItem('i18nextLng');

  /* halper function  */
  const handleOpenPopup = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    setisOpenLanugagePopup(false);
  };

  /* UI */
  return (
    <div
      onClick={(e) => handleOpenPopup(e)}
      className={cls.LanguageModalWrapper}
    >
      <div className={cls.LanguageModalWrapper__card}>
        <div
          onClick={() => {
            toggle('uz');
          }}
          className={`${cls['LanguageModalWrapper__card--languages']} ${
            LangValue === 'uz'
              ? cls['LanguageModalWrapper__card--activeLang']
              : ''
          }`}
        >
          <img src={UzIcon} alt="#" />
          {t("O'zbek (Lotin)")}
        </div>

        <div
          onClick={() => {
            toggle('kr');
          }}
          className={`${cls['LanguageModalWrapper__card--languages']} ${
            LangValue === 'kr'
              ? cls['LanguageModalWrapper__card--activeLang']
              : ''
          }`}
        >
          <img src={UzIcon} alt="#" />
          {t('Ўзбек (Кирил)')}
        </div>

        <div
          onClick={() => {
            toggle('ru');
          }}
          className={`${cls['LanguageModalWrapper__card--languages']} ${
            LangValue === 'ru'
              ? cls['LanguageModalWrapper__card--activeLang']
              : ''
          }`}
        >
          <img src={RuIcon} alt="#" />
          {t('Русский')}
        </div>

        <div
          onClick={() => {
            toggle('eng');
          }}
          className={` ${cls['LanguageModalWrapper__card--languages']} ${
            LangValue === 'eng'
              ? cls['LanguageModalWrapper__card--activeLang']
              : ''
          }`}
        >
          <img src={EngIcon} alt="#" />
          {t('English')}
        </div>
      </div>
    </div>
  );
};

export default LanguageModal;
