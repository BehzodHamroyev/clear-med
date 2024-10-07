import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Loader } from '@/widgets/Loader';
import { getAuthUserData } from '@/features/Auth';
import { useSocket } from '@/shared/hook/useSocket';
import cls from './QueuesControlDoctor.module.scss';
import { ButtonNavbar } from '@/entities/ButtonNavbar';
import { ControlPanelDocktor } from '@/entities/ControlPanelDocktor';
import { TableTitleDoctorProfile } from '@/entities/TableTitleDoctorProfile';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { queuesControlDoctorReducer } from '../model/slice/queuesControlDoctorSlice';
import { fetchQueuesControlDoctor } from '../model/services/fetchQueuesControlDoctor';
import { fetchDoneQueuesControlDoctor } from '../model/services/fetchDoneQueuesControlDoctor';

import {
  ReducersList,
  DynamicModuleLoader,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

import {
  getQueuesControlDoctorData,
  getQueuesControlDoctorIsLoading,
} from '../model/selectors/queuesControlDoctorSelector';

const reducers: ReducersList = {
  queuesControlDoctor: queuesControlDoctorReducer,
};

const QueuesControlDoctor = () => {
  const socket = useSocket();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [roomId, setRoomId] = useState('');

  const authUserData = useSelector(getAuthUserData);
  const queuesList = useSelector(getQueuesControlDoctorData);
  const queuesListLoading = useSelector(getQueuesControlDoctorIsLoading);

  useEffect(() => {
    dispatch(fetchQueuesControlDoctor({ status: 'pending' }));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchDoneQueuesControlDoctor({ limit: 1000 }));
  }, [dispatch]);

  useEffect(() => {
    if (authUserData) {
      const id = authUserData?.rooms[0]._id;
      setRoomId(id);
    }
  }, [authUserData]);

  useEffect(() => {
    if (socket && roomId) {
      socket.on('queueCreated', (data) => {
        if (data.room === roomId) {
          dispatch(fetchQueuesControlDoctor({ status: 'pending' }));
          dispatch(fetchDoneQueuesControlDoctor({ limit: 1000 }));
        }
      });
    }
  }, [socket, roomId, dispatch]);

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
      <div className={cls.QueuesControlDoctor}>
        <div className={cls.QueuesControlDoctor__tableDoctor}>
          {queuesList && queuesList.length > 0 && (
            <>
              <ButtonNavbar
                dontCreate
                ItemsLength={queuesList?.length}
                TableTitle={t('Kutayotgan bemorlar')}
              />

              {queuesList && queuesList.length > 0 ? (
                <TableTitleDoctorProfile
                  Tabletbody={queuesList}
                  Tablethead={['Id', t('Bilet berilgan vaqti')]}
                />
              ) : (
                <h2
                  className={
                    cls['QueuesControlDoctor__tableDoctor--noQueueTitle']
                  }
                >
                  {t('patients_queues')}
                </h2>
              )}
            </>
          )}
        </div>

        <ControlPanelDocktor />
      </div>

      {queuesListLoading && <Loader />}
    </DynamicModuleLoader>
  );
};

export default QueuesControlDoctor;
