import React from 'react';

import { useTranslation } from 'react-i18next';
import { ButtonNavbar } from '@/entities/ButtonNavbar';

import cls from './ReportsDoctorPage.module.scss';
import { TableTitlePatients } from '@/entities/TableTitlePatients';

const tableTitle = [
  'Id',
  'Shifokor',
  'Xona',
  'Qabul boshlanishi',
  'Qabul tugashi',
];

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

const ReportsDoctorPage = () => {
  const { t } = useTranslation();

  return (
    <div className={cls.ReportsDoctorPageWrapper}>
      <ButtonNavbar
        Calendar
        TableTitle="Qabullar"
        ItemsLength={TableBody.length}
      />

      <TableTitlePatients
        cursor
        Tablethead={tableTitle}
        TableBody={TableBody}
      />
    </div>
  );
};

export default ReportsDoctorPage;
