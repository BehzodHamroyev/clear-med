import React from 'react';

import { useTranslation } from 'react-i18next';

import cls from './LanguageModal.module.scss';

const LanguageModal = () => {
  const { t } = useTranslation();

  return (
    <div className={cls.LanguageModalWrapper}>
      <div className={cls.LanguageModalWrapper__card}>
        <h3 className={cls['LanguageModalWrapper__card--languages']}>
          {t("o'zbek tili")}
        </h3>
        <h3 className={cls['LanguageModalWrapper__card--languages']}>kiril</h3>
        <h3 className={cls['LanguageModalWrapper__card--languages']}>ingliz</h3>
        <h3 className={cls['LanguageModalWrapper__card--languages']}>rus</h3>
      </div>
    </div>
  );
};

export default LanguageModal;
