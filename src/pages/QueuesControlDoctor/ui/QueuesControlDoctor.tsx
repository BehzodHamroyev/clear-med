import React, { useEffect } from 'react';

import { useSelector } from 'react-redux';
import { ButtonNavbar } from '@/entities/ButtonNavbar';
// import { CheckedIcon, ErrorIcon } from '@/shared/assets/Pages/Doctor';
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

  if (queuesListError) {
    console.log(queuesListError);
  }

  if (proccessError) {
    console.log(proccessError);
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
