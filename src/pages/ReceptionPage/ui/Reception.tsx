import React from 'react';
import { useSelector } from 'react-redux';

import cls from './Reception.module.scss';
import { Loader } from '@/widgets/Loader';
import { QueuingTvCard } from '@/entities/QueuingTvCard';
import ErrorDialog from '@/shared/ui/ErrorDialog/ErrorDialog';
import { getCurrentQueueError } from '../model/selectors/currentQueueSelector';

import {
  getDeparmentListData,
  getDeparmentListError,
  getDeparmentListIsLoading,
} from '../model/selectors/departmentListSelector';

import {
  getLastQueueError,
  getLastQueueIsLoading,
} from '../model/selectors/lastQueueSelector';
import { useTranslation } from 'react-i18next';

const Reception = () => {
  const language = localStorage.getItem('i18nextLng');

  const deparmentList = useSelector(getDeparmentListData);
  const deparmentListError = useSelector(getDeparmentListError);
  const deparmentListIsLoading = useSelector(getDeparmentListIsLoading);

  const currentQueueError = useSelector(getCurrentQueueError);

  const lastQueueError = useSelector(getLastQueueError);
  const lastQueueIsLoading = useSelector(getLastQueueIsLoading);
  const { t } = useTranslation()

  return (
    <>
      <div className={cls.renderSectionCard}>
        {deparmentList &&
          deparmentList.map((item: any) => {
            return (
              <QueuingTvCard
                key={item?.id}
                room_id={item?._id}
                actives={item?.actives}
                CardLeftRoomNumber={item?.name}
                proceedCount={item?.proceedCount}
                DoctorId={item?.doctor_id?.[0]?.id}
                department_id={item?.department_id?._id}
                CardLeftDoctorName={item?.doctor_id?.[0]?.name}
                CardLeftTitle={
                  language === 'kr' ? item?.department_id?.name :
                    language === 'ru' ? item?.department_id?.nameRu :
                      language === 'en' ? item?.department_id?.nameEn : ""
                }
                bottomText={item?.department_id.letter === "P" ? t('department_room_1') : item?.department_id.letter === "Y" ? t('department_room_1') : ""}
              />

            );
          })}
      </div>

      {(deparmentListIsLoading || lastQueueIsLoading) && <Loader />}

      {(deparmentListError || currentQueueError || lastQueueError) && (
        <ErrorDialog isErrorProps={!false} />
      )}
    </>
  );
};

export default Reception;
