import React from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

import { Logout } from '@mui/icons-material';
import cls from './LogoutChild.module.scss';

const LogoutChild = () => {
  const handleLogOut = () => {
    Cookies.remove('token');

    if (!Cookies.get('token')) {
      window.location.reload();
    }
  };

  return (
    <Link onClick={handleLogOut} to="/login" className={cls.LogoutChildWrapper}>
      <Logout className={cls.LogoutIcon} />
    </Link>
  );
};

export default LogoutChild;
