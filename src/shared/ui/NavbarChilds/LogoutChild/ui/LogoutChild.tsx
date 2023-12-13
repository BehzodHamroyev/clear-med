import React from 'react';

import cls from './LogoutChild.module.scss';
import { Logout } from '@/shared/assets/widgets/Navbar';

const LogoutChild = () => {
  return (
    <div className={cls.LogoutChildWrapper}>
      <Logout className={cls.LogoutIcon}/>
    </div>
  );
};

export default LogoutChild;
