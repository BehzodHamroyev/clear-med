import React from 'react';

import cls from './loader.module.scss';

interface LoaderProps {
  className?: string;
}

const Loader = ({ className }: LoaderProps) => {
  return (
    // <div className={classNames(cls.Loader, {}, [className])}>
    //   <div className={cls.Loader__box} />
    // </div>
    // <div className={classNames(cls.LoaderWrapper, {}, [className])}>
    <div className={cls.LoaderWrapper}>
      <div className={cls.loader} />
    </div>
  );
};

export default Loader;
