import React, { useContext, useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Toast from '../../../Toast/Toast';
import cls from './QueueUserControl.module.scss';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import { QueueUserControlTimer } from '@/entities/QueueUserControlTimer';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
// eslint-disable-next-line ulbi-tv-plugin/public-api-imports
import { fetchQueuesProccess } from '@/entities/ControlPanelDocktor/model/services/fetchQueuesProccess';
// eslint-disable-next-line ulbi-tv-plugin/public-api-imports
import { getControlPanelDocktorData } from '@/entities/ControlPanelDocktor/model/selectors/controlPanelDocktorSelector';
// eslint-disable-next-line ulbi-tv-plugin/public-api-imports
import { fetchDoneQueuesControlDoctor } from '@/pages/QueuesControlDoctor/model/services/fetchDoneQueuesControlDoctor';
// eslint-disable-next-line ulbi-tv-plugin/public-api-imports
import { fetchQueuesControlDoctor } from '@/pages/QueuesControlDoctor/model/services/fetchQueuesControlDoctor';

interface QueueUserControlProps {
  proccessedStep: number;
}

const QueueUserControl = ({ proccessedStep }: QueueUserControlProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const { hasOpenToast, setHasOpenToast, isOpenQueueUserTimer } =
    useContext(ButtonsContext);

  const [proccessCansel, setProccessCansel] = useState(false);
  const [proccessConfirm, setProccessConfirm] = useState(false);
  const [updateQueueList, setUpdateQueueList] = useState(false);

  const proccessedList = useSelector(getControlPanelDocktorData);

  const handleClickProccessConfirm = () => {
    if (proccessedStep) {
      dispatch(
        fetchQueuesProccess({
          method: 'post',
          status: 'completed',
          path: '',
        }),
      );
      setHasOpenToast(true);

      setProccessConfirm(true);

      dispatch(
        fetchQueuesProccess({
          method: 'post',
          status: 'proccessed',
          path: '',
        }),
      );

      setUpdateQueueList(true);
    }
  };

  useEffect(() => {
    if (proccessCansel) {
      dispatch(
        fetchDoneQueuesControlDoctor({
          limit: 1000,
        }),
      );

      dispatch(
        fetchQueuesControlDoctor({
          status: 'pending',
        }),
      );

      setProccessCansel(false);
    }

    if (proccessConfirm) {
      dispatch(
        fetchDoneQueuesControlDoctor({
          limit: 1000,
        }),
      );

      dispatch(
        fetchQueuesControlDoctor({
          status: 'pending',
        }),
      );

      setProccessConfirm(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [proccessedList]);

  useEffect(() => {
    if (
      updateQueueList &&
      proccessedList?.result &&
      proccessedList?.result > 0
    ) {
      dispatch(
        fetchQueuesControlDoctor({
          status: 'pending',
        }),
      );
    }

    setUpdateQueueList(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [proccessedList]);

  return (
    <>
      <div className={cls.QueueUserControlWrapper}>
        <div className={cls.Buttons}>
          <Button
            type="button"
            onClick={handleClickProccessConfirm}
            className={cls.QueueUserNextBtn}
          >
            {t('Keyingisi')}
          </Button>
        </div>
      </div>

      {(proccessCansel || proccessConfirm) && hasOpenToast && (
        <Toast
          severity="success"
          message={t("Bemor ko'rilganlar ro'yhatiga qo'shildi")}
        />
      )}

      {isOpenQueueUserTimer && <QueueUserControlTimer />}
    </>
  );
};

export default QueueUserControl;
