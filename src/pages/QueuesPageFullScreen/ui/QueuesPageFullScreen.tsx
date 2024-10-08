import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import ReactPlayer from 'react-player';
import Marquee from 'react-fast-marquee';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { ETC } from '@/shared/assets/icons';
import { baseUrl, baseUrlImgLogo } from '../../../../baseurl';
import cls from './QueuesPageFullScreen.module.scss';
import { getAllQueueProccessData } from '@/pages/QueuesPage';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import QueueDialog from '@/entities/QueueDialog/ui/QueueDialog';
import { fetchAllQueueProccess } from '@/pages/QueuesPage/model/services/fetchAllQueueProccess';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

const QueuesPageFullScreen = () => {
  const videoUrl: string[] = [];
  const { t } = useTranslation();
  const [lastQueue, setLastQueue] = useState('');
  const [queueDialogData, setQueueDialogData] = useState({
    roomNumber: '90',
    biletNumber: 'NEV2-1000',
    step: 1,
    mp3Arr: [''],
  });

  const dispatch = useAppDispatch();

  const allProccessQueue = useSelector(getAllQueueProccessData);

  const { onEndedQueueAudio, setOnEndedQueueAudio } =
    useContext(ButtonsContext);

  if (allProccessQueue?.videoUrl && allProccessQueue?.videoUrl?.length > 0) {
    allProccessQueue?.videoUrl.forEach((item) => {
      videoUrl.push(item.link);
    });
  }

  if (allProccessQueue!?.videoUrl && allProccessQueue!?.videoUrl?.length > 0) {
    allProccessQueue!?.videoUrl.forEach((item) => {
      videoUrl?.push(item.link);
    });
  }

  useEffect(() => {
    const token = Cookies.get('token');
    let found = false;

    if (!onEndedQueueAudio) {
      allProccessQueue!?.proccessQueues?.forEach((item) => {
        console.log(item, 'item');

        if (!item.view && !found) {
          console.log(item, 'item');

          setQueueDialogData({
            roomNumber: String(item?.queues_name)?.match(/([A-Z])(\d+)-/)![2],
            biletNumber: String(item?.queues_name),
            step: item?.step,
            mp3Arr: item?.mp3Arr,
          });

          try {
            axios.post(
              `${baseUrl}/monitor/update/view`,
              { id: item?._id, view: true },
              {
                maxBodyLength: Infinity,
                headers: {
                  'Content-Type': 'application/json',
                  authorization: `Bearer ${token}`,
                },
              },
            );
          } catch (error) {
            console.log(error);
          }

          setOnEndedQueueAudio(true);

          found = true;
        }

        if (found) {
          // eslint-disable-next-line no-useless-return
          return;
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allProccessQueue!?.proccessQueues]);

  const MariqueParagraphStyle = {
    width: '100%',
    color: 'red',
    fontSize: '28px',
    marginTop: '10px',
    marginRight: '20px',
  };

  useEffect(() => {
    dispatch(fetchAllQueueProccess({}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(fetchAllQueueProccess({}));
    }, 5000);

    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <>
      <div className={cls.QueuesPage}>
        <div className={classNames(cls.QueuesPage__header, {}, [])}>
          <div className={classNames(cls.QueuesPage__headerLeft)}>
            <img src={baseUrlImgLogo} className={cls.logo} alt="#" />
          </div>
          <div className={classNames(cls.QueuesPage__headerRight)}>
            <div className={classNames(cls.QueuesPage__headerRightPhoneBox)}>
              <p>{t('Ишонч рақами:')} 1183</p>
            </div>
          </div>
        </div>

        <Marquee speed={80} gradientColor="248 251 253">
          <p style={MariqueParagraphStyle}>
            Ҳурматли беморлар илтимос тартиб ва тинчликни сақланг !{' '}
          </p>

          <p style={MariqueParagraphStyle}>
            Уважаемые пациенты, пожалуйста, соблюдайте порядок и мир!
          </p>

          <p style={MariqueParagraphStyle}>
            Dear patients, please maintain order and peace!
          </p>
        </Marquee>

        <div className={classNames(cls.QueuesPage__queuesContainer)}>
          <div className={classNames(cls.QueuesPage__queuesContainerRigth)}>
            <div className={classNames(cls.rolik)}>
              <ReactPlayer
                url="https://www.youtube.com/watch?v=Zv11L-ZfrSg&pp=ygUCOGs%3D"
                // url={`${baseUploadUrl}/${allProccessQueue?.videoUrl[0].link}`}
                loop
                playing
                volume={0.1}
                controls
                width="100%"
                height="80%"
                playsinline
                config={{
                  youtube: {
                    playerVars: { showinfo: 0 },
                  },
                }}
              />
            </div>
          </div>

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

                  // Extract the last two digits after the hyphen
                  const lastTwoDigits = item?.queues_name
                    // @ts-ignore
                    .split('-')[1]
                    .slice(-2);

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
                    const prefix = item.queues_name.charAt(0);

                    // Extract the last two digits after the hyphen
                    const lastTwoDigits = item.queues_name
                      // @ts-ignore
                      .split('-')[1]
                      .slice(-2);

                    // Combine them
                    const outputString = `${prefix}-${lastTwoDigits}`;
                    if (index < 4 && item.status === 'pending')
                      return (
                        <div className={classNames(cls.orderNumber)}>
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
                            .split('-')[1]
                            .slice(-2)}`}
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

                  // Extract the last two digits after the hyphen
                  const lastTwoDigits = item?.queues_name
                    // @ts-ignore
                    .split('-')[1]
                    .slice(-2);

                  // Combine them
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
                    const prefix = item.queues_name.charAt(0);

                    // Extract the last two digits after the hyphen
                    const lastTwoDigits = item.queues_name
                      // @ts-ignore
                      .split('-')[1]
                      .slice(-2);

                    // Combine them
                    const outputString = `${prefix}-${lastTwoDigits}`;
                    if (index < 4 && item.status === 'pending')
                      return (
                        <div className={classNames(cls.orderNumber)}>
                          <p>{outputString}</p>
                        </div>
                      );
                  })}

                  {allProccessQueue!!?.room2!?.proceed.length > 4 ? (
                    <>
                      <div className={classNames(cls.icon)}>
                        <ETC />
                      </div>
                      <div className={classNames(cls.orderNumber)}>
                        <p>
                          {`${allProccessQueue!?.room2?.proceed[
                            allProccessQueue!?.room2?.proceed.length - 2
                            // @ts-ignore
                          ].queues_name.charAt(
                            0,
                          )}-${allProccessQueue!.room2?.proceed[
                            allProccessQueue!.room2?.proceed.length - 2
                          ].queues_name
                            // @ts-ignore
                            .split('-')[1]
                            .slice(-2)}`}
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

      {onEndedQueueAudio && (
        <QueueDialog
          step={queueDialogData.step}
          Mp3Array={queueDialogData.mp3Arr}
          roomNumber={queueDialogData.roomNumber}
          biletNumber={queueDialogData.biletNumber}
        />
      )}
    </>
  );
};

export default QueuesPageFullScreen;
