import React, { useEffect } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './LoaderBackHidden.module.scss';

const LoaderBackHidden = () => {
  useEffect(() => {
    // body tegiga overflow: hidden stilini qo'shish
    document.body.style.overflow = 'hidden';

    // useEffect ichidagi funksiya olib tashlanishida body tegiga qo'shilgan stilni olib tashlash
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className={classNames(cls.Loader)}>
      <div className={cls.Loader__box} />
    </div>
  );
};

export default LoaderBackHidden;
