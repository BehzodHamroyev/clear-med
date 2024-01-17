import React from 'react';

import cls from './Loader.module.scss';

const LoaderAdmin = () => {
  return (
    <div className={cls.LoaderWrapper}>
      <div className={cls.loader} />
    </div>
  );
};

export default LoaderAdmin;
