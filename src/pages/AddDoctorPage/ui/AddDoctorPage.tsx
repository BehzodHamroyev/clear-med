import React, { useContext } from 'react';

import { TableTitle } from '@/entities/TableTitle';
import { ButtonNavbar } from '@/entities/ButtonNavbar';

import cls from './AddDoctorPage.module.scss';
import { Doda } from '@/shared/assets/Pages/AddDoctorPage';
import { DoctorAdd } from '@/entities/DoctorAdd';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import { DoctorEdit } from '@/entities/DoctorEdit';

const tableTitle = [
  'Surat',
  'F.I.Sh',
  'Xona',
  'Bo’lim',
  'Tajribasi',
  'Telefon raqami',
];

const tableBody = [
  {
    id: 1,
    img: Doda,
    item1: 'Tojiboyev Abdulaziz',
    item2: 2,
    item3: 'Mazgitolog',
    item4: '22-yil',
    lastChild: '+998 97 777 64 54',
  },
  {
    id: 1,
    img: Doda,
    item1: 'Tojiboyev Abdulaziz',
    item2: 2,
    item3: 'Mazgitolog',
    item4: '22-yil',
    lastChild: '+998 97 777 64 54',
  },
  {
    id: 1,
    img: Doda,
    item1: 'Tojiboyev Abdulaziz',
    item2: 2,
    item3: 'Mazgitolog',
    item4: '22-yil',
    lastChild: '+998 97 777 64 54',
  },
  {
    id: 1,
    img: Doda,
    item1: 'Tojiboyev Abdulaziz',
    item2: 2,
    item3: 'Mazgitolog',
    item4: '22-yil',
    lastChild: '+998 97 777 64 54',
  },
  {
    id: 1,
    img: Doda,
    item1: 'Tojiboyev Abdulaziz',
    item2: 2,
    item3: 'Mazgitolog',
    item4: '22-yil',
    lastChild: '+998 97 777 64 54',
  },
  {
    id: 1,
    img: Doda,
    item1: 'Tojiboyev Abdulaziz',
    item2: 2,
    item3: 'Mazgitolog',
    item4: '22-yil',
    lastChild: '+998 97 777 64 54',
  },
  {
    id: 1,
    img: Doda,
    item1: 'Tojiboyev Abdulaziz',
    item2: 2,
    item3: 'Mazgitolog',
    item4: '22-yil',
    lastChild: '+998 97 777 64 54',
  },
  {
    id: 1,
    img: Doda,
    item1: 'Tojiboyev Abdulaziz',
    item2: 2,
    item3: 'Mazgitolog',
    item4: '22-yil',
    lastChild: '+998 97 777 64 54',
  },
  {
    id: 1,
    img: Doda,
    item1: 'Tojiboyev Abdulaziz',
    item2: 2,
    item3: 'Mazgitolog',
    item4: '22-yil',
    lastChild: '+998 97 777 64 54',
  },
  {
    id: 1,
    img: Doda,
    item1: 'Tojiboyev Abdulaziz',
    item2: 2,
    item3: 'Mazgitolog',
    item4: '22-yil',
    lastChild: '+998 97 777 64 54',
  },
  {
    id: 1,
    img: Doda,
    item1: 'Tojiboyev Abdulaziz',
    item2: 2,
    item3: 'Mazgitolog',
    item4: '22-yil',
    lastChild: '+998 97 777 64 54',
  },
  {
    id: 1,
    img: Doda,
    item1: 'Tojiboyev Abdulaziz',
    item2: 2,
    item3: 'Mazgitolog',
    item4: '22-yil',
    lastChild: '+998 97 777 64 54',
  },
  {
    id: 1,
    img: Doda,
    item1: 'Tojiboyev Abdulaziz',
    item2: 2,
    item3: 'Mazgitolog',
    item4: '22-yil',
    lastChild: '+998 97 777 64 54',
  },
  {
    id: 1,
    img: Doda,
    item1: 'Tojiboyev Abdulaziz',
    item2: 2,
    item3: 'Mazgitolog',
    item4: '22-yil',
    lastChild: '+998 97 777 64 54',
  },
  {
    id: 1,
    img: Doda,
    item1: 'Tojiboyev Abdulaziz',
    item2: 2,
    item3: 'Mazgitolog',
    item4: '22-yil',
    lastChild: '+998 97 777 64 54',
  },
  {
    id: 1,
    img: Doda,
    item1: 'Tojiboyev Abdulaziz',
    item2: 2,
    item3: 'Mazgitolog',
    item4: '22-yil',
    lastChild: '+998 97 777 64 54',
  },
  {
    id: 1,
    img: Doda,
    item1: 'Tojiboyev Abdulaziz',
    item2: 2,
    item3: 'Mazgitolog',
    item4: '22-yil',
    lastChild: '+998 97 777 64 54',
  },
];

const AddDoctorPage = () => {
  const { isOpenDoctorAddCard, isOpenDoctorEditCard } =
    useContext(ButtonsContext);
  return (
    <div>
      <div className={cls.AddDoctorPageWrapper}>
        <ButtonNavbar TableTitle="Shifokorlar" ItemsLength={tableBody.length} />

        <TableTitle Tablethead={tableTitle} Tabletbody={tableBody} />
      </div>

      {isOpenDoctorAddCard ? <DoctorAdd /> : ''}
      {isOpenDoctorEditCard ? <DoctorEdit /> : ''}
    </div>
  );
};

export default AddDoctorPage;
