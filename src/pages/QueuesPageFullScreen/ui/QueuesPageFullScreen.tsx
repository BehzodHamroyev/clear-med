import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import ReactPlayer from 'react-player';
import Marquee from 'react-fast-marquee';
import { useSelector } from 'react-redux';
import { IoClose } from 'react-icons/io5';
import { useTranslation } from 'react-i18next';

import { baseUrl } from '../../../../baseurl';
import cls from './QueuesPageFullScreen.module.scss';
import medLogo from '../../../../public/assets/medLogo.png';
import { getAllQueueProccessData } from '@/pages/QueuesPage';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
// eslint-disable-next-line ulbi-tv-plugin/public-api-imports
import QueueDialog from '@/entities/QueueDialog/ui/QueueDialog';

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

  if (allProccessQueue?.videoUrl && allProccessQueue?.videoUrl.length > 0) {
    allProccessQueue?.videoUrl.forEach((item) => {
      videoUrl.push(item.link);
    });
  }

  useEffect(() => {
    const token = Cookies.get('token');
    let found = false;

    if (!onEndedQueueAudio) {
      allProccessQueue?.proccessQueues.forEach((item) => {
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
  }, [allProccessQueue?.proccessQueues]);

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
            <div
              onClick={handleExitFullScreenClick}
              className={classNames(cls.closeIcon)}
            >
              <IoClose style={{ fontSize: '36px', color: '#27374d' }} />
            </div>

            <p>Med Navbat Clinic Center</p>
          </div>
          <div className={classNames(cls.QueuesPage__headerRight)}>
            <div className={classNames(cls.QueuesPage__headerRightPhoneBox)}>
              <p>{t('Ishonch raqami:')} +998 71 225 25 25</p>
            </div>
            <div className={classNames(cls.QueuesPage__headerRightLogo)}>
              <img src={medLogo} alt="logo" />
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

        {allProccessQueue?.addvertising &&
        allProccessQueue?.videoUrl &&
        videoUrl.length > 0 &&
        allProccessQueue?.videoUrl.length > 0 ? (
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
                  {allProccessQueue.room1?.proceed.map((item, index) => {
                    if (index < 3) {
                      return (
                        <div
                          key={item._id}
                          className={classNames(cls.queuesTable__item)}
                        >
                          <div
                            className={classNames(
                              cls.queuesTable__itemDepartmentName,
                            )}
                          >
                            <p>{item.department_id?.name}</p>
                          </div>

                          <div
                            className={classNames(
                              cls.queuesTable__itemRoomNumber,
                            )}
                          >
                            <p>{item.room_id.name}</p>
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
                    }
                    return <>...</>;
                  })}
                </div>

                {allProccessQueue!?.room2?.proceed!?.length > 0 ? (
                  <div className={classNames(cls.queuesTable__head)}>
                    {/* <p className={classNames(cls.queuesTable__headItem)}>
                      {t("Bo'lim")}
                    </p>
                    <p className={classNames(cls.queuesTable__headItem)}>
                      {t('Xona')}
                    </p>
                    <p className={classNames(cls.queuesTable__headItem)}>
                      {t('Bilet')}
                    </p> */}
                  </div>
                ) : (
                  ''
                )}

                <div className={classNames(cls.queuesTable__items)}>
                  {allProccessQueue.room2?.proceed.map((item, index) => {
                    if (index < 3) {
                      return (
                        <div
                          key={item._id}
                          className={classNames(cls.queuesTable__item)}
                        >
                          <div
                            className={classNames(
                              cls.queuesTable__itemDepartmentName,
                            )}
                          >
                            <p>{item.department_id?.name}</p>
                          </div>
                          <div
                            className={classNames(
                              cls.queuesTable__itemRoomNumber,
                            )}
                          >
                            <p>{item.room_id.name}</p>
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
                    }
                    return <>...</>;
                  })}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className={classNames(cls.QueuesPage__queuesContainerFullQueue)}>
            <div className={classNames(cls.queuesTable)}>
              <div className={classNames(cls.queuesTable__itemsFullQueue)}>
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

                {allProccessQueue?.proccessQueues &&
                  allProccessQueue?.proccessQueues.length > 0 &&
                  allProccessQueue?.proccessQueues.map((item) => (
                    <div
                      key={item._id}
                      className={classNames(cls.queuesTable__item)}
                    >
                      <div
                        className={classNames(
                          cls.queuesTable__itemDepartmentName,
                        )}
                      >
                        <p>{item.department_id?.name}</p>
                      </div>
                      <div
                        className={classNames(cls.queuesTable__itemRoomNumber)}
                      >
                        <p>{item.room_id.name}</p>
                      </div>
                      <div
                        className={classNames(cls.queuesTable__itemBiletNumber)}
                      >
                        <p>{item.queues_name}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
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
