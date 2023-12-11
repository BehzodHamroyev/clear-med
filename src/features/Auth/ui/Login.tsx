import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

const Login: FC = () => {
  const { t } = useTranslation();
  return <div>{t('Login')}</div>;
};

export default Login;
