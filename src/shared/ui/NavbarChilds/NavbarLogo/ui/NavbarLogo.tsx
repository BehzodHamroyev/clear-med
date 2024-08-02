import React, { useContext } from 'react';

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import cls from './NabarLogo.module.scss';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
// import { Logo } from '@/shared/assets/Logo';
import { getInfoProject } from '@/entities/FileUploader';
import { getAuthUserData } from '@/features/Auth';

const NavbarLogo = () => {
  const { isOpenBurgerNavbar, setIsOpenBurgerNavbar } =
    useContext(ButtonsContext);

  const loginData = useSelector(getAuthUserData);

  const infoProject = useSelector(getInfoProject);

  const imgLink: string = `http://socketmed.magicsoft.uz//${infoProject?.[0]?.logo}`;

  return (
    <Link to="/" className={cls.NavbarLogoWrapper}>
      {/* <BugerNavbar
        onClick={() => setIsOpenBurgerNavbar(!isOpenBurgerNavbar)}
        className={cls.NavbarLogo2}
      /> */}
      {/* <LogoNabar /> */}
      {/* <Logo className={cls.NavbarLogo} /> */}

      <img src={imgLink} alt="imgLink" className={cls.NavbarLogo} />

      {loginData?.role !== 'reception' && (
        <p className={cls.NavbarText}>{infoProject?.[0]?.name}</p>
      )}
    </Link>
  );
};

export default NavbarLogo;
