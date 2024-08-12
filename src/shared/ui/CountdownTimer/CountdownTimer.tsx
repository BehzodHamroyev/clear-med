import React, { useState, useEffect } from 'react';

import cls from './CountdownTimer.module.scss';

const CountdownTimer = () => {
  // Boshlang'ich vaqtni soniyalar sifatida belgilash (59 minut va 59 soniya = 3599 soniya)
  const [timeLeft, setTimeLeft] = useState(3599);

  useEffect(() => {
    // Vaqtni yangilash uchun interval funksiyasi
    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => {
        // Vaqt nolga yetganda to'xtatish
        if (prevTime <= 1) {
          clearInterval(intervalId);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    // Intervalni tozalash
    return () => clearInterval(intervalId);
  }, []);

  // Qolgan vaqtni minut va sekundlarga ajratish
  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const seconds = String(timeLeft % 60).padStart(2, '0');

  return (
    <p className={cls.CountdownTimer}>
      {minutes}:{seconds}{' '}
    </p>
  );
};

export default CountdownTimer;
