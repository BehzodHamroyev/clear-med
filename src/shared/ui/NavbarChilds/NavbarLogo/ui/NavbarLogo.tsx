import React, { useContext } from 'react';

import cls from './NabarLogo.module.scss';
import { LogoNabar } from '@/shared/assets/widgets/Navbar';
import { BugerNavbar } from '@/shared/assets/icons';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';

const NavbarLogo = () => {
  const { isOpenBurgerNavbar, setIsOpenBurgerNavbar } =
    useContext(ButtonsContext);

  return (
    <div className={cls.NavbarLogoWrapper}>
      <BugerNavbar
        onClick={() => setIsOpenBurgerNavbar(!isOpenBurgerNavbar)}
        className={cls.NavbarLogo2}
      />
      <LogoNabar className={cls.NavbarLogo} />
    </div>
  );
};

export default NavbarLogo;
