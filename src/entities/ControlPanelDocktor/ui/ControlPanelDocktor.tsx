import React, { useEffect } from 'react';

import { useSelector } from 'react-redux';
import cls from './ControlPanelDocktor.module.scss';
import { QueueUserDoctor } from '@/shared/ui/DoctorPanels/QueueUserDoctor';
import { QueueUserControl } from '@/shared/ui/DoctorPanels/QueueUserControl';
import { QueueUserNext } from '@/shared/ui/DoctorPanels/QueueUserNext';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchQueuesProccess } from '../model/services/fetchQueuesProccess';
import {
  getControlPanelDocktorData,
  getControlPanelDocktorError,
  getControlPanelDocktorIsLoading,
} from '../model/selectors/controlPanelDocktorSelector';

const ControlPanelDocktor = () => {
  const dispatch = useAppDispatch();
  const proccessedList = useSelector(getControlPanelDocktorData);
  const proccessedIsLoading = useSelector(getControlPanelDocktorIsLoading);
  const proccessedError = useSelector(getControlPanelDocktorError);

  useEffect(() => {
    dispatch(
      fetchQueuesProccess({
        status: 'proccessed',
      }),
    );
  }, [dispatch]);

  if (proccessedList) {
    console.log(proccessedList.queues[0]);
  }

  return (
    <div className={cls.ControlPanelDocktorWrapper}>
      {proccessedList && (
        <>
          <QueueUserDoctor
            ticketNumber={proccessedList?.queues[0]?.queues_name[0]}
            roomNumber={proccessedList?.queues[0]?.room_id?.name}
          />

          <QueueUserControl proccessedStep={proccessedList?.queues[0]?.step} />
        </>
      )}
      <QueueUserNext />
    </div>
  );
};

export default ControlPanelDocktor;
