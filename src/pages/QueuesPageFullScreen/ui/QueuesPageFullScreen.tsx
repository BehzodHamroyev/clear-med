/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import ReactPlayer from 'react-player';
import Marquee from 'react-fast-marquee';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { baseUrl } from '../../../../baseurl';
import cls from './QueuesPageFullScreen.module.scss';
import { getAllQueueProccessData } from '@/pages/QueuesPage';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
// eslint-disable-next-line ulbi-tv-plugin/public-api-imports
import QueueDialog from '@/entities/QueueDialog/ui/QueueDialog';
import { ETC } from '@/shared/assets/icons';

const QueuesPageFullScreen = () => {
  const videoUrl: string[] = [];
  const { t } = useTranslation();

  const [queueDialogData, setQueueDialogData] = useState({
    roomNumber: '90',
    biletNumber: 'NEV2-1000',
    step: 1,
    mp3Arr: [''],
  });

  const allProccessQueue = useSelector(getAllQueueProccessData);

  const { onEndedQueueAudio, setOnEndedQueueAudio } =
    useContext(ButtonsContext);

  const handleExitFullScreenClick = () => {
    document.exitFullscreen();
  };

  if (allProccessQueue!?.videoUrl && allProccessQueue!?.videoUrl?.length > 0) {
    allProccessQueue!?.videoUrl.forEach((item) => {
      videoUrl.push(item.link);
    });
  }

  useEffect(() => {
    const token = Cookies.get('token');
    let found = false;

    if (!onEndedQueueAudio) {
      allProccessQueue!?.proccessQueues.forEach((item) => {
        if (!item.view && !found) {
          setQueueDialogData({
            roomNumber: String(item.room_id.name),
            biletNumber: String(item.queues_name),
            step: item.step,
            mp3Arr: item.mp3Arr,
          });

          try {
            axios.post(
              `${baseUrl}/monitor/update/view`,
              { id: item._id, view: true },
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

          // setHasQueueDialog(true);
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
    fontFamily: 'sans-serif',
    fontSize: '38px',
    margin: '30px 50px',
  };

  return (
    <>
      <div className={cls.QueuesPage}>
        <div className={classNames(cls.QueuesPage__header, {}, [])}>
          <div className={classNames(cls.QueuesPage__headerLeft)}>
            {/* <img src={Logo} className={cls.logo} alt="" /> */}
          </div>
          <div className={classNames(cls.QueuesPage__headerRight)}>
            <div className={classNames(cls.QueuesPage__headerRightPhoneBox)}>
              <p>{t('Ishonch raqami:')} +998 71 202 02 12</p>
            </div>
          </div>
        </div>

        <Marquee speed={80} gradientColor="248 251 253">
          <p style={MariqueParagraphStyle}>
            Hurmatli bemorlar iltimos tartib va tinchlikni saqlang !
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
                url={videoUrl}
                loop
                playing
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
              {allProccessQueue!?.room1?.proceed!?.length > 0 ? (
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

              <div className={classNames(cls.queuesTable__items)}>
                {allProccessQueue!.room1?.proceed?.map((item, index) => {
                  console.log(item);

                  if (item.status === 'proccessed')
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
                          <p>{allProccessQueue!.room1!.name}</p>
                        </div>

                        <div
                          className={classNames(
                            cls.queuesTable__itemBiletNumber,
                          )}
                        >
                          <p>{item.queues_name}</p>
                        </div>
                      </div>
                    );
                })}
              </div>

              <div className={cls.wrapperOrder}>
                {allProccessQueue!.room1?.proceed?.map((item, index) => {
                  if (index < 11 && item.status === 'pending')
                    return (
                      <div className={classNames(cls.orderNumber)}>
                        <p>{item.queues_name}</p>
                      </div>
                    );
                })}

                {allProccessQueue!.room1!?.proceed.length > 10 ? (
                  <>
                    <div className={classNames(cls.orderNumber)}>
                      <ETC />
                    </div>
                    <div className={classNames(cls.orderNumber)}>
                      <p>
                        {
                          allProccessQueue!.room1?.proceed[
                            allProccessQueue!.room1?.proceed.length - 1
                          ].queues_name
                        }
                      </p>
                    </div>
                  </>
                ) : (
                  ''
                )}
              </div>

              <div className={classNames(cls.queuesTable__items)}>
                {allProccessQueue!.room2?.proceed?.map((item, index) => {
                  if (item.status === 'proccessed')
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
                          <p>{allProccessQueue!.room2!?.department_id.name}</p>
                        </div>

                        <div
                          className={classNames(
                            cls.queuesTable__itemRoomNumber,
                          )}
                        >
                          <p>{allProccessQueue!?.room1!?.name}</p>
                        </div>

                        <div
                          className={classNames(
                            cls.queuesTable__itemBiletNumber,
                          )}
                        >
                          <p>{item.queues_name}</p>
                        </div>
                      </div>
                    );
                })}
                <div className={cls.wrapperOrder}>
                  {allProccessQueue!.room2?.proceed?.map((item, index) => {
                    if (index < 11 && item.status === 'pending')
                      return (
                        <div className={classNames(cls.orderNumber)}>
                          <p>{item.queues_name}</p>
                        </div>
                      );
                  })}

                  {allProccessQueue!!.room2!?.proceed.length > 10 ? (
                    <>
                      <div className={classNames(cls.orderNumber)}>
                        <ETC />
                      </div>
                      <div className={classNames(cls.orderNumber)}>
                        <p>
                          {
                            allProccessQueue!.room2?.proceed[
                              allProccessQueue!.room2?.proceed.length - 1
                            ].queues_name
                          }
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
