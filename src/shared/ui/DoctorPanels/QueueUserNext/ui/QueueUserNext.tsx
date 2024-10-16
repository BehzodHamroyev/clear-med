import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { Button } from '@mui/material';
import cls from './QueueUserNext.module.scss';

import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
// eslint-disable-next-line max-len, ulbi-tv-plugin/public-api-imports
import { fetchQueuesProccess } from '@/entities/ControlPanelDocktor/model/services/fetchQueuesProccess';
// eslint-disable-next-line max-len, ulbi-tv-plugin/public-api-imports
import { getControlPanelDocktorData } from '@/entities/ControlPanelDocktor/model/selectors/controlPanelDocktorSelector';
// eslint-disable-next-line max-len, ulbi-tv-plugin/public-api-imports
import { fetchQueuesControlDoctor } from '@/pages/doctorPage/model/services/fetchQueuesControlDoctor';
// eslint-disable-next-line max-len, ulbi-tv-plugin/public-api-imports
import { getQueuesControlDoctorData } from '@/pages/doctorPage/model/selectors/queuesControlDoctorSelector';

const QueueUserNext = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const proccessedList = useSelector(getControlPanelDocktorData);
  const queuesList = useSelector(getQueuesControlDoctorData);
  const [updateQueueList, setUpdateQueueList] = useState(false);

  const handleClicknextQueue = () => {
    dispatch(
      fetchQueuesProccess({
        method: 'post',
        status: 'proccessed',
        path: '',
      }),
    );

    setUpdateQueueList(true);
  };

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
    <div className={cls.QueueUserNextWrapper}>
      {!proccessedList?.data[0] && queuesList && queuesList?.length > 0 && (
        <Button
          type="button"
          onClick={handleClicknextQueue}
          className={cls.QueueUserNextBtn}
        >
          {t('Keyingisi')}
        </Button>
      )}
    </div>
  );
};

export default QueueUserNext;
