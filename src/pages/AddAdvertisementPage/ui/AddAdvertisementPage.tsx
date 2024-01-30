/* eslint-disable max-len */
import React, { useContext, useEffect } from 'react';

import { useSelector } from 'react-redux';
import { ButtonNavbar } from '@/entities/ButtonNavbar';

import { AddAdvertisement } from '@/entities/AddAdvertisement';
import { AdvertisementEdit } from '@/entities/AdvertisementEdit';
import { TableTitleReklama } from '@/entities/TableTitleReklama';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchAdvertisementGetAll } from '../model/service/getAllAdvertisementRequest';

import cls from './addAdvertisementPage.module.scss';
import {
  DynamicModuleLoader,
  ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { AdvertisementListSliceReducer } from '../model/slice/getDepartmentSlice';
import {
  getError,
  getIsLoading,
  getListOfAdvertisement,
} from '../model/selectors/advertisementListSelector';
import { LoaderAdmin } from '@/widgets/LoaderAdmin';
import { ErrorReload } from '@/widgets/Error';

const tableTitle: string[] = ['Surat', 'Nomi', 'Manzili', 'Sana'];

const reudcer: ReducersList = {
  AddAdvertisementPage: AdvertisementListSliceReducer,
};

const AddAdvertisementPage = () => {
  const [tableBody, setTableBody] = React.useState<any>([]);

  const dispatch = useAppDispatch();

  const {
    getResponseData,
    isOpenAdvertisementAddCard,
    isOpenAdvertisementEditCard,
  } = useContext(ButtonsContext);

  const getListOfAdvertisements = useSelector(getListOfAdvertisement);

  const getAdvertisementLoading = useSelector(getIsLoading);

  const getAdvertisementError = useSelector(getError);

  React.useEffect(() => {
    if (getListOfAdvertisements) {
      const tableBodys = getListOfAdvertisements?.map((item) => {
        const timeCut = item.createdAt.slice(0, 10);
        const imgUrl = `${item.photo}`;

        return {
          id: item?.id,
          img: imgUrl,
          item2: item?.name,
          lastChild: timeCut,
          url: item?.link,
          item3: 'Open link',
        };
      });
      setTableBody(() => [...tableBodys]);
    }
  }, [getListOfAdvertisements]);

  useEffect(() => {
    dispatch(fetchAdvertisementGetAll({}));
  }, [dispatch]);

  React.useEffect(() => {
    setTimeout(() => {
      dispatch(fetchAdvertisementGetAll({}));
    }, 1000);
  }, [dispatch, getResponseData]);

  return (
    <DynamicModuleLoader reducers={reudcer}>
      {getAdvertisementLoading === true ? (
        <LoaderAdmin />
      ) : getAdvertisementError ? (
        <ErrorReload message={getAdvertisementError} />
      ) : (
        <div className={cls.AddAdvertisementPageWrapper}>
          <div>
            <ButtonNavbar
              CreateCarbonAdd
              TableTitle="Reklamalar"
              ItemsLength={tableBody.length}
            />

            <TableTitleReklama Tablethead={tableTitle} Tabletbody={tableBody} />

            {isOpenAdvertisementAddCard ? <AddAdvertisement /> : ''}

            {isOpenAdvertisementEditCard ? (
              <AdvertisementEdit tableBody={tableBody} />
            ) : (
              ''
            )}
          </div>
        </div>
      )}
    </DynamicModuleLoader>
  );
};

export default AddAdvertisementPage;
