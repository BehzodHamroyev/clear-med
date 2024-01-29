import React from 'react';

import { Link } from 'react-router-dom';
import cls from './monitors.module.scss';
import { PenTools } from '@/shared/assets/entities/TableTitle';

interface MonitorsProp {
  number: number;
}

const Monitors = (props: MonitorsProp) => {
  const { number } = props;
  return (
    <Link
      to={`/add_monitor/${number}`}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className={cls.MonitorsWrapper}>
        <p>{number}-Monitor</p>
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className={cls.IconWrap}
        >
          <PenTools
            onClick={(e) => {
              e.stopPropagation();
            }}
            className={cls.icon}
          />
        </div>
      </div>
    </Link>
  );
};

export default Monitors;
