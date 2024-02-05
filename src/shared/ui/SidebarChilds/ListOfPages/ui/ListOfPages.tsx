import React, { memo, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import {
  Xona,
  Settings,
  Bolimlar,
  Shifokor,
  Navbatlar,
  Xisobotlar,
} from '@/shared/assets/widgets/Sidebar';

import { ListOfPageTypes } from '../model/types/listOfPages';

import cls from './ListOfPages.module.scss';

// eslint-disable-next-line ulbi-tv-plugin/public-api-imports
import { getAuthUserData } from '@/features/Auth/model/selector/authUserSelector';

const listOfPageAdmin: ListOfPageTypes[] = [
  {
    id: 1,
    path: '/',
    title: 'Bo‘lim qo‘shish',
    icon: <Bolimlar />,
  },
  {
    id: 2,
    path: '/add-room',
    title: 'Xona qo‘shish',
    icon: <Xona />,
  },
  {
    id: 3,
    path: '/add_doctors',
    title: 'Shifokor qo‘shish',
    icon: <Shifokor />,
  },
  {
    id: 4,
    path: '/reports',
    title: 'Hisobotlar',
    icon: <Xisobotlar />,
  },
  {
    id: 5,
    path: '/queues',
    title: 'Navbatlar',
    icon: <Navbatlar />,
  },
  {
    id: 6,
    path: '/add_advertisement',
    title: 'Reklama qo’shish',
    icon: <Bolimlar />,
  },
  {
    id: 7,
    path: '/add_monitor',
    title: 'Monitor qo’shish',
    icon: <Bolimlar />,
  },
];

const listOfPageQabulXona: ListOfPageTypes[] = [
  {
    id: 1,
    path: '/',
    title: 'Navbat berish',
    icon: <Bolimlar />,
  },
  {
    id: 4,
    path: '/reports',
    title: 'Hisobotlar',
    icon: <Xisobotlar />,
  },

  // {
  //   id: 5, path: '/queues',
  //   title: 'Navbatlar', icon: <Navbatlar />
  // },
];

const listOfPageDoktor: ListOfPageTypes[] = [
  {
    id: 1,
    path: '/',
    title: 'Navbatlar',
    icon: <Navbatlar />,
  },
  {
    id: 2,
    path: '/reports',
    title: 'Hisobotlar',
    icon: <Xisobotlar />,
  },
];

const listOfPageMonitor: ListOfPageTypes[] = [
  {
    id: 1,
    path: '/',
    title: 'Navbatlar',
    icon: <Navbatlar />,
  },
];

export const ListOfPages = memo(() => {
  const location = useLocation();

  const { t } = useTranslation();

  const divRef = useRef<HTMLDivElement>(null);

  const authUserData = useSelector(getAuthUserData);

  const [LinkIndex, setLinkIndex] = useState<number>(1);

  const [listToUse, setListToUse] = useState<ListOfPageTypes[]>([]);

  const [profileValue, setProfileValue] = useState<string>('');

  useEffect(() => {
    if (authUserData) {
      setProfileValue(authUserData?.role);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUserData]);

  useEffect(() => {
    if (profileValue === 'admin') {
      if (divRef.current && location.pathname === '/') {
        divRef.current.style.top = '20px';
      } else if (divRef.current && location.pathname === '/add-room') {
        divRef.current.style.top = '63px';
      } else if (divRef.current && location.pathname === '/add_doctors') {
        divRef.current.style.top = '106px';
      } else if (divRef.current && location.pathname === '/reports') {
        divRef.current.style.top = '149px';
      } else if (divRef.current && location.pathname === '/queues') {
        divRef.current.style.top = '192px';
      } else if (divRef.current && location.pathname === '/add_advertisement') {
        divRef.current.style.top = '235px';
      } else if (divRef.current && location.pathname === '/add_monitor') {
        divRef.current.style.top = '280px';
      } else if (divRef.current && location.pathname === '/settings') {
        divRef.current.style.top = '388px';
      }
    } else if (profileValue === 'doktor') {
      if (divRef.current && location.pathname === '/') {
        divRef.current.style.top = '20px';
      } else if (divRef.current && location.pathname === '/reports') {
        divRef.current.style.top = '63px';
      } else if (divRef.current && location.pathname === '/settings') {
        divRef.current.style.top = '172px';
      }
    } else if (profileValue === 'reception') {
      if (divRef.current && location.pathname === '/') {
        divRef.current.style.top = '20px';
      } else if (divRef.current && location.pathname === '/reports') {
        divRef.current.style.top = '63px';
      } else if (divRef.current && location.pathname === '/queues') {
        divRef.current.style.top = '106px';
      } else if (divRef.current && location.pathname === '/settings') {
        divRef.current.style.top = '216px';
      }
    } else if (profileValue === 'monitor') {
      if (divRef.current && location.pathname === '/') {
        divRef.current.style.top = '20px';
      } else if (divRef.current && location.pathname === '/settings') {
        divRef.current.style.top = '63px';
      }
    }
  }, [profileValue, location]);

  useEffect(() => {
    if (profileValue === 'admin') {
      setListToUse(listOfPageAdmin);
    } else if (profileValue === 'doctor') {
      setListToUse(listOfPageDoktor);
    } else if (profileValue === 'reception') {
      setListToUse(listOfPageQabulXona);
    } else if (profileValue === 'monitor') {
      setListToUse(listOfPageMonitor);
    }
  }, [profileValue]);

  const itemListOfPage = listToUse.map((item, index) => {
    const classNamesOne =
      location.pathname === item.path ? cls.liActive : cls.li;

    return (
      <Link
        className={`${classNamesOne} `}
        key={item.title}
        to={item.path}
        onClick={() => setLinkIndex(index + 1)}
      >
        {item.icon}
        {t(item.title)}
      </Link>
    );
  });

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
          onClick={() => setLinkIndex(10)}
        >
          <Settings />
          {t('Sozlamalar')}
        </Link>
      </div>
    </div>
  );
});
