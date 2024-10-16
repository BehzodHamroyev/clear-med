import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';

import { baseUrl } from '../../../../baseurl';
import { DoctorEditType } from '../model/types/doctorEdit';
import { GetImage } from '@/shared/assets/Pages/Doctor';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';

import cls from './AdvertisementEdit.module.scss';
import { LazyLoadImage } from 'react-lazy-load-image-component';

/* Parent Function */
const AdvertisementEdit = (prop: DoctorEditType) => {
  const { tableBody } = prop;

  const token = Cookies.get('token');

  const { t } = useTranslation();

  const [img, setImg] = React.useState<any>();

  const [isFileChanged, setIsFileChanged] = React.useState<boolean>(false);

  const [getAllFormData, setAllFormData] = React.useState<any>({
    idCard: '',
    ImgUrl: '',
    name: '',
    link: '',
  });

  const {
    departmentGetId,
    setResponseData,
    setIsOpenAdvertisementEditCard,
    setResponseAddDoctorStatusCode,
  } = React.useContext(ButtonsContext);

  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const matchingItems = tableBody?.find((item) => item?.id === departmentGetId);

  React.useEffect(() => {
    if (matchingItems) {
      setAllFormData({
        idCard: departmentGetId,
        ImgUrl: `${matchingItems.img}`,
        name: `${matchingItems.item2}`,
        link: `${matchingItems.url}`,
      });
    } else {
      console.log('No matching item found');
    }
  }, [departmentGetId, matchingItems]);

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  // submit img for state
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setImg(file);
    setIsFileChanged(true);
    setAllFormData({ ...getAllFormData, ImgUrl: file });
  };

  /* handle submit functions */
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const data = new FormData();

    if (isFileChanged) {
      data.append('file', getAllFormData.ImgUrl);
      setIsFileChanged(false);
    }
    data.append('name', getAllFormData.name);
    data.append('link', getAllFormData.link);

    try {
      const response = await axios.patch<DoctorEditType>(
        `${baseUrl}/videos/${getAllFormData.idCard}`,
        data,
        {
          maxBodyLength: Infinity,
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
          },
        },
      );

      setResponseAddDoctorStatusCode(200);
      setIsOpenAdvertisementEditCard(false);
      setResponseData(`${Math.random() * 100 + 1}`);

      return response.data;
    } catch (e) {
      return setResponseAddDoctorStatusCode('404');
    }
  };

  const handleDeleteItem = async (e: any) => {
    e.stopPropagation();

    try {
      const response = await axios.delete<any>(
        `${baseUrl}/users/${getAllFormData.idCard}`,
        {
          maxBodyLength: Infinity,
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
          },
        },
      );

      setIsOpenAdvertisementEditCard(false);
      setResponseAddDoctorStatusCode(200);
      setResponseData(`${Math.random() * 100 + 1}`);

      return response.data;
    } catch (e) {
      return setResponseAddDoctorStatusCode('404');
    }
  };

  /* UI */
  return (
    <div
      className={cls.DepartmentAddWrapper}
      onClick={(e) => {
        e.stopPropagation();
        setIsOpenAdvertisementEditCard(false);
      }}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={cls.DepartmentAddCard}
      >
        <p className={cls.CardTitle}>{t('Reklamani Tahrirlash')}</p>

        <div className={cls.AddDoctorCard}>
          <div className={cls.AddCardImg}>
            <LazyLoadImage
              className={cls.AddCardImgValue}
              src={img ? URL.createObjectURL(img) : getAllFormData.ImgUrl}
              alt="#"
            />

            <button
              type="submit"
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
              onChange={handleFileChange}
              accept=".jpg, .jpeg, .png, .svg, .heic, .webp"
            />
          </div>

          <div className={cls.CardBody}>
            <input
              type="text"
              className={cls.InputBulim}
              placeholder={t('Reklama nomi')}
              value={getAllFormData.name}
              onChange={(e) => {
                setAllFormData({
                  ...getAllFormData,
                  name: e.target.value,
                });
              }}
            />

            <input
              type="text"
              className={cls.InputBulim}
              value={`${getAllFormData.link}`}
              placeholder={t('Reklama manzili (url)')}
              onChange={(e) =>
                setAllFormData({
                  ...getAllFormData,
                  link: e.target.value,
                })
              }
            />

            <div className={cls.BtnParnet}>
              <button
                onClick={handleDeleteItem}
                type="button"
                className={`${cls.Btn} ${cls.Btn1}`}
              >
                {t('O‘chirib yuborish')}
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className={`${cls.Btn} ${cls.Btn2}`}
              >
                {t('Saqlash')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvertisementEdit;
