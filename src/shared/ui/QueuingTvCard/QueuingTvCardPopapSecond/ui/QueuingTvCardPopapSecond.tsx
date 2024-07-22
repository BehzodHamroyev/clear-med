import React, { useContext, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useReactToPrint } from 'react-to-print';
import axios from 'axios';
import Cookies from 'js-cookie';

// import { socket } from '@/shared/lib/utils/socket';

import cls2 from './PrintQueuePage.module.scss';
import cls from './QueuingTvCardPopapSecond.module.scss';

import { QueueUserDoctor } from '../../../DoctorPanels/QueueUserDoctor';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
// eslint-disable-next-line ulbi-tv-plugin/public-api-imports
import { getLastQueueData } from '@/pages/QueuingTV/model/selectors/lastQueueSelector';

import { Loader } from '@/widgets/Loader';
import { baseUrl } from '../../../../../../baseurl';
import ErrorDialog from '../../../ErrorDialog/ErrorDialog';
// eslint-disable-next-line ulbi-tv-plugin/public-api-imports
import { useLasQueueActions } from '@/pages/QueuingTV/model/slice/lastQueueSlice';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
  error,
  isLoading,
  getInfoProject,
  getAllDataProject,
} from '@/entities/FileUploader';

interface QueuingTvCardPopapSecondProps {
  roomNumber: string;
  ticketNumber: string;
}

const QueuingTvCardPopapSecond = ({
  roomNumber,
  ticketNumber,
}: QueuingTvCardPopapSecondProps) => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const printableDivRef = useRef<HTMLDivElement>(null);

  const lastQueue = useSelector(getLastQueueData);

  const { clearLastQueue } = useLasQueueActions();

  const [createQueueIsLoading, setCreateQueueIsLoading] = useState(false);
  const [createQueueIsError, setCreateQueueIsError] = useState(false);

  const [printRoomInfo, setPrintRoomInfo] = useState({
    createRoomNumber: roomNumber,
    createTicketNumber: ticketNumber,
  });

  const infoProjectError = useSelector(error);
  const infoProject = useSelector(getInfoProject);
  const infoProjectIsLoader = useSelector(isLoading);

  const { setIsOpenQueuingTvCardPopapSecond, clickedDoctorId } =
    useContext(ButtonsContext);

  const printCom = useReactToPrint({
    content: () => printableDivRef?.current,
    documentTitle: 'queue-data',
    onAfterPrint: () => setIsOpenQueuingTvCardPopapSecond(false),
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
          createRoomNumber: String(response.data?.room?.name),
          createTicketNumber: String(response.data?.navbat?.queues_name),
        });

        setTimeout(() => {
          printCom();

          clearLastQueue();
        }, 1);
      }

      // if (
      //   response?.data?.navbat?.created_date &&
      //   response?.data?.navbat?.created_date?.length > 0
      // ) {
      //   socket.emit(
      //     'create_queue',
      //     { queue_data: response.data },
      //     (responce: { status: string }) => {
      //     },
      //   );
      // }
    } catch (error) {
      setCreateQueueIsLoading(false);

      setCreateQueueIsError(true);
    }
  };

  const handlePrint = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();

    if (
      lastQueue &&
      (lastQueue.data.department_id || lastQueue.room.department_id) &&
      printableDivRef?.current
    ) {
      createQueueFunc();
    }
  };

  useEffect(() => {
    dispatch(getAllDataProject({}));
  }, [dispatch]);

  return (
    <div className={cls.QueuingTvCardPopapSecondWrapper}>
      {!createQueueIsLoading && infoProject && (
        <div className={cls.QueuingTvCardPopapSecond}>
          <h3 className={cls.QueuingTvCardPopapSecondTitle}>
            {t('Navbatni tasdiqlang')}
          </h3>

          <div ref={printableDivRef} className={cls.QueuingTvPrintCard}>
            <div className={cls2.PrintQueuePage}>
              <p className={cls2.PrintQueuePage__medName}>
                {infoProject?.[0]?.name}
              </p>

              <div className={cls2.PrintQueuePage__queueBox}>
                <QueueUserDoctor
                  ticketNumber={printRoomInfo.createTicketNumber}
                  roomNumber={printRoomInfo.createRoomNumber}
                />
              </div>

              <div className={cls2.PrintQueuePage__medicName}>
                <p>Бўлим:</p>
                <p className={cls2.medicNameDeparment}>
                  {lastQueue?.data?.department_id
                    ? lastQueue?.data?.department_id?.name
                    : lastQueue?.room?.department_id?.name}
                </p>
              </div>

              <div className={cls2.PrintQueuePage__medicName}>
                <p>Шифокор:</p>
                <p className={cls2.medicNameFullName}>
                  {lastQueue?.data?.doctor_id
                    ? lastQueue?.data?.doctor_id?.name
                    : lastQueue?.room?.doctor_id?.name}
                </p>
              </div>

              <div className={cls2.PrintQueuePage__medicName}>
                <p>Берилган вақт:</p>
                <p className={cls2.PrintQueuePage__dateGetQueue}>
                  {new Date().getDate()}/
                  {new Date().getMonth() < 10
                    ? `0${new Date().getMonth() + 1}`
                    : new Date().getMonth() + 1}
                  /{new Date().getFullYear()} |{' '}
                  {new Date().getHours() < 10
                    ? `0${new Date().getHours()}`
                    : new Date().getHours()}
                  :
                  {new Date().getMinutes() < 10
                    ? `0${new Date().getMinutes()}`
                    : new Date().getMinutes()}
                </p>
              </div>

              <p className={cls2.PrintQueuePage__message}>
                Ташрифингиз учун раҳмат!
              </p>
            </div>
          </div>

          <div className={cls.BtnParnet}>
            <button
              onClick={() => {
                setIsOpenQueuingTvCardPopapSecond(false);
              }}
              type="button"
              className={`${cls.Btn} ${cls.Btn1}`}
            >
              {t('Bekor qilish')}
            </button>
            <button
              onClick={(e) => handlePrint(e)}
              type="button"
              className={`${cls.Btn} ${cls.Btn2}`}
            >
              {t('Chiqarish')}
            </button>
          </div>
        </div>
      )}

      {createQueueIsLoading && infoProjectIsLoader && <Loader />}

      {createQueueIsError && infoProjectError && (
        <ErrorDialog isErrorProps={!false} />
      )}
    </div>
  );
};

export default QueuingTvCardPopapSecond;
