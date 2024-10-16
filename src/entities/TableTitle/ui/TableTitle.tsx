import React, { useContext } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import cls from './TableTitle.module.scss';
import { TableInfo } from '../model/types/TableInfo';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import { DeleteTools, PenTools } from '@/shared/assets/entities/TableTitle';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const TableTitle = (props: TableInfo) => {
  const { Tablethead, Tabletbody, cursor } = props;

  const location = useLocation();

  const { t } = useTranslation();

  const { id } = useParams();

  const url = `/add_monitor/${id}/room_attachment_monitor`;

  const {
    setDepartmentGetId,
    setIsOpenRoomEditCard,
    setIsOpenDoctorEditCard,
    setIsOpenDepartmentEditCard,
    setIsOpenRoomAttachmentMonitorChildFormEdit,
  } = useContext(ButtonsContext);

  const handleCardAddCard = (id: string) => {
    setDepartmentGetId(id);

    if (location.pathname === '/') {
      setIsOpenDepartmentEditCard(true);
    } else if (location.pathname === '/add-room') {
      setIsOpenRoomEditCard(true);
    } else if (location.pathname === '/add_doctor') {
      setIsOpenDoctorEditCard(true);
    } else if (location.pathname === url) {
      setIsOpenRoomAttachmentMonitorChildFormEdit(true);
    }
  };

  return (
    <table className={cls.TableTitleWrapper}>
      <thead className={cls.Tablethead}>
        <tr className={cls.tr}>
          {Tablethead.map((title: string, index) => (
            <th key={index + 1} className={cls.th}>
              {t(title)}
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
                  <LazyLoadImage className={cls.Img} src={item.img} alt="#" />
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

              {item?.lastInDeleteChild ? (
                <td className={`${cls.lastChild}`}>
                  <pre>{item?.lastInDeleteChild}</pre>{' '}
                  <DeleteTools
                    onClick={() => handleCardAddCard(`${item.id}`)}
                  />
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
