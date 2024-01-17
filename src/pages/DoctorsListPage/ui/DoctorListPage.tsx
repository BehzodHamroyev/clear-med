import React from 'react';
import { useSelector } from 'react-redux';

import { ErrorReload } from '@/widgets/Error';
import { DoctorAdd } from '@/entities/DoctorAdd';
import { DoctorEdit } from '@/entities/DoctorEdit';
import { TableTitle } from '@/entities/TableTitle';
import { ButtonNavbar } from '@/entities/ButtonNavbar';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import { DoctorListSliceReducer } from '../model/slice/getDoctorSlice';
import { fetchDoctorGetAll } from '../model/service/fetchDoctorGetAll';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import {
  ReducersList,
  DynamicModuleLoader,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

import {
  getError,
  getIsLoading,
  getListOfDoctor,
} from '../model/selector/doctorListSelector';

import cls from './AddDoctorPage.module.scss';
import { LoaderAdmin } from '@/widgets/LoaderAdmin';

const tableTitle = [
  'Surat',
  'F.I.Sh',
  'Xona',
  'Bo’lim',
  'Tajribasi',
  'Telefon raqami',
];

const reducer: ReducersList = {
  getDoctorPageReducer: DoctorListSliceReducer,
};

const DoctorListPage = () => {
  const [tableBody, setTableBody] = React.useState<any>([]);

  const { isOpenDoctorAddCard, isOpenDoctorEditCard } =
    React.useContext(ButtonsContext);

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchDoctorGetAll({}));
  }, [dispatch]);

  const getDoctorData = useSelector(getListOfDoctor);

  const getDoctorLoading = useSelector(getIsLoading);

  const getDoctorError = useSelector(getError);

  React.useEffect(() => {
    if (getDoctorData) {
      const tableBodys = getDoctorData?.map((item) => {
        return {
          id: item?._id,
          item1: item?.name !== undefined ? item?.name : ' ',
          item2: `${
            item?.rooms?.[0]?.name !== undefined ? item?.rooms?.[0]?.name : ' '
          }`,
          item3: `${item?.rooms?.[0]?.department_id?.name}`,
          item4: item?.exprience,
          lastChild: item?.login,
          img: `http://magicsoft.uz/med/uploads/${item.photo}`,
        };
      });
      setTableBody(() => [...tableBodys]);
    }
  }, [getDoctorData]);

  return (
    <DynamicModuleLoader reducers={reducer}>
      {getDoctorLoading === true ? (
        <LoaderAdmin />
      ) : getDoctorError ? (
        <ErrorReload message={getDoctorError} />
      ) : (
        <div>
          <div className={cls.AddDoctorPageWrapper}>
            <ButtonNavbar
              CreateCarbonAdd
              TableTitle="Shifokorlar"
              ItemsLength={tableBody.length}
            />

            <TableTitle Tablethead={tableTitle} Tabletbody={tableBody} />
          </div>

          {isOpenDoctorAddCard ? <DoctorAdd /> : ''}
          {isOpenDoctorEditCard ? <DoctorEdit /> : ''}
        </div>
      )}
    </DynamicModuleLoader>
  );
};

export default DoctorListPage;
