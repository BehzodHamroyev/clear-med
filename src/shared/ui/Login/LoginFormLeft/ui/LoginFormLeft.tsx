import React, { useContext, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import Toast from '../../../Toast/Toast';

import { LoginTitle } from '../../LoginTitle';
import { LoginKeyInput } from '../../LoginKeyInput';
import { LoginSubmitBtn } from '../../LoginSubmitBtn';
import { LoginPhoneNumber } from '../../LoginPhoneNumber';

import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';

import cls from './LoginFormLeft.module.scss';

import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
// eslint-disable-next-line ulbi-tv-plugin/public-api-imports
import { fetchAuthUser } from '@/features/Auth/model/service/fetchAuthUser';
// eslint-disable-next-line ulbi-tv-plugin/public-api-imports
import {
  getAuthUserData,
  getAuthUserIsLoading,
  getAuthUserError,
} from '@/features/Auth/model/selector/authUserSelector';

const LoginFormLeft = () => {
  const formRef = useRef<HTMLFormElement | null>(null);

  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const { setHasOpenToast } = useContext(ButtonsContext);

  const authUserData = useSelector(getAuthUserData);
  const authUserIsLoading = useSelector(getAuthUserIsLoading);
  const authUserError = useSelector(getAuthUserError);

  const buttonsContext = useContext(ButtonsContext);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // Access form elements using formRef.current
    if (formRef.current) {
      const phoneNumberInput = formRef.current.querySelector(
        '[name="PhoneNumber"]',
      );
      const userPasswordInput = formRef.current.querySelector(
        '[name="UserPassword"]',
      );

      if (
        phoneNumberInput instanceof HTMLInputElement &&
        userPasswordInput instanceof HTMLInputElement
      ) {
        const phoneNumberValue = phoneNumberInput.value;
        const userPasswordValue = userPasswordInput.value;

        if (
          phoneNumberValue.startsWith('+998') &&
          phoneNumberValue.length > 8 &&
          userPasswordValue.length >= 8
        ) {
          dispatch(
            fetchAuthUser({
              password: userPasswordValue,
              login: Number(
                phoneNumberValue.split('+998')[1].replace(/\s/g, ''),
              ),
              refresh: false,
              buttonsContext,
            }),
          );
        } else {
          setHasOpenToast(true);
        }
      }
    }
  };

  useEffect(() => {
    if (authUserError) {
      setHasOpenToast(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUserError]);

  if (authUserIsLoading) {
    setHasOpenToast(false);
  }

  return (
    <div className={cls.LoginFormLeftWrapper}>
      <LoginTitle />

      <form ref={formRef} onSubmit={handleSubmit}>
        <LoginPhoneNumber />

        <LoginKeyInput />

        <LoginSubmitBtn content={t('KIRISH')} />
      </form>

      <Toast severity="error" message={t('Login yoki parol xato')} />
    </div>
  );
};

export default LoginFormLeft;
