import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import ReactAudioPlayer from 'react-audio-player';

import cls from './QueueDialog.module.scss';

import { classNames } from '@/shared/lib/classNames/classNames';
import { baseUrlUpload } from '../../../../../baseurl';

interface QueueDialogProps {
  className?: string;
  roomNumber: string;
  biletNumber: string;
  step: number;
  Mp3Array: string[];
}

const QueueDialog = ({
  className,
  roomNumber,
  biletNumber,
  step,
  Mp3Array,
}: QueueDialogProps) => {
  const { t } = useTranslation();

  const [hasCallRingtone, setHasCallRingtone] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const audioPlayer = document.getElementsByTagName('audio')[0];

    const handleAudioLoaded = () => {
      setIsLoading(false);
    };

    const handleAudioEnd = () => {
      if (currentTrackIndex < Mp3Array.length - 1) {
        setCurrentTrackIndex(currentTrackIndex + 1);
      }
    };

    audioPlayer.addEventListener('canplaythrough', handleAudioLoaded);
    audioPlayer.addEventListener('ended', handleAudioEnd);

    return () => {
      audioPlayer.removeEventListener('canplaythrough', handleAudioLoaded);
      audioPlayer.removeEventListener('ended', handleAudioEnd);
    };
  }, [currentTrackIndex, Mp3Array]);

  const handleTrackChange = (index: React.SetStateAction<number>) => {
    setCurrentTrackIndex(index);
  };

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
      {/* <ReactAudioPlayer
        src="/assets/callRingtone.mp3"
        autoPlay
        controls
        onEnded={() => setHasCallRingtone(true)}
        style={{ opacity: '0' }}
      /> */}

      {/* {hasCallRingtone && ( */}
      <ReactAudioPlayer
        src={`${baseUrlUpload}${Mp3Array[currentTrackIndex]}`}
        autoPlay
        controls
        onEnded={() => handleTrackChange(currentTrackIndex + 1)}
        style={{ opacity: '0' }}
      />
      {/* )} */}
    </div>
  );
};

export default QueueDialog;
