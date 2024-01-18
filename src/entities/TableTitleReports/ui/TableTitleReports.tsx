import React, { useContext } from 'react';
import { useLocation, Link } from 'react-router-dom';

import { TableInfo } from '../model/types/TableInfo';
import { PenTools } from '@/shared/assets/entities/TableTitle';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';

import cls from './TableTitle.module.scss';

const TableTitleReports = (props: TableInfo) => {
  const { Tablethead, Tabletbody, cursor } = props;

  const location = useLocation();

  const {
    setIsOpenRoomEditCard,
    setIsOpenDoctorEditCard,
    setIsOpenDepartmentEditCard,
  } = useContext(ButtonsContext);

  const handleCardAddCard = () => {
    /* agar ushbu setIsOpenDepartmentAddCard admin page dan boshqa location.pathname === '/' ishlab ketsa ushbu qatorni o'zgartiriladi Murojat uchun: Ja'far */
    if (location.pathname === '/') {
      setIsOpenDepartmentEditCard(true);
    } else if (location.pathname === '/add_room_age') {
      setIsOpenRoomEditCard(true);
    } else if (location.pathname === '/add_doctor') {
      setIsOpenDoctorEditCard(true);
    }
  };

  return (
    <table className={cls.TableTitleWrapper}>
      <thead className={cls.Tablethead}>
        <tr className={cls.tr}>
          {Tablethead.map((title: string) => (
            <th key={title} className={cls.th}>
              {title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className={cls.Tabletbody}>
        {Tabletbody.map((item) => (
          <Link
            style={{ listStyle: 'none', textDecoration: 'none', color: '#000' }}
            to={`/reports/${item.id}`}
          >
            <tr
              key={item.id}
              className={`${cls.tr} ${cursor ? cls.clicked : ''}`}
            >
              {item.img ? (
                <td className={cls.td}>
                  <img className={cls.Img} src={item.img} alt="#" />
                </td>
              ) : (
                ''
              )}
              {item.item1 ? <td className={cls.td}>{item.item1}</td> : ''}
              {item.item2 ? <td className={cls.td}>{item.item2}</td> : ''}
              {item.item3 ? <td className={cls.td}>{item.item3}</td> : ''}
              {item.KorilganBemorlar ? (
                <td className={cls.td}>{item.KorilganBemorlar?.length}</td>
              ) : (
                ''
              )}
              {/* {item.item5 ? <td className={cls.td}>{item.item5}</td> : ''}
              {item.item6 ? <td className={cls.td}>{item.item6}</td> : ''}
              {item.item7 ? <td className={cls.td}>{item.item7}</td> : ''}
              {item.item8 ? <td className={cls.td}>{item.item8}</td> : ''} */}
              {item.lastChild ? (
                <td className={`${cls.lastChild}`}>
                  <pre>{item.lastChild}</pre>{' '}
                  <PenTools onClick={handleCardAddCard} />
                </td>
              ) : (
                ''
              )}
            </tr>
          </Link>
        ))}
      </tbody>
    </table>
  );
};

export default TableTitleReports;
