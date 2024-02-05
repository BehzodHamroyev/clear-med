import React, { useContext, useRef } from 'react';

import axios from 'axios';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';

import { TextField } from '@mui/material';

import cls from './AddDepartmentFormDialog.module.scss';

import { baseUrl } from '../../../../baseurl';
import { DepartmentType } from '../model/types/departmentType';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import { GetIconForDepartment } from '@/shared/ui/GetIconForDepartment';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { iconsCardDepartments } from '@/shared/ui/GetIconForDepartment/model/helper/source';
import { fetchAllDepartments } from '../../../pages/AddDepartmentPage/model/service/fetchAllDepartments';

const AddDepartmentFormDialog = () => {
  const { t } = useTranslation();

  const inputRef = useRef<HTMLInputElement>(null);

  const patientViewingTimeRef = useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch();

  const {
    setHasOpenToast,
    setIsOpenDepartmentAddCard,
    setToastDataForAddRoomForm,
    isOpenDepartmentAddCardIcon,
    setIsOpenDepartmentAddCardIcon,
    isOpenDepartmentAddCardIconIndex,
  } = useContext(ButtonsContext);

  const ResultIconSrc =
    iconsCardDepartments[isOpenDepartmentAddCardIconIndex].icon;

  const handleClose = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    setIsOpenDepartmentAddCard(false);
  };

  // eslint-disable-next-line consistent-return
  const handleFormSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const token = Cookies.get('token');

    // Access values using refs
    const inputValue = inputRef.current?.value;

    const capitalizedText = `${inputValue
      ?.charAt(0)
      .toUpperCase()}${inputValue?.slice(1)}`;

    const patientViewingTime = patientViewingTimeRef.current?.value.replace(
      /\D/g,
      '',
    );

    if (
      capitalizedText &&
      patientViewingTime &&
      isOpenDepartmentAddCardIconIndex
    ) {
      try {
        const response = await axios.post<DepartmentType>(
          `${baseUrl}/department/create`,
          {
            name: capitalizedText,
            duration: Number(patientViewingTime),
            image: `${isOpenDepartmentAddCardIconIndex}`,
          },
          {
            maxBodyLength: Infinity,
            headers: {
              'Content-Type': 'application/json',
              authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.data) {
          setIsOpenDepartmentAddCard(false);

          setHasOpenToast(true);

          setToastDataForAddRoomForm({
            toastMessageForAddRoomForm: t("Bo'lim muvaffaqiyatli qo'shildi"),
            toastSeverityForAddRoomForm: 'success',
          });

          dispatch(fetchAllDepartments({}));
        }

        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
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
    }
  };

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        setIsOpenDepartmentAddCard(false);
      }}
      className={cls.DepartmentAddWrapper}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={cls.DepartmentAddCard}
      >
        <div className={cls.TitleFlex}>
          <h3 className={cls.CardTitle}>{t('Bo‘lim qo‘shish')}</h3>

          <ResultIconSrc />
        </div>

        <form action="#" className={cls.CardBody} onSubmit={handleFormSubmit}>
          <TextField
            required
            type="text"
            inputRef={inputRef}
            id="outlined-basic"
            variant="outlined"
            label={t('Bo‘lim nomi')}
            className={cls.InputBulim}
            inputProps={{ maxLength: 20, minLength: 3 }}
          />

          <TextField
            required
            type="number"
            id="outlined-basic"
            variant="outlined"
            inputProps={{ min: 1 }}
            className={cls.InputBulim}
            inputRef={patientViewingTimeRef}
            label={t("Bemorni ko'rish vaqti")}
          />

          <button
            className={`${cls.Btn} ${cls.BtnHover} ${cls.Btn3}`}
            onClick={() => {
              setIsOpenDepartmentAddCardIcon(true);
            }}
            type="button"
          >
            {t("Bo'limga rasm qo'shish")}
          </button>

          {isOpenDepartmentAddCardIcon ? <GetIconForDepartment /> : ''}

          <div className={cls.BtnParnet}>
            <button
              onClick={handleClose}
              type="button"
              className={`${cls.Btn} ${cls.Btn1}`}
            >
              {t('Bekor qilish')}
            </button>

            <button type="submit" className={`${cls.Btn} ${cls.Btn2}`}>
              {t('Saqlash')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDepartmentFormDialog;
