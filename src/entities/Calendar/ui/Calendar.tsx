/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState } from 'react';
import Calendar from 'react-calendar';

import cls from './Calendar.module.scss';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';

const CalendarSection = () => {
  type ValuePiece = Date | null;

  type Value = ValuePiece | [ValuePiece, ValuePiece];

  const [value, onChangeFirsrt] = useState<Value>(new Date());

  const [value2, onChangeSecond] = useState<Value>(new Date());

  const [gmtTime, setGmtTime] = useState<string>('');
  const [estTime, setEstTime] = useState<string>('');

  const {
    isCloseCalendar,
    setIsCloseCalendar,
    isCloseCalendar2,
    setIsCloseCalendar2,
    setCalendarBeginValue,
  } = useContext(ButtonsContext);

  const data = {
    day: value?.toString().slice(8, 10),
    month: value?.toString().slice(4, 7),
    year: value?.toString().slice(11, 15),
  };

  const data2 = {
    day: value2?.toString().slice(8, 10),
    month: value2?.toString().slice(4, 7),
    year: value2?.toString().slice(11, 15),
  };

  const convertToEst = (gmtTime: any) => {
    const gmtDate = new Date(gmtTime);
    const estDate = new Date(
      gmtDate.toLocaleString('en-US', { timeZone: 'America/New_York' }),
    );
    setEstTime(estDate.toLocaleString());
  };

  const handleClickGetDate = () => {
    setIsCloseCalendar(false);

    convertToEst(value);

  };

  return (
    <div className={cls.CalendarWrapper}>
      <p>Qabul boshi:</p>
      <div
        style={{ border: '1px solid #E0E0E0' }}
        className={cls.Calendar}
        onClick={() => setIsCloseCalendar(true)}
      >
        {data.day} / {data.month} / {data.year}
      </div>
      <p>Qabul oxiri:</p>
      <div
        style={{ border: '1px solid #E0E0E0' }}
        className={cls.Calendar}
        onClick={() => setIsCloseCalendar2(true)}
      >
        {data2.day} / {data2.month} / {data2.year}
      </div>

      {/* Calendar data First */}
      {isCloseCalendar === true ? (
        <div
          onClick={() => {
            setIsCloseCalendar(false);
          }}
          className={cls.CalendarValueWrapper}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={cls.calendarDisplay}
          >
            <Calendar
              className={cls.CalendarVal}
              onChange={onChangeFirsrt}
              value={value}
            />
            <button
              onClick={handleClickGetDate}
              type="button"
              className={cls.CloseBtn}
            >
              get day
            </button>
          </div>
        </div>
      ) : (
        ''
      )}
      {/* Calendar data Second */}
      {isCloseCalendar2 === true ? (
        <div
          onClick={() => {
            setIsCloseCalendar2(false);
          }}
          className={cls.CalendarValueWrapper}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={cls.calendarDisplay}
          >
            <Calendar
              className={cls.CalendarVal}
              onChange={onChangeSecond}
              value={value2}
            />
            <button
              onClick={() => {
                setIsCloseCalendar2(false);
              }}
              type="button"
              className={cls.CloseBtn}
            >
              get day
            </button>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default CalendarSection;
