import React, { useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { ErrorReload } from '@/widgets/Error';
import { TableTitle } from '@/entities/TableTitle';
import { ToastHalper } from '@/shared/ui/ToastHalper';
import { ButtonNavbar } from '@/entities/ButtonNavbar';
import { AddDepartmentFormDialog } from '@/entities/AddDepartmentFormDialog';
import { DepartmentEdit } from '@/entities/DepartmentEdit';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import { DepartmentListSliceReducer } from '../model/slice/getDepartmentSlice';
import { fetchDepartmentGetAll } from '../model/service/getAllDepartmentRequest';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
  getError,
  getIsLoading,
  getListOfDepartmens,
} from '../model/selectors/departmentList';

import cls from './DepartmentPage.module.scss';
import { Loader } from '@/widgets/Loader';

const tableTitle = ['Bo‘lim nomi', 'Shifokorlar soni', 'Xonalar raqami'];


const DepartmentPage = () => {
  const [tableBody, setTableBody] = React.useState<any>([]);

  const dispatch = useAppDispatch();

  const getListOfDepartment = useSelector(getListOfDepartmens);

  const getDepartmentLoading = useSelector(getIsLoading);

  const getDepartmentError = useSelector(getError);

  useEffect(() => {
    if (getListOfDepartment) {
      const tableBodys = getListOfDepartment?.map((item:any) => {
        return {
          id: item?.id,
          item1: item?.name,
          item2: '0',
          lastChild: '0',
          duration: item.duration,
          imgName: item.image,
        };
      });
      setTableBody(() => [...tableBodys]);
    }
  }, [getListOfDepartment]);

  const {
    isOpenDepartmentAddCard,
    isOpenDepartmentEditCard,
  } = useContext(ButtonsContext);

  useEffect(() => {
    dispatch(fetchDepartmentGetAll({}));
  }, [dispatch]);

  return (
    <div className={cls.DepartmentPageWrapper}>
      <>
        {getDepartmentLoading === true ? (
          <Loader />
        ) : getDepartmentError ? (
          <ErrorReload message={getDepartmentError} />
        ) : (
          <div>
            <div>
              <ButtonNavbar
                CreateCarbonAdd
                TableTitle="Bo‘limlar"
                ItemsLength={tableBody.length}
              />

              <TableTitle Tablethead={tableTitle} Tabletbody={tableBody} />
            </div>

            <ToastHalper />

            {isOpenDepartmentAddCard ? <AddDepartmentFormDialog /> : ''}
            {isOpenDepartmentEditCard ? (
              <DepartmentEdit tableBody={tableBody} />
            ) : (
              ''
            )}
          </div>
        )}
      </>
    </div>
  );
};

export default DepartmentPage;
