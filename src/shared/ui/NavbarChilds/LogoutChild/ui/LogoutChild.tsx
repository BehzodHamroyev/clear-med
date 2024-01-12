import React, { useContext } from 'react';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { getUserData } from '@/features/Auth';
import { Logout } from '@/shared/assets/widgets/Navbar';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';

import cls from './LogoutChild.module.scss';

const LogoutChild = () => {
  const { setIsProfileWho } = useContext(ButtonsContext);

  const loginData = useSelector(getUserData);

  const handleClickLogOut = () => {
    setIsProfileWho('');
    localStorage.removeItem('token');
    Cookies.remove('token');

    // Token borligini tekshirish
    const isTokenExists = Cookies.get('token');

    if (isTokenExists === undefined) {
      console.log('Token removed successfully, LogOut');
    } else {
      console.log('Error removing token');
    }
  };

  return (
    <Link onClick={handleClickLogOut} to="/" className={cls.LogoutChildWrapper}>
      <Logout className={cls.LogoutIcon} />
    </Link>
  );
};

export default LogoutChild;
