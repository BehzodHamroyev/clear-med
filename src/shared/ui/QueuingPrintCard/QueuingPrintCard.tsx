/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';

import cls from './QueuingPrintCard.module.scss';
import { baseUrlImgLogo } from '../../../../baseurl';
import { getAllDataProject } from '@/entities/FileUploader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

interface QueuingPrintCardProp {
  roomNumber: number | string;
  ticketNumber: string;
  // eslint-disable-next-line react/no-unused-prop-types
  doctor_name: string;
  deparment_name?: string;
}

const QueuingPrintCard = React.forwardRef<HTMLDivElement, QueuingPrintCardProp>(
  ({ roomNumber, ticketNumber, doctor_name, deparment_name }, ref) => {
    const dispatch = useAppDispatch();
    const [doctorName, setDoctorName] = useState('');

    useEffect(() => {
      dispatch(getAllDataProject({}));
    }, [dispatch]);

    useEffect(() => {
      // this code for queue name
      if (doctor_name) {
        // Split the string into an array of words
        const words = doctor_name.split(' ');

        // Extract the first word
        const firstWord = words[0];

        // Extract the first letters of the remaining words and join them with a dot
        const initials = words
          .slice(1)
          .map((word) => word.charAt(0))
          .join('.');

        // Combine them
        const outputStringDoctorName = `${firstWord} ${initials}`;
        setDoctorName(outputStringDoctorName);
      }
    }, [doctor_name]);

    const language = localStorage.getItem('i18nextLng');

    return (
      <div
        ref={ref}
        className={cls['QueuingPrintCardWrp__queuingPopap--queuingTvPrintCard']}
      >
        <div className={cls['QueuingPrintCardWrp__queuingPopap--medicName']}>
          <p className={cls['QueuingPrintCardWrp__queuingPopap--ticketNumber']}>
            {language === 'kr' ? 'Навбатингиз' : 'Ваша очередь'}
          </p>

          <p>{ticketNumber}</p>
        </div>

        <div className={cls['QueuingPrintCardWrp__queuingPopap--medicName']}>
          <p className={cls['QueuingPrintCardWrp__queuingPopap--ticketNumber']}>
            {language === 'kr' ? 'Хона' : 'кабинет'}:
          </p>

          <p>{roomNumber}</p>
        </div>

        <div className={cls['QueuingPrintCardWrp__queuingPopap--medicName']}>
          <p className={cls['QueuingPrintCardWrp__queuingPopap--titleTicket']}>
            {language === 'kr' ? 'Бўлим' : 'Отделение'}:
          </p>

          <p>{deparment_name}</p>
        </div>

        <div className={cls['QueuingPrintCardWrp__queuingPopap--medicName']}>
          <p className={cls['QueuingPrintCardWrp__queuingPopap--titleTicket']}>
            {deparment_name === 'UZI' || deparment_name === 'УЗИ'
              ? language === 'kr'
                ? 'Шифокор'
                : 'Доктор'
              : language === 'kr'
              ? 'Ҳамшира'
              : 'Медсестра'}
          </p>

          <p
            className={
              cls['QueuingPrintCardWrp__queuingPopap--medicNameFullName']
            }
          >
            {doctorName}
          </p>
        </div>

        <div className={cls['QueuingPrintCardWrp__queuingPopap--medicName']}>
          <p className={cls['QueuingPrintCardWrp__queuingPopap--titleTicket']}>
            {language === 'kr' ? 'Вақт' : 'Время'}:
          </p>

          <p className={cls['QueuingPrintCardWrp__queuingPopap--dateGetQueue']}>
            {new Date().getDate()}/
            {new Date().getMonth() < 10
              ? `0${new Date().getMonth() + 1}`
              : new Date().getMonth() + 1}
            /{new Date().getFullYear()} |{' '}
            {new Date().getHours() < 10
              ? `0${new Date().getHours()}`
              : new Date().getHours()}
            :
            {new Date().getMinutes() < 10
              ? `0${new Date().getMinutes()}`
              : new Date().getMinutes()}
          </p>
        </div>

        <img
          // src="https://static.tildacdn.one/tild6634-3737-4039-a662-633534316465/Group_187.svg"
          alt="imgLink"
          src={`${baseUrlImgLogo}`}
          className={
            cls['QueuingPrintCardWrp__queuingPopap--printQueuePageImg']
          }
        />
      </div>
    );
  },
);

export default QueuingPrintCard;
