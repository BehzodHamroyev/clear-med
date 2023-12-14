import React from 'react';
import { useTranslation } from 'react-i18next';
import cls from './LoginTitle.module.scss';

const LoginTitle = () => {
  const { t } = useTranslation();

  return (
    <div className={cls.LoginTitleWrapper}>
      <h2 className={cls.Title}>{t('KIRISH')}</h2>
      <p className={cls.paragraph}>
        {t('Tizimga kirish uchun maʼlumotlaringizni kiriting.')}
      </p>
    </div>
  );
};

export default LoginTitle;
