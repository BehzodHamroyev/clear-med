import React from 'react';

import cls from './NabarLogo.module.scss';
import { LogoNabar } from '@/shared/assets/widgets/Navbar';

const NavbarLogo = () => {
  return (
    <div className={cls.NavbarLogoWrapper}>
      <LogoNabar className={cls.NavbarLogo} />
    </div>
  );
};

export default NavbarLogo;
