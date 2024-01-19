import React, { useContext } from 'react';

import { useTranslation } from 'react-i18next';

import { QueuingTvCardProps } from '../model/types/QueuingTvCardProps';

import cls from './QueuingTvCard.module.scss';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
// eslint-disable-next-line ulbi-tv-plugin/public-api-imports
import { fetchLastQueue } from '@/pages/QueuingTV/model/services/fetchLastQueue';

const QueuingTvCard = ({
  Icon,
  DoctorId,
  CardLeftTitle,
  CardLeftRoomNumber,
  CardLeftDoctorName,
}: QueuingTvCardProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const { setIsOpenQueuingTvCardPopapSecond } = useContext(ButtonsContext);

  const hendleClickQuingTvCard = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    e.stopPropagation();

    if (DoctorId) {
      dispatch(
        fetchLastQueue({
          doctorId: DoctorId,
        }),
      );
    }
    setIsOpenQueuingTvCardPopapSecond(true);
  };

  return (
    <div
      onClick={(e) => hendleClickQuingTvCard(e)}
      className={cls.QueuingTvCardWrapper}
    >
      <div className={cls.CardLeft}>
        <h3 className={cls.CardLeftTitle}>{CardLeftTitle}</h3>
        <p className={cls.CardLeftRoomNumber}>
          {t('Xona raqami')}: {CardLeftRoomNumber}
        </p>
        <p className={cls.CardLeftDoctorName}>
          {t('Shifokor')}: {CardLeftDoctorName}
        </p>
      </div>
      <div className={cls.CardRight}>{/* <Icon /> */}</div>
    </div>
  );
};

export default QueuingTvCard;
