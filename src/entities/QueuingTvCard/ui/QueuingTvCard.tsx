/* eslint-disable ulbi-tv-plugin/public-api-imports */
/* eslint-disable max-len */
import React, { useContext, useRef, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useReactToPrint } from 'react-to-print';

import cls from './QueuingTvCard.module.scss';
import { baseUrl } from '../../../../baseurl';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import { QueuingTvCardProps } from '../model/types/QueuingTvCardProps';
import CountdownTimer from '@/shared/ui/CountdownTimer/CountdownTimer';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
// eslint-disable-next-line ulbi-tv-plugin/public-api-imports
import { fetchLastQueue } from '@/pages/QueuingTV/model/services/fetchLastQueue';
import QueuingPrintCard from '@/shared/ui/QueuingPrintCard/QueuingPrintCard';
import { getLastQueueData } from '@/pages/QueuingTV/model/selectors/lastQueueSelector';
import { useLasQueueActions } from '@/pages/QueuingTV';
import { Loader } from '@/widgets/Loader';
import ErrorDialog from '@/shared/ui/ErrorDialog/ErrorDialog';

import { isLoading, error } from '@/entities/FileUploader';

const QueuingTvCard = ({
  icon,
  DoctorId,
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

  const [createQueueIsLoading, setCreateQueueIsLoading] = useState(false);
  const [createQueueIsError, setCreateQueueIsError] = useState(false);
  const [printRoomInfo, setPrintRoomInfo] = useState({
    createRoomNumber: lastQueue?.room?.name,
    createTicketNumber: lastQueue?.pagination,
  });
  const dispatch = useAppDispatch();

  const componentRef = useRef<HTMLDivElement | null>(null);

  const { setClickedDoctorId } = useContext(ButtonsContext);

  const hendleClickQuingTvCard = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    e.stopPropagation();

    // @ts-ignore
    if (DoctorId) setClickedDoctorId(DoctorId);

    if (DoctorId) {
      dispatch(
        fetchLastQueue({
          doctorId: DoctorId,
        }),
      );
    }
    // setIsOpenQueuingTvCardPopapSecond(true);
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const createQueueFunc = async () => {
    setCreateQueueIsLoading(true);

    const getTokenCookie = Cookies.get('token');

    try {
      const response = await axios.post(
        `${baseUrl}/queue/create`,
        {
          department_id: lastQueue?.room.department_id,
          room_id: lastQueue?.room._id,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${getTokenCookie}`,
          },
        },
      );

      if (response.data) {
        setCreateQueueIsLoading(false);
        setCreateQueueIsError(false);

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

  const print = () => {
    handlePrint();

    setIsvisableLanguageModal(true);

    if (
      lastQueue &&
      (lastQueue.data.department_id || lastQueue.room.department_id) &&
      componentRef.current
    ) {
      createQueueFunc();
    }
  };

  return (
    <div
      onClick={(e) => {
        hendleClickQuingTvCard(e);
        print();
      }}
      className={cls.QueuingTvCardWrapper}
    >
      <div className={cls.CardLeft}>
        <h3 className={cls.CardLeftTitle}>{CardLeftTitle}</h3>

        <p className={cls.CardLeftRoomNumber}>
          {CardLeftRoomNumber}-{t('Xona raqami')}
        </p>

        <p className={cls.CardLeftDoctorName}>{CardLeftDoctorName}</p>

        <div className={cls.CardLeftDoctorName}>
          {t('The_doctor_changes')} : <CountdownTimer />
        </div>
      </div>

      <div className={cls.QueuingTvCardWrapper__cardRightParent}>
        <p className={cls.CardLeftDoctorName}>{t('current_queues')}: 12</p>

        <div className={cls.CardRight}>
          {icon && icon?.length > 0 && (
            <img src={`http://socketmed.magicsoft.uz/${icon}`} alt="icon" />
          )}
        </div>
      </div>

      <div className={cls.QueuingTvCardWrapper__printDisable}>
        <QueuingPrintCard
          ref={componentRef}
          roomNumber={String(lastQueue?.room?.name)}
          ticketNumber={lastQueue?.pagination ? lastQueue?.pagination : ''}
        />
      </div>

      {createQueueIsLoading && infoProjectIsLoader && <Loader />}

      {createQueueIsError && infoProjectError && (
        <ErrorDialog isErrorProps={!false} />
      )}
    </div>
  );
};

export default QueuingTvCard;
