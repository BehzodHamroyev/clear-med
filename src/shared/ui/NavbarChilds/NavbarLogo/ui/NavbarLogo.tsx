import React, { useContext } from 'react';

import cls from './NabarLogo.module.scss';
import { BugerNavbar } from '@/shared/assets/icons';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import { Logo } from '@/shared/assets/Logo';

const NavbarLogo = () => {
  const { isOpenBurgerNavbar, setIsOpenBurgerNavbar } =
    useContext(ButtonsContext);

  return (
    <div className={cls.NavbarLogoWrapper}>
      <BugerNavbar
        onClick={() => setIsOpenBurgerNavbar(!isOpenBurgerNavbar)}
        className={cls.NavbarLogo2}
      />
      {/* <LogoNabar /> */}
      <Logo className={cls.NavbarLogo} />
      <p className={cls.NavbarText}>Medical Sentre</p>
    </div>
  );
};

export default NavbarLogo;
