/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';

import { QueuesList } from '@/entities/QueuesChilds';
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
    // height: `${getFullWidth.height}px`,
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
              {/* <img
                style={styleImg}
                src={Spetalete}
                alt="#"
                className={cls.QueuesPageImg}
              /> */}

              <QueuesList />
              <QueuesList />
              <QueuesList />
              <QueuesList />
              <QueuesList />
              <QueuesList />
              <QueuesList />
              <QueuesList />
              <QueuesList />

              <QueuesList />

              <QueuesList />

              <QueuesList />
            </div>
          </div>
        )}
      </FullScreen>
    </>
  );
};

export default QueuesPage;
