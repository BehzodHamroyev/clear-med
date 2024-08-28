/* eslint-disable camelcase */
/* eslint-disable ulbi-tv-plugin/public-api-imports */
/* eslint-disable max-len */
import React, { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { useReactToPrint } from 'react-to-print';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import cls from './QueuingTvCard.module.scss';
import { baseUploadUrl, baseUrl } from '../../../../baseurl';

import { useLasQueueActions } from '@/pages/QueuingTV/model/slice/lastQueueSlice';
import { getLastQueueData } from '@/pages/QueuingTV/model/selectors/lastQueueSelector';
import { fetchLastQueue } from '@/pages/QueuingTV/model/services/fetchLastQueue';

import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import CountdownTimer from '@/shared/ui/CountdownTimer/CountdownTimer';
import ErrorDialog from '@/shared/ui/ErrorDialog/ErrorDialog';
import QueuingPrintCard from '@/shared/ui/QueuingPrintCard/QueuingPrintCard';
import { Loader } from '@/widgets/Loader';

import { QueuingTvCardProps } from '../model/types/QueuingTvCardProps';

import { isLoading, error } from '@/entities/FileUploader';
import { getDeparmentListData } from '@/pages/QueuingTV/model/selectors/departmentListSelector';

interface CreateOrder {
  department_id: string;
  room_id: string;
}

export const QueuingTvCard = ({
  icon,
  actives,
  DoctorId,
  proceedCount,
  CardLeftTitle,
  CardLeftRoomNumber,
  CardLeftDoctorName,
}: QueuingTvCardProps) => {
  const { t } = useTranslation();
  const infoProjectError = useSelector(error);
  const lastQueue = useSelector(getLastQueueData);
  const infoProjectIsLoader = useSelector(isLoading);

  const { clearLastQueue } = useLasQueueActions();

  const { setIsvisableLanguageModal } = useContext(ButtonsContext);

  const [showTimer, setShowTimer] = useState(true);
  const [createQueueIsError, setCreateQueueIsError] = useState(false);
  const [createQueueIsLoading, setCreateQueueIsLoading] = useState(false);
  const [doctorName, setDoctorName] = useState('');
  const [lastQueueName, setLastQueueName] = useState('');
  const [printRoomInfo, setPrintRoomInfo] = useState({
    createRoomNumber: lastQueue?.room?.name,
    createTicketNumber: lastQueue?.pagination,
  });
  const dispatch = useAppDispatch();

  const componentRef = useRef<HTMLDivElement | null>(null);

  const dataOfDepartment = useSelector(getDeparmentListData);

  const { setClickedDoctorId } = useContext(ButtonsContext);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const createQueueFunc = async (prop: CreateOrder) => {
    const { room_id, department_id } = prop;
    setCreateQueueIsLoading(true);

    const getTokenCookie = Cookies.get('token');

    try {
      const response = await axios.post(
        `${baseUrl}/queue/create`,
        {
          department_id,
          room_id,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${getTokenCookie}`,
          },
        },
      );

      if (response.data && componentRef.current) {
        handlePrint();
        setCreateQueueIsLoading(false);
        setCreateQueueIsError(false);
        setIsvisableLanguageModal(true);

        setPrintRoomInfo({
          createRoomNumber: response.data?.room?.name,
          createTicketNumber: String(response.data?.navbat?.queues_name),
        });

        setTimeout(() => {
          clearLastQueue();
        }, 100);
      }
    } catch (error) {
      setCreateQueueIsLoading(false);
      setCreateQueueIsError(true);
    }
  };

  const hendleClickQuingTvCard = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    e.stopPropagation();

    if (DoctorId) setClickedDoctorId(DoctorId);

    if (DoctorId) {
      dispatch(
        fetchLastQueue({
          doctorId: DoctorId,
        }),
      ).then((res) => {
        createQueueFunc({
          // @ts-ignore
          department_id: res.payload.room.department_id,
          // @ts-ignore
          room_id: res.payload.room._id,
        });
      });
    }
  };
  const handleTimeUp = () => {
    setShowTimer(false);
  };

  useEffect(() => {
    if (lastQueue) {
      // this code for queue name

      const inputString = lastQueue?.room.doctor_id[0].name!; // Example input string

      // Split the string into an array of words
      const words = inputString.split(' ');

      // Extract the first word
      const firstWord = words[0];

      // Extract the first letters of the remaining words and join them with a dot
      const initials = words
        .slice(1)
        .map((word) => word.charAt(0))
        .join('.');

      // Combine them
      const outputStringDoctorName = `${firstWord} ${initials}`;
      setDoctorName(outputStringDoctorName);

      // this code for queue name
      // @ts-ignore
      const prefix = lastQueue?.pagination.charAt(0);

      // Extract the last two digits after the hyphen
      const lastTwoDigits = lastQueue?.pagination
        // @ts-ignore
        .split('-')[1]
        .slice(-2);

      // Combine them
      const outputStringQueueNUmber = `${prefix}-${lastTwoDigits}`;

      setLastQueueName(outputStringQueueNUmber || '');
    }
  }, [lastQueue]);

  console.log(lastQueueName);

  return (
    <div onClick={hendleClickQuingTvCard} className={cls.QueuingTvCardWrapper}>
      <div className={cls.CardLeft}>
        <h3 className={cls.CardLeftTitle}>{CardLeftTitle}</h3>

        <p className={cls.CardLeftRoomNumber}>
          {CardLeftRoomNumber}-{t('Xona raqami')}
        </p>

        <p className={cls.CardLeftDoctorName}>{CardLeftDoctorName}</p>

        {actives.length > 0 && showTimer && (
          <div className={cls.CardLeftDoctorName}>
            {t('The_doctor_changes')} :{' '}
            <CountdownTimer actives={actives} onTimeUp={handleTimeUp} />
          </div>
        )}
      </div>

      <div className={cls.QueuingTvCardWrapper__cardRightParent}>
        <p className={cls.CardLeftDoctorName}>
          {t('current_queues')}: {proceedCount || 0}
        </p>

        <div className={cls.CardRight}>
          {icon && icon?.length > 0 && (
            <img src={`${baseUploadUrl}${icon}`} alt="icon" />
          )}
        </div>
      </div>

      <div className={cls.QueuingTvCardWrapper__printDisable}>
        <QueuingPrintCard
          ref={componentRef}
          roomNumber={String(lastQueue?.room?.name)}
          doctor_name={doctorName}
          deparment_name={lastQueue?.room.department_id.name}
          ticketNumber={lastQueueName}
        />
      </div>

      {createQueueIsLoading && infoProjectIsLoader && <Loader />}

      {createQueueIsError && infoProjectError && (
        <ErrorDialog isErrorProps={!false} />
      )}
    </div>
  );
};
