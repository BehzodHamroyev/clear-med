import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import ReactPlayer from 'react-player';
import Marquee from 'react-fast-marquee';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { ETC } from '@/shared/assets/icons';
import cls from './QueuesPageFullScreen.module.scss';
import { baseUrlImgLogo } from '../../../../baseurl';
import { classNames } from '@/shared/lib/classNames/classNames';
import QueueDialog from '@/entities/QueueDialog/ui/QueueDialog';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSocket } from '@/shared/hook/useSocket';
import { getAuthUserData } from '@/features/Auth';
import { getAllQueueProccessData } from '../model/selector/allQueueProccessSelector';
import { fetchAllQueueProccess } from '../model/services/fetchAllQueueProccess';
import { updateView } from '../model/services/updateView';

interface ListOfQueue {
  name: string
  room: number;
  id: string
}

interface ModalData {
  roomNumber: string,
  biletNumber: string,
  step: number,
  mp3Arr: string[]
}

const QueuesPageFullScreen = () => {
  const videoUrl: string[] = [];
  const { t } = useTranslation();
  const socket = useSocket()
  const token = Cookies.get('token');

  const authUserData = useSelector(getAuthUserData);
  // const [dataModal, setDataModal] = useState({})
  const [listOfQueue, setListOfQueue] = useState<ListOfQueue[]>([])
  const [queueDialogData, setQueueDialogData] = useState<ModalData>();
  const dispatch = useAppDispatch();

  const allProccessQueue = useSelector(getAllQueueProccessData);

  const { onEndedQueueAudio, setOnEndedQueueAudio } =
    useContext(ButtonsContext);

  if (allProccessQueue?.videoUrl && allProccessQueue?.videoUrl?.length > 0) {
    allProccessQueue?.videoUrl.forEach((item) => {
      videoUrl.push(item.link);
    });
  }
  useEffect(() => {
    dispatch(fetchAllQueueProccess({}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  useEffect(() => {
    if (socket) {
      socket.on('doctorProcessToMonitor', (data) => {
        if (authUserData?.rooms.some(room => room.id === data.roomId)) {
          setListOfQueue(
            [{
              name: data.name, room: data.room, id: data.id
            }]
          )
          dispatch(fetchAllQueueProccess({}));
        }
      });

      socket.on('queueCreated', (data) => {
        dispatch(fetchAllQueueProccess({}));
      });
    }
  }, [socket])

  useEffect(() => {
    while (listOfQueue?.length >= 1) {
      console.log(listOfQueue[0], 'ksjkdsjkdsj');

      setQueueDialogData({
        roomNumber: String(listOfQueue[0]?.room),
        biletNumber: String(listOfQueue[0]?.name),
        step: 1,
        mp3Arr: [`${listOfQueue[0]?.name}`],
      });
      setOnEndedQueueAudio(true)
      if (listOfQueue[0]?.id) {
        updateView({ id: listOfQueue[0]?.id })
      }
      listOfQueue.pop()
    }
  }, [listOfQueue, onEndedQueueAudio]);

  return (
    <>
      <div className={cls.QueuesPage}>
        <div className={classNames(cls.QueuesPage__header, {}, [])}>
          <div className={classNames(cls.QueuesPage__headerLeft)}>
            {baseUrlImgLogo ? (
              <img
                src={baseUrlImgLogo}
                className={cls['QueuesPage__headerLeft__logo']}
                alt=""
              />
            ) : (
              ''
            )}
          </div>

          <div className={classNames(cls.QueuesPage__headerRight)}>
            <p>{t('Ишонч рақами:')} 1183</p>
          </div>
        </div>

        <Marquee speed={80} gradientColor="248 251 253">
          <p className={cls.QueuesPage__paragraph}>
            Ҳурматли беморлар илтимос тартиб ва тинчликни сақланг !{' '}
          </p>

          <p className={cls.QueuesPage__paragraph}>
            Уважаемые пациенты, пожалуйста, соблюдайте порядок и мир!
          </p>

          <p className={cls.QueuesPage__paragraph}>
            Dear patients, please maintain order and peace!
          </p>
        </Marquee>

        <div className={cls.QueuesPage__queuesContainer}>
          <ReactPlayer
            url={'https://youtube.com/shorts/JoyKXJdWKOE?si=FBtRng-wQjrHO7Up'}
            loop
            autoPlay
            playing
            volume={0.1}
            controls
            playsinline
            className={cls['QueuesPage__queuesContainer--video']}
            config={{
              youtube: {
                playerVars: { showinfo: 0 },
              },
            }}
          />

          <div className={classNames(cls.QueuesPage__queuesContainerLeft)}>
            <div className={classNames(cls.queuesTable)}>
              <div>
                {allProccessQueue!?.room1?.proceed!?.length > 0 ||
                  allProccessQueue!?.room2?.proceed!?.length > 0 ? (
                  <div className={classNames(cls.queuesTable__head)}>
                    <p className={classNames(cls.queuesTable__headItem)}>
                      {t("Bo'lim")}
                    </p>

                    <p className={classNames(cls.queuesTable__headItem)}>
                      {t('Xona')}
                    </p>

                    <p className={classNames(cls.queuesTable__headItem)}>
                      {t('Bilet')}
                    </p>
                  </div>
                ) : null}
              </div>

              <div className={classNames(cls.queuesTable__items)}>
                {allProccessQueue!?.room1?.proceed?.map((item, index) => {
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
                      <div
                        key={item.id}
                        className={classNames(cls.queuesTable__item)}
                      >
                        <div
                          className={classNames(
                            cls.queuesTable__itemDepartmentName,
                          )}
                        >
                          <p>{allProccessQueue!.room1!.department_id?.name}</p>
                        </div>

                        <div
                          className={classNames(
                            cls.queuesTable__itemRoomNumber,
                          )}
                        >
                          <p>{allProccessQueue!.room1!?.name}</p>
                        </div>

                        <div
                          className={classNames(
                            cls.queuesTable__itemBiletNumber,
                          )}
                        >
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
                })}

                <div className={cls.wrapperOrder}>
                  {allProccessQueue!?.room1?.proceed?.map((item, index) => {
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
                        <div className={classNames(cls.orderNumber)} key={outputString}>
                          <p>{outputString}</p>
                        </div>
                      );
                  })}

                  {allProccessQueue!?.room1!?.proceed.length > 4 ? (
                    <>
                      <div className={classNames(cls.icon)}>
                        <ETC fill="#fff" color="#fff" />
                      </div>
                      <div className={classNames(cls.orderNumber)}>
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

              <div className={classNames(cls.queuesTable__items)}>
                {allProccessQueue!?.room2?.proceed?.map((item, index) => {
                  // @ts-ignore
                  const prefix = item?.queues_name?.charAt(0);
                  const lastTwoDigits = item?.queues_name
                    // @ts-ignore
                    ?.split('-')[1]
                    ?.slice(-2);

                  const outputString = `${prefix}-${lastTwoDigits}`;

                  if (index === allProccessQueue!?.room2?.proceed.length! - 1) {
                    return (
                      <div
                        key={item.id}
                        className={classNames(cls.queuesTable__item)}
                      >
                        <div
                          className={classNames(
                            cls.queuesTable__itemDepartmentName,
                          )}
                        >
                          <p>
                            {allProccessQueue!?.room2!?.department_id?.name}
                          </p>
                        </div>

                        <div
                          className={classNames(
                            cls.queuesTable__itemRoomNumber,
                          )}
                        >
                          <p>{allProccessQueue!?.room2!?.name}</p>
                        </div>

                        <div
                          className={classNames(
                            cls.queuesTable__itemBiletNumber,
                          )}
                        >
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
                })}
                <div className={cls.wrapperOrder}>
                  {allProccessQueue!?.room2?.proceed?.map((item, index) => {
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
                        <div className={classNames(cls.orderNumber)}>
                          <p>{outputString}</p>
                        </div>
                      );
                  })}

                  {allProccessQueue!?.room2!?.proceed.length > 4 ? (
                    <>
                      <div className={classNames(cls.icon)}>
                        <ETC />
                      </div>
                      <div className={classNames(cls.orderNumber)}>
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
            </div>
          </div>
        </div>
      </div>
      {
        onEndedQueueAudio && <QueueDialog
          step={1}
          Mp3Array={queueDialogData?.mp3Arr!}
          roomNumber={queueDialogData?.roomNumber!}
          biletNumber={queueDialogData?.biletNumber!}
        />
      }
    </>
  );
};

export default QueuesPageFullScreen;
