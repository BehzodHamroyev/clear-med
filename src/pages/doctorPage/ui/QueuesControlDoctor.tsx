import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getAuthUserData } from '@/features/Auth';
import { useSocket } from '@/shared/hook/useSocket';
import { ButtonNavbar } from '@/entities/ButtonNavbar';
import { ControlPanelDocktor } from '@/entities/ControlPanelDocktor';
import { TableTitleDoctorProfile } from '@/entities/TableTitleDoctorProfile';
import {
  DynamicModuleLoader,
  ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { queuesControlDoctorReducer } from '../model/slice/queuesControlDoctorSlice';
import { fetchQueuesControlDoctor } from '../model/services/fetchQueuesControlDoctor';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getQueuesControlDoctorData } from '../model/selectors/queuesControlDoctorSelector';
import { fetchDoneQueuesControlDoctor } from '../model/services/fetchDoneQueuesControlDoctor';
import cls from './QueuesControlDoctor.module.scss';

const reducers: ReducersList = {
  queuesControlDoctor: queuesControlDoctorReducer,
};

const QueuesControlDoctor = () => {
  const socket = useSocket();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const queuesList = useSelector(getQueuesControlDoctorData);
  const authUserData = useSelector(getAuthUserData);

  const [roomId, setRoomId] = useState('');

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
    if (socket) {
      socket.on('queueCreated', (data) => {
        if (data.room === roomId) {
          dispatch(fetchQueuesControlDoctor({ status: 'pending' }));
          dispatch(fetchDoneQueuesControlDoctor({ limit: 1000 }));
        }
      });
    }

    return () => {
      socket?.disconnect();
    };
  }, [socket]);

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
      <div className={cls.bigClass}>
        <div className={cls.QueuesControlDoctorWrapper}>
          <div className={cls.wraperListDoctor}></div>
          <ControlPanelDocktor />
        </div>

        <div className={cls.TableDoctor}>
          <div>
            {queuesList && queuesList.length > 0 ? (
              <>
                <ButtonNavbar
                  dontCreate
                  TableTitle={t('Kutayotgan bemorlar')}
                  ItemsLength={queuesList?.length}
                />

                <TableTitleDoctorProfile
                  Tabletbody={queuesList}
                  Tablethead={['Id', t('Bilet berilgan vaqti')]}
                />
              </>
            ) : (
              <h2 className={cls.QueuesControlDoctorWrapper__noQueueTitle}>
                {t('patients_queues')}
              </h2>
            )}
          </div>
        </div>
      </div>
    </DynamicModuleLoader>
  );
};

export default QueuesControlDoctor;
