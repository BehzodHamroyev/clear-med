import React from 'react';
import { useFullScreenHandle } from 'react-full-screen';

import { QueuesList } from '@/entities/QueuesChilds';

import cls from './QueuesPageFullScreen.module.scss';

const QueuesPageFullScreen = () => {
  const handle = useFullScreenHandle();

  return (
    <div className={cls.QueuesPageWrapper}>
      <div className={cls.QueuesPageFlex}>
        {/* <img src={Spetalete} alt="#" className={cls.QueuesPageImg} /> */}
        <div className={cls.RightCardRendering}>
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

      {/* <div className={cls.BottomCardRendering}>
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
        <div className={cls.BorderCardOchered}>
          <QueuesList />
        </div>
      </div> */}

      {/* <div className={cls.BottomCardRendering}>
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
        <div className={cls.BorderCardOchered}>
          <QueuesList />
        </div>
      </div> */}
    </div>
  );
};

export default QueuesPageFullScreen;
