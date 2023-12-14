import React from 'react';
import cls from './SidebarTitle.module.scss';

const SidebarTitle = () => {
  return (
    <div className={cls.SidebarTitleWrapper}>
      <p className={cls.SidebarTitle}>MENU</p>
    </div>
  );
};

export default SidebarTitle;
