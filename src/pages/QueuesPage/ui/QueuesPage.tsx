import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';

import ReactPlayer from 'react-player';
import { Button } from '@mui/material';
import cls from './QueuesPage.module.scss';
import ErrorDialog from '@/shared/ui/ErrorDialog/ErrorDialog';
import { QueuesPageFullScreen } from '@/pages/QueuesPageFullScreen';
import { fetchAllQueueProccess } from '../model/services/fetchAllQueueProccess';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import {
  getAllQueueProccessData,
  getAllQueueProccessError,
} from '../model/selector/allQueueProccessSelector';
import { classNames } from '@/shared/lib/classNames/classNames';
// import { Logo } from '@/shared/assets/Logo';

const QueuesPage: React.FC = () => {
  const videoUrl: string[] = [];
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const handle = useFullScreenHandle();

  const allProccessQueue = useSelector(getAllQueueProccessData);
  const allProccessQueueIsError = useSelector(getAllQueueProccessError);

  if (allProccessQueue?.videoUrl && allProccessQueue?.videoUrl?.length > 0) {
    allProccessQueue?.videoUrl.forEach((item) => {
      videoUrl.push(item.link);
    });
  }

  const handleClickedFullScreen = () => {
    handle.enter();
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
      <Button
        type="button"
        variant="contained"
        className={cls.FullScreenBtn}
        onClick={() => handleClickedFullScreen()}
        style={{ display: 'block', margin: '10px auto' }}
      >
        {t('Fullscreen')}
      </Button>

      <FullScreen className={cls.MyComponentScreen} handle={handle}>
        {handle.active ? (
          <QueuesPageFullScreen />
        ) : (
          <div className={cls.QueuesPage}>
            <div className={classNames(cls.QueuesPage__header, {}, [])}>
              <div className={classNames(cls.QueuesPage__headerLeft)}>
                {/* <img className={cls.logo} alt="logo" src={Logo} /> */}
              </div>
              <div className={classNames(cls.QueuesPage__headerRight)}>
                <div
                  className={classNames(cls.QueuesPage__headerRightPhoneBox)}
                >
                  <p>{t('Ишонч рақами:')} +998 71 202 02 12</p>
                </div>
              </div>
            </div>

            {allProccessQueue?.addvertising &&
            allProccessQueue?.videoUrl &&
            videoUrl?.length > 0 &&
            allProccessQueue?.videoUrl?.length > 0 ? (
              <div className={classNames(cls.QueuesPage__queuesContainer)}>
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
                      {allProccessQueue.room1?.proceed?.map((item, index) => {
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
                      {allProccessQueue.room2?.proceed?.map((item, index) => {
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

                <div
                  className={classNames(cls.QueuesPage__queuesContainerRigth)}
                >
                  <div className={classNames(cls.rolik)}>
                    <ReactPlayer
                      loop
                      playing
                      controls
                      width="100%"
                      url={videoUrl}
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
              <div
                className={classNames(cls.QueuesPage__queuesContainerFullQueue)}
              >
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
                      allProccessQueue?.proccessQueues?.length > 0 &&
                      allProccessQueue?.proccessQueues?.map((item) => (
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
            )}
          </div>
        )}

        {allProccessQueueIsError && <ErrorDialog isErrorProps={!false} />}
      </FullScreen>
    </>
  );
};

export default QueuesPage;
