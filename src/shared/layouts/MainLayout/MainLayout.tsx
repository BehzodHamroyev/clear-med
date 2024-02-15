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
import { socket } from '@/shared/lib/utils/socket';
// eslint-disable-next-line ulbi-tv-plugin/public-api-imports
import { LoaderBackHidden } from '@/widgets/LoaderBackHidden/inde';

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

  const authUserData = useSelector(getAuthUserData);
  const authUserDataIsLoading = useSelector(getAuthUserIsLoading);

  const {
    hasOpenToast,
    isOpenLanugagePopup,
    isLoginForHasToast,
    setIsLoginForHasToast,
  } = useContext(ButtonsContext);

  const location = useLocation();

  useEffect(() => {
    if (authUserData) {
      socket.emit('addUser', authUserData.id);
    }
  }, [authUserData]);

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
          <div className={cls.sidebar}>
            <Sidebar />
          </div>

          <div className={cls.content}>{content}</div>

          <div className={cls.rightbar}>
            <div className={cls.header}>{header}</div>
            <div className={cls.toolbar}>{toolbar}</div>
          </div>

          {isOpenLanugagePopup ? <LanguageModal /> : ''}

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
