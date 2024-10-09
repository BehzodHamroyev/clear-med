import React, { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import { Videos } from '@/entities/AdvertisementAttachmentMonitor';
import { DeleteTools } from '@/shared/assets/entities/TableTitle';
import { connectionIdOfAds } from '../../../entities/AdvertisementAttachmentMonitor/model/selector/getAdsVideoForOneMonitor';
import DeleteAdsFormDialogForMonitor from '../../../entities/DeleteAdsFormDialogForMonitor/DeleteAdsFormDialogForMonitor';
import cls from './TableTitleReklama.module.scss';
import { LazyLoadImage } from 'react-lazy-load-image-component';

interface TableInfo {
  cursor?: boolean;
  Tablethead: string[];
  Tabletbody: Videos[];
}

const TableTitleReklama = (props: TableInfo) => {
  const { t } = useTranslation();

  const { Tablethead, Tabletbody, cursor } = props;
  const [idAds, setIdAds] = useState('');
  const connectionId = useSelector(connectionIdOfAds);

  const { id } = useParams();
  const url = `/add_monitor/${id}/advertisement_attachment_monitor`;

  const location = useLocation();

  const {
    setDepartmentGetId,
    setIsOpenRoomEditCard,
    setIsOpenDoctorEditCard,
    setIsOpenDepartmentEditCard,
    setIsOpenAdvertisementEditCard,
    setIsOpenAttachmentRoomMonitorChildEdit,
    setIsOpenAdvertisementDeleteAdsForMonitor,
    isOpenAdvertisementDeleteAdsForMonitor,
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
              {t(title)}
            </th>
          ))}
        </tr>
      </thead>

      {isOpenAdvertisementDeleteAdsForMonitor && (
        <DeleteAdsFormDialogForMonitor
          adsId={idAds}
          connectionId={connectionId}
          id={id}
        />
      )}

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
                  {item.photo ? (
                    <LazyLoadImage className={cls.Img} src={item.photo} alt=" " />
                  ) : (
                    <p> </p>
                  )}
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
              salom
              <td
                className={`${cls.lastChild}`}
                onClick={() => {
                  setIdAds(item.id);
                  setIsOpenAdvertisementDeleteAdsForMonitor(true);
                }}
              >
                {/* <pre>{item?.lastInDeleteChild}</pre>{' '} */}
                <DeleteTools style={{ maxWidth: '25px' }} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TableTitleReklama;
