import React, { memo } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import { NavbarLogo } from '@/shared/ui/NavbarChilds/NavbarLogo';
import { NavbarSearch } from '@/shared/ui/NavbarChilds/NavbarSearch';
import { NavbarLogout } from '@/shared/ui/NavbarChilds/NavbarLogout';

import cls from './Navbar.module.scss';

interface NavbarProp {
  className?: string;
}

export const Navbar = memo((prop: NavbarProp) => {
  return (
    <div className={classNames(cls.NabarWrapper)}>
      <NavbarLogo />
      <NavbarSearch />
      <NavbarLogout />
    </div>
  );
});
