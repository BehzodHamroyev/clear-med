/* imports */
import React from 'react';
import { useSelector } from 'react-redux';

import { useTranslation } from 'react-i18next';
import { ErrorReload } from '@/widgets/Error';
import { DoctorAdd } from '@/entities/DoctorAdd';
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
import Toast from '@/shared/ui/Toast/Toast';

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
    hasOpenToast,
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

  if (responseAddDoctorStatusCode) {
    if (responseAddDoctorStatusCode === 200) {
      setToastProps({
        message: t("Ma'lumotlar saqlandi!"),
        severity: 'success',
      });
    } else if (responseAddDoctorStatusCode === 404) {
      setToastProps({
        message: t("Ma'lumotlarni qayta tekshiring!"),
        severity: 'warning',
      });
    } else {
      setToastProps({
        message: t("Ma'lumotlar qo'shilmadi"),
        severity: 'error',
      });
    }

    setHasOpenToast(true);
  } else {
    setHasOpenToast(false);
  }

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
          img:
            item.photo !== '/uploads/default.png'
              ? `http://medapi.magicsoft.uz/${item.photo}`
              : `http://medapi.magicsoft.uz/uploads/default.png`,
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
              TableTitle="Shifokorlar"
              ItemsLength={tableBody.length}
            />

            <TableTitle Tablethead={tableTitle} Tabletbody={tableBody} />
          </div>

          <Toast severity={toastProps.severity} message={toastProps.message} />

          {isOpenDoctorAddCard ? <DoctorAdd /> : ''}
          {isOpenDoctorEditCard ? <DoctorEdit tableBody={tableBody} /> : ''}
        </div>
      )}
    </DynamicModuleLoader>
  );
};

export default DoctorListPage;
