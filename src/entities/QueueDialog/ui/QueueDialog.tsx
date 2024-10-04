import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ReactAudioPlayer from 'react-audio-player';

import cls from './QueueDialog.module.scss';
import { baseUploadUrl } from '../../../../baseurl';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import { dingDong } from '@/shared/assets';

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

  const audioSpeedRef = React.useRef<ReactAudioPlayer | null>(null);
  const audioSpeedRef2 = React.useRef<ReactAudioPlayer | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(-1);

  const { setOnEndedQueueAudio } = useContext(ButtonsContext);

  const prefix = biletNumber?.charAt(0);

  // Extract the last number part after the hyphen and remove leading zeros
  const numberPart = parseInt(biletNumber?.split('-')[1], 10);

  // Combine them
  const outputString = `${prefix}-${numberPart}`;

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

  useEffect(() => {
    if (audioSpeedRef.current && audioSpeedRef.current.audioEl.current) {
      audioSpeedRef.current.audioEl.current.playbackRate = 1.1;
    }
  }, []);

  useEffect(() => {
    if (audioSpeedRef2.current && audioSpeedRef2.current.audioEl.current) {
      audioSpeedRef2.current.audioEl.current.playbackRate = 1.5;
    }
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
              <p>{outputString}</p>
            </div>
          </div>
        </div>
      </div>

      <ReactAudioPlayer
        ref={audioSpeedRef}
        // src={`${baseUploadUrl}uploads/callRingtone.mp3`}
        src={dingDong}
        autoPlay
        controls
        onEnded={() => setOnEndedQueueAudio(false)}
        style={{ opacity: '0' }}
      />

      {/* <ReactAudioPlayer
        src={`${baseUploadUrl}${Mp3Array[currentTrackIndex]}`}
        autoPlay={hasCallRingtone}
        controls
        onEnded={() => handleTrackChange(currentTrackIndex + 1)}
        style={{ opacity: '0' }}
      /> */}
    </div>
  );
};

export default QueueDialog;
