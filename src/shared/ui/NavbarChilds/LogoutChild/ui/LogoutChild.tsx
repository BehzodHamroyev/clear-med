import React from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

import { Logout } from '@mui/icons-material';
import cls from './LogoutChild.module.scss';
import axios from 'axios';
import { baseUrl } from '../../../../../../baseurl';
import { useNavigate } from 'react-router-dom';

const LogoutChild = () => {
  const handleLogOut = async () => {
    const getTokenCookie = Cookies.get('token');
    const navigate = useNavigate();

    try {
      const response = await axios.post<any>(
        `${baseUrl}/users/logout`,
        { data: getTokenCookie },
        {
          maxBodyLength: Infinity,
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${getTokenCookie}`,
          },
        },
      );

      Cookies.remove('token');
      navigate('/login');

      return response.data;
    } catch (e) {
      return console.log('error');
    }
  };

  return (
    <Link onClick={handleLogOut} to="/login" className={cls.LogoutChildWrapper}>
      <Logout className={cls.LogoutIcon} />
    </Link>
  );
};

export default LogoutChild;
