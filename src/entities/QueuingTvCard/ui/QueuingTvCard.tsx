import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import cls from './QueuingTvCard.module.scss';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import { QueuingTvCardProps } from '../model/types/QueuingTvCardProps';
import CountdownTimer from '@/shared/ui/CountdownTimer/CountdownTimer';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
// eslint-disable-next-line ulbi-tv-plugin/public-api-imports
import { fetchLastQueue } from '@/pages/QueuingTV/model/services/fetchLastQueue';

const QueuingTvCard = ({
  icon,
  DoctorId,
  CardLeftTitle,
  CardLeftRoomNumber,
  CardLeftDoctorName,
}: QueuingTvCardProps) => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const { setIsOpenQueuingTvCardPopapSecond, setClickedDoctorId } =
    useContext(ButtonsContext);

  const hendleClickQuingTvCard = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    if (DoctorId) setClickedDoctorId(DoctorId);

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
          {CardLeftRoomNumber}-{t('Xona raqami')}
        </p>

        <p className={cls.CardLeftDoctorName}>{CardLeftDoctorName}</p>

        <div className={cls.CardLeftDoctorName}>
          {t('The_doctor_changes')} : <CountdownTimer />
        </div>
      </div>

      <div className={cls.QueuingTvCardWrapper__cardRightParent}>
        <p className={cls.CardLeftDoctorName}>{t('current_queues')}: 12</p>

        <div className={cls.CardRight}>
          {icon && icon?.length > 0 && (
            <img src={`http://socketmed.magicsoft.uz/${icon}`} alt="icon" />
          )}
        </div>
      </div>
    </div>
  );
};

export default QueuingTvCard;
