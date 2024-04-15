import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import axios from 'axios';

import ReactPlayer from 'react-player';

import { useTranslation } from 'react-i18next';

import { IoClose } from 'react-icons/io5';
import cls from './QueuesPageFullScreen.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

// eslint-disable-next-line ulbi-tv-plugin/public-api-imports
import QueueDialog from '@/pages/QueuesPage/ui/queueDialog/QueueDialog';
// eslint-disable-next-line ulbi-tv-plugin/public-api-imports
import { getAllQueueProccessData } from '@/pages/QueuesPage/model/selector/allQueueProccessSelector';

import medLogo from '../../../../public/assets/medLogo.png';
import { baseUrl } from '../../../../baseurl';

const QueuesPageFullScreen = () => {
  const { t } = useTranslation();

  const [hasQueueDialog, setHasQueueDialog] = useState(false);
  const [queueDialogData, setQueueDialogData] = useState({
    roomNumber: '90',
    biletNumber: 'NEV2-1000',
    step: 1,
    mp3Arr: [''],
  });

  const videoUrl: string[] = [];

  const allProccessQueue = useSelector(getAllQueueProccessData);

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

    if (!hasQueueDialog) {
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

          setHasQueueDialog(true);

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

  useEffect(() => {
    if (hasQueueDialog) {
      setTimeout(() => {
        setHasQueueDialog(false);
      }, 10500);
    }
  }, [hasQueueDialog]);

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

            <p>Med Navbat Clinic Centr</p>
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

        {allProccessQueue?.addvertising &&
        allProccessQueue?.videoUrl &&
        videoUrl.length > 0 &&
        allProccessQueue?.videoUrl.length > 0 ? (
          <div className={classNames(cls.QueuesPage__queuesContainer)}>
            <div className={classNames(cls.QueuesPage__queuesContainerLeft)}>
              <div className={classNames(cls.queuesTable)}>
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

                <div className={classNames(cls.queuesTable__items)}>
                  {allProccessQueue?.proccessQueues &&
                    allProccessQueue?.proccessQueues.length > 0 &&
                    allProccessQueue?.proccessQueues.map((item) =>
                      item.view ? (
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
                      ) : null,
                    )}
                </div>
              </div>
            </div>

            <div className={classNames(cls.QueuesPage__queuesContainerRigth)}>
              <div className={classNames(cls.rolik)}>
                <ReactPlayer
                  url={videoUrl}
                  loop
                  playing
                  controls
                  width="100%"
                  config={{
                    youtube: {
                      playerVars: { showinfo: 0 },
                    },
                  }}
                />
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
                  allProccessQueue?.proccessQueues.map((item) =>
                    item.view ? (
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
                          <p>{item.view}</p>
                        </div>
                      </div>
                    ) : null,
                  )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* {allProccessQueueIsLoading && <Loader />} */}

      {hasQueueDialog && (
        <QueueDialog
          roomNumber={queueDialogData.roomNumber}
          biletNumber={queueDialogData.biletNumber}
          step={queueDialogData.step}
          Mp3Array={queueDialogData.mp3Arr}
        />
      )}
    </>
  );
};

export default QueuesPageFullScreen;
