import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import ReactPlayer from 'react-player';

import { useFullScreenHandle } from 'react-full-screen';
import { useTranslation } from 'react-i18next';

import { IoClose } from 'react-icons/io5';
import cls from './QueuesPageFullScreen.module.scss';
// import { QueuesList2 } from '@/entities/QueuesChilds2';
import { classNames } from '@/shared/lib/classNames/classNames';

import medLogo from '../../../../public/assets/medLogo.png';
// eslint-disable-next-line ulbi-tv-plugin/public-api-imports
import QueueDialog from '@/pages/QueuesPage/ui/queueDialog/QueueDialog';
// eslint-disable-next-line ulbi-tv-plugin/public-api-imports
import {
  getAllQueueProccessData,
  getAllQueueProccessIsLoading,
} from '@/pages/QueuesPage/model/selector/allQueueProccessSelector';
// eslint-disable-next-line ulbi-tv-plugin/public-api-imports
import Loader from '@/widgets/Loader/ui/Loader';
import { socket } from '@/shared/lib/utils/socket';
// eslint-disable-next-line ulbi-tv-plugin/public-api-imports
import { useAllQueueProccessActions } from '@/pages/QueuesPage/model/slice/allQueueProccessSlice';
import { Queue } from '@/pages/QueuesControlDoctor';

const QueuesPageFullScreen = () => {
  const { t } = useTranslation();

  const handle = useFullScreenHandle();

  const [hasRolik, setHasRolik] = useState(true);
  const [hasQueueDialog, setHasQueueDialog] = useState(false);
  const [queueDialogData, setQueueDialogData] = useState({
    roomNumber: '90',
    biletNumber: 'NEV2-1000',
    step: 1,
  });

  const videoUrl: string[] = [];

  const {
    recallQueue,
    addProccessQueue,
    clearProccessQueue,
    removeProccessQueue,
  } = useAllQueueProccessActions();

  const allProccessQueue = useSelector(getAllQueueProccessData);
  const allProccessQueueIsLoading = useSelector(getAllQueueProccessIsLoading);

  const handleExitFullScreenClick = () => {
    document.exitFullscreen();
  };

  if (allProccessQueue?.videoUrl && allProccessQueue?.videoUrl.length > 0) {
    allProccessQueue?.videoUrl.forEach((item) => {
      videoUrl.push(item.link);
    });
  }

  socket.on('getProccessQueueToTV', (data: Queue) => {
    if (data) {
      addProccessQueue(data);

      setQueueDialogData({
        roomNumber: String(data.room_id.name),
        biletNumber: String(data.queues_name),
        step: data.step,
      });

      setHasQueueDialog(true);
    }
  });

  socket.on('getRecallQueueToTV', (data: Queue) => {
    if (data) {
      // console.log(data, 'recall');
      recallQueue(data);

      setQueueDialogData({
        roomNumber: String(data.room_id.name),
        biletNumber: String(data.queues_name),
        step: data.step,
      });

      setHasQueueDialog(true);
    }
  });

  socket.on('getAcceptedQueueToTV', (data: Queue) => {
    if (data) {
      // console.log(data, 'accept');
      removeProccessQueue(data);
    }
  });

  socket.on('getRejectQueueToTV', (data: Queue) => {
    if (data) {
      // console.log(data, 'reject');
      removeProccessQueue(data);
    }
  });

  useEffect(() => {
    if (hasQueueDialog) {
      setTimeout(() => {
        setHasQueueDialog(false);
      }, 3500);
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

        <div className={classNames(cls.QueuesPage__queuesContainer)}>
          <div className={classNames(cls.QueuesPage__queuesContainerLeft)}>
            {allProccessQueue?.proccessQueues &&
              allProccessQueue?.proccessQueues.length > 0 && (
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
                    {allProccessQueue?.proccessQueues.map((item) => (
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
                    ))}
                  </div>
                </div>
              )}
          </div>

          {hasRolik &&
          allProccessQueue?.videoUrl &&
          videoUrl.length > 0 &&
          allProccessQueue?.videoUrl.length > 0 ? (
            <div className={classNames(cls.QueuesPage__queuesContainerRigth)}>
              <div className={classNames(cls.rolik)}>
                <ReactPlayer
                  url={videoUrl}
                  volume={hasQueueDialog ? 0 : 1}
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
          ) : (
            ''
          )}
        </div>
      </div>

      {allProccessQueueIsLoading && <Loader />}

      {hasQueueDialog && (
        <QueueDialog
          roomNumber={queueDialogData.roomNumber}
          biletNumber={queueDialogData.biletNumber}
          step={queueDialogData.step}
        />
      )}
    </>
  );
};

export default QueuesPageFullScreen;
