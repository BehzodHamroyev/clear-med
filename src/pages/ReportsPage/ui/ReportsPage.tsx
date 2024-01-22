import React from 'react';

import { ButtonNavbar } from '@/entities/ButtonNavbar';
import { TableTitleReports } from '@/entities/TableTitleReports';

import cls from './ReportsPage.module.scss';

const tableTitle = ['Bo‘lim', 'Shifokor ro‘yxati', 'Xona', 'Bemorlar soni'];

const TableBody = [
  {
    id: 1,
    item1: 'Nervopotolog',
    item2: 'Umid Rustamov',
    item3: 2,
    KorilganBemorlar: [
      {
        id: 1,
        shifokor: 'Umid Rustamov',
        xona: '2',
        qabulboshlanishi: '9:30:24',
        qabultugashi: '9:50:12',
      },
      {
        id: 2,
        shifokor: 'Umid Rustamov',
        xona: '2',
        qabulboshlanishi: '10:00:24',
        qabultugashi: '10:34:53',
      },
      {
        id: 3,
        shifokor: 'Umid Rustamov',
        xona: '2',
        qabulboshlanishi: '11:40:04',
        qabultugashi: '12:10:22',
      },
      {
        id: 4,
        shifokor: 'Umid Rustamov',
        xona: '2',
        qabulboshlanishi: '12:20:02',
        qabultugashi: '12:50:12',
      },
    ],
  },
  {
    id: 2,
    item1: 'Ginekolog',
    item2: 'Hamroyev Behzod',
    item3: 3,
    KorilganBemorlar: [
      {
        id: 1,
        shifokor: 'Hamroyev Behzod',
        xona: '3',
        qabulboshlanishi: '9:30:24',
        qabultugashi: '9:50:12',
      },
    ],
  },
  {
    id: 3,
    item1: 'Akulist',
    item2: "G'ulomov Abbos",
    item3: 4,
    KorilganBemorlar: [
      {
        id: 1,
        shifokor: "G'ulomov Abbos",
        xona: '4',
        qabulboshlanishi: '9:30:24',
        qabultugashi: '9:50:12',
      },
    ],
  },
  {
    id: 4,
    item1: 'Pediator',
    item2: 'Tojiboyev Abdulaziz',
    item3: 5,
    KorilganBemorlar: [
      {
        id: 1,
        shifokor: 'Tojiboyev Abdulaziz',
        xona: '5',
        qabulboshlanishi: '9:30:24',
        qabultugashi: '9:50:12',
      },
    ],
  },
  {
    id: 5,
    item1: 'Glaznoy',
    item2: "Xusainov Ulug'bek",
    item3: 6,
    KorilganBemorlar: [],
  },
];

const ReportsPage = () => {
  return (
    <div className={cls.ReportsPageWrapper}>
      <ButtonNavbar
        Calendar
        TableTitle="Hisobotlar"
        ItemsLength={TableBody.length}
      />

      <TableTitleReports
        cursor
        Tablethead={tableTitle}
        Tabletbody={TableBody}
      />
    </div>
  );
};

export default ReportsPage;
