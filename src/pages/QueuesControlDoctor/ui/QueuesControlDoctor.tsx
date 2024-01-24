import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { io } from 'socket.io-client';
import axios from 'axios';

import { ButtonNavbar } from '@/entities/ButtonNavbar';
import { ControlPanelDocktor } from '@/entities/ControlPanelDocktor';
import { TableTitleDoctorProfile } from '@/entities/TableTitleDoctorProfile';

import cls from './QueuesControlDoctor.module.scss';
import {
  DynamicModuleLoader,
  ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import {
  queuesControlDoctorReducer,
  useQueuesControlDoctorActions,
} from '../model/slice/queuesControlDoctorSlice';
import { fetchQueuesControlDoctor } from '../model/services/fetchQueuesControlDoctor';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
  getQueuesControlDoctorData,
  getQueuesControlDoctorError,
  getQueuesControlDoctorIsLoading,
} from '../model/selectors/queuesControlDoctorSelector';
// eslint-disable-next-line ulbi-tv-plugin/public-api-imports
import {
  getControlPanelDocktorData,
  getControlPanelDocktorError,
  // eslint-disable-next-line unused-imports/no-unused-imports
  getControlPanelDocktorIsLoading,
} from '@/entities/ControlPanelDocktor/model/selectors/controlPanelDocktorSelector';
import { Loader } from '@/widgets/Loader';
import { fetchDoneQueuesControlDoctor } from '../model/services/fetchDoneQueuesControlDoctor';

import {
  getDoneQueuesControlDoctorData,
  getDoneQueuesControlDoctorIsLoading,
  getDoneQueuesControlDoctorError,
} from '../model/selectors/doneQueuesControlDoctorSelector';
import { DoneQueueTableTitleDoctorProfile } from '@/entities/DoneQueueTableTitleDoctorProfile';
import ErrorDialog from '@/shared/ui/ErrorDialog/ErrorDialog';

import { getAuthUserData } from '@/features/Auth';

const reducers: ReducersList = {
  queuesControlDoctor: queuesControlDoctorReducer,
};

const QueuesControlDoctor = () => {
  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  const socket = io('http://socketmed.magicsoft.uz');

  const queuesList = useSelector(getQueuesControlDoctorData);
  const queuesListIsLoading = useSelector(getQueuesControlDoctorIsLoading);
  const queuesListError = useSelector(getQueuesControlDoctorError);

  const doneQueuesList = useSelector(getDoneQueuesControlDoctorData);
  const doneQueuesListIsLoading = useSelector(
    getDoneQueuesControlDoctorIsLoading,
  );
  const doneQueuesListError = useSelector(getDoneQueuesControlDoctorError);

  const proccessData = useSelector(getControlPanelDocktorData);
  const proccessIsLoading = useSelector(getControlPanelDocktorIsLoading);
  const proccessError = useSelector(getControlPanelDocktorError);

  const authUserData = useSelector(getAuthUserData);

  const { addQueue, removeQueue } = useQueuesControlDoctorActions();

  const fetchIP = async () => {
    try {
      const responce = await axios.get('https://api.ipify.org?format=json');

      if (responce && authUserData) {
        socket.emit('addUser', {
          userId: authUserData.id,
          ip_address: responce.data.ip,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchIP();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(
      fetchQueuesControlDoctor({
        status: 'pending',
      }),
    );
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      fetchDoneQueuesControlDoctor({
        limit: 100,
      }),
    );
  }, [dispatch]);

  socket.on('getNewQueue', (data) => {
    if (data) {
      addQueue(data);
    }
  });

  socket.on('getProccessQueue', (data) => {
    if (data) {
      removeQueue(data.data[0]);
    }
  });

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
      <div className={cls.QueuesControlDoctorWrapper}>
        <ButtonNavbar
          dontCreate
          TableTitle="Amaldagi navbat"
          // ItemsLength={Number(proccessData?.data[0]?.queues_name.split('-')[1])}
          roomNumber={proccessData?.data[0]?.room_id?.name}
          departmentName={proccessData?.data[0]?.department_id?.name}
        />

        <ControlPanelDocktor />

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
                  Tablethead={['Id', 'Bilet berilgan vaqti']}
                  Tabletbody={queuesList}
                />
              </>
            ) : (
              <h2 className={cls.QueuesControlDoctorWrapper__noQueueTitle}>
                {t('Bugun navbatga yozilgan bemorlar mavjud emas!')}
              </h2>
            )}
          </div>

          <div className={cls.TableDoctorChild}>
            {doneQueuesList && doneQueuesList.length > 0 ? (
              <>
                <ButtonNavbar
                  dontCreate
                  TableTitle="Bugun ko'rilgan va bekor qilingan bemorlar"
                  ItemsLength={doneQueuesList?.length}
                />
                <DoneQueueTableTitleDoctorProfile
                  Tablethead={[
                    'Id',
                    'Qabul kuni',
                    'Qabul boshlanishi',
                    'Qabul tugashi',
                    'Xolati',
                  ]}
                  Tabletbody={doneQueuesList}
                />
              </>
            ) : (
              <h2 className={cls.QueuesControlDoctorWrapper__noQueueTitle}>
                {t("Bugun ko'rilgan va bekor qilingan bemorlar mavjud emas!")}
              </h2>
            )}
          </div>
        </div>

        {/* <h3 className={cls.TableTitle}>{t('Amaldagi navbat ')}</h3> */}
        {(proccessIsLoading ||
          queuesListIsLoading ||
          doneQueuesListIsLoading) && <Loader />}

        {(queuesListError || proccessError || doneQueuesListError) && (
          <ErrorDialog isErrorProps={!false} />
        )}
      </div>
    </DynamicModuleLoader>
  );
};

export default QueuesControlDoctor;
