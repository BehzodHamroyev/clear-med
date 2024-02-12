/* eslint-disable max-len */
import React, { useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { CarbonAdd } from '@/shared/assets/entities/ButtonNavbar';

import cls from './AdvertisementAttachmentMonitor.module.scss';
import { TableTitleReklama } from '@/entities/TableTitleReklama';
import { AttachmentRoomMonitorChild } from '@/entities/AttachmentRoomMonitorChild';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import { AttachmentRoomMonitorChildEdit } from '@/entities/AttachmentRoomMonitorChildEdit';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getAdsData } from '../model/selector/getAdsVideo';
import { getAllAdsVideo } from '../model/service/getAllAdsVideo';
import {
  fetchGetAllMonitors,
  GetAllMonitorPageData,
} from '@/pages/AddMonitorPage';
import { getAllAdsVideoForOneMonitor } from '../model/service/getAllAdsVideoForOneMonitor';
import { getAdsDataForMonitor } from '../model/selector/getAdsVideoForOneMonitor';

/* svg */
const Svg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="21"
    viewBox="0 0 24 21"
    fill="none"
  >
    <path
      d="M9.72901 20.6361C9.98206 20.8744 10.32 21.005 10.6699 20.9998C11.0198 20.9947 11.3536 20.8541 11.5993 20.6085C11.8449 20.3628 11.9828 20.0318 11.9831 19.6869C11.9834 19.3419 11.8461 19.0107 11.6009 18.7647L4.44139 11.8096H22.6668C23.0204 11.8096 23.3595 11.6712 23.6095 11.4247C23.8595 11.1782 24 10.844 24 10.4954C24 10.1468 23.8595 9.81256 23.6095 9.56609C23.3595 9.31962 23.0204 9.18115 22.6668 9.18115H4.45072L11.6022 2.23535C11.8475 1.98929 11.9847 1.65806 11.9844 1.31311C11.9841 0.968164 11.8463 0.637163 11.6006 0.39153C11.3549 0.145897 11.0211 0.00532555 10.6712 0.000148224C10.3213 -0.0050291 9.98339 0.125603 9.73034 0.363856L0.496332 9.32966C0.339121 9.4825 0.214287 9.6646 0.129082 9.8654C0.0438771 10.0662 0 10.2817 0 10.4993C0 10.717 0.0438771 10.9325 0.129082 11.1333C0.214287 11.3341 0.339121 11.5162 0.496332 11.669L9.72901 20.6361Z"
      fill="black"
    />
  </svg>
);

/* halperArr */

const tableTitle: string[] = ['Surat', 'Nomi', 'Manzili', 'Sana'];

const tableBody: any = [
  {
    id: 'number',
    img: 'https://cdn.pixabay.com/photo/2023/07/04/08/31/cats-8105667_1280.jpg',
    item2: 'lor yonidi telivizor',
    item3: 'Open link',
    url: 'https://youtube.com/shorts/Q-SXOC8ji9Q?si=EhN3JThnaxznv5T4',
    lastChild: '16.01.2024',
  },
  {
    id: 'number',
    img: 'https://media.istockphoto.com/id/1437390637/photo/cute-ginger-kitten-sleeps.webp?s=1024x1024&w=is&k=20&c=yxwM2SCjXvVKkW44mIOCDnoDdgc1FWHW95qrCuHbD7I=',
    item2: 'asosiy telivizor',
    item3: 'Open link',
    url: 'https://youtube.com/shorts/Q-SXOC8ji9Q?si=EhN3JThnaxznv5T4',
    lastChild: '21.01.2024',
  },
  {
    id: 'number',
    img: 'https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    item2: 'qorovul oldidi telivizor',
    item3: 'Open link',
    url: 'https://youtu.be/OmBMD1Xy43Y?si=sBPNqiHnqWMvrkKL',
    lastChild: '03.01.2024',
  },
  {
    id: 'number',
    img: 'https://images.pexels.com/photos/2678059/pexels-photo-2678059.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    item2: 'uzi yonidagi telivizor',
    lastChild: '16.01.2024',
    item3: 'Open link',
    url: 'https://youtube.com/shorts/Q-SXOC8ji9Q?si=EhN3JThnaxznv5T4',
  },
];

/* Component */
const AdvertisementAttachmentMonitor = () => {
  /* useParams */
  const { id } = useParams();
  const listAdsVideo = useSelector(getAdsData);
  const dispatch = useAppDispatch();

  const getAllMonitorData = useSelector(GetAllMonitorPageData);
  const getAllForOneMonitor = useSelector(getAdsDataForMonitor);

  const {
    isOpenAttachmentRoomMonitorChild,
    setIsOpenAttachmentRoomMonitorChild,
    isOpenAttachmentRoomMonitorChildEdit,
  } = useContext(ButtonsContext);

  console.log(getAllForOneMonitor.data, 'll');

  useEffect(() => {
    dispatch(getAllAdsVideo({}));
    dispatch(fetchGetAllMonitors({}));
    dispatch(getAllAdsVideoForOneMonitor({ id: `${id}` }));
  }, [dispatch, id]);

  /* UI */
  return (
    <div>
      <div className={cls.RoomAttachmentMonitorWrapper}>
        {/* Title */}
        <div className={cls.RoomAttachmentMonitorWrapper__Title}>
          <Link
            className={cls['RoomAttachmentMonitorWrapper__Title--btn']}
            to={`/add_monitor/${id}`}
          >
            {Svg}
            Ortga
          </Link>
          <p className={cls['RoomAttachmentMonitorWrapper__Title--content']}>
            Monitorga biriktirilgan reklamalar <span>({tableBody.length})</span>
          </p>
          <CarbonAdd
            onClick={() => {
              setIsOpenAttachmentRoomMonitorChild(true);
            }}
            className={cls['RoomAttachmentMonitorWrapper__Title--create']}
          />
        </div>

        {/* Body */}

        <TableTitleReklama
          Tablethead={tableTitle}
          // @ts-ignore
          Tabletbody={getAllForOneMonitor.data}
        />
      </div>

      {isOpenAttachmentRoomMonitorChild ? (
        <AttachmentRoomMonitorChild
          data={listAdsVideo!}
          listMonitor={getAllMonitorData}
        />
      ) : (
        ''
      )}

      {isOpenAttachmentRoomMonitorChildEdit ? (
        <AttachmentRoomMonitorChildEdit />
      ) : (
        ''
      )}
    </div>
  );
};

export default AdvertisementAttachmentMonitor;
