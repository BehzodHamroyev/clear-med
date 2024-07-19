/* imports */
import React from 'react';
import { useSelector } from 'react-redux';

import { useTranslation } from 'react-i18next';
import { ErrorReload } from '@/widgets/Error';
import { DoctorEdit } from '@/entities/DoctorEdit';
import { TableTitle } from '@/entities/TableTitle';
import { LoaderAdmin } from '@/widgets/LoaderAdmin';
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
import { ToastHalper } from '@/shared/ui/ToastHalper';
import { AddDoctorFormDialog } from '@/entities/AddDoctorFormDialog';

/* halper array */
const tableTitle = [
  'Surat',
  'F.I.Sh',
  'Xona',
  'Bo’lim',
  'Tajribasi',
  'Telefon raqami',
];

/* reducer */
const reducer: ReducersList = {
  getDoctorPageReducer: DoctorListSliceReducer,
};

/* Component BIG */
const DoctorListPage = () => {
  /* useTranslation */
  const { t } = useTranslation();

  /* useState */
  const [tableBody, setTableBody] = React.useState<any>([]);

  const [toastProps, setToastProps] = React.useState({
    message: '',
    severity: '',
  });

  /* useContext */
  const {
    getResponseData,
    setHasOpenToast,
    isOpenDoctorAddCard,
    isOpenDoctorEditCard,
    responseAddDoctorStatusCode,
  } = React.useContext(ButtonsContext);

  /* useAppDispatch */
  const dispatch = useAppDispatch();

  /* useSelector */
  const getDoctorData = useSelector(getListOfDoctor);

  const getDoctorLoading = useSelector(getIsLoading);

  const getDoctorError = useSelector(getError);

  /* useEffect */
  React.useEffect(() => {
    dispatch(fetchDoctorGetAll({}));
  }, [dispatch]);

  React.useEffect(() => {
    setTimeout(() => {
      dispatch(fetchDoctorGetAll({}));
    }, 1000);
  }, [dispatch, getResponseData]);

  React.useEffect(() => {
    if (getDoctorData) {
      const tableBodys = getDoctorData?.map((item) => {
        return {
          id: item?._id,
          item1: item?.name !== undefined ? item?.name : ' ',
          item2: `${
            item?.rooms?.[0]?.name !== undefined ? item?.rooms?.[0]?.name : ' '
          }`,
          item3:
            item?.rooms !== undefined
              ? `${item?.rooms?.[0]?.department_id?.name}`
              : '',
          item4: item?.exprience !== undefined ? item?.exprience : '',
          lastChild: `+998 ${item?.login}`,
          img:
            item.photo !== '/uploads/default.png'
              ? `http://socketmed.magicsoft.uz//${item.photo}`
              : `http://socketmed.magicsoft.uz//uploads/default.png`,
        };
      });
      setTableBody(() => [...tableBodys]);
    }
  }, [getDoctorData]);

  /* UI */
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
              TableTitle={t('Shifokorlar')}
              ItemsLength={tableBody.length}
            />

            <TableTitle Tablethead={tableTitle} Tabletbody={tableBody} />
          </div>

          <ToastHalper />

          {isOpenDoctorAddCard ? <AddDoctorFormDialog /> : ''}
          {isOpenDoctorEditCard ? <DoctorEdit tableBody={tableBody} /> : ''}
        </div>
      )}
    </DynamicModuleLoader>
  );
};

export default DoctorListPage;
