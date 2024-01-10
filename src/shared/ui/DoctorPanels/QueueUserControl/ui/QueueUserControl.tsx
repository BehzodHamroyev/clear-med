/* eslint-disable no-alert */
import React from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';

import cls from './QueueUserControl.module.scss';
import { CheckedIcon, ErrorIcon, Refresh } from '@/shared/assets/Pages/Doctor';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
// eslint-disable-next-line ulbi-tv-plugin/public-api-imports
import { fetchQueuesProccess } from '@/entities/ControlPanelDocktor/model/services/fetchQueuesProccess';
import { ProccesApiResponseControlPanelDoctorTypes } from '@/entities/ControlPanelDocktor';
// eslint-disable-next-line ulbi-tv-plugin/public-api-imports
import { getControlPanelDocktorData } from '@/entities/ControlPanelDocktor/model/selectors/controlPanelDocktorSelector';

interface QueueUserControlProps {
  proccessedStep: number;
}

const QueueUserControl = ({ proccessedStep }: QueueUserControlProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const proccessedList = useSelector(getControlPanelDocktorData);

  // eslint-disable-next-line consistent-return
  const handleClickProccessRecall = async () => {
    if (proccessedStep < 3) {
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
    }
  };

  // eslint-disable-next-line consistent-return
  const handleClickProccessCansel = async () => {
    if (proccessedStep === 3) {
      const getTokenCookie = Cookies.get('token');

      try {
        const response = axios.post<ProccesApiResponseControlPanelDoctorTypes>(
          `https://magicsoft.uz/med/api/v1/doctor/rejected`,

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
    }
  };

  // eslint-disable-next-line consistent-return
  const handleClickProccessConfirm = async () => {
    if (proccessedStep) {
      const getTokenCookie = Cookies.get('token');

      try {
        const response = axios.post<ProccesApiResponseControlPanelDoctorTypes>(
          `https://magicsoft.uz/med/api/v1/doctor/completed`,

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
    }
  };

  return (
    <div className={cls.QueueUserControlWrapper}>
      <div className={cls.Buttons}>
        <p className={cls.ButtonsTitle}>{t('Qayta chaqirish')}</p>
        <button
          onClick={handleClickProccessRecall}
          className={`${cls.BtnClient} ${
            proccessedStep === 3 ? cls.colorRed : ''
          } ${(proccessedStep === 3 || !proccessedStep) && cls.BtnClientIcon2}`}
          type="button"
          style={{
            cursor:
              proccessedStep === 3 || !proccessedStep ? 'no-drop' : 'pointer',
          }}
        >
          <img className={cls.BtnClientIcon} src={Refresh} alt="#" />
          {proccessedStep}
        </button>
      </div>

      <div className={cls.Buttons}>
        <p className={cls.ButtonsTitle}>{t('Bekor qilish')}</p>
        <button
          onClick={handleClickProccessCansel}
          className={cls.BtnClient}
          type="button"
          disabled={proccessedStep < 3}
          style={{
            cursor:
              proccessedStep < 3 || !proccessedStep ? 'no-drop' : 'pointer',
          }}
        >
          <img
            className={`${
              (proccessedStep < 3 || !proccessedStep) && cls.BtnClientIcon2
            } ${proccessedStep === 3 && cls.BtnClientIconActive}`}
            src={ErrorIcon}
            alt="#"
          />
        </button>
      </div>

      <div className={cls.Buttons}>
        <p className={cls.ButtonsTitle}>{t('Tasdiqlash')}</p>
        <button
          onClick={handleClickProccessConfirm}
          className={cls.BtnClient}
          type="button"
          style={{
            cursor: !proccessedStep ? 'no-drop' : 'pointer',
            opacity: !proccessedStep ? '0.5' : '1',
          }}
        >
          <img
            className={`${cls.BtnClientIconActive}`}
            src={CheckedIcon}
            alt="#"
          />
        </button>
      </div>
    </div>
  );
};

export default QueueUserControl;
