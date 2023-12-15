import React from 'react';
import Marquee from 'react-fast-marquee';

import cls from './QueuesPage.module.scss';
import { Spetalete } from '@/shared/assets/Pages/Queues';
import { QueuesList } from '@/entities/QueuesChilds';

const QueuesPage = () => {
  return (
    <div className={cls.QueuesPageWrapper}>
      <div className={cls.QueuesPageFlex}>
        <img src={Spetalete} alt="#" className={cls.QueuesPageImg} />
        <div className={cls.QueuesPageFlexColumn}>
          <QueuesList />
          <QueuesList />
          <QueuesList />
          <QueuesList />
        </div>
      </div>
      <div className={cls.lastChildList}>
        <QueuesList />
        <QueuesList />
        <QueuesList />
        <QueuesList />
        <QueuesList />
        <QueuesList />
        <QueuesList />
        <QueuesList />
      </div>
      <Marquee className={cls.Marquee}>
        I can be a React component, multiple React components, or just some
        text.
      </Marquee>
    </div>
  );
};

export default QueuesPage;
