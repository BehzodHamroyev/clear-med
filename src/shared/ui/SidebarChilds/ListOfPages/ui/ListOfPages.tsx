import React, { memo, useContext, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

import {
  Bolimlar,
  Navbatlar,
  Settings,
  Shifokor,
  Xisobotlar,
  Xona,
} from '@/shared/assets/widgets/Sidebar';
import { getUserData } from '@/features/Auth';
import { ListOfPageTypes } from '../model/types/listOfPages';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';

import cls from './ListOfPages.module.scss';

const listOfPageAdmin: ListOfPageTypes[] = [
  {
    id: 1,
    path: '/department',
    title: 'Bo‘lim qo‘shish',
    icon: <Bolimlar />,
  },
  {
    id: 2,
    path: '/add_room_age',
    title: 'Xona qo‘shish',
    icon: <Xona />,
  },
  {
    id: 3,
    path: '/add_doctor',
    title: 'Shifokor qo‘shish',
    icon: <Shifokor />,
  },
  {
    id: 4,
    path: '/reports',
    title: 'Hisobotlar',
    icon: <Xisobotlar />,
  },
  { id: 5, path: '/queues', title: 'Navbatlar', icon: <Navbatlar /> },
];

const listOfPageQabulXona: ListOfPageTypes[] = [
  {
    id: 1,
    path: '/queuing_tv',
    title: 'Navbat berish',
    icon: <Bolimlar />,
  },
  {
    id: 4,
    path: '/reports',
    title: 'Hisobotlar',
    icon: <Xisobotlar />,
  },

  { id: 5, path: '/queues', title: 'Navbatlar', icon: <Navbatlar /> },
];

const listOfPageDoktor: ListOfPageTypes[] = [
  {
    id: 1,
    path: '/reports_doctor',
    title: 'Hisobotlar',
    icon: <Xisobotlar />,
  },
  {
    id: 2,
    path: '/queues_control_doctor',
    title: 'Navbatlar',
    icon: <Navbatlar />,
  },
];

export const ListOfPages = memo(() => {
  const location = useLocation();

  const { t } = useTranslation();

  const divRef = useRef<HTMLDivElement>(null);

  const loginData = useSelector(getUserData);

  const { isProfileWho } = useContext(ButtonsContext);

  const [listToUse, setListToUse] = useState<ListOfPageTypes[]>([]);

  const [listItemMenuClicked, setListItemMenuClicked] =
    useState<boolean>(false);

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
  }, [isProfileWho, location]);

  useEffect(() => {
    if (loginData?.role === 'admin') {
      setListToUse(listOfPageAdmin);
    } else if (loginData?.role === 'doktor') {
      setListToUse(listOfPageDoktor);
    } else if (loginData?.role === 'qabulxona') {
      setListToUse(listOfPageQabulXona);
    }
  }, [loginData?.role]);

  const itemListOfPage = listToUse.map((item) => (
    <Link
      className={location.pathname === item.path ? cls.liActive : cls.li}
      key={item.title}
      to={item.path}
      onClick={() => setListItemMenuClicked(true)}
    >
      {item.icon}
      {t(item.title)}
    </Link>
  ));

  return (
    <div className={cls.listOfPageWrapper}>
      {listItemMenuClicked ? (
        <div className={cls.selectionMenu} ref={divRef} />
      ) : (
        ''
      )}

      <div className={cls.listOfPage}>
        <div className={cls.wrapper}>{itemListOfPage}</div>

        <hr className={cls.hr} />

        <p className={cls.SidebarTitle}>{t('Umumiy')}</p>

        <Link
          className={location.pathname === '/settings' ? cls.liActive : cls.li}
          to="/settings"
          onClick={() => setListItemMenuClicked(true)}
        >
          <Settings />
          {t('Sozlamalar')}
        </Link>
      </div>
    </div>
  );
});
