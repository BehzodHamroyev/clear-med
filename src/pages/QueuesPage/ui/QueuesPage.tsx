/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';

import { QueuesList } from '@/entities/QueuesChilds';
import { Spetalete } from '@/shared/assets/Pages/Queues';
import { QueuesPageFullScreen } from '@/pages/QueuesPageFullScreen';

import cls from './QueuesPage.module.scss';

const QueuesPage = () => {
  /* useState */
  const [getFullWidth, setFullWidth] = React.useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  /* useFullScreenHandle */
  const handle = useFullScreenHandle();

  /* useTranslation */
  const { t } = useTranslation();

  /* handle functions */
  const handleClicked = () => {
    handle.enter();
  };

  React.useEffect(() => {
    const handleResize = () => {
      setFullWidth({
        ...getFullWidth,
        width: Math.floor(0.7 * window.innerWidth),
        height: Math.floor(0.7 * window.innerHeight),
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
    // height: `${getFullWidth.width}px`,
  };

  /* UI */
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
          <div className={cls.QueuesPageWrapper}>
            <div className={cls.QueuesPageFlex}>
              <img
                style={styleImg}
                src={Spetalete}
                alt="#"
                className={cls.QueuesPageImg}
              />

              <div className={cls.RightCardRendering}>
                <QueuesList />

                <QueuesList />

                <QueuesList />

                <QueuesList />
              </div>
            </div>

            <div className={cls.RightCardRendering2}>
              {/* <div className={cls.BorderCardOchered}>
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
              </div> */}

              {/* <div
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
              </div> */}
            </div>

            {/* <Marquee className={cls.Marquee}> */}
            {/* {t('Text for medic , Text medic uchun va h.k')} */}
            {/* </Marquee> */}
          </div>
        )}
      </FullScreen>
    </>
  );
};

export default QueuesPage;
