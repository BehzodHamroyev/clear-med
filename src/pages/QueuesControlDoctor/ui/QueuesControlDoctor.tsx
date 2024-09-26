/* eslint-disable consistent-return */
/* eslint-disable max-len */
import React, { useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import dayjs, { Dayjs } from 'dayjs';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { SelectChangeEvent } from '@mui/material';

import { ButtonNavbar } from '@/entities/ButtonNavbar';
import { TableTitleDoctorProfile } from '@/entities/TableTitleDoctorProfile';
import cls from './QueuesControlDoctor.module.scss';
import {
  DynamicModuleLoader,
  ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { queuesControlDoctorReducer } from '../model/slice/queuesControlDoctorSlice';
import { fetchQueuesControlDoctor } from '../model/services/fetchQueuesControlDoctor';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
  getQueuesControlDoctorData,
  getQueuesControlDoctorError,
} from '../model/selectors/queuesControlDoctorSelector';
import { fetchDoneQueuesControlDoctor } from '../model/services/fetchDoneQueuesControlDoctor';
import {
  getDoneQueuesControlDoctorData,
  getDoneQueuesControlDoctorIsLoading,
  getDoneQueuesControlDoctorError,
} from '../model/selectors/doneQueuesControlDoctorSelector';
import { fetchAuthUser, getAuthUserData } from '@/features/Auth';
import instance from '@/shared/lib/axios/api';
import { baseUrl } from '../../../../baseurl';
import { ChangeDoctorBackend } from '../model/types/changeDoctorType';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import { ControlPanelDocktor } from '@/entities/ControlPanelDocktor';
import { DoctorId } from '@/features/Auth/model/types/AuthentificationTypes';
import { useSocket } from '@/shared/hook/useSocket';

const reducers: ReducersList = {
  queuesControlDoctor: queuesControlDoctorReducer,
};

const QueuesControlDoctor = () => {
  const socket = useSocket()
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const queuesList = useSelector(getQueuesControlDoctorData);





  useEffect(() => {
    dispatch(fetchQueuesControlDoctor({ status: 'pending' }));
  }, [dispatch]);



  useEffect(() => {
    dispatch(fetchDoneQueuesControlDoctor({ limit: 1000 }));
  }, [dispatch]);

  // useEffect to set up interval for fetching queue data every second
  // useEffect(() => {
  //   const fetchInterval = setInterval(() => {
  //     dispatch(fetchQueuesControlDoctor({ status: 'pending' }));
  //   }, 1000);

  //   // Clean up interval on component unmount
  //   return () => clearInterval(fetchInterval);
  // }, [dispatch]);





  useEffect(() => {
    if (socket) {
      // Listen for server messages
      socket.on('message', (data) => {
        console.log('Message from server:', data);
      });

      socket.on('queueCreated', (data) => {
        if (data) {
          dispatch(fetchQueuesControlDoctor({ status: 'pending' }));
          dispatch(fetchDoneQueuesControlDoctor({ limit: 1000 }));
        }
        console.log(data, 'New queue created');
      });
    }

    // Clean up socket connection on component unmount
    return () => {
      socket?.disconnect();
    };
  }, [socket]);


  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
      <div className={cls.bigClass}>
        <div className={cls.QueuesControlDoctorWrapper}>
          <div className={cls.wraperListDoctor}>
          </div>
          <ControlPanelDocktor />
        </div>


        <div className={cls.TableDoctor}>
          <div className={cls.TableDoctorChild}>
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
