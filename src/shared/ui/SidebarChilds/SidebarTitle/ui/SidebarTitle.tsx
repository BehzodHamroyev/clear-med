import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { RxHamburgerMenu } from 'react-icons/rx';

import cls from './SidebarTitle.module.scss';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';

const SidebarTitle = () => {
  const { t } = useTranslation();

  const { isOpenSidebar, setIsOpenSidebar } = useContext(ButtonsContext);

  const handleOpenSitebar = () => {
    setIsOpenSidebar(!isOpenSidebar);
  };

  return (
    <div className={cls.SidebarTitleWrapper}>
      <div
        onClick={handleOpenSitebar}
        className={cls.SidebarTitleWrapper__burger}
      >
        <RxHamburgerMenu className={cls['SidebarTitleWrapper__burger--btn']} />
      </div>
      {isOpenSidebar ? <p className={cls.SidebarTitle}>{t('MENU')}</p> : ''}
    </div>
  );
};

export default SidebarTitle;
