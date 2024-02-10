/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { useLocation, useParams } from 'react-router-dom';

// import { PenTools } from '@/shared/assets/entities/TableTitle';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';

import cls from './TableTitleReklama.module.scss';
import { Videos } from '@/entities/AdvertisementAttachmentMonitor';

interface TableInfo {
  cursor?: boolean;
  Tablethead: string[];
  Tabletbody: Videos[];
}

const TableTitleReklama = (props: TableInfo) => {
  /* props */
  const { Tablethead, Tabletbody, cursor } = props;

  console.log(props.Tabletbody, 'kk');

  /* useParams */
  const { id } = useParams();
  const url = `/add_monitor/${id}/advertisement_attachment_monitor`;

  /* useLocation */
  const location = useLocation();

  /* useContext */
  const {
    setDepartmentGetId,
    setIsOpenRoomEditCard,
    setIsOpenDoctorEditCard,
    setIsOpenDepartmentEditCard,
    setIsOpenAdvertisementEditCard,
    setIsOpenAttachmentRoomMonitorChildEdit,
  } = React.useContext(ButtonsContext);

  /* haler functions */
  const handleCardAddCard = (id: string) => {
    setDepartmentGetId(id);
    /* agar ushbu setIsOpenDepartmentAddCard admin page dan boshqa location.pathname === '/' ishlab ketsa ushbu qatorni o'zgartiriladi Murojat uchun: Ja'far */

    if (location.pathname === '/') {
      setIsOpenDepartmentEditCard(true);
    } else if (location.pathname === '/add-room') {
      setIsOpenRoomEditCard(true);
    } else if (location.pathname === '/add_doctor') {
      setIsOpenDoctorEditCard(true);
    } else if (location.pathname === '/add_advertisement') {
      setIsOpenAdvertisementEditCard(true);
    } else if (location.pathname === url) {
      setIsOpenAttachmentRoomMonitorChildEdit(true);
    }
  };


  
  /* UI */
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
        {Tabletbody?.map((item) => {
          const date = new Date(item.createdAt);
          // Extract day, month, and year
          const day = date.getDate();
          const month = date.getMonth() + 1; // Month is zero-based, so add 1
          const year = date.getFullYear();

          return (
            <tr
              key={item?.id}
              className={`${cls.tr} ${cursor ? cls.clicked : ''}`}
            >
              {item?.photo ? (
                <td className={cls.td}>
                  <img className={cls.Img} src={item.photo} alt="#" />
                </td>
              ) : (
                ''
              )}

              {item?.name ? <td className={cls.td}>{item.name}</td> : ''}
              {/* {item?.item2 ? <td className={cls.td}>{item.item2}</td> : ''} */}
              {item?.link ? (
                <td className={cls.td}>
                  <a
                    target="_blank"
                    className={cls.btnLink}
                    href={`${item.link}`}
                    rel="noreferrer"
                  >
                    {item.link}
                  </a>
                </td>
              ) : (
                ''
              )}
              {item?.createdAt ? (
                <td className={cls.td}>{`${day}/${month}/${year}`}</td>
              ) : (
                ''
              )}
              {/* {item?.item5 ? <td className={cls.td}>{item.item5}</td> : ''}
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
              )} */}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TableTitleReklama;
