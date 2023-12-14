/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from 'react-router-dom';
import React, { memo, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import cls from './ListOfPages.module.scss';
import {
  Xona,
  Bolimlar,
  Shifokor,
  Navbatlar,
  Xisobotlar,
  Settings,
} from '@/shared/assets/widgets/Sidebar';

export const ListOfPages = memo(() => {
  const [linkId, setLinkId] = useState<number>();
  const { t, i18n } = useTranslation();

  const listOfPage = [
    {
      id: 1,
      path: '/department',
      title: t('Bo‘lim qo‘shish'),
      icon: <Bolimlar />,
    },
    {
      id: 2,
      path: '/add_room_age',
      title: t('Xona qo‘shish'),
      icon: <Xona />,
    },
    {
      id: 3,
      path: '/add_doctor',
      title: t('Shifokor qo‘shish'),
      icon: <Shifokor />,
    },
    {
      id: 4,
      path: '/reports',
      title: t('Hisobotlar'),
      icon: <Xisobotlar />,
    },
    { id: 5, path: '/navbatlar', title: t('Navbatlar'), icon: <Navbatlar /> },
  ];

  const setValuePath = (item: number) => {};

  const itemListOfPage = useMemo(
    () =>
      listOfPage.map((item) => (
        <Link
          onClick={() => {
            setValuePath(item.id);
            setLinkId(item.id);
          }}
          className={linkId === item.id ? cls.liActive : cls.li}
          key={item.title}
          to={item.path}
        >
          {item.icon}
          {item.title}
        </Link>
      )),
    [listOfPage],
  );

  return (
    <div className={cls.listOfPage}>
      <div className={cls.wrapper}>{itemListOfPage}</div>

      <hr className={cls.hr} />

      <p className={cls.SidebarTitle}>{t('Umumiy')}</p>

      <Link
        onClick={() => {
          setLinkId(6);
        }}
        className={linkId === 6 ? cls.liActive : cls.li}
        to="/settings"
      >
        <Settings />
        {t('Sozlamalar')}
      </Link>
    </div>
  );
});
