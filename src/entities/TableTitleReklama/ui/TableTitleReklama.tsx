/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { Delete } from '@mui/icons-material';
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
                    Open link
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
              <td className={cls.td}>
                <Delete />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TableTitleReklama;
