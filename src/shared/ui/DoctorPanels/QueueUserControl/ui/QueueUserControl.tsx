/* eslint-disable no-alert */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import cls from './QueueUserControl.module.scss';
import { CheckedIcon, ErrorIcon, Refresh } from '@/shared/assets/Pages/Doctor';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
// eslint-disable-next-line ulbi-tv-plugin/public-api-imports
import { fetchQueuesProccess } from '@/entities/ControlPanelDocktor/model/services/fetchQueuesProccess';
// eslint-disable-next-line ulbi-tv-plugin/public-api-imports
import { getControlPanelDocktorData } from '@/entities/ControlPanelDocktor/model/selectors/controlPanelDocktorSelector';
// eslint-disable-next-line ulbi-tv-plugin/public-api-imports
import { fetchDoneQueuesControlDoctor } from '@/pages/QueuesControlDoctor/model/services/fetchDoneQueuesControlDoctor';

interface QueueUserControlProps {
  proccessedStep: number;
}

const QueueUserControl = ({ proccessedStep }: QueueUserControlProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const proccessedList = useSelector(getControlPanelDocktorData);
  const [proccessCansel, setProccessCansel] = useState(false);
  const [proccessConfirm, setProccessConfirm] = useState(false);

  const handleClickProccessRecall = () => {
    if (proccessedStep < 3) {
      dispatch(
        fetchQueuesProccess({
          method: 'post',
          status: 'proccessed',
          path: '',
        }),
      );
    }
  };

  const handleClickProccessCansel = () => {
    if (proccessedStep === 3) {
      dispatch(
        fetchQueuesProccess({
          method: 'post',
          status: 'rejected',
          path: '',
        }),
      );

      setProccessCansel(true);
    }
  };

  useEffect(() => {
    if (proccessCansel) {
      dispatch(
        fetchDoneQueuesControlDoctor({
          limit: 100,
        }),
      );
      setProccessCansel(false);
    }
    if (proccessConfirm) {
      dispatch(
        fetchDoneQueuesControlDoctor({
          limit: 100,
        }),
      );
      setProccessConfirm(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [proccessedList]);

  const handleClickProccessConfirm = () => {
    if (proccessedStep) {
      dispatch(
        fetchQueuesProccess({
          method: 'post',
          status: 'completed',
          path: '',
        }),
      );

      setProccessConfirm(true);
    }
  };

  return (
    <div className={cls.QueueUserControlWrapper}>
      <div className={cls.Buttons}>
        <p className={cls.ButtonsTitle}>{t('Qayta chaqirish')}</p>
        <button
          type="button"
          onClick={handleClickProccessRecall}
          className={`${cls.BtnClient} ${
            proccessedStep === 3 ? cls.colorRed : ''
          } ${(proccessedStep === 3 || !proccessedStep) && cls.BtnClientIcon2}`}
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
