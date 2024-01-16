import React from 'react';
import { useTranslation } from 'react-i18next';

import cls from './LoginSubmitBtn.module.scss';

interface LoginSubmitBtnProps {
  content: string;
}

const LoginSubmitBtn = ({ content }: LoginSubmitBtnProps) => {
  const { t } = useTranslation();

  return (
    <div className={cls.LoginSubmitBtnWrapper}>
      <button type="submit">{content}</button>
    </div>
  );
};

export default LoginSubmitBtn;
