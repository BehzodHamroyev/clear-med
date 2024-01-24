import { memo, ReactElement, useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './MainLayout.module.scss';

import { Sidebar } from '@/widgets/Sidebar';
import { getAuthUserData, Login } from '@/features/Auth';
import Toast from '@/shared/ui/Toast/Toast';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import { LanguageModal } from '@/shared/ui/LanguageModal';

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

  const { setHasOpenToast } = useContext(ButtonsContext);

  const [hasToaster, setHasToaster] = useState(false);

  const location = useLocation();

  useEffect(() => {
    if (authUserData) {
      setHasOpenToast(true);

      setHasToaster(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUserData]);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (hasToaster) {
      const timeoutId = setTimeout(() => {
        setHasToaster(false);
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, [hasToaster]);

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

          <LanguageModal />

          {hasToaster && (
            <Toast
              severity="success"
              message={t('Timizga muvaffaqqiyatli kirdingiz')}
            />
          )}
        </div>
      )}
    </div>
  );
});
