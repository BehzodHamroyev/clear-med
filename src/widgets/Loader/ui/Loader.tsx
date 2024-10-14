import React, { useEffect } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Loader.module.scss';

interface LoaderProps {
  className?: string;
}

const Loader = ({ className }: LoaderProps) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className={classNames(cls.LoaderWrp, {}, [className])}>
      <div className={cls.LoaderWrp__box} />
    </div>
  );
};

export default Loader;
