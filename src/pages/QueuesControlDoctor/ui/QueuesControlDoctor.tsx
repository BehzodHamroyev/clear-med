import React, { useEffect } from 'react';

import { useSelector } from 'react-redux';
import { ButtonNavbar } from '@/entities/ButtonNavbar';
import { CheckedIcon, ErrorIcon } from '@/shared/assets/Pages/Doctor';
import { ControlPanelDocktor } from '@/entities/ControlPanelDocktor';
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

const reducers: ReducersList = {
  queuesControlDoctor: queuesControlDoctorReducer,
};

const TableBodyCretedPatient = [
  {
    id: 1,
    img: CheckedIcon,
    item1: 'AKU18',
    item2: '15:34:25',
    item3: '15:47:28',
  },
  {
    id: 2,
    img: CheckedIcon,
    item1: 'AKU18',
    item2: '15:34:25',
    item3: '15:47:28',
  },
  {
    id: 3,
    img: ErrorIcon,
    item1: 'AKU18',
    item2: '15:34:25',
    item3: '15:47:28',
  },
  {
    id: 4,
    img: CheckedIcon,
    item1: 'AKU18',
    item2: '15:34:25',
    item3: '15:47:28',
  },
  {
    id: 5,
    img: CheckedIcon,
    item1: 'AKU18',
    item2: '15:34:25',
    item3: '15:47:28',
  },
  {
    id: 6,
    img: CheckedIcon,
    item1: 'AKU18',
    item2: '15:34:25',
    item3: '15:47:28',
  },
  {
    id: 7,
    img: ErrorIcon,
    item1: 'AKU18',
    item2: '15:34:25',
    item3: '15:47:28',
  },
  {
    id: 8,
    img: CheckedIcon,
    item1: 'AKU18',
    item2: '15:34:25',
    item3: '15:47:28',
  },
  {
    id: 9,
    img: CheckedIcon,
    item1: 'AKU18',
    item2: '15:34:25',
    item3: '15:47:28',
  },
  {
    id: 10,
    img: CheckedIcon,
    item1: 'AKU18',
    item2: '15:34:25',
    item3: '15:47:28',
  },
  {
    id: 11,
    img: ErrorIcon,
    item1: 'AKU18',
    item2: '15:34:25',
    item3: '15:47:28',
  },
  {
    id: 12,
    img: CheckedIcon,
    item1: 'AKU18',
    item2: '15:34:25',
    item3: '15:47:28',
  },
  {
    id: 13,
    img: CheckedIcon,
    item1: 'AKU18',
    item2: '15:34:25',
    item3: '15:47:28',
  },
  {
    id: 14,
    img: CheckedIcon,
    item1: 'AKU18',
    item2: '15:34:25',
    item3: '15:47:28',
  },
  {
    id: 15,
    img: ErrorIcon,
    item1: 'AKU18',
    item2: '15:34:25',
    item3: '15:47:28',
  },
  {
    id: 16,
    img: CheckedIcon,
    item1: 'AKU18',
    item2: '15:34:25',
    item3: '15:47:28',
  },
];

const QueuesControlDoctor = () => {
  const dispatch = useAppDispatch();

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

  if (queuesListError) {
    console.log(queuesListError);
  }

  if (proccessError) {
    console.log(proccessError);
  }

  if (doneQueuesListError) {
    console.log(queuesListError);
  }

  if (doneQueuesList) {
    console.log(doneQueuesList);
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
      <div className={cls.QueuesControlDoctorWrapper}>
        <ButtonNavbar
          dontCreate
          TableTitle="Qabullar"
          ItemsLength={queuesList?.length}
          roomNumber={proccessData?.data[0]?.room_id?.name}
          departmentName={proccessData?.data[0]?.department_id?.name}
        />

        <ControlPanelDocktor />

        <div className={cls.TableDoctor}>
          <div className={cls.TableDoctorChild}>
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
          </div>
          <div className={cls.TableDoctorChild}>
            {queuesList && (
              <TableTitleDoctorProfile
                Tablethead={['Id', 'Bilet berilgan vaqti']}
                Tabletbody={queuesList}
              />
            )}
          </div>
        </div>

        {/* <h3 className={cls.TableTitle}>{t('Amaldagi navbat ')}</h3> */}
        {(proccessIsLoading || queuesListIsLoading) && <Loader />}
      </div>
    </DynamicModuleLoader>
  );
};

export default QueuesControlDoctor;
