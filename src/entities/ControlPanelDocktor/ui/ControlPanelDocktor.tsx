import React, { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Loader } from '@/widgets/Loader';
import cls from './ControlPanelDocktor.module.scss';
import { QueueUserDoctor } from '@/shared/ui/DoctorPanels/QueueUserDoctor';
import { fetchQueuesProccess } from '../model/services/fetchQueuesProccess';
import { QueueUserControl } from '@/shared/ui/DoctorPanels/QueueUserControl';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getControlPanelDocktorData } from '../model/selectors/controlPanelDocktorSelector';
import { getQueuesControlDoctorIsLoading } from '@/pages/doctorPage/model/selectors/queuesControlDoctorSelector';

const ControlPanelDocktor = memo(() => {
  const dispatch = useAppDispatch();
  const proccessedList = useSelector(getControlPanelDocktorData);
  const queuesListLoading = useSelector(getQueuesControlDoctorIsLoading);

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
            proccessedStep={proccessedList?.data[0]?.step}
            ticketName={proccessedList?.data[0]?.queues_name}
            roomNumber={proccessedList?.data[0]?.room_id?.name}
            ticketId={proccessedList?.data[0]?._id}
          />
        </>
      )}

      {queuesListLoading && <Loader />}
    </div>
  );
});

export default ControlPanelDocktor;
