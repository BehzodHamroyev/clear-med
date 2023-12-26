import React from 'react';
import { useFullScreenHandle } from 'react-full-screen';

import { QueuesList } from '@/entities/QueuesChilds';

import cls from './QueuesPageFullScreen.module.scss';
import { Spetalete } from '@/shared/assets/Pages/Queues';

const QueuesPageFullScreen = () => {
  const handle = useFullScreenHandle();

  return (
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
          <div className={cls.BorderCardOchered}>
            <QueuesList />
          </div>
        </div>
      </div>

      <div className={cls.BottomCardRendering}>
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
      </div>
      <div className={cls.BottomCardRendering}>
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
      </div>
    </div>
  );
};

export default QueuesPageFullScreen;
