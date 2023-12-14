import React from 'react';

import cls from './DepartmentPage.module.scss';
import { TableTitle } from '@/entities/TableTitle';
import { ButtonNavbar } from '@/entities/ButtonNavbar';

const tableTitle = ['Bo‘lim nomi', 'Shifokorlar soni', 'Xonalar raqami'];

const tableBody = [
  {
    id: 1,
    item1: 'Ginekologiya',
    item2: 3,
    lastChild: 17,
  },
  {
    id: 2,
    item1: 'Pediatriya',
    item2: 4,
    lastChild: 4,
  },
  {
    id: 3,
    item1: 'Ankologia',
    item2: 1,
    lastChild: 6,
  },
  {
    id: 4,
    item1: 'Artopediya',
    item2: 2,
    lastChild: 9,
  },
  {
    id: 5,
    item1: 'Ginekologiya',
    item2: 5,
    lastChild: 23,
  },
  {
    id: 6,
    item1: 'Ginekologiya',
    item2: 2,
    lastChild: 17,
  },
  {
    id: 7,
    item1: 'Pediatriya',
    item2: 2,
    lastChild: 4,
  },
  {
    id: 8,
    item1: 'Ankologia',
    item2: 3,
    lastChild: 6,
  },
  {
    id: 9,
    item1: 'Artopediya',
    item2: 4,
    lastChild: 9,
  },
  {
    id: 10,
    item1: 'Ginekologiya',
    item2: 5,
    lastChild: 23,
  },
  {
    id: 11,
    item1: 'Ginekologiya',
    item2: 2,
    lastChild: 14,
  },
  {
    id: 12,
    item1: 'Ginekologiya',
    item2: 5,
    lastChild: 34,
  },
  {
    id: 13,
    item1: 'artoped',
    item2: 5,
    lastChild: 20,
  },
];

const DepartmentPage = () => {
  return (
    <div className={cls.DepartmentPageWrapper}>
      <ButtonNavbar TableTitle="Bo‘limlar" ItemsLength={tableBody.length} />

      <TableTitle Tablethead={tableTitle} Tabletbody={tableBody} />
    </div>
  );
};

export default DepartmentPage;
