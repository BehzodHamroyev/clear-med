import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useReactToPrint } from 'react-to-print';

import { Loader } from '@/widgets/Loader';
import cls from './QueuingTvCard.module.scss';
import { useSocket } from '@/shared/hook/useSocket';
import { isLoading, error } from '@/entities/FileUploader';
import { baseUploadUrl, baseUrl } from '../../../../baseurl';
import ErrorDialog from '@/shared/ui/ErrorDialog/ErrorDialog';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import QueuingPrintCard from '@/shared/ui/QueuingPrintCard/QueuingPrintCard';
import { getLastQueueData, useLasQueueActions } from '@/pages/ReceptionPage';

import {
  CreateOrder,
  QueuingTvCardProps,
} from '../model/types/QueuingTvCardProps';
import { printingLoad } from '@/shared/assets';

export const QueuingTvCard = (prop: QueuingTvCardProps) => {
  const {
    icon,
    room_id,
    actives,
    DoctorId,
    proceedCount,
    CardLeftTitle,
    department_id,
    CardLeftRoomNumber,
    CardLeftDoctorName,
  } = prop;

  const socket = useSocket();
  const { t } = useTranslation();
  const infoProjectError = useSelector(error);
  const lastQueue = useSelector(getLastQueueData);
  const { clearLastQueue } = useLasQueueActions();
  const infoProjectIsLoader = useSelector(isLoading);

  const [isPrinting, setIsPrinting] = React.useState(false);
  const [lastQueueName, setLastQueueName] = React.useState('');
  const [createQueueIsError, setCreateQueueIsError] = React.useState(false);
  const [createQueueIsLoading, setCreateQueueIsLoading] = React.useState(false);

  const componentRef = React.useRef<HTMLDivElement | null>(null);

  const { setClickedDoctorId } = React.useContext(ButtonsContext);
  const { setIsvisableLanguageModal } = React.useContext(ButtonsContext);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,

    // onBeforeGetContent: () => {
    //   setIsPrinting(true); // Chop etishdan oldin isPrinting ni true ga o'rnatish
    // },

    onAfterPrint: () => {
      setTimeout(() => {
        setIsPrinting(false); // Chop etishdan keyin isPrinting ni false ga o'rnatish
      }, 2000);
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

      setIsPrinting(true);

      if (socket) {
        socket.emit('create queue', {
          department_id: department_id,
          room_id: room_id,
        });
      }

      createQueueFunc({
        department_id: department_id!,
        room_id: room_id!,
      });
    }
  };

  React.useEffect(() => {
    if (lastQueue) {
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

  React.useEffect(() => {
    const showLanguageModal = () => {
      setIsvisableLanguageModal(true);
    };

    const interval = setInterval(showLanguageModal, 60000); // 1 minutes

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      onClick={hendleClickQuingTvCard}
      className={cls.QueuingTvCardWrapper}
      style={{ opacity: actives.length > 0 ? 1 : 0.5 }}
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
              alt="icon"
              src={`${baseUploadUrl}${actives[0]?.user.photo || icon}`}
            />
          )}
        </div>
      </div>

      <div className={cls.QueuingTvCardWrapper__printDisable}>
        <QueuingPrintCard
          ref={componentRef}
          ticketNumber={lastQueueName}
          doctor_name={actives[0]?.user.name}
          roomNumber={String(lastQueue?.room?.name)}
          deparment_name={lastQueue?.room.department_id.name}
        />
      </div>

      {isPrinting && (
        <div
          onClick={(e) => e.stopPropagation()}
          className={cls.QueuingTvCardWrapper__printingLoader}
        >
          <video autoPlay loop src={printingLoad}></video>
        </div>
      )}

      {createQueueIsLoading && infoProjectIsLoader && <Loader />}

      {createQueueIsError && infoProjectError && (
        <ErrorDialog isErrorProps={!false} />
      )}
    </div>
  );
};
