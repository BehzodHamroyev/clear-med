import React, { useContext } from 'react';

import { QueuingTvCardProps } from '../model/types/QueuingTvCardProps';

import cls from './QueuingTvCard.module.scss';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';

const QueuingTvCard = (props: QueuingTvCardProps) => {
  const { id, CardLeftTitle, CardLeftRoomNumber, CardLeftDoctorName, icon } =
    props;

  const { setIsOpenQueuingCardClicked, setIsQueuingCardClickedGetId } =
    useContext(ButtonsContext);

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        setIsOpenQueuingCardClicked(true);
        setIsQueuingCardClickedGetId(id);
      }}
      className={cls.QueuingTvCardWrapper}
    >
      <div className={cls.CardLeft}>
        <h3 className={cls.CardLeftTitle}>{CardLeftTitle}</h3>
        <p className={cls.CardLeftRoomNumber}>{CardLeftRoomNumber}</p>
        <p className={cls.CardLeftDoctorName}>{CardLeftDoctorName}</p>
      </div>
      <div className={cls.CardRight}>{icon}</div>
    </div>
  );
};

export default QueuingTvCard;
