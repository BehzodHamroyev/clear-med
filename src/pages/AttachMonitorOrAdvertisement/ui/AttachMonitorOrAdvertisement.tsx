import React, { useContext, useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';

import cls from './attachMonitorOrAdvertisement.module.scss';

import { Loader } from '@/widgets/Loader';
import Toast from '@/shared/ui/Toast/Toast';
import { ErrorReload } from '@/widgets/Error';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import {
  getError,
  getIsLoading,
  fetchGetAllMonitors,
  GetAllMonitorPageData,
} from '@/pages/AddMonitorPage';

import {
  DoorSvg,
  CanselSvg,
  SpeakerSvg,
} from '@/shared/assets/Pages/AttachMonitorOrAdvertisement';

const AttachMonitorOrAdvertisement = () => {
  const { id } = useParams();

  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const [advertisement, setAdvertisement] = useState<boolean | null>(null);

  const { monitorNumber, hasOpenToast, setHasOpenToast } =
    useContext(ButtonsContext);

  const getAllMonitorError = useSelector(getError);

  const getAllMonitorIsLoading = useSelector(getIsLoading);

  const getAllMonitorData = useSelector(GetAllMonitorPageData);

  const handleOpenToast = () => {
    setHasOpenToast(true);
  };

  useEffect(() => {
    dispatch(fetchGetAllMonitors({}));
  }, [dispatch]);

  useEffect(() => {
    if (id && getAllMonitorData) {
      getAllMonitorData.filter((monitorData) => {
        if (monitorData.id === id) {
          setAdvertisement(monitorData.monitors[0]?.addvertising);
        }
        return null;
      });
    }
  }, [getAllMonitorData, id]);

  return (
    <>
      {getAllMonitorData && id && (
        <div className={cls.AttachMonitorOrAdvertisementWrapper}>
          {/* Title */}
          <div className={cls.AttachMonitorOrAdvertisementWrapper__Title}>
            <Link
              className={cls['AttachMonitorOrAdvertisementWrapper__Title--btn']}
              to="/add_monitor"
            >
              <CanselSvg />
              {t('Ortga')}
            </Link>

            <p
              className={
                cls['AttachMonitorOrAdvertisementWrapper__Title--content']
              }
            >
              {monitorNumber ? `${monitorNumber} - ${t('Monitor')}` : ''}
            </p>
            <p />
          </div>

          {/* Body */}
          <div className={cls.AttachMonitorOrAdvertisementWrapper__Body}>
            <Link
              to={`/add_monitor/${id}/add_room_for_monitor`}
              className={cls['AttachMonitorOrAdvertisementWrapper__Body--box']}
            >
              <div
                className={
                  cls['AttachMonitorOrAdvertisementWrapper__Body--boxChild']
                }
              >
                <p
                  className={
                    cls[
                      'AttachMonitorOrAdvertisementWrapper__Body--boxChildText'
                    ]
                  }
                >
                  {t('Xona biriktirish')}
                </p>
                <DoorSvg
                  className={
                    cls['AttachMonitorOrAdvertisementWrapper__Body--SvgCard']
                  }
                />
              </div>
            </Link>

            <Link
              to={
                advertisement
                  ? `/add_monitor/${id}/advertisement_attachment_monitor`
                  : ''
              }
              className={`${
                cls['AttachMonitorOrAdvertisementWrapper__Body--box']
              } ${
                !advertisement
                  ? cls['AttachMonitorOrAdvertisementWrapper__Body--disable']
                  : ''
              }`}
              onClick={handleOpenToast}
            >
              <div
                className={
                  cls['AttachMonitorOrAdvertisementWrapper__Body--boxChild']
                }
              >
                <p
                  className={
                    cls[
                      'AttachMonitorOrAdvertisementWrapper__Body--boxChildText'
                    ]
                  }
                >
                  {t('Reklama biriktirish')}
                </p>
                <SpeakerSvg
                  className={
                    cls['AttachMonitorOrAdvertisementWrapper__Body--SvgCard']
                  }
                />
              </div>
            </Link>
          </div>
        </div>
      )}

      {getAllMonitorIsLoading && <Loader />}

      {getAllMonitorError && <ErrorReload message={getAllMonitorError} />}

      {!advertisement && hasOpenToast && (
        <Toast
          message={t("Ushbu Monitorga reklama biriktirish o'chirilgan!")}
          severity="warning"
        />
      )}
    </>
  );
};

export default AttachMonitorOrAdvertisement;
