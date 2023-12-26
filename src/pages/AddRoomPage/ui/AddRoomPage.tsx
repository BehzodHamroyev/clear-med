import React, { useContext } from 'react';

import { RoomAdd } from '@/entities/RoomAdd';
import { RoomEdit } from '@/entities/RoomEdit';
import { TableTitle } from '@/entities/TableTitle';
import { ButtonNavbar } from '@/entities/ButtonNavbar';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';

import cls from './AddRoomPage.module.scss';

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
  const { isOpenRoomEditCard, isOpenRoomAddCard } = useContext(ButtonsContext);

  return (
    <div>
      <div className={cls.AddRoomPageWrapper}>
        <ButtonNavbar
          dontCreate
          TableTitle="Xonalar"
          ItemsLength={tableBody.length}
        />

        <TableTitle Tablethead={tableTitle} Tabletbody={tableBody} />
      </div>

      {isOpenRoomAddCard ? <RoomAdd /> : ''}
      {isOpenRoomEditCard ? <RoomEdit /> : ''}
    </div>
  );
};

export default AddRoomPage;
