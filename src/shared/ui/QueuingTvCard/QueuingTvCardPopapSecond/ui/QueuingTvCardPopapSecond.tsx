import React, { useContext, useRef } from 'react';
// import { io } from 'socket.io-client';
import io from 'socket.io-client';
import { useTranslation } from 'react-i18next';
import cls from './QueuingTvCardPopapSecond.module.scss';
import { QueueUserDoctor } from '../../../DoctorPanels/QueueUserDoctor';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';

const QueuingTvCardPopapSecond = () => {
  const { t } = useTranslation();
  const { setIsOpenQueuingTvCardPopapSecond } = useContext(ButtonsContext);
  const socket = io('http://176.96.243.227:8900');
  const printableDivRef = useRef<HTMLDivElement>(null);

  const printContent = () => {
    // @ts-ignore
    // socket.emit('create_queue', '659dea386b440c9b275fe237', (response) => {
    //   console.log(response);
    //   console.log('response');
    // });
    // socket.on('message', (data) => {
    //   console.log('Received message:', data);
    // });

    // Send a message to the server
    socket.emit('message', 'Hello, server!');

    console.log('clikc');

    if (printableDivRef.current) {
      const printableContent = printableDivRef.current.innerHTML;
      const originalContent = document.body.innerHTML;

      document.body.innerHTML = printableContent;

      window.print();

      document.body.innerHTML = originalContent;
    }
    setIsOpenQueuingTvCardPopapSecond(false);

    return () => {
      socket.disconnect();
    };
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
