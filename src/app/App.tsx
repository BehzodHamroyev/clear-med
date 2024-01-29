import React, { Suspense, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Cookies from 'js-cookie';

import { Navbar } from '@/widgets/Nabar';
import { Loader } from '@/widgets/Loader';
import { AppRouter } from './providers/router';
import { MainLayout } from '@/shared/layouts/MainLayout';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { classNames } from '@/shared/lib/classNames/classNames';
import { withTheme } from './providers/ThemeProvider/ui/withTheme';

import 'react-calendar/dist/Calendar.css';

// eslint-disable-next-line ulbi-tv-plugin/public-api-imports
import { fetchAuthUser } from '@/features/Auth';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { socket } from '@/shared/lib/utils/socket';

const App = () => {
  const { theme } = useTheme();

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (Cookies.get('token')) {
      dispatch(
        fetchAuthUser({
          refresh: true,
        }),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!Cookies.get('token')) {
      navigate('/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Event listener for beforeunload
    const handleBeforeUnload = () => {
      // Disconnect the Socket.IO connection before the page is unloaded
      socket.disconnect();
    };

    // Add the event listener
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Cleanup: Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <div id="app" className={classNames('app_redesigned', {}, [theme])}>
      <Suspense fallback={<Loader />}>
        <MainLayout header={<Navbar />} content={<AppRouter />} />
      </Suspense>
    </div>
  );
};

export default withTheme(App);
