import React, { memo, useEffect } from 'react';

import { useSelector } from 'react-redux';
import cls from './ControlPanelDocktor.module.scss';
import { QueueUserDoctor } from '@/shared/ui/DoctorPanels/QueueUserDoctor';
import { QueueUserControl } from '@/shared/ui/DoctorPanels/QueueUserControl';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchQueuesProccess } from '../model/services/fetchQueuesProccess';
import {
  getControlPanelDocktorData,
} from '../model/selectors/controlPanelDocktorSelector';

const ControlPanelDocktor = memo(() => {
  const dispatch = useAppDispatch();
  const proccessedList = useSelector(getControlPanelDocktorData);

  useEffect(() => {
    dispatch(
      fetchQueuesProccess({
        method: 'get',
        status: 'proccessed',
        path: 'type?status=',
      }),
    );
  }, [dispatch]);

  return (
    <div className={cls.ControlPanelDocktorWrapper}>
      {proccessedList && (
        <>
          <QueueUserDoctor
            ticketNumber={proccessedList?.data[0]?.queues_name}
            roomNumber={proccessedList?.data[0]?.room_id?.name}
          />

          <QueueUserControl
            roomNumber={proccessedList?.data[0]?.room_id?.name}
            ticketName={proccessedList?.data[0]?.queues_name}
            proccessedStep={proccessedList?.data[0]?.step} />
        </>
      )}
      {/* <QueueUserNext /> */}
    </div>
  );
});

export default ControlPanelDocktor;
