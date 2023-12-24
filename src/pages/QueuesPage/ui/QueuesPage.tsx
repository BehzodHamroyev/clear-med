import React from 'react';
import Marquee from 'react-fast-marquee';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';

import { useTranslation } from 'react-i18next';
import { QueuesList } from '@/entities/QueuesChilds';

import cls from './QueuesPage.module.scss';
import { Spetalete } from '@/shared/assets/Pages/Queues';
import { QueuesPageFullScreen } from '@/pages/QueuesPageFullScreen';

const QueuesPage = () => {
  const handle = useFullScreenHandle();

  const { t } = useTranslation();

  const handleClicked = () => {
    handle.enter();
  };

  return (
    <div>
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
          <div className={cls.QueuesPageWrapper}>
            <div className={cls.QueuesPageFlex}>
              <img src={Spetalete} alt="#" className={cls.QueuesPageImg} />

              <div className={cls.RightCardRendering}>
                <div className={cls.BorderCardOchered}>
                  <QueuesList />
                </div>
                <div className={cls.BorderCardOchered}>
                  <QueuesList />
                </div>
                <div className={cls.BorderCardOchered}>
                  <QueuesList />
                </div>
                <div className={cls.BorderCardOchered}>
                  <QueuesList />
                </div>
              </div>
            </div>

            <div className={cls.RightCardRendering2}>
              <div className={cls.BorderCardOchered}>
                <QueuesList />
              </div>
              <div className={cls.BorderCardOchered}>
                <QueuesList />
              </div>
              <div className={cls.BorderCardOchered}>
                <QueuesList />
              </div>
              <div className={cls.BorderCardOchered}>
                <QueuesList />
              </div>
              <div
                className={`${cls.BorderCardOchered} ${cls.responsiveVisable}`}
              >
                <QueuesList />
              </div>
              <div
                className={`${cls.BorderCardOchered} ${cls.responsiveVisable}`}
              >
                <QueuesList />
              </div>
              <div
                className={`${cls.BorderCardOchered} ${cls.responsiveVisable}`}
              >
                <QueuesList />
              </div>
              <div
                className={`${cls.BorderCardOchered} ${cls.responsiveVisable}`}
              >
                <QueuesList />
              </div>
            </div>

            <Marquee className={cls.Marquee}>
              I can be a React component, multiple React components, or just
              some text.
            </Marquee>
          </div>
        )}
      </FullScreen>
    </div>
  );
};

export default QueuesPage;
