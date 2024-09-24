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

const reducers: ReducersList = {
  queuesControlDoctor: queuesControlDoctorReducer,
};

const QueuesControlDoctor = () => {
  const dispatch = useAppDispatch();
  const [doctors, setDoctors] = useState<DoctorId[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<string | undefined>('');
  const [selectedTime, setSelectedTime] = useState<Dayjs | null>(dayjs());
  const { t } = useTranslation();

  const queuesList = useSelector(getQueuesControlDoctorData);
  const queuesListError = useSelector(getQueuesControlDoctorError);
  const doneQueuesList = useSelector(getDoneQueuesControlDoctorData);
  const doneQueuesListIsLoading = useSelector(
    getDoneQueuesControlDoctorIsLoading,
  );
  const doneQueuesListError = useSelector(getDoneQueuesControlDoctorError);
  const buttonsContext = useContext(ButtonsContext);
  const authUserData = useSelector(getAuthUserData);
  const { setHasOpenToast, setToastDataForAddRoomForm } =
    useContext(ButtonsContext);

  const handleDoctor = async () => {
    if (selectedDoctor && selectedTime) {
      try {
        // Make API call to change the doctor
        const response = await instance.post<ChangeDoctorBackend>(
          `${baseUrl}/users/change`,
          { userId: selectedDoctor, tillTime: selectedTime },
        );

        if (response.data) {
          // Update auth user and token
          Cookies.set('token', response.data.data.tokens);
          dispatch(fetchAuthUser({ refresh: true, buttonsContext }));
          setHasOpenToast(true);
          setToastDataForAddRoomForm({
            toastMessageForAddRoomForm: t("Shifokor O'zgartirildi"),
            toastSeverityForAddRoomForm: 'success',
          });
        } else {
          throw new Error();
        }
        return response.data;
      } catch (e) {
        setToastDataForAddRoomForm({
          toastMessageForAddRoomForm: t(
            "Shifokorni o'zgartirishda xatolik sodir bo'ldi",
          ),
          toastSeverityForAddRoomForm: 'error',
        });
        return console.log('error');
      }
    }
  };

  // Function to handle changes in selected doctor
  const handleChange = (event: SelectChangeEvent) => {
    setSelectedDoctor(event.target.value);
  };

  // Function to check if the current time matches or exceeds the selected time
  const checkTimeMatch = () => {
    const selectedTimeMoment = selectedTime || dayjs();
    const givenDate = new Date(selectedTimeMoment.toDate());
    const givenSeconds =
      givenDate.getHours() * 3600 +
      givenDate.getMinutes() * 60 +
      givenDate.getSeconds();

    const now = new Date();
    const currentSeconds =
      now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();

    if (currentSeconds >= givenSeconds && !selectedTime) {
      toast.warn('Ishlash vaqtingizni kiriting');
      console.log(selectedTimeMoment.format(), 'Time has matched.');
    }
  };

  useEffect(() => {
    dispatch(fetchQueuesControlDoctor({ status: 'pending' }));
  }, [dispatch]);

  useEffect(() => {
    if (authUserData) {
      setDoctors(authUserData?.rooms?.[0]?.doctor_id);
      setSelectedDoctor(authUserData?.id || '');
      const parsedDate = dayjs(authUserData?.time?.tillTime);
      setSelectedTime(parsedDate);
    }
  }, [authUserData]);

  useEffect(() => {
    dispatch(fetchDoneQueuesControlDoctor({ limit: 1000 }));
  }, [dispatch]);

  // useEffect to set up interval for fetching queue data every second
  useEffect(() => {
    const fetchInterval = setInterval(() => {
      dispatch(fetchQueuesControlDoctor({ status: 'pending' }));
    }, 1000);

    // Clean up interval on component unmount
    return () => clearInterval(fetchInterval);
  }, [dispatch]);

  // useEffect to set up interval for checking time match every minute after 1 minute delay
  useEffect(() => {
    const firstCheckTimeout = setTimeout(() => {
      checkTimeMatch(); // Initial check after 1 minute
      const checkIntervalId = setInterval(checkTimeMatch, 20000); // Run every 60,000 milliseconds (1 minute)

      // Clean up interval on component unmount
      return () => clearInterval(checkIntervalId);
    }, 20000); // Initial delay of 60,000 milliseconds (1 minute)

    // Clean up the timeout on component unmount
    return () => clearTimeout(firstCheckTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTime]);

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
