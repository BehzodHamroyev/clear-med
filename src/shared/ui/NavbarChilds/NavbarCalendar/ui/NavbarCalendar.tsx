import React from 'react';
import { useTranslation } from 'react-i18next';
import cls from './NavbarCalendar.module.scss';

const NavbarCalendar = () => {
  const { t } = useTranslation();
  const date = new Date();
  const day = date.getDate();
  const year = date.getFullYear();
  const month = date.toLocaleString('default', { month: 'long' }).slice(0, 3);
  console.log(date, 'vjdvnskd');

  return (
    <div className={cls.NavbarCalendarWrapper}>
      <p>
        {day}-{t(month)}-{year}
      </p>
    </div>
  );
};

export default NavbarCalendar;
