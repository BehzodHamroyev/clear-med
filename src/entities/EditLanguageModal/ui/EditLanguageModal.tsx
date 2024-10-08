import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { baseUrlImgLogo } from '../../../../baseurl';
import cls from './EditLanguageModal.module.scss';

import { getInfoProject } from '@/entities/FileUploader';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import { EngIcon, RuIcon, UzIcon } from '@/shared/assets/Pages/Settings';
import { fetchDepartmentList } from '@/pages/Reception';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

const EditLanguageModal = () => {
  const dispatch = useAppDispatch();
  const infoProject = useSelector(getInfoProject);

  const { setIsvisableLanguageModal } = useContext(ButtonsContext);

  const { i18n } = useTranslation();

  const toggle = async (lang: string) => {
    i18n.changeLanguage(lang);
  };

  const handleClick = () => {
    dispatch(fetchDepartmentList({ limit: 'all' }));
  };

  return (
    <div className={cls.EditLanguageModalWrp}>
      <img
        src={baseUrlImgLogo}
        alt="imgLink"
        className={cls.EditLanguageModalWrp__logo}
      />

      <div className={cls.EditLanguageModalWrp__lang}>
        <Button
          type="button"
          onClick={() => {
            toggle('kr');
            setIsvisableLanguageModal(false);
            handleClick();
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
            handleClick();
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
            handleClick();
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
