/* eslint-disable jsx-a11y/media-has-caption */
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ReactAudioPlayer from 'react-audio-player';

import cls from './QueueDialog.module.scss';
import { baseUrlUpload } from '../../../../baseurl';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';

interface QueueDialogProps {
  step: number;
  Mp3Array: string[];
  className?: string;
  roomNumber: string;
  biletNumber: string;
}

const QueueDialog = ({
  step,
  Mp3Array,
  className,
  roomNumber,
  biletNumber,
}: QueueDialogProps) => {
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(true);
  const [hasCallRingtone, setHasCallRingtone] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(-1);

  const { setOnEndedQueueAudio } = useContext(ButtonsContext);

  const handleTrackChange = (index: React.SetStateAction<number>) => {
    setCurrentTrackIndex(index);

    if (currentTrackIndex === Mp3Array.length - 1) {
      setOnEndedQueueAudio(false);
    }
  };

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

    console.log(`${baseUrlUpload}${Mp3Array[1]}`, 'Mp3Array');

    return () => {
      audioPlayer.removeEventListener('canplaythrough', handleAudioLoaded);
      audioPlayer.removeEventListener('ended', handleAudioEnd);
    };
  }, [currentTrackIndex, Mp3Array]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  console.log(Mp3Array);

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
        src="https://medapi.magicsoft.uz/uploads/callRingtone.mp3"
        autoPlay
        controls
        onEnded={() => setHasCallRingtone(true)}
        style={{ opacity: '0' }}
      />

      <ReactAudioPlayer
        src={`${baseUrlUpload}${Mp3Array[currentTrackIndex]}`}
        autoPlay={hasCallRingtone}
        controls
        onEnded={() => handleTrackChange(currentTrackIndex + 1)}
        style={{ opacity: '0' }}
      />
    </div>
  );
};

export default QueueDialog;
