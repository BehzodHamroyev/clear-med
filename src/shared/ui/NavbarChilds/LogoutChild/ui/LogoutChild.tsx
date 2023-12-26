import React, { useContext } from 'react';

import { Link } from 'react-router-dom';
import { Logout } from '@/shared/assets/widgets/Navbar';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';

import cls from './LogoutChild.module.scss';

const LogoutChild = () => {
  const { setIsProfileWho } = useContext(ButtonsContext);
  return (
    <Link to="/" className={cls.LogoutChildWrapper}>
      <Logout onClick={() => setIsProfileWho('')} className={cls.LogoutIcon} />
    </Link>
  );
};

export default LogoutChild;
