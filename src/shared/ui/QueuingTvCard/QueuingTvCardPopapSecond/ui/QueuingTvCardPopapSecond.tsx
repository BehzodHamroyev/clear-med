import React, { useContext, useRef } from 'react';

import { useTranslation } from 'react-i18next';
import cls from './QueuingTvCardPopapSecond.module.scss';
import { QueueUserDoctor } from '../../../DoctorPanels/QueueUserDoctor';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';

const QueuingTvCardPopapSecond = () => {
  const { t } = useTranslation();
  const { setIsOpenQueuingTvCardPopapSecond } = useContext(ButtonsContext);

  const printableDivRef = useRef<HTMLDivElement>(null);

  const printContent = () => {
    if (printableDivRef.current) {
      const printableContent = printableDivRef.current.innerHTML;
      const originalContent = document.body.innerHTML;

      document.body.innerHTML = printableContent;

      window.print();

      document.body.innerHTML = originalContent;
    }
    setIsOpenQueuingTvCardPopapSecond(false);
  };

  return (
    <div className={cls.QueuingTvCardPopapSecondWrapper}>
      <div className={cls.QueuingTvCardPopapSecond}>
        <h3 className={cls.QueuingTvCardPopapSecondTitle}>
          Navbatni tasdiqlang
        </h3>

        <div ref={printableDivRef}>
          <QueueUserDoctor ticketNumber="aa" roomNumber={0} />
        </div>

        <div className={cls.BtnParnet}>
          <button
            onClick={() => setIsOpenQueuingTvCardPopapSecond(false)}
            type="button"
            className={`${cls.Btn} ${cls.Btn1}`}
          >
            {t('Bekor qilish')}
          </button>
          <button
            onClick={printContent}
            type="button"
            className={`${cls.Btn} ${cls.Btn2}`}
          >
            {t('Chiqarish')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QueuingTvCardPopapSecond;
