import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';

import cls from './NavbarProfile.module.scss';

const NavbarProfile = () => {
  const { isProfileWho } = useContext(ButtonsContext);

  const { t } = useTranslation();

  const profile =
    isProfileWho === 'admin'
      ? 'Admin'
      : isProfileWho === 'doktor'
      ? 'Doktor'
      : isProfileWho === 'qabulxona'
      ? 'Qabulxona'
      : '';
  return (
    <div className={cls.NavbarProfileWrapper}>
      <h3>{t(profile)}</h3>
    </div>
  );
};

export default NavbarProfile;
