import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

import cls from './EditLanguageModal.module.scss';
import { getInfoProject } from '@/entities/FileUploader';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import { EngIcon, RuIcon, UzIcon } from '@/shared/assets/Pages/Settings';

const EditLanguageModal = () => {
  const infoProject = useSelector(getInfoProject);

  const { setIsvisableLanguageModal } = useContext(ButtonsContext);

  const { i18n } = useTranslation();

  const toggle = async (lang: string) => {
    i18n.changeLanguage(lang);
  };

  const imgLink: string = `http://socketmed.magicsoft.uz//${infoProject?.[0]?.logo}`;

  return (
    <div className={cls.EditLanguageModalWrp}>
      <img
        src={imgLink}
        alt="imgLink"
        className={cls.EditLanguageModalWrp__logo}
      />

      <div className={cls.EditLanguageModalWrp__lang}>
        <Button
          type="button"
          onClick={() => {
            toggle('uz');
            setIsvisableLanguageModal(false);
          }}
        >
          <img
            src={UzIcon}
            alt="#UzIcon"
            className={cls['EditLanguageModalWrp__lang--iconLanguage']}
          />
          Ўзбек
        </Button>

        <Button
          type="button"
          onClick={() => {
            toggle('ru');
            setIsvisableLanguageModal(false);
          }}
        >
          <img
            src={RuIcon}
            alt="#RuIcon"
            className={cls['EditLanguageModalWrp__lang--iconLanguage']}
          />
          Русский
        </Button>

        <Button
          type="button"
          onClick={() => {
            toggle('eng');
            setIsvisableLanguageModal(false);
          }}
        >
          <img
            src={EngIcon}
            alt="#EngIcon"
            className={cls['EditLanguageModalWrp__lang--iconLanguage']}
          />
          English
        </Button>
      </div>
    </div>
  );
};

export default EditLanguageModal;
