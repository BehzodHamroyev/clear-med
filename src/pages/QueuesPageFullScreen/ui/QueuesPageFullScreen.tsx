import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { useFullScreenHandle } from 'react-full-screen';
import { useTranslation } from 'react-i18next';

import cls from './QueuesPageFullScreen.module.scss';
// import { QueuesList2 } from '@/entities/QueuesChilds2';
import { classNames } from '@/shared/lib/classNames/classNames';

import medLogo from '../../../../public/assets/medLogo.png';
// eslint-disable-next-line ulbi-tv-plugin/public-api-imports
import QueueDialog from '@/pages/QueuesPage/ui/queueDialog/QueueDialog';
// eslint-disable-next-line ulbi-tv-plugin/public-api-imports
import { getAllQueueProccessData } from '@/pages/QueuesPage/model/selector/allQueueProccessSelector';

const QueuesPageFullScreen = () => {
  const handle = useFullScreenHandle();

  const [hasRolik, setHasRolik] = useState(true);
  const [hasQueueDialog, setHasQueueDialog] = useState(true);

  const { t } = useTranslation();

  useEffect(() => {
    if (hasQueueDialog) {
      const timer = setTimeout(() => {
        setHasQueueDialog(false);
      }, 3000);

      clearTimeout(timer);
    }
  }, [hasQueueDialog]);

  const allProccessQueue = useSelector(getAllQueueProccessData);

  return (
    <>
      <div className={cls.QueuesPage}>
        <div className={classNames(cls.QueuesPage__header, {}, [])}>
          <div className={classNames(cls.QueuesPage__headerLeft)}>
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

              {/* <div className={classNames(cls.queuesTable__items)}>
                {allProccessQueue?.monitor?.rooms &&
                  allProccessQueue?.monitor?.rooms?.length > 0 &&
                  allProccessQueue?.monitor?.rooms.map(
                    (item) =>
                      item.proceed &&
                      item.proceed.length > 0 && (
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
                            <p>{item.name}</p>
                          </div>
                          <div
                            className={classNames(
                              cls.queuesTable__itemBiletNumber,
                            )}
                          >
                            <p>{item.proceed[0]?.queues_name}</p>
                          </div>
                        </div>
                      ),
                  )}
              </div> */}
            </div>
          </div>

          {hasRolik ? (
            <div className={classNames(cls.QueuesPage__queuesContainerRigth)}>
              <div className={classNames(cls.rolik)}>
                <p>Reklama</p>
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

      {hasQueueDialog && (
        <QueueDialog roomNumber="20" biletNumber="AA-007" step={1} />
      )}
    </>
  );
};

export default QueuesPageFullScreen;
