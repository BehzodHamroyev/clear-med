import React from 'react';

import cls from './Sidebar.module.scss';
import { SidebarTitle } from '@/shared/ui/SidebarChilds/SidebarTitle';
import { ListOfPages } from '@/shared/ui/SidebarChilds/ListOfPages';

const Sidebar = () => {
  return (
    <div className={cls.SidebarWrapper}>
      <SidebarTitle />

      <ListOfPages />
    </div>
  );
};

export default Sidebar;
