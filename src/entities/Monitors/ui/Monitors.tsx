import React from 'react';
import { useNavigate } from 'react-router-dom';

import { DeleteTools, PenTools } from '@/shared/assets/entities/TableTitle';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';

import cls from './monitors.module.scss';

interface MonitorsProp {
  number: number;
  name: string;
  id: string;
}

const Monitors = (props: MonitorsProp) => {
  const { number, name, id } = props;

  const navigate = useNavigate();

  const {
    setMonitorGetId,
    setDepartmentGetId,
    setIsOpenMonitorEditCard,
    setMonitorEditFormOldValue,
    setIsOpenMonitorDeleteCard,
  } = React.useContext(ButtonsContext);

  const handleClickPen = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    setMonitorGetId(id);
    setIsOpenMonitorEditCard(true);
    setMonitorEditFormOldValue(name);
  };

  const handleClickDel = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    setMonitorGetId(id);
    setIsOpenMonitorDeleteCard(true);
  };

  const handleNavigate = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    setMonitorGetId(id);
    setDepartmentGetId(id);
    // navigate(`/add_monitor/${number}`);
    navigate(`/add_monitor/${id}`);
  };

  return (
    <div onClick={(e) => handleNavigate(e)}>
      <div className={cls.MonitorsWrapper}>
        <div>
          <h3>{number}-Monitor</h3>
          <p>{name}</p>
        </div>

        <div className={cls.flexBtn}>
          <button
            type="button"
            className={cls.IconWrap}
            onClick={(e) => handleClickPen(e)}
          >
            {' '}
            <PenTools className={cls.icon} />
          </button>

          <button
            type="button"
            className={cls.IconWrap2}
            onClick={(e) => handleClickDel(e)}
          >
            {' '}
            <DeleteTools className={cls.icon} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Monitors;
