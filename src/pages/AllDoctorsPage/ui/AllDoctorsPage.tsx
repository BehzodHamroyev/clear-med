import React, { useEffect } from 'react';

import { useSelector } from 'react-redux';
import cls from './AllDoctorsPage.module.scss';

import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchAllDoctors } from '../model/service/fetchAllDoctors';

import {
  getAllDoctorsData,
  getAllDoctorsError,
  getAllDoctorsIsLoading,
} from '../model/selector/AllDoctorsSelector';
import { LoaderAdmin } from '@/widgets/LoaderAdmin';
import ErrorDialog from '@/shared/ui/ErrorDialog/ErrorDialog';

const AllDoctorsPage = () => {
  const dispatch = useAppDispatch();

  const allDoctorsData = useSelector(getAllDoctorsData);
  const allDoctorsIsLoading = useSelector(getAllDoctorsIsLoading);
  const allDoctorsError = useSelector(getAllDoctorsError);

  useEffect(() => {
    dispatch(fetchAllDoctors({}));
  }, [dispatch]);

  return (
    <div className={cls.AllDoctorsPage}>
      {allDoctorsIsLoading ? <LoaderAdmin /> : ''}
      {allDoctorsError ? <ErrorDialog isErrorProps={!false} /> : ''}
      {allDoctorsData && allDoctorsData.length > 0 ? <h1>data bor</h1> : ''}
    </div>
  );
};

export default AllDoctorsPage;
