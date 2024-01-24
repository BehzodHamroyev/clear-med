import React from 'react';
import { useSelector } from 'react-redux';

import { ErrorReload } from '@/widgets/Error';
import { TableTitle } from '@/entities/TableTitle';
import { LoaderAdmin } from '@/widgets/LoaderAdmin';
import { ToastHalper } from '@/shared/ui/ToastHalper';
import { ButtonNavbar } from '@/entities/ButtonNavbar';
import { DepartmentAdd } from '@/entities/DepartmentAdd';
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
  /* useState */
  const [tableBody, setTableBody] = React.useState<any>([]);

  /* dispatch */
  const dispatch = useAppDispatch();

  /* useSelector */
  const getListOfDepartment = useSelector(getListOfDepartmens);

  const getDepartmentLoading = useSelector(getIsLoading);

  const getDepartmentError = useSelector(getError);

  /* useEffect */
  React.useEffect(() => {
    if (getListOfDepartment) {
      const tableBodys = getListOfDepartment?.map((item) => {
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
    departmentListChanged,
    isOpenDepartmentAddCard,
    isOpenDepartmentEditCard,
  } = React.useContext(ButtonsContext);

  React.useEffect(() => {
    dispatch(fetchDepartmentGetAll({}));
  }, [dispatch]);

  React.useEffect(() => {
    setTimeout(() => {
      dispatch(fetchDepartmentGetAll({}));
    }, 500);
  }, [departmentListChanged, dispatch]);

  /* UI */
  return (
    <div className={cls.DepartmentPageWrapper}>
      <DynamicModuleLoader reducers={reducer}>
        {getDepartmentLoading === true ? (
          <LoaderAdmin />
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

            {isOpenDepartmentAddCard ? <DepartmentAdd /> : ''}
            {isOpenDepartmentEditCard ? (
              <DepartmentEdit tableBody={tableBody} />
            ) : (
              ''
            )}
          </div>
        )}
      </DynamicModuleLoader>
    </div>
  );
};

export default DepartmentPage;
