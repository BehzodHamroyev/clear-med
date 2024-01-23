import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import cls from './ReportsPage.module.scss';

import { ButtonNavbar } from '@/entities/ButtonNavbar';
import { TableTitleReports } from '@/entities/TableTitleReports';

import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchDoctorList } from '../model/services/fetchDoctorList';
import {
  getDoctorListData,
  getDoctorListError,
  getDoctorListIsLoading,
} from '../model/selectors/doctorListSelector';
import { Loader } from '@/widgets/Loader';
import ErrorDialog from '@/shared/ui/ErrorDialog/ErrorDialog';

const tableTitle = ['Bo‘lim', 'Xona', 'Shifokor ro‘yxati', 'Shifokor'];

const TableBody = [
  {
    id: 1,
    item1: 'Nervopotolog',
    item2: 'Umid Rustamov',
    item3: 2,
    KorilganBemorlar: [
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
    ],
  },
  {
    id: 2,
    item1: 'Ginekolog',
    item2: 'Hamroyev Behzod',
    item3: 3,
    KorilganBemorlar: [
      {
        id: 1,
        shifokor: 'Hamroyev Behzod',
        xona: '3',
        qabulboshlanishi: '9:30:24',
        qabultugashi: '9:50:12',
      },
    ],
  },
  {
    id: 3,
    item1: 'Akulist',
    item2: "G'ulomov Abbos",
    item3: 4,
    KorilganBemorlar: [
      {
        id: 1,
        shifokor: "G'ulomov Abbos",
        xona: '4',
        qabulboshlanishi: '9:30:24',
        qabultugashi: '9:50:12',
      },
    ],
  },
  {
    id: 4,
    item1: 'Pediator',
    item2: 'Tojiboyev Abdulaziz',
    item3: 5,
    KorilganBemorlar: [
      {
        id: 1,
        shifokor: 'Tojiboyev Abdulaziz',
        xona: '5',
        qabulboshlanishi: '9:30:24',
        qabultugashi: '9:50:12',
      },
    ],
  },
  {
    id: 5,
    item1: 'Glaznoy',
    item2: "Xusainov Ulug'bek",
    item3: 6,
    KorilganBemorlar: [],
  },
];

const ReportsPage = () => {
  const dispatch = useAppDispatch();

  const doctorList = useSelector(getDoctorListData);
  const doctorListIsLoading = useSelector(getDoctorListIsLoading);
  const doctorListIsError = useSelector(getDoctorListError);

  useEffect(() => {
    dispatch(fetchDoctorList({}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={cls.ReportsPageWrapper}>
      <ButtonNavbar TableTitle="Shifokorlar" ItemsLength={doctorList?.length} />

      {doctorList && (
        <TableTitleReports
          cursor
          Tablethead={tableTitle}
          Tabletbody={doctorList}
        />
      )}

      {doctorListIsLoading && <Loader />}

      {doctorListIsError && <ErrorDialog isErrorProps={!false} />}
    </div>
  );
};

export default ReportsPage;
