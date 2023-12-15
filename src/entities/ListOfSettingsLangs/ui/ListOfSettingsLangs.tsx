import React from 'react';

import { useTranslation } from 'react-i18next';
import cls from './ListOfSettingsLangs.module.scss';
import { EngIcon, RuIcon, UzIcon } from '@/shared/assets/Pages/Settings';

const ListOfSettingsLangs = () => {
  const { t } = useTranslation();

  return (
    <div className={cls.ListOfSettingsLangsWrapper}>
      <div className={cls.ListOfSettingsLangs}>
        <img src={UzIcon} alt="#" />

        {t("O'zbek (Lotin)")}
      </div>
      <div className={cls.ListOfSettingsLangs}>
        <img src={UzIcon} alt="#" />

        {t('Ўзбек (Кирил)')}
      </div>
      <div className={cls.ListOfSettingsLangs}>
        <img src={RuIcon} alt="#" />

        {t('Русский')}
      </div>
      <div className={cls.ListOfSettingsLangs}>
        <img src={EngIcon} alt="#" />

        {t('English')}
      </div>
    </div>
  );
};

export default ListOfSettingsLangs;
