import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';

import { useSelector } from 'react-redux';
import cls from './QueueUserNext.module.scss';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
// eslint-disable-next-line max-len, ulbi-tv-plugin/public-api-imports
import { ProccesApiResponseControlPanelDoctorTypes } from '@/entities/ControlPanelDocktor/model/types/controlPanelDocktorTypes';
// eslint-disable-next-line max-len, ulbi-tv-plugin/public-api-imports
import { fetchQueuesProccess } from '@/entities/ControlPanelDocktor/model/services/fetchQueuesProccess';
// eslint-disable-next-line max-len, ulbi-tv-plugin/public-api-imports
import { getControlPanelDocktorData } from '@/entities/ControlPanelDocktor/model/selectors/controlPanelDocktorSelector';

const QueueUserNext = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const proccessedList = useSelector(getControlPanelDocktorData);

  const handleClicknextQueue = async () => {
    const getTokenCookie = Cookies.get('token');

    try {
      const response = axios.post<ProccesApiResponseControlPanelDoctorTypes>(
        `https://magicsoft.uz/med/api/v1/doctor/proccessed`,

        {},
        {
          headers: {
            authorization: `Bearer ${getTokenCookie}`,
          },
        },
      );

      if ((await response).data) {
        dispatch(
          fetchQueuesProccess({
            status: 'proccessed',
          }),
        );
      }

      if (!(await response).data) {
        throw new Error();
      }

      return (await response).data;
    } catch (e) {
      return console.error('error');
    }
  };

  return (
    <div className={cls.QueueUserNextWrapper}>
      {!proccessedList?.queues[0] && (
        <button
          className={cls.QueueUserNextBtn}
          type="button"
          onClick={handleClicknextQueue}
        >
          {t('Keyingisi')}
        </button>
      )}
    </div>
  );
};

export default QueueUserNext;
