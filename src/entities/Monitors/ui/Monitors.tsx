import React from 'react';
import { useNavigate } from 'react-router-dom';

import { PenTools } from '@/shared/assets/entities/TableTitle';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';

import cls from './monitors.module.scss';

interface MonitorsProp {
  number: number;
  name: string;
  id: string;
}

const Monitors = (props: MonitorsProp) => {
  /* props */
  const { number, name, id } = props;

  const navigate = useNavigate();

  /* useContext */
  const {
    setDepartmentGetId,
    setIsOpenMonitorEditCard,
    setMonitorEditFormOldValue,
  } = React.useContext(ButtonsContext);

  const handleClickPen = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    setDepartmentGetId(id);
    setIsOpenMonitorEditCard(true);
    setMonitorEditFormOldValue(name);
  };

  const handleNavigate = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    navigate(`/add_monitor/${number}`);
  };

  return (
    <div onClick={(e) => handleNavigate(e)}>
      <div className={cls.MonitorsWrapper}>
        <div>
          <h3>{number}-Monitor</h3>
          <p>{name}</p>
        </div>

        <button
          type="button"
          onClick={(e) => handleClickPen(e)}
          className={cls.IconWrap}
        >
          {' '}
          <PenTools className={cls.icon} />
        </button>
      </div>
    </div>
  );
};

export default Monitors;
