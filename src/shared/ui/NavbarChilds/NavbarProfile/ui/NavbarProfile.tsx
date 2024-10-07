import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { getAuthUserData } from '@/features/Auth';

import cls from './NavbarProfile.module.scss';

const NavbarProfile = () => {
  const loginData = useSelector(getAuthUserData);

  const { t } = useTranslation();

  return (
    <div className={cls.NavbarProfileWrapper}>
      {/* {loginData?.role !== 'reception' && <h3>{t(`${loginData?.role}`)}: </h3>} */}

      {loginData?.role === 'doctor' && <h3>{loginData?.name}</h3>}

      {/* {loginData?.role === 'reception' && <h3>: {loginData?.name}</h3>} */}
    </div>
  );
};

export default NavbarProfile;
