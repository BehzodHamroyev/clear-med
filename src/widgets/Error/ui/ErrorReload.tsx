import React from 'react';

import cls from './errorReload.module.scss';

const ErrorReload = (prop: { message: string }) => {
  const { message } = prop;

  function refreshPage() {
    window.location.reload();
  }

  return (
    <div className={cls.errorMessageWrap}>
      <p className={cls.errorMessage}>{message}</p>
      <button
        className={cls.errorMessageBtn}
        type="button"
        onClick={refreshPage}
      >
        Refresh
      </button>
    </div>
  );
};

export default ErrorReload;
