import React, { useContext, useEffect, useState } from 'react';
import { Alert } from '@mui/material';
import { useSelector } from 'react-redux';
import { GoArrowRight } from 'react-icons/go';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { Loader } from '@/widgets/Loader';
import cls from './TvmoreQueuePage.module.scss';
import { fetchTv } from '../model/service/fetchTv';
import { TvLogoTemprory } from '@/shared/assets/Pages/tv';
import { updateClock } from '../helperFunctions/updateClock';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import {
  getTvData,
  getTvDataError,
  getTvDataIsLoading,
} from '../model/selector/tvDataSelector';
import { getAuthUserData } from '@/features/Auth';
import { useSocket } from '@/shared/hook/useSocket';
import { QueueDialog } from '@/entities/QueueDialog';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import { updateView } from '@/pages/TvPage/model/services/updateView';

const TvmoreQueuePage: React.FC = () => {
  const socket = useSocket();
  const dispatch = useAppDispatch();

  const authUserData = useSelector(getAuthUserData);

  const tvData = useSelector(getTvData);
  const tvDataError = useSelector(getTvDataError);
  const tvDataLoader = useSelector(getTvDataIsLoading);

  const { onEndedQueueAudio, setOnEndedQueueAudio } =
    useContext(ButtonsContext);

  const [currentTime, setCurrentTime] = useState<string>('');
  const [listOfQueue, setListOfQueue] = useState<any>([]);
  const [queueDialogData, setQueueDialogData] = useState<any>();

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(updateClock());
    };

    updateTime();
    const intervalId = setInterval(updateTime, 10000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    dispatch(fetchTv({}));
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('doctorProcessToMonitor', (data) => {
        if (authUserData?.rooms.some((room) => room.id === data.roomId)) {
          setListOfQueue((pre: any) => [
            ...pre,
            {
              name: data.name,
              room: data.room,
              id: data.id,
            },
          ]);
          dispatch(fetchTv({}));
        }
      });

      socket.on('queueCreated', (data) => {
        dispatch(fetchTv({}));
      });
    }
  }, [socket]);

  useEffect(() => {
    while (listOfQueue?.length >= 1 && !onEndedQueueAudio) {
      setQueueDialogData({
        roomNumber: String(listOfQueue[0]?.room),
        biletNumber: String(listOfQueue[0]?.name),
        step: 1,
        mp3Arr: [`${listOfQueue[0]?.name}`],
      });
      if (listOfQueue[0]?.id) {
        updateView({ id: listOfQueue[0]?.id });
      }
      setOnEndedQueueAudio(true);
      listOfQueue.pop();
    }
  }, [listOfQueue, onEndedQueueAudio, socket]);

  return (
    <>
      <div className={cls.TvmoreQueuePageWrp}>
        <div className={cls.TvmoreQueuePageWrp__top}>
          <div className={cls['TvmoreQueuePageWrp__top--left']}>
            <LazyLoadImage
              effect="blur"
              src={TvLogoTemprory}
              alt="TvLogoTemprory"
              className={cls['TvmoreQueuePageWrp__top--leftLogo']}
            />

            <p className={cls['TvmoreQueuePageWrp__top--leftTitle']}>
              Med Navbat
            </p>
          </div>

          <p id="clock" className={cls['TvmoreQueuePageWrp__top--rightClock']}>
            {currentTime}
          </p>
        </div>

        <div className={cls.TvmoreQueuePageWrp__body}>
          <div className={cls['TvmoreQueuePageWrp__body--sections']}>
            {tvData?.rooms.map((item) => (
              <h2
                key={item.id}
                className={cls['TvmoreQueuePageWrp__body--section']}
              >
                {item.department_id.name}
              </h2>
            ))}
          </div>

          <div className={cls['TvmoreQueuePageWrp__body--box']}>
            {tvData?.rooms.map((item) => (
              <table className={cls['TvmoreQueuePageWrp__body--table']}>
                <thead className={cls['TvmoreQueuePageWrp__body--thead']}>
                  <tr>
                    <th className={cls['TvmoreQueuePageWrp__body--thead1']}>
                      Талон
                    </th>
                    <th className={cls['TvmoreQueuePageWrp__body--thead2']}>
                      Хона
                    </th>
                  </tr>
                </thead>

                <tbody className={cls['TvmoreQueuePageWrp__body--tbody']}>
                  {item.proceed.length > 0 ? (
                    item.proceed.map((itemSecond) => (
                      <tr className={cls['TvmoreQueuePageWrp__body--tr']}>
                        <td
                          className={cls['TvmoreQueuePageWrp__body--trStart']}
                        >
                          {`${itemSecond.queues_name.charAt(
                            0,
                          )}${itemSecond.queues_name.slice(-2)}`}
                        </td>

                        <td
                          className={cls['TvmoreQueuePageWrp__body--trCenter']}
                        >
                          <GoArrowRight />
                        </td>

                        <td className={cls['TvmoreQueuePageWrp__body--trEnd']}>
                          {item.name}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <Alert
                      sx={{
                        fontSize: '32px',
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: 'transparent',
                      }}
                      severity="info"
                    >
                      Navbatlar yo'q
                    </Alert>
                  )}
                </tbody>
              </table>
            ))}
          </div>
        </div>
      </div>

      {/* {tvDataLoader && <Loader />} */}

      {onEndedQueueAudio && (
        <QueueDialog
          step={1}
          Mp3Array={queueDialogData?.mp3Arr!}
          roomNumber={queueDialogData?.roomNumber!}
          biletNumber={queueDialogData?.biletNumber!}
        />
      )}

      {tvDataError && <Alert severity="error">{tvDataError}</Alert>}
    </>
  );
};

export default TvmoreQueuePage;
