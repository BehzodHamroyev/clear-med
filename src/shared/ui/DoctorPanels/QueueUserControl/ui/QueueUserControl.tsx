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
import { fetchDoneQueuesControlDoctor } from '@/pages/doctorPage/model/services/fetchDoneQueuesControlDoctor';
// eslint-disable-next-line ulbi-tv-plugin/public-api-imports
import { fetchQueuesControlDoctor } from '@/pages/doctorPage/model/services/fetchQueuesControlDoctor';
import { useSocket } from '@/shared/hook/useSocket';
import { getAuthUserData } from '@/features/Auth';

interface QueueUserControlProps {
  proccessedStep: number;
  ticketName: string
  roomNumber: number
}

const QueueUserControl = ({ proccessedStep, ticketName, roomNumber }: QueueUserControlProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const socket = useSocket()
  const { hasOpenToast, setHasOpenToast, isOpenQueueUserTimer } =
    useContext(ButtonsContext);
  const authUserData = useSelector(getAuthUserData);

  const [proccessCansel, setProccessCansel] = useState(false);
  const [proccessConfirm, setProccessConfirm] = useState(false);
  const [updateQueueList, setUpdateQueueList] = useState(false);

  console.log(authUserData?.rooms[0].id, 'authUserData');

  const proccessedList = useSelector(getControlPanelDocktorData);

  const handleClickProccessConfirm = () => {
    console.log(ticketName, roomNumber);


    if (socket) {
      socket.emit('doctorProcess', { ticketName: ticketName, roomNumber: roomNumber })
    }
    dispatch(
      fetchQueuesProccess({
        method: 'post',
        status: 'completed',
        path: '',
      }),
    ).then((res) => {
      dispatch(
        fetchQueuesProccess({
          method: 'post',
          status: 'proccessed',
          path: '',
        }),
      );
    });
    setHasOpenToast(true);

    setProccessConfirm(true);

    setUpdateQueueList(true);
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
