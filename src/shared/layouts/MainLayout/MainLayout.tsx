/* eslint-disable no-constant-condition */
import { memo, ReactElement, useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import cls from './MainLayout.module.scss';
import { Sidebar } from '@/widgets/Sidebar';
import Toast from '@/shared/ui/Toast/Toast';
// import { socket } from '@/shared/lib/utils/socket';
import { LanguageModal } from '@/shared/ui/LanguageModal';
import { classNames } from '@/shared/lib/classNames/classNames';
import { EditLanguageModal } from '@/entities/EditLanguageModal';
// eslint-disable-next-line ulbi-tv-plugin/public-api-imports
import { LoaderBackHidden } from '@/widgets/LoaderBackHidden/inde';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import { getAuthUserData, getAuthUserIsLoading, Login } from '@/features/Auth';
// eslint-disable-next-line ulbi-tv-plugin/public-api-imports
import QueuesPageFullScreen from '@/pages/QueuesPageFullScreen/ui/QueuesPageFullScreen';

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

  // After logging in to the system, to display the message "You have successfully entered the system" only once and not to display it in other cases
  useEffect(() => {
    if (isLoginForHasToast) {
      setTimeout(() => {
        setIsLoginForHasToast(false);
      }, 5000);
    }
  }, [isLoginForHasToast, setIsLoginForHasToast]);

  if (loginData?.role === 'monitor') {
    return <QueuesPageFullScreen />;
  }

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
