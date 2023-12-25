/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useContext, useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

import {
  Xona,
  Bolimlar,
  Shifokor,
  Navbatlar,
  Xisobotlar,
  Settings,
} from '@/shared/assets/widgets/Sidebar';

import cls from './ListOfPages.module.scss';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';

interface ListOfPageTypes {
  id: number;
  path: string;
  title: string;
  icon: any;
}

export const ListOfPages = memo(() => {
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const divRef = useRef<HTMLDivElement>(null);

  const { isProfileWho } = useContext(ButtonsContext);

  // const [profile] = useState('qabulxona');
  // const [profile] = useState('doktor');
  // const [profile] = useState('admin');

  const listOfPageAdmin: ListOfPageTypes[] = [
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
    { id: 5, path: '/queues', title: t('Navbatlar'), icon: <Navbatlar /> },
  ];

  const listOfPageQabulXona: ListOfPageTypes[] = [
    {
      id: 1,
      path: '/queuing_tv',
      title: t('Navbat berish'),
      icon: <Bolimlar />,
    },
    {
      id: 4,
      path: '/reports',
      title: t('Hisobotlar'),
      icon: <Xisobotlar />,
    },
    // { id: 5, path: '/resption', title: t('Navbatlar'), icon: <Navbatlar /> },
    { id: 5, path: '/queues', title: t('Navbatlar'), icon: <Navbatlar /> },
  ];

  const listOfPageDoktor: ListOfPageTypes[] = [
    {
      id: 1,
      path: '/reports_doctor',
      title: t('Hisobotlar'),
      icon: <Xisobotlar />,
    },
    {
      id: 2,
      path: '/queues_control_doctor',
      title: t('Navbatlar'),
      icon: <Navbatlar />,
    },
  ];

  useEffect(() => {
    if (isProfileWho === 'admin') {
      if (divRef.current && location.pathname === '/department') {
        divRef.current.style.top = '20px';
      } else if (divRef.current && location.pathname === '/add_room_age') {
        divRef.current.style.top = '63px';
      } else if (divRef.current && location.pathname === '/add_doctor') {
        divRef.current.style.top = '106px';
      } else if (divRef.current && location.pathname === '/reports') {
        divRef.current.style.top = '149px';
      } else if (divRef.current && location.pathname === '/queues') {
        divRef.current.style.top = '192px';
      } else if (divRef.current && location.pathname === '/settings') {
        divRef.current.style.top = '300px';
      }
    } else if (isProfileWho === 'doktor') {
      if (divRef.current && location.pathname === '/reports_doctor') {
        divRef.current.style.top = '20px';
      } else if (
        divRef.current &&
        location.pathname === '/queues_control_doctor'
      ) {
        divRef.current.style.top = '63px';
      } else if (divRef.current && location.pathname === '/settings') {
        divRef.current.style.top = '172px';
      }
    } else if (isProfileWho === 'qabulxona') {
      if (divRef.current && location.pathname === '/queuing_tv') {
        divRef.current.style.top = '20px';
      } else if (divRef.current && location.pathname === '/reports') {
        divRef.current.style.top = '63px';
      } else if (divRef.current && location.pathname === '/queues') {
        divRef.current.style.top = '106px';
      } else if (divRef.current && location.pathname === '/settings') {
        divRef.current.style.top = '216px';
      }
    }
  }, [location]);

  const itemListOfPage = useMemo(() => {
    let listToUse: any[] = [];

    if (isProfileWho === 'admin') {
      listToUse = listOfPageAdmin;
    } else if (isProfileWho === 'doktor') {
      listToUse = listOfPageDoktor;
    } else if (isProfileWho === 'qabulxona') {
      listToUse = listOfPageQabulXona;
    }

    return listToUse.map((item) => (
      <Link
        className={location.pathname === item.path ? cls.liActive : cls.li}
        key={item.title}
        to={item.path}
      >
        {item.icon}
        {item.title}
      </Link>
    ));
  }, [
    isProfileWho,
    listOfPageAdmin,
    listOfPageDoktor,
    listOfPageQabulXona,
    location.pathname,
    cls.liActive,
    cls.li,
  ]);

  return (
    <div className={cls.listOfPageWrapper}>
      <div className={cls.selectionMenu} ref={divRef} />

      <div className={cls.listOfPage}>
        <div className={cls.wrapper}>{itemListOfPage}</div>

        <hr className={cls.hr} />

        <p className={cls.SidebarTitle}>{t('Umumiy')}</p>

        <Link
          className={location.pathname === '/settings' ? cls.liActive : cls.li}
          to="/settings"
        >
          <Settings />
          {t('Sozlamalar')}
        </Link>
      </div>
    </div>
  );
});
