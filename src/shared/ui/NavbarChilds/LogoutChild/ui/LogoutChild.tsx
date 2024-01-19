import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

import { Logout } from '@mui/icons-material';
import cls from './LogoutChild.module.scss';
import { LoginContext } from '@/shared/lib/context/LoginContext';

const LogoutChild = () => {
  const { store } = useContext(LoginContext);

  const handleLogOut = () => {
    Cookies.remove('token');

    if (!Cookies.get('token')) {
      window.location.reload();
    }
  };

  return (
    <Link onClick={handleLogOut} to="/" className={cls.LogoutChildWrapper}>
      <Logout className={cls.LogoutIcon} />
    </Link>
  );
};

export default LogoutChild;
