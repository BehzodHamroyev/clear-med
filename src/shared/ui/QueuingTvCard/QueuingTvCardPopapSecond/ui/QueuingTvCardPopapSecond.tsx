/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable ulbi-tv-plugin/public-api-imports */
import React, { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useReactToPrint } from 'react-to-print';

import { Loader } from '@/widgets/Loader';
import cls from './QueuingTvCard.module.scss';
import { baseUrl } from '../../../../../../baseurl';
import ErrorDialog from '../../../ErrorDialog/ErrorDialog';

import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
// import { QueueUserDoctor } from '../../../DoctorPanels/QueueUserDoctor';
import { useLasQueueActions } from '@/pages/Reception/model/slice/lastQueueSlice';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getLastQueueData } from '@/pages/Reception/model/selectors/lastQueueSelector';

import {
  error,
  isLoading,
  getInfoProject,
  getAllDataProject,
} from '@/entities/FileUploader';
// import { QueueUserDoctor } from '../../../DoctorPanels/QueueUserDoctor';

const QueuingTvCardPopapSecond = ({ roomNumber, ticketNumber }: any) => {
  const [createQueueIsError, setCreateQueueIsError] = useState(false);
  const [createQueueIsLoading, setCreateQueueIsLoading] = useState(false);
  const [printRoomInfo, setPrintRoomInfo] = useState({
    createRoomNumber: roomNumber,
    createTicketNumber: ticketNumber,
  });

  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { clearLastQueue } = useLasQueueActions();
  const printableDivRef = useRef<HTMLDivElement>(null);

  const infoProjectError = useSelector(error);
  const lastQueue = useSelector(getLastQueueData);
  const infoProject = useSelector(getInfoProject);
  const infoProjectIsLoader = useSelector(isLoading);

  const { setIsOpenQueuingTvCardPopapSecond } = useContext(ButtonsContext);

  const printCom = useReactToPrint({
    documentTitle: 'queue-data',
    content: () => printableDivRef.current,
    pageStyle: 'print',
    onAfterPrint: () => {
      setIsOpenQueuingTvCardPopapSecond(false);
    },
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
        }, 100);
      }
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
      printableDivRef.current
    ) {
      createQueueFunc();
    }
  };

  useEffect(() => {
    dispatch(getAllDataProject({}));
  }, [dispatch]);

  // const PrintRef = () => {
  //   return (
  //     <div
  //       ref={printableDivRef}
  //       className={
  //         cls['QueuingTvCardPopapSecondWrp__queuingPopap--queuingTvPrintCard']
  //       }
  //     >
  //       <img
  //         src={imgLink}
  //         alt="imgLink"
  //         className={
  //           cls['QueuingTvCardPopapSecondWrp__queuingPopap--printQueuePageImg']
  //         }
  //       />

  //       <div
  //         className={cls['QueuingTvCardPopapSecondWrp__queuingPopap--queueBox']}
  //       >
  //         <QueueUserDoctor
  //           roomNumber={printRoomInfo.createRoomNumber}
  //           ticketNumber={printRoomInfo.createTicketNumber}
  //         />
  //       </div>

  //       <div
  //         className={
  //           cls['QueuingTvCardPopapSecondWrp__queuingPopap--medicName']
  //         }
  //       >
  //         <p>Бўлим:</p>

  //         <p>
  //           {lastQueue?.data?.department_id
  //             ? lastQueue?.data?.department_id?.name
  //             : lastQueue?.room?.department_id?.name}
  //         </p>
  //       </div>

  //       <div
  //         className={
  //           cls['QueuingTvCardPopapSecondWrp__queuingPopap--medicName']
  //         }
  //       >
  //         <p>Шифокор:</p>

  //         <p
  //           className={
  //             cls[
  //               'QueuingTvCardPopapSecondWrp__queuingPopap--medicNameFullName'
  //             ]
  //           }
  //         >
  //           {lastQueue?.data?.doctor_id
  //             ? lastQueue?.data?.doctor_id?.name
  //             : lastQueue?.room?.doctor_id?.name}
  //         </p>
  //       </div>

  //       <div
  //         className={
  //           cls['QueuingTvCardPopapSecondWrp__queuingPopap--medicName']
  //         }
  //       >
  //         <p>Берилган вақт:</p>

  //         <p
  //           className={
  //             cls['QueuingTvCardPopapSecondWrp__queuingPopap--dateGetQueue']
  //           }
  //         >
  //           {new Date().getDate()}/
  //           {new Date().getMonth() < 10
  //             ? `0${new Date().getMonth() + 1}`
  //             : new Date().getMonth() + 1}
  //           /{new Date().getFullYear()} |{' '}
  //           {new Date().getHours() < 10
  //             ? `0${new Date().getHours()}`
  //             : new Date().getHours()}
  //           :
  //           {new Date().getMinutes() < 10
  //             ? `0${new Date().getMinutes()}`
  //             : new Date().getMinutes()}
  //         </p>
  //       </div>

  //       <p
  //         className={cls['QueuingTvCardPopapSecondWrp__queuingPopap--message']}
  //       >
  //         Ташрифингиз учун раҳмат!
  //       </p>
  //     </div>
  //   );
  // };

  return (
    <div className={cls.QueuingTvCardPopapSecondWrp}>
      {!createQueueIsLoading && infoProject && (
        <div className={cls.QueuingTvCardPopapSecondWrp__queuingPopap}>
          <h3
            className={
              cls['QueuingTvCardPopapSecondWrp__queuingPopap--queuingTitle']
            }
          >
            {t('Navbatni tasdiqlang')}
          </h3>

          {/* <PrintRef /> */}

          <div
            className={
              cls['QueuingTvCardPopapSecondWrp__queuingPopap--btnParnet']
            }
          >
            <button
              type="button"
              className={`${cls.btn} ${cls.btn1}`}
              onClick={() => {
                setIsOpenQueuingTvCardPopapSecond(false);
              }}
            >
              {t('Bekor qilish')}
            </button>

            <button
              onClick={(e) => handlePrint(e)}
              type="button"
              className={`${cls.btn} ${cls.btn2}`}
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
