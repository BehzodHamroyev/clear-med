import { useTranslation } from 'react-i18next';
// import { Button } from '@/shared/ui/Button';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './ErrorPage.module.scss';

interface ErrorPageProps {
  className?: string;
}

export const ErrorPage = ({ className }: ErrorPageProps) => {
  const { t } = useTranslation();

  const reloadPage = () => {
    // eslint-disable-next-line no-restricted-globals
    location.reload();
  };

  return (
    <div className={classNames(cls.ErrorPage, {}, [className])}>
      {/* <p>{t('Kutilmagan xatolik yuz berdi')}</p> */}
      <button type="button" onClick={reloadPage}>
        {t('sahifani yangilang')}
      </button>
    </div>
  );
};
