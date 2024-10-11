import React, { useContext, useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { useSelector } from 'react-redux';
import { GoArrowRight } from 'react-icons/go';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import cls from './TvPage.module.scss';

import { ListOfQueue, ModalData } from '../model/types/allQueueProccessTypes';
import { fetchAllQueueProccess } from '../model/services/fetchAllQueueProccess';
import { getAllQueueProccessData } from '../model/selector/allQueueProccessSelector';
import { QueueDialog } from '@/entities/QueueDialog';
import { getAuthUserData } from '@/features/Auth';
import { ETC } from '@/shared/assets/icons';
import { TvLogoTemprory } from '@/shared/assets/Pages/tv';
import { useSocket } from '@/shared/hook/useSocket';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { updateClock } from '../helperFunctions/updateClock';
import { updateView } from '../model/services/updateView';

const TvPage: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>('');

  const socket = useSocket();
  const videoUrl: string[] = [];
  const dispatch = useAppDispatch();

  const authUserData = useSelector(getAuthUserData);
  const allProccessQueue = useSelector(getAllQueueProccessData);

  const [listOfQueue, setListOfQueue] = useState<ListOfQueue[]>([]);
  const [queueDialogData, setQueueDialogData] = useState<ModalData>();

  const { onEndedQueueAudio, setOnEndedQueueAudio } =
    useContext(ButtonsContext);

  if (allProccessQueue?.videoUrl && allProccessQueue?.videoUrl?.length > 0) {
    allProccessQueue?.videoUrl.forEach((item: { link: string }) => {
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
        {/* <div className={cls['tvPageWrp__body--video']}>
          <ReactPlayer
            loop
            playing
            autoPlay
            controls
            volume={0.1}
            playsinline
            url={'https://youtube.com/shorts/JoyKXJdWKOE?si=FBtRng-wQjrHO7Up'}
            config={{
              youtube: {
                playerVars: { showinfo: 0 },
              },
            }}
          />
        </div> */}

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
          </tbody>

          <div>
            {allProccessQueue!?.room1?.proceed?.map(
              (
                item: {
                  queues_name: string;
                  id: React.Key | null | undefined;
                  status: string;
                },
                index: number,
              ) => {
                // @ts-ignore
                const prefix = item?.queues_name?.charAt(0);
                const lastTwoDigits = item?.queues_name
                  // @ts-ignore
                  ?.split('-')[1]
                  ?.slice(-2);

                // Combine them
                const outputString = `${prefix}-${lastTwoDigits}`;

                if (index === allProccessQueue!?.room1?.proceed.length! - 1)
                  return (
                    <div key={item.id}>
                      <div>
                        <p>{allProccessQueue!.room1!.department_id?.name}</p>
                      </div>

                      <div>
                        <p>{allProccessQueue!.room1!?.name}</p>
                      </div>

                      <div>
                        {index ===
                          allProccessQueue!?.room1?.proceed.length! - 1 &&
                        item.status === 'proccessed' ? (
                          <p>{outputString}</p>
                        ) : (
                          <p>-</p>
                        )}
                      </div>
                    </div>
                  );
              },
            )}

            <div>
              {allProccessQueue!?.room1?.proceed?.map(
                (
                  item: { queues_name: string; status: string },
                  index: number,
                ) => {
                  // @ts-ignore
                  const prefix = item.queues_name?.charAt(0);

                  // Extract the last two digits after the hyphen
                  const lastTwoDigits = item.queues_name
                    // @ts-ignore
                    ?.split('-')[1]
                    ?.slice(-2);

                  // Combine them
                  const outputString = `${prefix}-${lastTwoDigits}`;
                  if (index < 4 && item.status === 'pending')
                    return (
                      <div key={outputString}>
                        <p>{outputString}</p>
                      </div>
                    );
                },
              )}

              {allProccessQueue!?.room1!?.proceed.length > 4 ? (
                <>
                  <div>
                    <ETC fill="#fff" color="#fff" />
                  </div>
                  <div>
                    <p>
                      {`${allProccessQueue!.room1?.proceed[
                        allProccessQueue!.room1?.proceed.length - 2
                        // @ts-ignore
                      ].queues_name.charAt(
                        0,
                      )}-${allProccessQueue!?.room1?.proceed[
                        allProccessQueue!?.room1?.proceed.length - 2
                      ]?.queues_name
                        // @ts-ignore
                        ?.split('-')[1]
                        ?.slice(-2)}`}
                    </p>
                  </div>
                </>
              ) : (
                ''
              )}
            </div>
          </div>

          <div>
            {allProccessQueue!?.room2?.proceed?.map(
              (item: any, index: number) => {
                // @ts-ignore
                const prefix = item?.queues_name?.charAt(0);
                const lastTwoDigits = item?.queues_name
                  // @ts-ignore
                  ?.split('-')[1]
                  ?.slice(-2);

                const outputString = `${prefix}-${lastTwoDigits}`;

                if (index === allProccessQueue!?.room2?.proceed.length! - 1) {
                  return (
                    <div key={item.id}>
                      <div>
                        <p>{allProccessQueue!?.room2!?.department_id?.name}</p>
                      </div>

                      <div>
                        <p>{allProccessQueue!?.room2!?.name}</p>
                      </div>

                      <div>
                        {index ===
                          allProccessQueue!?.room2?.proceed.length! - 1 &&
                        item.status === 'proccessed' ? (
                          <p>{outputString}</p>
                        ) : (
                          <p>-</p>
                        )}
                      </div>
                    </div>
                  );
                }
              },
            )}

            <div>
              {allProccessQueue!?.room2?.proceed?.map(
                (item: any, index: number) => {
                  // @ts-ignore
                  const prefix = item.queues_name?.charAt(0);
                  const lastTwoDigits = item.queues_name
                    // @ts-ignore
                    ?.split('-')[1]
                    ?.slice(-2);

                  // Combine them
                  const outputString = `${prefix}-${lastTwoDigits}`;
                  if (index < 4 && item.status === 'pending')
                    return (
                      <div>
                        <p>{outputString}</p>
                      </div>
                    );
                },
              )}

              {allProccessQueue!?.room2!?.proceed.length > 4 ? (
                <>
                  <div>
                    <ETC />
                  </div>

                  <div>
                    <p>
                      {`${allProccessQueue!?.room2?.proceed[
                        allProccessQueue!?.room2?.proceed.length - 2
                        // @ts-ignore
                      ].queues_name?.charAt(
                        0,
                      )}-${allProccessQueue!.room2?.proceed[
                        allProccessQueue!.room2?.proceed.length - 2
                      ].queues_name
                        // @ts-ignore
                        ?.split('-')[1]
                        ?.slice(-2)}`}
                    </p>
                  </div>
                </>
              ) : (
                ''
              )}
            </div>
          </div>
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
