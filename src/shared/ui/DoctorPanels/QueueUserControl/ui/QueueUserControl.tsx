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
import { Loader } from '@/widgets/Loader';

interface QueueUserControlProps {
  ticketName: string;
  roomNumber: number;
  proccessedStep: number;
}

const QueueUserControl = ({
  ticketName,
  roomNumber,
}: QueueUserControlProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const socket = useSocket();
  const { hasOpenToast, setHasOpenToast, isOpenQueueUserTimer } =
    useContext(ButtonsContext);
  const authUserData = useSelector(getAuthUserData);

  const [proccessCansel, setProccessCansel] = useState(false);
  const [proccessConfirm, setProccessConfirm] = useState(false);
  const [updateQueueList, setUpdateQueueList] = useState(false);

  const proccessedList = useSelector(getControlPanelDocktorData);

  const handleClickProccessConfirm = () => {
    if (socket && ticketName) {
      socket.emit('doctorProcess', {
        ticketName: ticketName,
        roomNumber: roomNumber,
        roomId: authUserData?.rooms[0]?._id,
      });
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

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      handleClickProccessConfirm();
    }
  };

  const btnStyle = {
    width: '100%',
    padding: '15px 30px',

    display: 'flex',
    alignItems: 'flex-start',

    border: 'none',
    outline: 'none',
    cursor: 'pointer',
    borderRadius: '6px',
    textDecoration: 'none',
    userSelect: 'none',

    fontSize: '22px',
    fontFamily: 'sans-serif',

    color: '#fff',
    backgroundColor: '#2da9e8',
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
      {proccessedList ? (
        <Button
          type="button"
          sx={btnStyle}
          onKeyDown={handleKeyDown}
          className={cls.queueUserNextBtn}
          onClick={handleClickProccessConfirm}
        >
          {t('call_patient')}
        </Button>
      ) : (
        <Loader />
      )}

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
