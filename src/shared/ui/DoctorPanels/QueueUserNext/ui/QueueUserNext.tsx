import React from 'react';
import { useTranslation } from 'react-i18next';

import cls from './QueueUserNext.module.scss';

const QueueUserNext = () => {
  const { t } = useTranslation();

  return (
    <div className={cls.QueueUserNextWrapper}>
      <button disabled className={cls.QueueUserNextBtn} type="button">
        {t('Keyingisi')}
      </button>
    </div>
  );
};

export default QueueUserNext;
