import { t } from 'i18next';
import { ListOfPageTypes } from '../types/listOfPages';
import {
  Bolimlar,
  Xona,
  Shifokor,
  Xisobotlar,
  Navbatlar,
} from '@/shared/assets/widgets/Sidebar';

export const listOfPageAdmin: ListOfPageTypes[] = [
  {
    id: 1,
    path: '/department',
    title: t('Bo‘lim qo‘shish'),
    icon: Bolimlar,
  },
  {
    id: 2,
    path: '/add_room_age',
    title: t('Xona qo‘shish'),
    icon: Xona,
  },
  {
    id: 3,
    path: '/add_doctor',
    title: t('Shifokor qo‘shish'),
    icon: Shifokor,
  },
  {
    id: 4,
    path: '/reports',
    title: t('Hisobotlar'),
    icon: Xisobotlar,
  },
  { id: 5, path: '/queues', title: t('Navbatlar'), icon: Navbatlar },
];

export const listOfPageQabulXona: ListOfPageTypes[] = [
  {
    id: 1,
    path: '/queuing_tv',
    title: t('Navbat berish'),
    icon: Bolimlar,
  },
  {
    id: 4,
    path: '/reports',
    title: t('Hisobotlar'),
    icon: Xisobotlar,
  },

  { id: 5, path: '/queues', title: t('Navbatlar'), icon: Navbatlar },
];

export const listOfPageDoktor: ListOfPageTypes[] = [
  {
    id: 1,
    path: '/reports_doctor',
    title: t('Hisobotlar'),
    icon: Xisobotlar,
  },
  {
    id: 2,
    path: '/queues_control_doctor',
    title: t('Navbatlar'),
    icon: Navbatlar,
  },
];
