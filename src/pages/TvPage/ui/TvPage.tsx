import React, { useContext, useEffect, useState } from 'react';
import { GoArrowRight } from 'react-icons/go';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import cls from './TvPage.module.scss';
import { TvLogoTemprory } from '@/shared/assets/Pages/tv';
import { updateClock } from '../helperFunctions/updateClock';
import { getAuthUserData } from '@/features/Auth';
import { getAllQueueProccessData } from '@/pages/TV/model/selector/allQueueProccessSelector';
import { fetchAllQueueProccess } from '@/pages/TV/model/services/fetchAllQueueProccess';
import { updateView } from '@/pages/TV/model/services/updateView';
import { ListOfQueue, ModalData } from '@/pages/TV/model/types/allQueueProccessTypes';
import { useSocket } from '@/shared/hook/useSocket';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { QueueDialog } from '@/entities/QueueDialog';

const TvPage: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>('');

  const socket = useSocket();
  const videoUrl: string[] = [];
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const authUserData = useSelector(getAuthUserData);
  const allProccessQueue = useSelector(getAllQueueProccessData);

  const [listOfQueue, setListOfQueue] = useState<ListOfQueue[]>([]);
  const [queueDialogData, setQueueDialogData] = useState<ModalData>();

  const { onEndedQueueAudio, setOnEndedQueueAudio } =
    useContext(ButtonsContext);

  if (allProccessQueue?.videoUrl && allProccessQueue?.videoUrl?.length > 0) {
    allProccessQueue?.videoUrl.forEach((item) => {
      videoUrl.push(item.link);
    });
  }

  useEffect(() => {
    dispatch(fetchAllQueueProccess({}));
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('doctorProcessToMonitor', (data) => {
        if (authUserData?.rooms.some((room) => room.id === data.roomId)) {
          setListOfQueue((pre) => [
            ...pre,
            {
              name: data.name,
              room: data.room,
              id: data.id,
            },
          ]);
          dispatch(fetchAllQueueProccess({}));
        }
      });

      socket.on('queueCreated', (data) => {
        dispatch(fetchAllQueueProccess({}));
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



  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(updateClock());
    };

    updateTime();
    const intervalId = setInterval(updateTime, 10000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={cls.tvPageWrp}>
      <div className={cls.tvPageWrp__top}>
        <div className={cls['tvPageWrp__top--left']}>
          <LazyLoadImage
            effect="blur"
            src={TvLogoTemprory}
            alt="TvLogoTemprory"
            className={cls['tvPageWrp__top--leftLogo']}
          />

          <p className={cls['tvPageWrp__top--leftTitle']}>Med Navbat</p>
        </div>

        <p id="clock" className={cls['tvPageWrp__top--rightClock']}>
          {currentTime}
        </p>
      </div>

      <div className={cls.tvPageWrp__body}>
        <div className={cls['tvPageWrp__body--video']}></div>

        <table className={cls['tvPageWrp__body--table']}>
          <thead className={cls['tvPageWrp__body--thead']}>
            <tr>
              <th className={cls['tvPageWrp__body--thead1']}>Талон</th>
              <th className={cls['tvPageWrp__body--thead2']}>Окно №</th>
              <th className={cls['tvPageWrp__body--thead3']}>Статус</th>
            </tr>
          </thead>

          <tbody className={cls['tvPageWrp__body--tbody']}>
            <tr className={cls['tvPageWrp__body--tr']}>
              <td className={cls['tvPageWrp__body--trStart']}>
                A091 <GoArrowRight />
              </td>
              <td className={cls['tvPageWrp__body--trCenter']}>01</td>
              <td
                className={`${cls['tvPageWrp__body--trEnd']} ${cls.summoned}`}
              >
                Вызван
              </td>
            </tr>

            <tr className={cls['tvPageWrp__body--tr']}>
              <td className={cls['tvPageWrp__body--trStart']}>
                Т045 <GoArrowRight />
              </td>
              <td className={cls['tvPageWrp__body--trCenter']}>03</td>
              <td className={`${cls['tvPageWrp__body--trEnd']} ${cls.served}`}>
                Обслуживается
              </td>
            </tr>

            <tr className={cls['tvPageWrp__body--tr']}>
              <td className={cls['tvPageWrp__body--trStart']}>
                Т056 <GoArrowRight />
              </td>
              <td className={cls['tvPageWrp__body--trCenter']}>011</td>
              <td className={`${cls['tvPageWrp__body--trEnd']} ${cls.finish}`}>
                Обслужен
              </td>
            </tr>
            <tr className={cls['tvPageWrp__body--tr']}>
              <td className={cls['tvPageWrp__body--trStart']}>
                A091 <GoArrowRight />
              </td>
              <td className={cls['tvPageWrp__body--trCenter']}>01</td>
              <td
                className={`${cls['tvPageWrp__body--trEnd']} ${cls.summoned}`}
              >
                Вызван
              </td>
            </tr>

            <tr className={cls['tvPageWrp__body--tr']}>
              <td className={cls['tvPageWrp__body--trStart']}>
                Т045 <GoArrowRight />
              </td>
              <td className={cls['tvPageWrp__body--trCenter']}>03</td>
              <td className={`${cls['tvPageWrp__body--trEnd']} ${cls.served}`}>
                Обслуживается
              </td>
            </tr>

            <tr className={cls['tvPageWrp__body--tr']}>
              <td className={cls['tvPageWrp__body--trStart']}>
                Т056 <GoArrowRight />
              </td>
              <td className={cls['tvPageWrp__body--trCenter']}>011</td>
              <td className={`${cls['tvPageWrp__body--trEnd']} ${cls.finish}`}>
                Обслужен
              </td>
            </tr>
            <tr className={cls['tvPageWrp__body--tr']}>
              <td className={cls['tvPageWrp__body--trStart']}>
                A091 <GoArrowRight />
              </td>
              <td className={cls['tvPageWrp__body--trCenter']}>01</td>
              <td
                className={`${cls['tvPageWrp__body--trEnd']} ${cls.summoned}`}
              >
                Вызван
              </td>
            </tr>

            <tr className={cls['tvPageWrp__body--tr']}>
              <td className={cls['tvPageWrp__body--trStart']}>
                Т045 <GoArrowRight />
              </td>
              <td className={cls['tvPageWrp__body--trCenter']}>03</td>
              <td className={`${cls['tvPageWrp__body--trEnd']} ${cls.served}`}>
                Обслуживается
              </td>
            </tr>

            <tr className={cls['tvPageWrp__body--tr']}>
              <td className={cls['tvPageWrp__body--trStart']}>
                Т056 <GoArrowRight />
              </td>
              <td className={cls['tvPageWrp__body--trCenter']}>011</td>
              <td className={`${cls['tvPageWrp__body--trEnd']} ${cls.finish}`}>
                Обслужен
              </td>
            </tr>

            <tr className={cls['tvPageWrp__body--tr']}>
              <td className={cls['tvPageWrp__body--trStart']}>
                A091 <GoArrowRight />
              </td>
              <td className={cls['tvPageWrp__body--trCenter']}>01</td>
              <td
                className={`${cls['tvPageWrp__body--trEnd']} ${cls.summoned}`}
              >
                Вызван
              </td>
            </tr>

            <tr className={cls['tvPageWrp__body--tr']}>
              <td className={cls['tvPageWrp__body--trStart']}>
                Т045 <GoArrowRight />
              </td>
              <td className={cls['tvPageWrp__body--trCenter']}>03</td>
              <td className={`${cls['tvPageWrp__body--trEnd']} ${cls.served}`}>
                Обслуживается
              </td>
            </tr>

            <tr className={cls['tvPageWrp__body--tr']}>
              <td className={cls['tvPageWrp__body--trStart']}>
                Т056 <GoArrowRight />
              </td>
              <td className={cls['tvPageWrp__body--trCenter']}>011</td>
              <td className={`${cls['tvPageWrp__body--trEnd']} ${cls.finish}`}>
                Обслужен
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {onEndedQueueAudio && (
        <QueueDialog
          step={1}
          Mp3Array={queueDialogData?.mp3Arr!}
          roomNumber={queueDialogData?.roomNumber!}
          biletNumber={queueDialogData?.biletNumber!}
        />
      )}
    </div>
  );
};

export default TvPage;
