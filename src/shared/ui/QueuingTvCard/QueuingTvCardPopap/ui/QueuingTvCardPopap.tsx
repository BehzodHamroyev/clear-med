import React, { useContext } from 'react';
import cls from './QueuingTvCardPopap.module.scss';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';

const QueuingTvCardPopap = (prop: any) => {
  const { getObjectFind } = prop;
  const {
    setIsOpenQueuingCardClicked,
    isOpenQueuingTvCardPopapSecond,
    setIsOpenQueuingTvCardPopapSecond,
  } = useContext(ButtonsContext);

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        setIsOpenQueuingCardClicked(false);
      }}
      className={cls.QueuingTvCardPopapWrapper}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
          setIsOpenQueuingTvCardPopapSecond(true);
        }}
        className={cls.QueuingTvCard}
      >
        <div className={cls.CardLeft}>
          <h3 className={cls.CardLeftTitle}>{getObjectFind.CardLeftTitle}</h3>
          <p className={cls.CardLeftRoomNumber}>
            {getObjectFind.CardLeftRoomNumber}
          </p>
          <p className={cls.CardLeftDoctorName}>
            {getObjectFind.CardLeftDoctorName}
          </p>
        </div>
        <div className={cls.CardRight}>{getObjectFind.icon}</div>
      </div>
    </div>
  );
};

export default QueuingTvCardPopap;
