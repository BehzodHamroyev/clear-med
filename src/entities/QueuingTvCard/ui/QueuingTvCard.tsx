import React, { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useReactToPrint } from 'react-to-print';

import { Loader } from '@/widgets/Loader';
import cls from './QueuingTvCard.module.scss';
import { isLoading, error } from '@/entities/FileUploader';
import { baseUploadUrl, baseUrl } from '../../../../baseurl';
import ErrorDialog from '@/shared/ui/ErrorDialog/ErrorDialog';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import { QueuingTvCardProps } from '../model/types/QueuingTvCardProps';
import QueuingPrintCard from '@/shared/ui/QueuingPrintCard/QueuingPrintCard';
import { fetchLastQueue } from '@/pages/Reception/model/services/fetchLastQueue';
import { useLasQueueActions } from '@/pages/Reception/model/slice/lastQueueSlice';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getLastQueueData } from '@/pages/Reception/model/selectors/lastQueueSelector';
import { useSocket } from '@/shared/hook/useSocket';

interface CreateOrder {
  room_id: string;
  department_id: string;
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

  const { setIsvisableLanguageModal } = useContext(ButtonsContext);
  const socket = useSocket(); // Use the custom hook

  const [isPrinting, setIsPrinting] = useState(false);
  const [lastQueueName, setLastQueueName] = useState('');
  const [createQueueIsError, setCreateQueueIsError] = useState(false);
  const [createQueueIsLoading, setCreateQueueIsLoading] = useState(false);

  const [doctorName, setDoctorName] = useState('');

  const [printRoomInfo, setPrintRoomInfo] = useState({
    createRoomNumber: lastQueue?.room?.name,
    createTicketNumber: lastQueue?.pagination,
  });
  const { clearLastQueue } = useLasQueueActions();

  const dispatch = useAppDispatch();

  const componentRef = useRef<HTMLDivElement | null>(null);

  const { setClickedDoctorId } = useContext(ButtonsContext);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,

    onBeforeGetContent: () => {
      setIsPrinting(true); // Chop etishdan oldin isPrinting ni true ga o'rnatish
    },
    onAfterPrint: () => {
      setIsPrinting(false); // Chop etishdan keyin isPrinting ni false ga o'rnatish
    },
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
    if (actives.length > 0) {
      if (DoctorId) setClickedDoctorId(DoctorId);

      if (DoctorId) {
        dispatch(
          fetchLastQueue({
            doctorId: DoctorId,
          }),
        ).then((res) => {
          if (res)
            if (socket) {
              socket.emit('create queue', {
                // @ts-ignore
                department_id: res.payload.room.department_id,
                // @ts-ignore
                room_id: res.payload.room._id,
              });
            }

          createQueueFunc({
            // @ts-ignore
            department_id: res.payload.room.department_id,
            // @ts-ignore
            room_id: res.payload.room._id,
          });

        });
      }
    }
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
        .map((word) => word?.charAt(0))
        .join('.');

      // Combine them
      const outputStringDoctorName = `${firstWord} ${initials}`;
      setDoctorName(outputStringDoctorName);

      // this code for queue name
      // @ts-ignore
      const prefix = lastQueue?.pagination?.charAt(0);

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

  useEffect(() => {
    const showLanguageModal = () => {
      setIsvisableLanguageModal(true);
    };

    const interval = setInterval(showLanguageModal, 60000); // 1 minutes

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      onClick={hendleClickQuingTvCard}
      style={{ opacity: actives.length > 0 ? 1 : 0.5 }}
      className={cls.QueuingTvCardWrapper}
    >
      <div className={cls.CardLeft}>
        <h3 className={cls.CardLeftTitle}>{CardLeftTitle}</h3>
        <p className={cls.CardLeftRoomNumber}>
          {CardLeftRoomNumber}-{t('Xona raqami')}
        </p>
        <p className={cls.CardLeftDoctorName}>{CardLeftDoctorName}</p>
      </div>

      <div className={cls.QueuingTvCardWrapper__cardRightParent}>
        <p className={cls.CardLeftDoctorName}>
          {t('current_queues')}: {proceedCount || 0}
        </p>

        <div className={cls.CardRight}>
          {icon && icon?.length > 0 && (
            <img
              src={`${baseUploadUrl}${actives[0]?.user.photo || icon}`}
              alt="icon"
            />
          )}
        </div>
      </div>

      <div className={cls.QueuingTvCardWrapper__printDisable}>
        <QueuingPrintCard
          ref={componentRef}
          doctor_name={actives[0]?.user.name}
          ticketNumber={lastQueueName}
          roomNumber={String(lastQueue?.room?.name)}
          deparment_name={lastQueue?.room.department_id.name}
        />
      </div>

      {createQueueIsLoading && infoProjectIsLoader && <Loader />}

      {isPrinting && <Loader />}

      {createQueueIsError && infoProjectError && (
        <ErrorDialog isErrorProps={!false} />
      )}
    </div>
  );
};
