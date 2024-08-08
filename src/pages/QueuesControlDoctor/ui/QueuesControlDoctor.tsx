/* eslint-disable consistent-return */
/* eslint-disable ulbi-tv-plugin/public-api-imports */
import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Button,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import Cookies from 'js-cookie';
import { ButtonNavbar } from '@/entities/ButtonNavbar';
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
  getControlPanelDocktorError,
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
import TimePickerValue from '@/shared/ui/TimePicker/TimePicker';
import { fetchAuthUser, getAuthUserData } from '@/features/Auth';
import { DoctorId } from '@/features/Auth/model/types/AuthentificationTypes';
import instance from '@/shared/lib/axios/api';
import { baseUrl } from '../../../../baseurl';
import { ChangeDoctorBackend } from '../model/types/changeDoctorType';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';

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
  const queuesListIsLoading = useSelector(getQueuesControlDoctorIsLoading);
  const queuesListError = useSelector(getQueuesControlDoctorError);

  const doneQueuesList = useSelector(getDoneQueuesControlDoctorData);
  const doneQueuesListIsLoading = useSelector(
    getDoneQueuesControlDoctorIsLoading,
  );

  const doneQueuesListError = useSelector(getDoneQueuesControlDoctorError);
  const buttonsContext = useContext(ButtonsContext);

  const proccessIsLoading = useSelector(getControlPanelDocktorIsLoading);
  const proccessError = useSelector(getControlPanelDocktorError);
  const authUserData = useSelector(getAuthUserData);
  const { setHasOpenToast, setToastDataForAddRoomForm } =
    useContext(ButtonsContext);

  const handleDoctor = async () => {
    if (selectedDoctor && selectedTime) {
      try {
        const response = await instance.post<ChangeDoctorBackend>(
          `${baseUrl}/users/change`,
          {
            userId: selectedDoctor,
            tillTime: selectedTime,
          },
        );

        if (response.data) {
          dispatch(
            fetchAuthUser({
              refresh: true,
              buttonsContext,
            }),
          );
          Cookies.set('token', response.data.data.tokens);
          setHasOpenToast(true);

          setToastDataForAddRoomForm({
            toastMessageForAddRoomForm: t("Shifokor O'zgartirildi"),
            toastSeverityForAddRoomForm: 'success',
          });
        }
        if (!response.data) {
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

  useEffect(() => {
    dispatch(
      fetchQueuesControlDoctor({
        status: 'pending',
      }),
    );
  }, [dispatch]);

  useEffect(() => {
    if (authUserData) {
      setDoctors(authUserData?.rooms?.[0].doctor_id);
      setSelectedDoctor(authUserData?.id || '');
      const parsedDate = dayjs(authUserData.time.tillTime);
      setSelectedTime(parsedDate);
    }
  }, [authUserData]);

  useEffect(() => {
    dispatch(
      fetchDoneQueuesControlDoctor({
        limit: 1000,
      }),
    );
  }, [dispatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(
        fetchQueuesControlDoctor({
          status: 'pending',
        }),
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [dispatch]);

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedDoctor(event.target.value);
  };

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
      <div className={cls.QueuesControlDoctorWrapper}>
        <div className={cls.wraperListDoctor}>
          <h3>Shifokorni tanlang</h3>
          <FormControl>
            <Select
              value={selectedDoctor}
              onChange={handleChange}
              displayEmpty
              sx={{ minWidth: '250px' }}
              defaultValue=""
            >
              {doctors?.map((doctor) => (
                <MenuItem key={doctor.id} value={doctor.id}>
                  {doctor?.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <p>Ketish vaqtini tanlang</p>
          <TimePickerValue
            value={selectedTime}
            onChange={(newValue) => setSelectedTime(newValue)}
          />
          <Button variant="contained" onClick={() => handleDoctor()}>
            Saqlash
          </Button>
        </div>

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
                  Tablethead={['Id', t('Bilet berilgan vaqti')]}
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
                  TableTitle={t("Bugun ko'rilgan va bekor qilingan bemorlar")}
                  ItemsLength={doneQueuesList?.length}
                />
                <DoneQueueTableTitleDoctorProfile
                  Tablethead={[
                    'Id',
                    t('Qabul kuni'),
                    t('Qabul boshlanishi'),
                    t('Qabul tugashi'),
                    t('Xolati'),
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

        {(proccessIsLoading || doneQueuesListIsLoading) && <Loader />}

        {(queuesListError || proccessError || doneQueuesListError) && (
          <ErrorDialog isErrorProps={!false} />
        )}
      </div>
    </DynamicModuleLoader>
  );
};

export default QueuesControlDoctor;
