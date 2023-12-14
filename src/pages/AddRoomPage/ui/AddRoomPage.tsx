import React from 'react';

import cls from './AddRoomPage.module.scss';
import { TableTitle } from '@/entities/TableTitle';
import { ButtonNavbar } from '@/entities/ButtonNavbar';

const tableTitle = ['Xona raqami', 'Bo‘limlar', 'Shifokorlar soni'];

const tableBody = [
  {
    id: 1,
    item1: 1,
    item2: 'Ginekologiya',
    lastChild: 4,
  },
  {
    id: 1,
    item1: 2,
    item2: 'Pediatriya',
    lastChild: 3,
  },
  {
    id: 1,
    item1: 6,
    item2: 'Ankologia',
    lastChild: 2,
  },
  {
    id: 1,
    item1: 2,
    item2: 'Artopediya',
    lastChild: 1,
  },
  {
    id: 1,
    item1: 23,
    item2: 'Ginekologiya',
    lastChild: 2,
  },
  {
    id: 1,
    item1: 17,
    item2: 'Ginekologiya',
    lastChild: 3,
  },
  {
    id: 1,
    item1: 4,
    item2: 'Pediatriya',
    lastChild: 2,
  },
  {
    id: 1,
    item1: 6,
    item2: 'Ankologia',
    lastChild: 4,
  },
  {
    id: 1,
    item1: 22,
    item2: 'Artopediya',
    lastChild: 1,
  },
  {
    id: 1,
    item1: 23,
    item2: 'Ginekologiya',
    lastChild: 2,
  },
];

const AddRoomPage = () => {
  return (
    <div className={cls.AddRoomPageWrapper}>
      <ButtonNavbar TableTitle="Xonalar" ItemsLength={tableBody.length} />

      <TableTitle Tablethead={tableTitle} Tabletbody={tableBody} />
    </div>
  );
};

export default AddRoomPage;
