import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { ButtonNavbar } from '@/entities/ButtonNavbar';
import {
  ControlPanelDocktor,
  useQueuesControlPanelDoctorActions,
} from '@/entities/ControlPanelDocktor';
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

import { useDoneQueuesControlDoctorActons } from '../model/slice/doneQueuesControlDoctorSlice';
import { socket } from '@/shared/lib/utils/socket';

const reducers: ReducersList = {
  queuesControlDoctor: queuesControlDoctorReducer,
};

const QueuesControlDoctor = () => {
  const dispatch = useAppDispatch();

  const { t } = useTranslation();

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

  const { addQueue, removeQueue } = useQueuesControlDoctorActions();

  const { equalProccedQueue, clearProccedQueue } =
    useQueuesControlPanelDoctorActions();

  const { addDoneQueue } = useDoneQueuesControlDoctorActons();

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
        limit: 1000,
      }),
    );
  }, [dispatch]);

  socket.on('getNewQueue', (data) => {
    if (data) {
      addQueue(data);
    }
  });

  socket.on('getProccessQueue', (data) => {
    // console.log(data, 'removedQueueList');
    if (data) {
      removeQueue(data);
    }
  });

  socket.on('getAcceptedQueue', (data) => {
    // console.log(data, 'addDoneQueue');

    if (data) {
      addDoneQueue(data);
    }
  });

  socket.on('getRejectedQueue', (data) => {
    // console.log(data, 'addDoneQueue');

    if (data) {
      addDoneQueue(data);
    }
  });

  socket.on('realTimeQueueGet', (data) => {
    if (data?.status === 'proccessed') {
      equalProccedQueue(data);
    }

    if (data?.status === 'rejected') {
      addDoneQueue(data);

      clearProccedQueue();
    }

    if (data?.status === 'completed') {
      addDoneQueue(data);

      clearProccedQueue();
    }

    console.log(data.status, 'realTimeQueueGet');
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
