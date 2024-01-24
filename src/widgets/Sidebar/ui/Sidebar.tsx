import React from 'react';

import cls from './Sidebar.module.scss';
import { SidebarTitle } from '@/shared/ui/SidebarChilds/SidebarTitle';
import { ListOfPages } from '@/shared/ui/SidebarChilds/ListOfPages';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';

const Sidebar = () => {
  const { isOpenBurgerNavbar, setIsOpenBurgerNavbar } =
    React.useContext(ButtonsContext);

  return isOpenBurgerNavbar ? (
    <div className={cls.SidebarWrapper}>
      <SidebarTitle />

      <ListOfPages />
    </div>
  ) : (
    <div />
  );
};

export default Sidebar;
