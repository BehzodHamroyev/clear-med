import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { getUserData } from '@/features/Auth';
import { Logout } from '@/shared/assets/widgets/Navbar';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';

import cls from './LogoutChild.module.scss';

const LogoutChild = () => {
  const { setIsProfileWho } = useContext(ButtonsContext);

  const loginData = useSelector(getUserData);

  return (
    <Link
      onClick={() => {
        setIsProfileWho('');
        localStorage.removeItem('token');
      }}
      to="/"
      className={cls.LogoutChildWrapper}
    >
      <Logout className={cls.LogoutIcon} />
    </Link>
  );
};

export default LogoutChild;
