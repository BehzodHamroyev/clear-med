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

const reducers: ReducersList = {
  queuesControlDoctor: queuesControlDoctorReducer,
};

const KorilganBemorlar = [
  {
    id: 1,
    shifokor: 'Umid Rustamov',
    xona: '2',
    qabulboshlanishi: '9:30:24',
    qabultugashi: '9:50:12',
  },
  {
    id: 2,
    shifokor: 'Umid Rustamov',
    xona: '2',
    qabulboshlanishi: '10:00:24',
    qabultugashi: '10:34:53',
  },
  {
    id: 3,
    shifokor: 'Umid Rustamov',
    xona: '2',
    qabulboshlanishi: '11:40:04',
    qabultugashi: '12:10:22',
  },
  {
    id: 4,
    shifokor: 'Umid Rustamov',
    xona: '2',
    qabulboshlanishi: '12:20:02',
    qabultugashi: '12:50:12',
  },
];

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

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
      <div className={cls.QueuesControlDoctorWrapper}>
        <ButtonNavbar
          dontCreate
          TableTitle="Qabullar"
          ItemsLength={KorilganBemorlar.length}
        />

        <ControlPanelDocktor />

        <div className={cls.TableDoctor}>
          <div className={cls.TableDoctorChild}>
            {/* <TableTitleDoctorProfile
              Tablethead={[
                'Id',
                'Qabul boshlanishi',
                'Qabul tugashi',
                'Xolati',
              ]}
              Tabletbody={TableBodyCretedPatient}
            /> */}
          </div>
          <div className={cls.TableDoctorChild}>
            {queuesList && (
              <TableTitleDoctorProfile
                Tablethead={['Id', 'Bilet berilgan vaqti']}
                Tabletbody={queuesList?.queues}
              />
            )}
          </div>
        </div>

        {/* <h3 className={cls.TableTitle}>{t('Amaldagi navbat ')}</h3> */}
        {proccessIsLoading && <Loader />}
      </div>
    </DynamicModuleLoader>
  );
};

export default QueuesControlDoctor;
