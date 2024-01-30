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
  const handle = useFullScreenHandle();

  const [hasRolik, setHasRolik] = useState(true);
  const [hasQueueDialog, setHasQueueDialog] = useState(false);
  const [queueDialogData, setQueueDialogData] = useState({
    roomNumber: '',
    biletNumber: '',
    step: 0,
  });

  const { t } = useTranslation();

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

  socket.on('getProccessQueueToTV', (data: Queue) => {
    if (data) {
      addProccessQueue(data);

      setQueueDialogData({
        roomNumber: String(data.room_id.name),
        biletNumber: data.queues_name[0],
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
        biletNumber: data.queues_name[0],
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
      }, 3000);
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

          {hasRolik ? (
            <div className={classNames(cls.QueuesPage__queuesContainerRigth)}>
              <div className={classNames(cls.rolik)}>
                <ReactPlayer
                  // eslint-disable-next-line max-len
                  url="https://www.youtube.com/embed/PZUr2YyYmFY?autoplay=1&si=stHXBOccrB0sjZIe?rel=0&amp;controls=1&amp&amp;showinfo=0&amp;modestbranding=1"
                  loop
                />
              </div>
            </div>
          ) : (
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
                  <div className={classNames(cls.queuesTable__item)}>
                    <div
                      className={classNames(
                        cls.queuesTable__itemDepartmentName,
                      )}
                    >
                      <p>Nevropatologiya</p>
                    </div>
                    <div
                      className={classNames(cls.queuesTable__itemRoomNumber)}
                    >
                      <p>08</p>
                    </div>
                    <div
                      className={classNames(cls.queuesTable__itemBiletNumber)}
                    >
                      <p>NE-05</p>
                    </div>
                  </div>

                  <div className={classNames(cls.queuesTable__item)}>
                    <div
                      className={classNames(
                        cls.queuesTable__itemDepartmentName,
                      )}
                    >
                      <p>Nevropatologiya</p>
                    </div>
                    <div
                      className={classNames(cls.queuesTable__itemRoomNumber)}
                    >
                      <p>08</p>
                    </div>
                    <div
                      className={classNames(cls.queuesTable__itemBiletNumber)}
                    >
                      <p>NE-05</p>
                    </div>
                  </div>

                  <div className={classNames(cls.queuesTable__item)}>
                    <div
                      className={classNames(
                        cls.queuesTable__itemDepartmentName,
                      )}
                    >
                      <p>Nevropatologiya</p>
                    </div>
                    <div
                      className={classNames(cls.queuesTable__itemRoomNumber)}
                    >
                      <p>08</p>
                    </div>
                    <div
                      className={classNames(cls.queuesTable__itemBiletNumber)}
                    >
                      <p>NE-05</p>
                    </div>
                  </div>

                  <div className={classNames(cls.queuesTable__item)}>
                    <div
                      className={classNames(
                        cls.queuesTable__itemDepartmentName,
                      )}
                    >
                      <p>Nevropatologiya</p>
                    </div>
                    <div
                      className={classNames(cls.queuesTable__itemRoomNumber)}
                    >
                      <p>08</p>
                    </div>
                    <div
                      className={classNames(cls.queuesTable__itemBiletNumber)}
                    >
                      <p>NE-05</p>
                    </div>
                  </div>

                  <div className={classNames(cls.queuesTable__item)}>
                    <div
                      className={classNames(
                        cls.queuesTable__itemDepartmentName,
                      )}
                    >
                      <p>Nevropatologiya</p>
                    </div>
                    <div
                      className={classNames(cls.queuesTable__itemRoomNumber)}
                    >
                      <p>08</p>
                    </div>
                    <div
                      className={classNames(cls.queuesTable__itemBiletNumber)}
                    >
                      <p>NE-05</p>
                    </div>
                  </div>

                  <div className={classNames(cls.queuesTable__item)}>
                    <div
                      className={classNames(
                        cls.queuesTable__itemDepartmentName,
                      )}
                    >
                      <p>Nevropatologiya</p>
                    </div>
                    <div
                      className={classNames(cls.queuesTable__itemRoomNumber)}
                    >
                      <p>08</p>
                    </div>
                    <div
                      className={classNames(cls.queuesTable__itemBiletNumber)}
                    >
                      <p>NE-05</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
