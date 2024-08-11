/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useContext, useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import cls from './AddAdsPage.module.scss';

import Toast from '@/shared/ui/Toast/Toast';
import { LoaderAdmin } from '@/widgets/LoaderAdmin';
import { fetchAllAds } from '../model/services/fetchAllAds';
import ErrorDialog from '@/shared/ui/ErrorDialog/ErrorDialog';
import { AddAdsFormDiolog } from '@/entities/AddAdsFormDiolog';
import { CarbonAdd } from '@/shared/assets/entities/ButtonNavbar';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import { DeleteTools, PenTools } from '@/shared/assets/entities/TableTitle';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import {
  getAllAdsData,
  getAllAdsError,
  getAllAdsIsLoading,
} from '../model/selector/allAdsSelector';

// eslint-disable-next-line ulbi-tv-plugin/public-api-imports
import EditAdsFormDiolog from '@/entities/EditAdsFormDiolog/EditAdsFormDiolog';
import { Loader } from '@/widgets/Loader';
// eslint-disable-next-line ulbi-tv-plugin/public-api-imports
import DeleteAdsFormDialog from '@/entities/DeleteAdsFormDialog/DeleteAdsFormDialog';
import { DoctorDefault } from '@/shared/assets/Pages/Doctor';

const AddAdsPage = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const {
    hasOpenToast,
    toastDataForAddRoomForm,
    isOpenAdvertisementAddCard,
    setIsOpenAdvertisementAddCard,
    isOpenAdvertisementEditCard,
    setIsOpenAdvertisementEditCard,
    isOpenAdvertisementDeleteCard,
    setIsOpenAdvertisementDeleteCard,
  } = useContext(ButtonsContext);

  const allAdsData = useSelector(getAllAdsData);
  const allAdsError = useSelector(getAllAdsError);
  const allAdsIsLoading = useSelector(getAllAdsIsLoading);

  const [editAdsId, setEditAdsId] = useState<string>();
  const [deleteAdsId, setDeleteAdsId] = useState<string>();

  useEffect(() => {
    dispatch(fetchAllAds({}));
  }, [dispatch]);

  const handleCardAddCard = () => {
    setIsOpenAdvertisementAddCard(true);
  };

  const handleClickEditAds = (id: string) => {
    setIsOpenAdvertisementEditCard(true);

    setEditAdsId(id);
  };

  const handleClickDeleteAds = (id: string) => {
    setIsOpenAdvertisementDeleteCard(true);

    setDeleteAdsId(id);
  };

  return (
    <>
      <div className={cls.AddAdsPageWrp}>
        <div className={cls.AddAdsPageWrp__Title}>
          <p className={cls['AddAdsPageWrp__Title--text']}>
            {t('Reklamalar')}{' '}
            <span className={cls['AddAdsPageWrp__Title--span']}>
              ({allAdsData?.length || 0})
            </span>{' '}
          </p>

          <div className={cls['AddAdsPageWrp__Title--IconDiv']}>
            <CarbonAdd
              onClick={handleCardAddCard}
              className={cls['AddAdsPageWrp__Title--Icon']}
            />
          </div>
        </div>

        <table className={cls.AddAdsPageWrp__Table}>
          <thead className={cls['AddAdsPageWrp__Table--Tablethead']}>
            <tr className={cls['AddAdsPageWrp__Table--tr']}>
              <th className={cls['AddAdsPageWrp__Table--th']}>{t('Surat')}</th>

              <th className={cls['AddAdsPageWrp__Table--th']}>{t('Nomi')}</th>

              <th className={cls['AddAdsPageWrp__Table--th']}>
                {t('Manzili')}
              </th>

              <th className={cls['AddAdsPageWrp__Table--th']}>{t('Sana')}</th>

              <th className={cls['AddAdsPageWrp__Table--edit']}>{}</th>
              <th className={cls['AddAdsPageWrp__Table--delete']}>{}</th>
            </tr>
          </thead>

          {allAdsData && allAdsData.length > 0 ? (
            <tbody className={cls['AddAdsPageWrp__Table--Tabletbody']}>
              {allAdsData.map((item) => {
                const DayCut = item.createdAt.slice(0, 10);
                return (
                  <tr
                    key={item?.id}
                    className={cls['AddAdsPageWrp__Table--tr']}
                  >
                    <td className={cls['AddAdsPageWrp__Table--td']}>
                      {item.photo && (
                        <img
                          src={item.photo || DoctorDefault}
                          className={cls['AddAdsPageWrp__Table--img']}
                          alt=" "
                        />
                      )}
                      
                    </td>

                    <td className={cls['AddAdsPageWrp__Table--td']}>
                      {item?.name ? item.name : "nomi yo'q"}
                    </td>

                    <td className={cls['AddAdsPageWrp__Table--td']}>
                      {/* {item.link ? item.link : '-'} */}
                      <a
                        target="_blank"
                        className={cls['AddAdsPageWrp__Table--btnLink']}
                        href={`${item.link}`}
                        rel="noreferrer"
                      >
                        {t('Open Link')}
                      </a>
                    </td>

                    <td className={cls['AddAdsPageWrp__Table--td']}>
                      {' '}
                      {DayCut || "sana yo'q"}
                    </td>

                    <td
                      className={cls['AddAdsPageWrp__Table--lastChild']}
                      onClick={() => handleClickEditAds(item?.id)}
                    >
                      {}
                      <PenTools className={cls['AddAdsPageWrp__Table--edit']} />
                    </td>

                    <td
                      className={cls['AddAdsPageWrp__Table--lastChild2']}
                      onClick={() => handleClickDeleteAds(item?.id)}
                    >
                      {}
                      <DeleteTools
                        className={cls['AddAdsPageWrp__Table--delete']}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          ) : allAdsIsLoading ? (
            <LoaderAdmin />
          ) : allAdsError ? (
            <ErrorDialog isErrorProps={!false} />
          ) : (
            ''
          )}
        </table>

        {hasOpenToast && (
          <Toast
            severity={toastDataForAddRoomForm?.toastSeverityForAddRoomForm}
            message={toastDataForAddRoomForm?.toastMessageForAddRoomForm}
          />
        )}

        {isOpenAdvertisementAddCard ? <AddAdsFormDiolog /> : ''}
      </div>

      {editAdsId && isOpenAdvertisementEditCard && (
        <EditAdsFormDiolog editAdsId={editAdsId} />
      )}

      {deleteAdsId && isOpenAdvertisementDeleteCard && (
        <DeleteAdsFormDialog adsId={deleteAdsId} />
      )}

      {allAdsIsLoading && <Loader />}

      {allAdsError && <ErrorDialog isErrorProps={!false} />}
    </>
  );
};

export default AddAdsPage;
