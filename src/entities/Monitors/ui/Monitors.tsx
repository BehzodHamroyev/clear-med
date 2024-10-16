import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import cls from './monitors.module.scss';

import { MonitorsProp } from '../model/types/monitorTypes';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import { DeleteTools, PenTools } from '@/shared/assets/entities/TableTitle';

const Monitors = (props: MonitorsProp) => {
  const { number, name, id } = props;

  const { t } = useTranslation();

  const navigate = useNavigate();

  const {
    setMonitorGetId,
    setMonitorNumber,
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
    if (number) {
      setMonitorNumber(number);
    }
    navigate(`/add_monitor/${id}`);
  };

  return (
    <div onClick={(e) => handleNavigate(e)}>
      <div className={cls.MonitorsWrapper}>
        <div>
          <p>
            {number}-{t('Monitor')}
          </p>
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
