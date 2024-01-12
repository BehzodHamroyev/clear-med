import React from 'react';
import { useSelector } from 'react-redux';

import { DoctorAdd } from '@/entities/DoctorAdd';
import { DoctorEdit } from '@/entities/DoctorEdit';
import { TableTitle } from '@/entities/TableTitle';
import { ButtonNavbar } from '@/entities/ButtonNavbar';
import { Doda } from '@/shared/assets/Pages/AddDoctorPage';
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

const tableTitle = [
  'Surat',
  'F.I.Sh',
  'Xona',
  'Bo’lim',
  'Tajribasi',
  'Telefon raqami',
];

const tableBody = [
  {
    id: 1,
    img: Doda,
    item1: 'Tojiboyev Abdulaziz',
    item2: 2,
    item3: 'Mazgitolog',
    item4: '22-yil',
    lastChild: '+998 97 777 64 54',
  },
  {
    id: 1,
    img: Doda,
    item1: 'Tojiboyev Abdulaziz',
    item2: 2,
    item3: 'Mazgitolog',
    item4: '22-yil',
    lastChild: '+998 97 777 64 54',
  },
  {
    id: 1,
    img: Doda,
    item1: 'Tojiboyev Abdulaziz',
    item2: 2,
    item3: 'Mazgitolog',
    item4: '22-yil',
    lastChild: '+998 97 777 64 54',
  },
  {
    id: 1,
    img: Doda,
    item1: 'Tojiboyev Abdulaziz',
    item2: 2,
    item3: 'Mazgitolog',
    item4: '22-yil',
    lastChild: '+998 97 777 64 54',
  },
  {
    id: 1,
    img: Doda,
    item1: 'Tojiboyev Abdulaziz',
    item2: 2,
    item3: 'Mazgitolog',
    item4: '22-yil',
    lastChild: '+998 97 777 64 54',
  },
  {
    id: 1,
    img: Doda,
    item1: 'Tojiboyev Abdulaziz',
    item2: 2,
    item3: 'Mazgitolog',
    item4: '22-yil',
    lastChild: '+998 97 777 64 54',
  },
  {
    id: 1,
    img: Doda,
    item1: 'Tojiboyev Abdulaziz',
    item2: 2,
    item3: 'Mazgitolog',
    item4: '22-yil',
    lastChild: '+998 97 777 64 54',
  },
  {
    id: 1,
    img: Doda,
    item1: 'Tojiboyev Abdulaziz',
    item2: 2,
    item3: 'Mazgitolog',
    item4: '22-yil',
    lastChild: '+998 97 777 64 54',
  },
  {
    id: 1,
    img: Doda,
    item1: 'Tojiboyev Abdulaziz',
    item2: 2,
    item3: 'Mazgitolog',
    item4: '22-yil',
    lastChild: '+998 97 777 64 54',
  },
  {
    id: 1,
    img: Doda,
    item1: 'Tojiboyev Abdulaziz',
    item2: 2,
    item3: 'Mazgitolog',
    item4: '22-yil',
    lastChild: '+998 97 777 64 54',
  },
  {
    id: 1,
    img: Doda,
    item1: 'Tojiboyev Abdulaziz',
    item2: 2,
    item3: 'Mazgitolog',
    item4: '22-yil',
    lastChild: '+998 97 777 64 54',
  },
  {
    id: 1,
    img: Doda,
    item1: 'Tojiboyev Abdulaziz',
    item2: 2,
    item3: 'Mazgitolog',
    item4: '22-yil',
    lastChild: '+998 97 777 64 54',
  },
  {
    id: 1,
    img: Doda,
    item1: 'Tojiboyev Abdulaziz',
    item2: 2,
    item3: 'Mazgitolog',
    item4: '22-yil',
    lastChild: '+998 97 777 64 54',
  },
  {
    id: 1,
    img: Doda,
    item1: 'Tojiboyev Abdulaziz',
    item2: 2,
    item3: 'Mazgitolog',
    item4: '22-yil',
    lastChild: '+998 97 777 64 54',
  },
  {
    id: 1,
    img: Doda,
    item1: 'Tojiboyev Abdulaziz',
    item2: 2,
    item3: 'Mazgitolog',
    item4: '22-yil',
    lastChild: '+998 97 777 64 54',
  },
  {
    id: 1,
    img: Doda,
    item1: 'Tojiboyev Abdulaziz',
    item2: 2,
    item3: 'Mazgitolog',
    item4: '22-yil',
    lastChild: '+998 97 777 64 54',
  },
  {
    id: 1,
    img: Doda,
    item1: 'Tojiboyev Abdulaziz',
    item2: 2,
    item3: 'Mazgitolog',
    item4: '22-yil',
    lastChild: '+998 97 777 64 54',
  },
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
        console.log(item.photo);
        return {
          id: item?._id,
          item1: item?.name !== undefined ? item?.name : ' ',
          item2: `${
            item?.rooms?.[0]?.name !== undefined ? item?.rooms?.[0]?.name : ' '
          }`,
          item3: `${item?.rooms?.[0]?.department_id?.name}`,
          item4: item?.exprience,
          lastChild: item?.login,
          img: `https://magicsoft.uz/med/uploads/${item.photo}`,
        };
      });
      setTableBody(() => [...tableBodys]);
    }
  }, [getDoctorData]);

  return (
    <DynamicModuleLoader reducers={reducer}>
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
    </DynamicModuleLoader>
  );
};

export default DoctorListPage;
