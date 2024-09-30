import { useContext } from 'react';
import cls from './Sidebar.module.scss';
import { SidebarTitle } from '@/shared/ui/SidebarChilds/SidebarTitle';
import { ListOfPages } from '@/shared/ui/SidebarChilds/ListOfPages';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';

const Sidebar = () => {
  const {
    isOpenBurgerNavbar,
    isOpenSidebar,
  } = useContext(ButtonsContext);

  return isOpenBurgerNavbar ? (
    <div
      className={`${cls.SidebarWrapper} ${isOpenSidebar ? cls.isOpenSidebar : cls.isClieSidebar
        }`}
    >
      <SidebarTitle />
      <ListOfPages />
    </div>
  ) : (
    <div />
  );
};

export default Sidebar;
