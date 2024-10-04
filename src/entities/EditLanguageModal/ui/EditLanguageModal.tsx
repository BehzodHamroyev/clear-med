import React from 'react';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { Loader } from '@/widgets/Loader';
import cls from './EditLanguageModal.module.scss';
import { baseUrlImgLogo } from '../../../../baseurl';
import { fetchDepartmentList } from '@/pages/ReceptionPage';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import { EngIcon, RuIcon, UzIcon } from '@/shared/assets/Pages/Settings';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

const EditLanguageModal = () => {
  const dispatch = useAppDispatch();
  const { i18n } = useTranslation();

  const { setIsvisableLanguageModal } = React.useContext(ButtonsContext);

  const toggle = async (lang: string) => {
    i18n.changeLanguage(lang);
  };

  const handleLanguageFunc = (lang: string, visableVal: boolean) => {
    toggle(lang);

    setIsvisableLanguageModal(visableVal);

    dispatch(fetchDepartmentList({ limit: 'all' }));
  };

  return (
    <>
      {baseUrlImgLogo && UzIcon && RuIcon && EngIcon ? (
        <div className={cls.EditLanguageModalWrp}>
          <img
            alt="imgLink"
            src={baseUrlImgLogo}
            className={cls.EditLanguageModalWrp__logo}
          />

          <div className={cls.EditLanguageModalWrp__lang}>
            <Button
              type="button"
              onClick={() => handleLanguageFunc('kr', false)}
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
              onClick={() => handleLanguageFunc('ru', false)}
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
              onClick={() => handleLanguageFunc('eng', false)}
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
      ) : (
        <Loader />
      )}
    </>
  );
};

export default EditLanguageModal;
