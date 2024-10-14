import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

import { Logout } from '@mui/icons-material';
import cls from './LogoutChild.module.scss';
import axios from 'axios';
import { baseUrl } from '../../../../../../baseurl';
import { useNavigate } from 'react-router-dom';
import instance from '@/shared/lib/axios/api';

const LogoutChild = () => {
  const getTokenCookie = Cookies.get('token');
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      await instance.post<any>(
        `${baseUrl}/users/logout`,
        { data: getTokenCookie },
      );

      Cookies.remove('token');
      navigate('/login');
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
