import React from 'react';
import { useTranslation } from 'react-i18next';

import { ButtonNavbar } from '@/entities/ButtonNavbar';
import { CheckedIcon, ErrorIcon } from '@/shared/assets/Pages/Doctor';
import { ControlPanelDocktor } from '@/entities/ControlPanelDocktor';
import { TableTitleDoctorProfile } from '@/entities/TableTitleDoctorProfile';

import cls from './QueuesControlDoctor.module.scss';

const KorilganBemorlar = [
  {
    id: 1,
    shifokor: 'Umid Rustamov',
    xona: '2',
    qabulboshlanishi: '9:30:24',
    qabultugashi: '9:50:12',
  },
  {
    id: 2,
    shifokor: 'Umid Rustamov',
    xona: '2',
    qabulboshlanishi: '10:00:24',
    qabultugashi: '10:34:53',
  },
  {
    id: 3,
    shifokor: 'Umid Rustamov',
    xona: '2',
    qabulboshlanishi: '11:40:04',
    qabultugashi: '12:10:22',
  },
  {
    id: 4,
    shifokor: 'Umid Rustamov',
    xona: '2',
    qabulboshlanishi: '12:20:02',
    qabultugashi: '12:50:12',
  },
];

const TableBodyCretedPatient = [
  {
    id: 1,
    img: CheckedIcon,
    item1: 'AKU18',
    item2: '15:34:25',
    item3: '15:47:28',
  },
  {
    id: 2,
    img: CheckedIcon,
    item1: 'AKU18',
    item2: '15:34:25',
    item3: '15:47:28',
  },
  {
    id: 3,
    img: ErrorIcon,
    item1: 'AKU18',
    item2: '15:34:25',
    item3: '15:47:28',
  },
  {
    id: 4,
    img: CheckedIcon,
    item1: 'AKU18',
    item2: '15:34:25',
    item3: '15:47:28',
  },
  {
    id: 5,
    img: CheckedIcon,
    item1: 'AKU18',
    item2: '15:34:25',
    item3: '15:47:28',
  },
  {
    id: 6,
    img: CheckedIcon,
    item1: 'AKU18',
    item2: '15:34:25',
    item3: '15:47:28',
  },
  {
    id: 7,
    img: ErrorIcon,
    item1: 'AKU18',
    item2: '15:34:25',
    item3: '15:47:28',
  },
  {
    id: 8,
    img: CheckedIcon,
    item1: 'AKU18',
    item2: '15:34:25',
    item3: '15:47:28',
  },
  {
    id: 9,
    img: CheckedIcon,
    item1: 'AKU18',
    item2: '15:34:25',
    item3: '15:47:28',
  },
  {
    id: 10,
    img: CheckedIcon,
    item1: 'AKU18',
    item2: '15:34:25',
    item3: '15:47:28',
  },
  {
    id: 11,
    img: ErrorIcon,
    item1: 'AKU18',
    item2: '15:34:25',
    item3: '15:47:28',
  },
  {
    id: 12,
    img: CheckedIcon,
    item1: 'AKU18',
    item2: '15:34:25',
    item3: '15:47:28',
  },
  {
    id: 13,
    img: CheckedIcon,
    item1: 'AKU18',
    item2: '15:34:25',
    item3: '15:47:28',
  },
  {
    id: 14,
    img: CheckedIcon,
    item1: 'AKU18',
    item2: '15:34:25',
    item3: '15:47:28',
  },
  {
    id: 15,
    img: ErrorIcon,
    item1: 'AKU18',
    item2: '15:34:25',
    item3: '15:47:28',
  },
  {
    id: 16,
    img: CheckedIcon,
    item1: 'AKU18',
    item2: '15:34:25',
    item3: '15:47:28',
  },
];

const TableBodyQueuesPatients = [
  { id: 1, item1: 'AKU18', item2: '15:34:25' },
  { id: 2, item1: 'AKU19', item2: '15:35:25' },
  { id: 3, item1: 'AKU20', item2: '15:36:25' },
  { id: 4, item1: 'AKU21', item2: '15:37:25' },
  { id: 5, item1: 'AKU22', item2: '15:38:25' },
  { id: 6, item1: 'AKU23', item2: '15:39:25' },
  { id: 7, item1: 'AKU24', item2: '15:30:25' },
  { id: 8, item1: 'AKU25', item2: '15:31:25' },
  { id: 9, item1: 'AKU26', item2: '15:32:25' },
  { id: 10, item1: 'AKU27', item2: '15:34:25' },
  { id: 11, item1: 'AKU28', item2: '15:44:25' },
  { id: 12, item1: 'AKU29', item2: '15:34:25' },
];

const QueuesControlDoctor = () => {
  const { t } = useTranslation();

  return (
    <div className={cls.QueuesControlDoctorWrapper}>
      <ButtonNavbar
        dontCreate
        TableTitle="Qabullar"
        ItemsLength={KorilganBemorlar.length}
      />

      <ControlPanelDocktor />

      <div className={cls.TableDoctor}>
        <div className={cls.TableDoctorChild}>
          <TableTitleDoctorProfile
            Tablethead={['Id', 'Qabul boshlanishi', 'Qabul tugashi', 'Xolati']}
            Tabletbody={TableBodyCretedPatient}
          />
        </div>
        <div className={cls.TableDoctorChild}>
          <TableTitleDoctorProfile
            Tablethead={['Id', 'Bilet berilgan vaqti']}
            Tabletbody={TableBodyQueuesPatients}
          />
        </div>
      </div>

      {/* <h3 className={cls.TableTitle}>{t('Amaldagi navbat ')}</h3> */}
    </div>
  );
};

export default QueuesControlDoctor;
