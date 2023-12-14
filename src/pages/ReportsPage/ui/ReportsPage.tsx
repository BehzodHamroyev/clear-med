import React from 'react';

import cls from './ReportsPage.module.scss';
import { ButtonNavbar } from '@/entities/ButtonNavbar';
import { TableTitle } from '@/entities/TableTitle';

const tableTitle = ['Bo‘lim', 'Shifokor ro‘yxati', 'Xona', 'Bemorlar soni'];

const tableBody = [
  {
    id: 1,
    item1: 'Mazgitolog',
    item2: 'Hamroyev Mironshoh',
    item3: 2,
    item4: 12,
  },
  {
    id: 1,
    item1: 'Mazgitolog',
    item2: 'Hamroyev Mironshoh',
    item3: 2,
    item4: 12,
  },
  {
    id: 1,
    item1: 'Mazgitolog',
    item2: 'Hamroyev Mironshoh',
    item3: 2,
    item4: 12,
  },
  {
    id: 1,
    item1: 'Mazgitolog',
    item2: 'Hamroyev Mironshoh',
    item3: 2,
    item4: 12,
  },
  {
    id: 1,
    item1: 'Mazgitolog',
    item2: 'Hamroyev Mironshoh',
    item3: 2,
    item4: 12,
  },
  {
    id: 1,
    item1: 'Mazgitolog',
    item2: 'Hamroyev Mironshoh',
    item3: 2,
    item4: 12,
  },
  {
    id: 1,
    item1: 'Mazgitolog',
    item2: 'Hamroyev Mironshoh',
    item3: 2,
    item4: 12,
  },
  {
    id: 1,
    item1: 'Mazgitolog',
    item2: 'Hamroyev Mironshoh',
    item3: 2,
    item4: 12,
  },
  {
    id: 1,
    item1: 'Mazgitolog',
    item2: 'Hamroyev Mironshoh',
    item3: 2,
    item4: 12,
  },
  {
    id: 1,
    item1: 'Mazgitolog',
    item2: 'Hamroyev Mironshoh',
    item3: 2,
    item4: 12,
  },
];

const ReportsPage = () => {
  return (
    <div className={cls.ReportsPageWrapper}>
      <ButtonNavbar
        Calendar
        TableTitle="Hisobotlar"
        ItemsLength={tableBody.length}
      />

      <TableTitle cursor Tablethead={tableTitle} Tabletbody={tableBody} />
    </div>
  );
};

export default ReportsPage;
