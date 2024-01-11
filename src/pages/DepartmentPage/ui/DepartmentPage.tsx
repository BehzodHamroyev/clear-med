import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { TableTitle } from '@/entities/TableTitle';
import { ButtonNavbar } from '@/entities/ButtonNavbar';
import { DepartmentAdd } from '@/entities/DepartmentAdd';
import { DepartmentEdit } from '@/entities/DepartmentEdit';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import { getListOfDepartmens } from '../model/selectors/departmentList';
import { DepartmentListSliceReducer } from '../model/slice/getDepartmentSlice';
import { fetchDepartmentGetAll } from '../model/service/getAllDepartmentRequest';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import {
  ReducersList,
  DynamicModuleLoader,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

import cls from './DepartmentPage.module.scss';

const tableTitle = ['Bo‘lim nomi', 'Shifokorlar soni', 'Xonalar raqami'];

const reducer: ReducersList = {
  departmentPage: DepartmentListSliceReducer,
};

const DepartmentPage = () => {
  const [tableBody, setTableBody] = useState<any>([]);

  const dispatch = useAppDispatch();

  const getListOfDepartment = useSelector(getListOfDepartmens);

  useEffect(() => {
    if (getListOfDepartment) {
      const tableBodys = getListOfDepartment?.map((item) => {
        return {
          id: item?.id,
          item1: item?.name,
          item2: '',
          lastChild: ' ',
          duration: item.duration,
          imgName: item.image,
        };
      });
      setTableBody(() => [...tableBodys]);
    }
  }, [getListOfDepartment]);

  const {
    departmentListChanged,
    isOpenDepartmentAddCard,
    isOpenDepartmentEditCard,
  } = useContext(ButtonsContext);

  useEffect(() => {
    dispatch(fetchDepartmentGetAll({}));
  }, [dispatch]);

  useEffect(() => {
    setTimeout(() => {
      dispatch(fetchDepartmentGetAll({}));
    }, 500);
  }, [departmentListChanged, dispatch]);

  return (
    <DynamicModuleLoader reducers={reducer}>
      <div className={cls.DepartmentPageWrapper}>
        <ButtonNavbar
          CreateCarbonAdd
          TableTitle="Bo‘limlar"
          ItemsLength={tableBody.length}
        />

        <TableTitle Tablethead={tableTitle} Tabletbody={tableBody} />
      </div>

      {isOpenDepartmentAddCard ? <DepartmentAdd /> : ''}
      {isOpenDepartmentEditCard ? <DepartmentEdit tableBody={tableBody} /> : ''}
    </DynamicModuleLoader>
  );
};

export default DepartmentPage;
