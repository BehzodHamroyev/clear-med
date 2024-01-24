import React from 'react';
import { useFullScreenHandle } from 'react-full-screen';

import cls from './QueuesPageFullScreen.module.scss';
import { QueuesList2 } from '@/entities/QueuesChilds2';

const QueuesPageFullScreen = () => {
  const handle = useFullScreenHandle();

  return (
    <div className={cls.QueuesPageWrapper}>
      <div className={cls.QueuesPageFlex}>
        {/* <img src={Spetalete} alt="#" className={cls.QueuesPageImg} /> */}
        <div className={cls.RightCardRendering}>
          <QueuesList2 />
          <QueuesList2 />
          <QueuesList2 />
          <QueuesList2 />
          <QueuesList2 />
          <QueuesList2 />
          <QueuesList2 />
          <QueuesList2 />
          <QueuesList2 />
          <QueuesList2 />
          <QueuesList2 />
          <QueuesList2 />
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
