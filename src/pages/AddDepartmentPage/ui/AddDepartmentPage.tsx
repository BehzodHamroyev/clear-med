import React, { useEffect } from 'react';

import { useSelector } from 'react-redux';
import cls from './AddDepartmentPage.module.scss';

import { ButtonNavbar } from '@/entities/ButtonNavbar';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import { fetchAllDepartments } from '../model/service/fetchAllDepartments';
import {
  getAllDepartmentsData,
  getAllDepartmentsError,
  getAllDepartmentsIsLoading,
} from '../model/selector/AllDepartmentSelector';
import { LoaderAdmin } from '@/widgets/LoaderAdmin';
import ErrorDialog from '@/shared/ui/ErrorDialog/ErrorDialog';

const AddDepartmentPage = () => {
  const dispatch = useAppDispatch();

  const allDepartmentsData = useSelector(getAllDepartmentsData);
  const allDepartmentsIsLoading = useSelector(getAllDepartmentsIsLoading);
  const allDepartmentsError = useSelector(getAllDepartmentsError);

  useEffect(() => {
    dispatch(fetchAllDepartments({}));
  }, [dispatch]);

  return (
    <div className={cls.AddDepartmentPageWrp}>
      <ButtonNavbar CreateCarbonAdd TableTitle="Bo‘limlar" ItemsLength={1} />

      {allDepartmentsData && allDepartmentsData.length > 0 ? (
        <div>Data bor</div>
      ) : (
        <h1>Data yoq</h1>
      )}

      {allDepartmentsIsLoading && <LoaderAdmin />}

      {allDepartmentsError && <ErrorDialog isErrorProps={!false} />}
    </div>
  );
};

export default AddDepartmentPage;
