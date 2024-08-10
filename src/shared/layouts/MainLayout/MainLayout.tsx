import { memo, ReactElement, useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './MainLayout.module.scss';

import { Sidebar } from '@/widgets/Sidebar';
import { getAuthUserData, getAuthUserIsLoading, Login } from '@/features/Auth';
import Toast from '@/shared/ui/Toast/Toast';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import { LanguageModal } from '@/shared/ui/LanguageModal';
// import { socket } from '@/shared/lib/utils/socket';
// eslint-disable-next-line ulbi-tv-plugin/public-api-imports
import { LoaderBackHidden } from '@/widgets/LoaderBackHidden/inde';
import { EditLanguageModal } from '@/entities/EditLanguageModal';

interface MainLayoutProps {
  className?: string;
  header: ReactElement;
  content: ReactElement;
  sidebar?: ReactElement;
  toolbar?: ReactElement;
}

export const MainLayout = memo((props: MainLayoutProps) => {
  const { className, content, toolbar, header, sidebar } = props;

  const { t } = useTranslation();

  const location = useLocation();

  const loginData = useSelector(getAuthUserData);

  const authUserDataIsLoading = useSelector(getAuthUserIsLoading);

  const {
    hasOpenToast,
    isOpenLanugagePopup,
    isLoginForHasToast,
    setIsLoginForHasToast,
    isVisableLanguageModal,
  } = useContext(ButtonsContext);

  // const [isConnected, setIsConnected] = useState(socket.connected);

  // useEffect(() => {
  //   function onConnect() {
  //     setIsConnected(true);
  //   }

  //   function onDisconnect() {
  //     setIsConnected(false);
  //   }

  //   if (authUserData) {
  //     socket.on('connect', onConnect);
  //     socket.on('disconnect', onDisconnect);
  //   }

  //   if (!isConnected && authUserData) {
  //     socket.connect();
  //   }

  //   return () => {
  //     socket.off('connect', onConnect);
  //     socket.off('disconnect', onDisconnect);
  //   };
  // }, [authUserData, isConnected]);

  // useEffect(() => {
  //   if (authUserData) {
  //     socket.emit('addUser', authUserData.id);
  //   }
  // }, [authUserData]);

  // After logging in to the system, to display the message "You have successfully entered the system" only once and not to display it in other cases
  useEffect(() => {
    if (isLoginForHasToast) {
      setTimeout(() => {
        setIsLoginForHasToast(false);
      }, 5000);
    }
  }, [isLoginForHasToast, setIsLoginForHasToast]);

  return (
    <div>
      {location.pathname === '/login' ? (
        <Login />
      ) : (
        <div className={classNames(cls.MainLayout, {}, [className])}>
          {loginData?.role !== 'reception' && (
            <div className={cls.sidebar}>
              <Sidebar />
            </div>
          )}

          <div className={cls.content}>{content}</div>

          <div className={cls.rightbar}>
            <div className={cls.header}>{header}</div>
            <div className={cls.toolbar}>{toolbar}</div>
          </div>

          {isOpenLanugagePopup ? <LanguageModal /> : ''}

          {isVisableLanguageModal && loginData?.role === 'reception' && (
            <EditLanguageModal />
          )}

          {hasOpenToast && isLoginForHasToast && (
            <Toast
              severity="success"
              message={t('Timizga muvaffaqqiyatli kirdingiz')}
            />
          )}
        </div>
      )}

      {authUserDataIsLoading && <LoaderBackHidden />}
    </div>
  );
});
