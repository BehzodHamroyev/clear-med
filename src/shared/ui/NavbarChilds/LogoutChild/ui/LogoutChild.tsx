import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { Logout } from '@mui/icons-material';
import cls from './LogoutChild.module.scss';
import { LoginContext } from '@/shared/lib/context/LoginContext';

const LogoutChild = () => {
  const { store } = useContext(LoginContext);

  return (
    <Link
      onClick={() => store.logout()}
      to="/"
      className={cls.LogoutChildWrapper}
    >
      <Logout className={cls.LogoutIcon} />
    </Link>
  );
};

export default LogoutChild;
