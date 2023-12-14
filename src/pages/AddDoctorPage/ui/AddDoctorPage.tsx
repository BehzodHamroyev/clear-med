import React from 'react';

import { TableTitle } from '@/entities/TableTitle';
import { ButtonNavbar } from '@/entities/ButtonNavbar';

import cls from './AddDoctorPage.module.scss';
import { Doda } from '@/shared/assets/Pages/AddDoctorPage';

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
  return (
    <div className={cls.AddDoctorPageWrapper}>
      <ButtonNavbar TableTitle="Shifokorlar" ItemsLength={tableBody.length} />

      <TableTitle Tablethead={tableTitle} Tabletbody={tableBody} />
    </div>
  );
};

export default AddDoctorPage;
