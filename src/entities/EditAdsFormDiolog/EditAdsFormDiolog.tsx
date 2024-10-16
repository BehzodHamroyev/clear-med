import React, { ChangeEvent, useEffect, useState } from 'react';

import axios from 'axios';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';

import { Dialog } from '@mui/material';
import cls from './EditAdsFormDiolog.module.scss';

import { baseUploadUrl, baseUrl } from '../../../baseurl';
import { GetImage } from '@/shared/assets/Pages/Doctor';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { AdsData, ApiResponseAdsData } from './EditAdsFormDiolog.types';
import { Loader } from '@/widgets/Loader';
import ErrorDialog from '@/shared/ui/ErrorDialog/ErrorDialog';
import { fetchAllAds } from '@/pages/admin/AddAdsPage/model/services/fetchAllAds';
import { LazyLoadImage } from 'react-lazy-load-image-component';

interface EditAdsFormDiologProps {
  editAdsId: string;
}

const EditAdsFormDiolog = ({ editAdsId }: EditAdsFormDiologProps) => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const [editAdsLoading, setEditAdsLoading] = useState(false);
  const [adsCurrentData, setAdsCurrentData] = useState<AdsData>();

  const {
    setHasOpenToast,
    setToastDataForAddRoomForm,
    isOpenAdvertisementEditCard,
    setIsOpenAdvertisementEditCard,
  } = React.useContext(ButtonsContext);

  const [isValidUrl, setIsValidUrl] = useState<boolean | null>(null);

  const [selectedFile, setSelectedFile] = React.useState<any>(null);

  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const token = Cookies.get('token');

  const validateUrl = (inputUrl: string) => {
    const urlPattern = /^(https?:\/\/)([\w.]+)\.([a-z]{2,})(\/\S*)?$/;
    return urlPattern.test(inputUrl);
  };

  const fetchAdsData = async () => {
    setAdsCurrentData({
      isLoading: true,
      isError: false,
      data: {
        name: '',
        link: '',
        photo: '',
      },
    });

    try {
      const response = await axios.get(`${baseUrl}/videos/${editAdsId}`, {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      });

      if (response?.data?.data) {
        const responceData: ApiResponseAdsData['data'] = response?.data?.data;

        setAdsCurrentData({
          isLoading: false,
          isError: false,
          data: {
            name: responceData?.name,
            link: responceData?.link,
            photo: responceData?.photo,
          },
        });

        setIsValidUrl(validateUrl(responceData?.link));
      }
    } catch (error) {
      setAdsCurrentData({
        isLoading: false,
        isError: true,
        data: {
          name: '',
          link: '',
          photo: '',
        },
      });
    }
  };

  useEffect(() => {
    fetchAdsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setSelectedFile(file);

    setAdsCurrentData((prev) => ({
      ...prev,
      data: {
        name: adsCurrentData?.data.name,
        photo: selectedFile,
        link: adsCurrentData?.data.link,
      },
    }));
  };

  const handleUrlInputChange = (e: { target: { value: string } }) => {
    const inputValue = e.target.value;

    setAdsCurrentData((prev) => ({
      ...prev,
      data: {
        name: adsCurrentData?.data.name,
        photo: adsCurrentData?.data.photo,
        link: inputValue,
      },
    }));

    setIsValidUrl(validateUrl(inputValue));
  };

  const handleSubmitForm = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const token = Cookies.get('token');

    const data = new FormData();

    if (
      isValidUrl &&
      isValidUrl !== null &&
      adsCurrentData?.data.name &&
      adsCurrentData.data.link
    ) {
      data.append('file', selectedFile);
      data.append('name', `${adsCurrentData?.data.name}`);
      data.append('link', `${adsCurrentData.data.link}`);

      setEditAdsLoading(true);

      try {
        const response = await axios.patch(
          `${baseUrl}/videos/${editAdsId}`,
          data,
          {
            maxBodyLength: Infinity,
            headers: {
              'Content-Type': 'application/json',
              authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.data) {
          setEditAdsLoading(false);

          setIsOpenAdvertisementEditCard(false);

          setHasOpenToast(true);

          setToastDataForAddRoomForm({
            toastMessageForAddRoomForm: t('Reklama malumotlari yangilandi'),
            toastSeverityForAddRoomForm: 'success',
          });

          dispatch(fetchAllAds({}));
        }
      } catch (error) {
        setEditAdsLoading(false);

        if (axios.isAxiosError(error)) {
          if (error.response?.status === 403) {
            setToastDataForAddRoomForm({
              toastMessageForAddRoomForm: t(
                "Ushbu Url takrorlangan , urlni o'zgartiring",
              ),
              toastSeverityForAddRoomForm: 'warning',
            });

            setHasOpenToast(true);
          }

          if (error.response?.status === 404) {
            setToastDataForAddRoomForm({
              toastMessageForAddRoomForm: t(
                "Barcha maydonlar to'ldirilishi shart",
              ),
              toastSeverityForAddRoomForm: 'warning',
            });

            setHasOpenToast(true);
          }

          if (
            error.response?.status !== 404 &&
            error.response?.status !== 403
          ) {
            setToastDataForAddRoomForm({
              toastMessageForAddRoomForm: t(
                "Barcha maydonlar to'ldirilishi shart",
              ),
              toastSeverityForAddRoomForm: 'warning',
            });

            setHasOpenToast(true);
          }
        }
      }
    } else {
      setToastDataForAddRoomForm({
        toastMessageForAddRoomForm: t(
          "Barcha maydonlar to'g'ri shaklda  to'ldirilishi shart",
        ),
        toastSeverityForAddRoomForm: 'warning',
      });
      setHasOpenToast(true);
    }
  };

  const handleClose = () => {
    setIsOpenAdvertisementEditCard(false);
  };

  /* UI */
  return (
    <>
      {adsCurrentData?.data && (
        <Dialog
          onClose={handleClose}
          open={isOpenAdvertisementEditCard}
          className={cls.DepartmentAddWrapper}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className={cls.DepartmentAddCard}
          >
            <p className={cls.CardTitle}>{t('Reklama qo’shish')}</p>

            <form onSubmit={handleSubmitForm} className={cls.AddDoctorCard}>
              <div className={cls.AddCardImg}>
                <LazyLoadImage
                  className={cls.AddCardImgValue}
                  src={
                    selectedFile
                      ? URL.createObjectURL(selectedFile)
                      : `${baseUploadUrl}${adsCurrentData?.data.photo}`
                  }
                  alt="#"
                />

                <button
                  type="button"
                  onClick={handleClick}
                  className={cls.AddCardImgValuebtn}
                >
                  <GetImage />
                  {}
                </button>

                <input
                  id="input"
                  type="file"
                  ref={inputRef}
                  style={{ display: 'none' }}
                  accept=".jpg, .jpeg, .png, .svg, .heic, .webp"
                  onChange={(e) => handleFileChange(e)}
                />
              </div>

              <div className={cls.CardBody}>
                <input
                  required
                  type="text"
                  maxLength={30}
                  className={cls.InputBulim}
                  placeholder={t('Reklama nomi')}
                  value={adsCurrentData.data.name}
                  onChange={(e) => {
                    setAdsCurrentData((prev) => ({
                      ...prev,
                      data: {
                        name: e.target.value,
                        photo: adsCurrentData?.data.photo,
                        link: adsCurrentData?.data.link,
                      },
                    }));
                  }}
                />

                <input
                  required
                  type="text"
                  className={cls.InputBulim}
                  placeholder={t('Reklama manzili (Url)')}
                  value={adsCurrentData.data.link}
                  onChange={handleUrlInputChange}
                  style={{
                    borderColor:
                      isValidUrl === null
                        ? 'black'
                        : isValidUrl
                        ? 'green'
                        : 'red',
                  }}
                />

                <div className={cls.BtnParnet}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsOpenAdvertisementEditCard(false);
                    }}
                    type="button"
                    className={`${cls.Btn} ${cls.Btn1}`}
                  >
                    {t('Bekor qilish')}
                  </button>

                  <button type="submit" className={`${cls.Btn} ${cls.Btn2}`}>
                    {t('Saqlash')}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </Dialog>
      )}

      {(adsCurrentData?.isLoading || editAdsLoading) && <Loader />}

      {adsCurrentData?.isError && <ErrorDialog isErrorProps={!false} />}
    </>
  );
};

export default EditAdsFormDiolog;
