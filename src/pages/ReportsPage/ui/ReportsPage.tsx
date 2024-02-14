import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useTranslation } from 'react-i18next';
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

const tableTitle = ['Bo’lim', 'Xona', 'Shifokor ro‘yxati', 'Shifokor'];

const ReportsPage = () => {
  const dispatch = useAppDispatch();

  const doctorList = useSelector(getDoctorListData);
  const doctorListIsLoading = useSelector(getDoctorListIsLoading);
  const doctorListIsError = useSelector(getDoctorListError);

  useEffect(() => {
    dispatch(fetchDoctorList({}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { t } = useTranslation();

  return (
    <div className={cls.ReportsPageWrapper}>
      <ButtonNavbar
        TableTitle={t('Shifokorlar')}
        ItemsLength={doctorList?.length}
      />

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
