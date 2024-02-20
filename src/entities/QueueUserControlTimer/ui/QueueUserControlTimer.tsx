import React, { useContext, useEffect, useState } from 'react';

import { Dialog } from '@mui/material';
import { useTranslation } from 'react-i18next';
import cls from './QueueUserControlTimer.module.scss';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';

const QueueUserControlTimer = () => {
  const { t } = useTranslation();

  const [count, setCount] = useState(10);

  const { isOpenQueueUserTimer, setIsOpenQueueUserTimer } =
    useContext(ButtonsContext);

  const handleClose = () => {
    // don't remove
  };

  useEffect(() => {
    if (count > 0 && isOpenQueueUserTimer) {
      setTimeout(() => {
        if (count === 0) {
          setIsOpenQueueUserTimer(false);
        }
        if (count !== 0) {
          setCount((prev) => prev - 1);
        }
      }, 1000);
    }
  }, [count, isOpenQueueUserTimer, setIsOpenQueueUserTimer]);

  return (
    <Dialog
      onClose={handleClose}
      open={isOpenQueueUserTimer}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className={cls.QueueUserControlTimerWrapper}
    >
      <div className={cls.QueueUserControlTimerWrapper__card}>
        <p className={cls['QueueUserControlTimerWrapper__card--title']}>
          {t('Kuting')}...
        </p>
        {/* {[...Array(count + 1)].map((_, index) => ( */}
        <p
          // key={index}
          className={cls['QueueUserControlTimerWrapper__card--paragraph']}
        >
          {count}
          {/* {count - index} */}
        </p>
        {/* ))} */}
      </div>
    </Dialog>
  );
};

export default QueueUserControlTimer;
