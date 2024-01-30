import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import ReactAudioPlayer from 'react-audio-player';

import cls from './QueueDialog.module.scss';

import { classNames } from '@/shared/lib/classNames/classNames';

interface QueueDialogProps {
  className?: string;
  roomNumber: string;
  biletNumber: string;
  step: number;
}

const QueueDialog = ({
  className,
  roomNumber,
  biletNumber,
  step,
}: QueueDialogProps) => {
  const { t } = useTranslation();

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div>
      <div className={classNames(cls.QueueDialog, {}, [className])}>
        <div
          className={classNames(
            cls.QueueDialogContainer,
            {
              [cls.backColorStep1]: step === 1,
              [cls.backColorStep2]: step === 2,
              [cls.backColorStep3]: step === 3,
            },
            [],
          )}
        >
          <div className={classNames(cls.QueueDialogContainer__head, {}, [])}>
            <div className={classNames(cls.QueueDialogContainer__headLeft)}>
              <p>{t('Xona raqami')}</p>
            </div>
            <div className={classNames(cls.QueueDialogContainer__headRight)}>
              <p>{t('Bilet raqami')}</p>
            </div>
          </div>

          <div className={classNames(cls.QueueDialogBox)}>
            <div className={classNames(cls.QueueDialogBox__roomNumber)}>
              <p>{roomNumber}</p>
            </div>
            <div className={classNames(cls.QueueDialogBox__lineRow)}>
              <div
                className={classNames(cls.QueueDialogBox__lineRowClipPath)}
              />
            </div>
            <div className={classNames(cls.QueueDialogBox__biletNumber)}>
              <p>{biletNumber}</p>
            </div>
          </div>
        </div>
      </div>
      <ReactAudioPlayer
        src="/assets/callRingtone.mp3"
        autoPlay
        controls
        style={{ opacity: '0' }}
      />
    </div>
  );
};

export default QueueDialog;
