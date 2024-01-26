/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
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

const QueuesPage = () => {
  const dispatch = useAppDispatch();

  const allProccessQueue = useSelector(getAllQueueProccessData);
  const allProccessQueueIsLoading = useSelector(getAllQueueProccessIsLoading);
  const allProccessQueueIsError = useSelector(getAllQueueProccessError);

  const [getFullWidth, setFullWidth] = React.useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    dispatch(fetchAllQueueProccess({}));
  }, []);

  // console.log(allProccessQueue);

  const handle = useFullScreenHandle();

  const { t } = useTranslation();

  const handleClicked = () => {
    handle.enter();
  };

  React.useEffect(() => {
    const handleResize = () => {
      setFullWidth({
        ...getFullWidth,
        width: Math.floor(0.75 * window.innerWidth - 250),
        height: Math.floor(window.innerHeight),
      });
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const styleImg = {
    width: `${getFullWidth.width}px`,
  };

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
                  <p>{t('Ishonch raqami:')}+998 71 225 25 25</p>
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

              <div className={classNames(cls.QueuesPage__queuesContainerRigth)}>
                <div className={classNames(cls.rolik)}>
                  <p>Reklama</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </FullScreen>
    </>
  );
};

export default QueuesPage;
