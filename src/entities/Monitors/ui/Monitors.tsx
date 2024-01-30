import React from 'react';
import { Link } from 'react-router-dom';

import { PenTools } from '@/shared/assets/entities/TableTitle';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';

import cls from './monitors.module.scss';

interface MonitorsProp {
  number: number;
}

const Monitors = (props: MonitorsProp) => {
  /* props */
  const { number } = props;

  /* useContext */
  const { setIsOpenMonitorEditCard } = React.useContext(ButtonsContext);

  const handleClickPen = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    setIsOpenMonitorEditCard(true);
  };

  return (
    <Link onClick={(e) => e.stopPropagation()} to={`/add_monitor/${number}`}>
      <div className={cls.MonitorsWrapper}>
        <p>{number}-Monitor</p>

        <button
          type="button"
          onClick={(e) => handleClickPen(e)}
          className={cls.IconWrap}
        >
          {' '}
          <PenTools className={cls.icon} />
        </button>
      </div>
    </Link>
  );
};

export default Monitors;
