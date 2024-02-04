import React, { useEffect } from 'react';

import { useSelector } from 'react-redux';
import cls from './AddDoctorsPage.module.scss';

import { fetchAllDoctors } from '../model/service/fetchAllDoctors';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import {
  getAllDoctorsData,
  getAllDoctorsError,
  getAllDoctorsIsLoading,
} from '../model/selector/AllDoctorsSelector';
import { LoaderAdmin } from '@/widgets/LoaderAdmin';
import ErrorDialog from '@/shared/ui/ErrorDialog/ErrorDialog';

const AddDoctorsPage = () => {
  const dispatch = useAppDispatch();

  const allDoctorsData = useSelector(getAllDoctorsData);
  const allDoctorsIsLoading = useSelector(getAllDoctorsIsLoading);
  const allDoctorsError = useSelector(getAllDoctorsError);

  useEffect(() => {
    dispatch(fetchAllDoctors({}));
  }, [dispatch]);

  return (
    <div className={cls.AddDoctorsPage}>
      {allDoctorsIsLoading ? <LoaderAdmin /> : ''}
      {allDoctorsError ? <ErrorDialog isErrorProps={!false} /> : ''}
      {allDoctorsData && allDoctorsData.length > 0 ? <h1>data bor</h1> : ''}
    </div>
  );
};

export default AddDoctorsPage;
