/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import ReactPlayer from 'react-player';

import { useTranslation } from 'react-i18next';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';

import { QueuesPageFullScreen } from '@/pages/QueuesPageFullScreen';

import cls from './QueuesPage.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

import medLogo from '../../../../public/assets/medLogo.png';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchAllQueueProccess } from '../model/services/fetchAllQueueProccess';
import {
  getAllQueueProccessData,
  getAllQueueProccessError,
  getAllQueueProccessIsLoading,
} from '../model/selector/allQueueProccessSelector';
import { Loader } from '@/widgets/Loader';
import ErrorDialog from '@/shared/ui/ErrorDialog/ErrorDialog';
import { useAllQueueProccessActions } from '../model/slice/allQueueProccessSlice';
import { Queue } from '@/pages/QueuesControlDoctor';
import { socket } from '@/shared/lib/utils/socket';

const QueuesPage = () => {
  const dispatch = useAppDispatch();

  const [hasRolik, setHasRolik] = useState(true);

  const allProccessQueue = useSelector(getAllQueueProccessData);
  const allProccessQueueIsLoading = useSelector(getAllQueueProccessIsLoading);
  const allProccessQueueIsError = useSelector(getAllQueueProccessError);

  const {
    recallQueue,
    addProccessQueue,
    clearProccessQueue,
    removeProccessQueue,
  } = useAllQueueProccessActions();

  useEffect(() => {
    dispatch(fetchAllQueueProccess({}));
  }, []);

  const handle = useFullScreenHandle();

  const { t } = useTranslation();

  const handleClicked = () => {
    handle.enter();
  };

  socket.on('getProccessQueueToTV', (data: Queue) => {
    if (data) {
      // console.log(data);
      addProccessQueue(data);
    }
  });

  socket.on('getRecallQueueToTV', (data: Queue) => {
    if (data) {
      // console.log(data, 'recall');
      recallQueue(data);
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

  return (
    <>
      <button
        className={cls.FullScreenBtn}
        type="button"
        onClick={handleClicked}
      >
        {t('Fullscreen')}
      </button>

      <FullScreen className={cls.MyComponentScreen} handle={handle}>
        {handle.active ? (
          <QueuesPageFullScreen />
        ) : (
          <div className={cls.QueuesPage}>
            <div className={classNames(cls.QueuesPage__header, {}, [])}>
              <div className={classNames(cls.QueuesPage__headerLeft)}>
                <p>Med Navbat Clinic Centr</p>
              </div>
              <div className={classNames(cls.QueuesPage__headerRight)}>
                <div
                  className={classNames(cls.QueuesPage__headerRightPhoneBox)}
                >
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
              </div>

              {hasRolik ? (
                <div
                  className={classNames(cls.QueuesPage__queuesContainerRigth)}
                >
                  <div className={classNames(cls.rolik)}>
                    <ReactPlayer
                      // eslint-disable-next-line max-len
                      url="https://www.youtube.com/embed/PZUr2YyYmFY?autoplay=1&si=stHXBOccrB0sjZIe?rel=0&amp;controls=1&amp&amp;showinfo=0&amp;modestbranding=1"
                      loop
                    />
                  </div>
                </div>
              ) : (
                <div
                  className={classNames(cls.QueuesPage__queuesContainerLeft)}
                >
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
                          className={classNames(
                            cls.queuesTable__itemRoomNumber,
                          )}
                        >
                          <p>08</p>
                        </div>
                        <div
                          className={classNames(
                            cls.queuesTable__itemBiletNumber,
                          )}
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
                          className={classNames(
                            cls.queuesTable__itemRoomNumber,
                          )}
                        >
                          <p>08</p>
                        </div>
                        <div
                          className={classNames(
                            cls.queuesTable__itemBiletNumber,
                          )}
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
                          className={classNames(
                            cls.queuesTable__itemRoomNumber,
                          )}
                        >
                          <p>08</p>
                        </div>
                        <div
                          className={classNames(
                            cls.queuesTable__itemBiletNumber,
                          )}
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
                          className={classNames(
                            cls.queuesTable__itemRoomNumber,
                          )}
                        >
                          <p>08</p>
                        </div>
                        <div
                          className={classNames(
                            cls.queuesTable__itemBiletNumber,
                          )}
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
                          className={classNames(
                            cls.queuesTable__itemRoomNumber,
                          )}
                        >
                          <p>08</p>
                        </div>
                        <div
                          className={classNames(
                            cls.queuesTable__itemBiletNumber,
                          )}
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
                          className={classNames(
                            cls.queuesTable__itemRoomNumber,
                          )}
                        >
                          <p>08</p>
                        </div>
                        <div
                          className={classNames(
                            cls.queuesTable__itemBiletNumber,
                          )}
                        >
                          <p>NE-05</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* <div className={classNames(cls.QueuesPage__queuesContainer)}>
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

              {hasRolik ? (
                <div
                  className={classNames(cls.QueuesPage__queuesContainerRigth)}
                >
                  <div className={classNames(cls.rolik)}>
                    <p>Reklama</p>
                  </div>
                </div>
              ) : (
                <div
                  className={classNames(cls.QueuesPage__queuesContainerLeft)}
                >
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
                          className={classNames(
                            cls.queuesTable__itemRoomNumber,
                          )}
                        >
                          <p>08</p>
                        </div>
                        <div
                          className={classNames(
                            cls.queuesTable__itemBiletNumber,
                          )}
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
                          className={classNames(
                            cls.queuesTable__itemRoomNumber,
                          )}
                        >
                          <p>08</p>
                        </div>
                        <div
                          className={classNames(
                            cls.queuesTable__itemBiletNumber,
                          )}
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
                          className={classNames(
                            cls.queuesTable__itemRoomNumber,
                          )}
                        >
                          <p>08</p>
                        </div>
                        <div
                          className={classNames(
                            cls.queuesTable__itemBiletNumber,
                          )}
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
                          className={classNames(
                            cls.queuesTable__itemRoomNumber,
                          )}
                        >
                          <p>08</p>
                        </div>
                        <div
                          className={classNames(
                            cls.queuesTable__itemBiletNumber,
                          )}
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
                          className={classNames(
                            cls.queuesTable__itemRoomNumber,
                          )}
                        >
                          <p>08</p>
                        </div>
                        <div
                          className={classNames(
                            cls.queuesTable__itemBiletNumber,
                          )}
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
                          className={classNames(
                            cls.queuesTable__itemRoomNumber,
                          )}
                        >
                          <p>08</p>
                        </div>
                        <div
                          className={classNames(
                            cls.queuesTable__itemBiletNumber,
                          )}
                        >
                          <p>NE-05</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div> */}
          </div>
        )}

        {allProccessQueueIsLoading && <Loader />}

        {allProccessQueueIsError && <ErrorDialog isErrorProps={!false} />}
      </FullScreen>
    </>
  );
};

export default QueuesPage;
