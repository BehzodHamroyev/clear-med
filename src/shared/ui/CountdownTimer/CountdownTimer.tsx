import React, { useState, useEffect } from 'react';
import cls from './CountdownTimer.module.scss';

const CountdownTimer = ({ actives, onTimeUp }: any) => {
  const tillTimeUTC = new Date(actives[0].tillTime);
  const tillTimeUzbekistan = new Date(
    tillTimeUTC.getTime() + 1 * 60 * 60 * 1000, // O'zbekiston UTC+5
  );

  const oneHourBefore = new Date(tillTimeUzbekistan.getTime() - 60 * 60 * 1000);
  const now = new Date();

  const timeDifferenceInSeconds = Math.max(
    Math.floor((oneHourBefore.getTime() - now.getTime()) / 1000),
    0,
  );

  const [timeLeft, setTimeLeft] = useState(timeDifferenceInSeconds);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => {
        const newTime = prevTime - 1;
        if (newTime <= 0) {
          clearInterval(intervalId);
          onTimeUp();
          return 0;
        }
        return newTime;
      });
    }, 1000);

    // eslint-disable-next-line consistent-return
    return () => clearInterval(intervalId);
  }, [timeLeft, onTimeUp]);

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const seconds = String(timeLeft % 60).padStart(2, '0');

  return (
    <p className={cls.CountdownTimer}>
      {minutes}:{seconds}
    </p>
  );
};

export default CountdownTimer;
