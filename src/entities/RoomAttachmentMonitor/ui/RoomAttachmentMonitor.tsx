/* eslint-disable max-len */
import React, { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import { CarbonAdd } from '@/shared/assets/entities/ButtonNavbar';

import cls from './roomAttachmentMonitor.module.scss';
import { TableTitle } from '@/entities/TableTitle';
import { RoomAttachmentMonitorChildForm } from '@/entities/RoomAttachmentMonitorChildForm';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import { RoomAttachmentMonitorChildFormEdit } from '@/entities/RoomAttachmentMonitorChildFormEdit';

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

const Tablethead = ['Xona raqami', 'Bo‘limlar', 'Shifokorlar'];

const Tablebody = [
  { id: 1, item1: '1', item2: 'Akusher', lastChild: 'Qudrat Fatxullayev' },
  { id: 2, item1: '2', item2: 'Ginokolog', lastChild: 'Azamat Fatxullayev' },
  { id: 3, item1: '3', item2: 'Lor', lastChild: 'Tohir Karimov' },
  {
    id: 4,
    item1: '4',
    item2: 'Teropetologiya',
    lastChild: 'Yulya Sergeyovna',
  },
];

/* Component */
const RoomAttachmentMonitor = () => {
  /* useParams */
  const { id } = useParams();

  const { t } = useTranslation();

  const {
    isOpenRoomAttachmentMonitorChildFormedit,
    setIsOpenRoomAttachmentMonitorChildFormEdit,
    isOpenRoomAttachmentMonitorChildForm,
    setIsOpenRoomAttachmentMonitorChildForm,
  } = useContext(ButtonsContext);

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
            {t('Ortga')}
          </Link>
          <p className={cls['RoomAttachmentMonitorWrapper__Title--content']}>
            {id} - {t('Monitorga biriktirilgan xonalar')}{' '}
            <span>({Tablebody.length})</span>
          </p>
          <CarbonAdd
            onClick={() => setIsOpenRoomAttachmentMonitorChildForm(true)}
            className={cls['RoomAttachmentMonitorWrapper__Title--create']}
          />
        </div>

        {/* Body */}

        <TableTitle Tablethead={Tablethead} Tabletbody={Tablebody} />
      </div>

      {/* halper popup */}
      {isOpenRoomAttachmentMonitorChildForm ? (
        <RoomAttachmentMonitorChildForm />
      ) : (
        ''
      )}

      {isOpenRoomAttachmentMonitorChildFormedit ? (
        <RoomAttachmentMonitorChildFormEdit />
      ) : (
        ''
      )}
    </div>
  );
};

export default RoomAttachmentMonitor;
