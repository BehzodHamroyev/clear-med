import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ReactPlayer from 'react-player';

import cls from './MonitorsDetail.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import {
  getAllQueueProccessData,
  getAllQueueProccessError,
  getAllQueueProccessIsLoading,
} from '@/pages/QueuesPage/model/selector/allQueueProccessSelector';
import { useAllQueueProccessActions } from '@/pages/QueuesPage/model/slice/allQueueProccessSlice';
import { fetchAllQueueProccess } from '@/pages/QueuesPage/model/services/fetchAllQueueProccess';
import { Loader } from '@/widgets/Loader';
import ErrorDialog from '@/shared/ui/ErrorDialog/ErrorDialog';
import { getInfoProject } from '@/entities/FileUploader';
import { baseUrlImgLogo } from '../../../../baseurl';

const MonitorsDetail = () => {
  const paramIdUrl: { id?: string } = useParams();

  const dispatch = useAppDispatch();

  const infoProject = useSelector(getInfoProject);

  const videoUrl: string[] = [];

  const allProccessQueue = useSelector(getAllQueueProccessData);
  const allProccessQueueIsLoading = useSelector(getAllQueueProccessIsLoading);
  const allProccessQueueIsError = useSelector(getAllQueueProccessError);

  if (allProccessQueue?.videoUrl && allProccessQueue?.videoUrl.length > 0) {
    allProccessQueue?.videoUrl.forEach((item) => {
      videoUrl.push(item.link);
    });
  }

  const {
    recallQueue,
    addProccessQueue,
    clearProccessQueue,
    removeProccessQueue,
  } = useAllQueueProccessActions();

  useEffect(() => {
    if (paramIdUrl) {
      dispatch(
        fetchAllQueueProccess({
          monitorId: paramIdUrl.id,
        }),
      );
    }
  }, [dispatch, paramIdUrl]);

  const { t } = useTranslation();

  // socket.on('getProccessQueueToTV', (data: Queue) => {
  //   if (data) {
  //     // console.log(data);
  //     addProccessQueue(data);
  //   }
  // });

  // socket.on('getRecallQueueToTV', (data: Queue) => {
  //   if (data) {
  //     // console.log(data, 'recall');
  //     recallQueue(data);
  //   }
  // });

  // socket.on('getAcceptedQueueToTV', (data: Queue) => {
  //   if (data) {
  //     // console.log(data, 'accept');
  //     removeProccessQueue(data);
  //   }
  // });

  // socket.on('getRejectQueueToTV', (data: Queue) => {
  //   if (data) {
  //     // console.log(data, 'reject');
  //     removeProccessQueue(data);
  //   }
  // });

  const phoneNumber = `+998${infoProject?.[0]?.phone}`;

  const formattedPhoneNumber = `+998 (${phoneNumber.substring(
    4,
    6,
  )}) ${phoneNumber.substring(6, 9)}-${phoneNumber.substring(
    9,
    11,
  )}-${phoneNumber.substring(11)}`;

  return (
    <>
      <div className={cls.QueuesPage}>
        <div className={classNames(cls.QueuesPage__header, {}, [])}>
          <div className={classNames(cls.QueuesPage__headerLeft)}>
            <img
              src={baseUrlImgLogo}
              alt="imgLink"
              className={cls.NavbarLogo}
            />

            <p className={cls.NavbarText}>{infoProject?.[0]?.name}</p>
          </div>
          <div className={classNames(cls.QueuesPage__headerRight)}>
            <div className={classNames(cls.QueuesPage__headerRightPhoneBox)}>
              <p>
                {t('Ишонч рақами:')} {formattedPhoneNumber}
              </p>
            </div>
            {/* <div className={classNames(cls.QueuesPage__headerRightLogo)}>
              <img src={medLogo} alt="logo" />
            </div> */}
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

      {allProccessQueueIsLoading && <Loader />}

      {allProccessQueueIsError && <ErrorDialog isErrorProps={!false} />}
    </>
  );
};

export default MonitorsDetail;
