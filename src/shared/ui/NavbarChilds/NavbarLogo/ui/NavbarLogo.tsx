import React, { useContext } from 'react';

import { useSelector } from 'react-redux';
import cls from './NabarLogo.module.scss';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
// import { Logo } from '@/shared/assets/Logo';
import { getInfoProject } from '@/entities/FileUploader';

const NavbarLogo = () => {
  const { isOpenBurgerNavbar, setIsOpenBurgerNavbar } =
    useContext(ButtonsContext);

  const infoProject = useSelector(getInfoProject);

  return (
    <div className={cls.NavbarLogoWrapper}>
      {/* <BugerNavbar
        onClick={() => setIsOpenBurgerNavbar(!isOpenBurgerNavbar)}
        className={cls.NavbarLogo2}
      /> */}
      {/* <LogoNabar /> */}
      {/* <Logo className={cls.NavbarLogo} /> */}
      <img
        src={`http://medapi.magicsoft.uz/${infoProject?.[0]?.logo}`}
        alt=""
        className={cls.NavbarLogo}
      />

      <p className={cls.NavbarText}>{infoProject?.[0]?.name}</p>
    </div>
  );
};

export default NavbarLogo;
