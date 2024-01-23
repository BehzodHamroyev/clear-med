import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import cls from './TableTitle.module.scss';
import { TableInfo } from '../model/types/TableInfo';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import { PenTools } from '@/shared/assets/entities/TableTitle';

const TableTitle = (props: TableInfo) => {
  const { Tablethead, Tabletbody, cursor } = props;

  const location = useLocation();

  const {
    setDepartmentGetId,
    setIsOpenRoomEditCard,
    setIsOpenDoctorEditCard,
    setIsOpenDepartmentEditCard,
  } = useContext(ButtonsContext);

  const handleCardAddCard = (id: string) => {
    setDepartmentGetId(id);
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
          {Tablethead.map((title: string, index) => (
            <th key={index + 1} className={cls.th}>
              {title}
            </th>
          ))}
        </tr>
      </thead>

      <tbody className={cls.Tabletbody}>
        {Tabletbody.map((item) => {
          return (
            <tr
              key={item?.id}
              className={`${cls.tr} ${cursor ? cls.clicked : ''}`}
            >
              {item?.img ? (
                <td className={cls.td}>
                  <img className={cls.Img} src={item.img} alt="#" />
                </td>
              ) : (
                ''
              )}

              {item?.item1 ? <td className={cls.td}>{item.item1}</td> : ''}
              {item?.item2 ? <td className={cls.td}>{item.item2}</td> : ''}
              {item?.item3 ? <td className={cls.td}>{item.item3}</td> : ''}
              {item?.item4 ? <td className={cls.td}>{item.item4}</td> : ''}
              {item?.item5 ? <td className={cls.td}>{item.item5}</td> : ''}
              {item?.item6 ? <td className={cls.td}>{item.item6}</td> : ''}
              {item?.item7 ? <td className={cls.td}>{item.item7}</td> : ''}
              {item?.item8 ? <td className={cls.td}>{item.item8}</td> : ''}
              {item?.lastChild ? (
                <td className={`${cls.lastChild}`}>
                  <pre>{item?.lastChild}</pre>{' '}
                  <PenTools onClick={() => handleCardAddCard(`${item.id}`)} />
                </td>
              ) : (
                ''
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TableTitle;
