import React from 'react';
import { useTranslation } from 'react-i18next';
import cls from './SidebarTitle.module.scss';

const SidebarTitle = () => {
  const { t } = useTranslation();
  return (
    <div className={cls.SidebarTitleWrapper}>
      <p className={cls.SidebarTitle}>{t('MENU')}</p>
    </div>
  );
};

export default SidebarTitle;
