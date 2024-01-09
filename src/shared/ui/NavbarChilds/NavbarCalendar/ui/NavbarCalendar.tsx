import React from 'react';
import { useTranslation } from 'react-i18next';
import cls from './NavbarCalendar.module.scss';

const NavbarCalendar = () => {
  const { t } = useTranslation();
  const date = new Date();
  const day = date.getDate();
  const year = date.getFullYear();
  const monthName = new Intl.DateTimeFormat('default', { month: 'long' });
  const tarjimaQilinganOyNomlari = monthName.format(date);

  return (
    <div className={cls.NavbarCalendarWrapper}>
      <p>
        {day}-{t(tarjimaQilinganOyNomlari)}-{year}
      </p>
    </div>
  );
};

export default NavbarCalendar;
