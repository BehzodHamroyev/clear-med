import React, { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Toast from '../../Toast/Toast';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';

const ToastHalper = (props: any) => {
  const { status } = props;

  const { t } = useTranslation();

  const [toastProps, setToastProps] = React.useState({
    message: '',
    severity: '',
  });

  const { responseAddDoctorStatusCode, setHasOpenToast } =
    useContext(ButtonsContext);

  const statusCode = responseAddDoctorStatusCode;

  console.log(statusCode);

  useEffect(() => {
    if (statusCode) {
      if (statusCode === 200 || statusCode === '200') {
        setToastProps({
          message: t('Muvaffaqiyatli'),
          severity: 'success',
        });
        setHasOpenToast(true);
      } else if (statusCode === '404' || statusCode === 'Fail') {
        setToastProps({
          message: t("Ma'lumotlarni qayta tekshiring!"),
          severity: 'warning',
        });
        setHasOpenToast(true);
      } else {
        setToastProps({
          message: t('Xatolik yuz berdi!'),
          severity: 'error',
        });
        setHasOpenToast(true);
      }

      setHasOpenToast(true);
    } else {
      setHasOpenToast(false);
    }
  }, [setHasOpenToast, statusCode, t]);

  return (
    <div>
      <Toast severity={toastProps.severity} message={toastProps.message} />
    </div>
  );
};

export default ToastHalper;
