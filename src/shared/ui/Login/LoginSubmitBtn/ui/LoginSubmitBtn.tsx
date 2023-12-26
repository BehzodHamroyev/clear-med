import React from 'react';
import { useTranslation } from 'react-i18next';

import cls from './LoginSubmitBtn.module.scss';

const LoginSubmitBtn = () => {
  const { t } = useTranslation();

  return (
    <div className={cls.LoginSubmitBtnWrapper}>
      <button type="submit">{t('Kirish')}</button>
    </div>
  );
};

export default LoginSubmitBtn;
