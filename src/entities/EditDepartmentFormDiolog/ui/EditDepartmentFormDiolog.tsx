import React, { useContext, useEffect, useState } from 'react';

import { Button, Dialog, TextField } from '@mui/material';

import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';

import cls from './EditDepartmentFormDiolog.module.scss';

import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import { GetIconForDepartment } from '@/shared/ui/GetIconForDepartment';
import { EditDepartmentFormDiologTypes } from '../model/types/EditDepartmentFormDiologTypes';
import { AllDepartmentTypeSchema } from '@/pages/AddDepartmentPage';

const EditDepartmentFormDiolog = (prop: EditDepartmentFormDiologTypes) => {
  const { editDepartmentId } = prop;

  const { t } = useTranslation();

  const [roomCurrentData, setRoomCurrentData] =
    useState<AllDepartmentTypeSchema>();

  const token = Cookies.get('token');

  const {
    isOpenDepartmentEditCard,
    isOpenDepartmentAddCardIcon,
    setIsOpenDepartmentEditCard,
    setIsOpenDepartmentAddCardIcon,
  } = useContext(ButtonsContext);

  const handleClose = () => {
    setIsOpenDepartmentEditCard(false);
  };

  const fetchRoomData = async () => {
    setRoomCurrentData({
      isLoading: true,
      error: false,
      data: undefined,
    });
  };

  useEffect(() => {
    if (editDepartmentId) {
      fetchRoomData();
    }
  }, [editDepartmentId]);

  const handleFormSubmit = () => {};

  return (
    <Dialog
      onClose={handleClose}
      open={isOpenDepartmentEditCard}
      className={cls.DepartmentFormWrp}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <div className={cls.DepartmentFormWrp__Card}>
        <div className={cls['DepartmentFormWrp__Card--title']}>
          <h3 className={cls['DepartmentFormWrp__Card--txt']}>
            {t('Bo‘limni tahrirlash')}
          </h3>

          {/* {inputValue.iconName ? inputValue.iconName : <div />} */}
        </div>

        <form
          action="#"
          onSubmit={handleFormSubmit}
          className={cls['DepartmentFormWrp__Card--body']}
        >
          <TextField
            type="text"
            id="outlined-basic"
            variant="outlined"
            // inputRef={inputRef}
            label={t('Bo‘lim nomi')}
            // className={cls.InputBulim}
            inputProps={{ maxLength: 20, minLength: 3 }}
            className={cls['DepartmentFormWrp__Card--Input']}
          />

          <TextField
            type="number"
            id="outlined-basic"
            variant="outlined"
            inputProps={{ min: 1 }}
            // inputRef={patientViewingTimeRef}
            label={t("Bemorni ko'rish vaqti")}
            className={cls['DepartmentFormWrp__Card--Input']}
          />

          <Button
            type="button"
            variant="contained"
            className={cls['DepartmentFormWrp__Card--BtnCard']}
            onClick={() => {
              setIsOpenDepartmentAddCardIcon(true);
            }}
          >
            {t("Bo'limga rasm qo'shish")}
          </Button>

          {isOpenDepartmentAddCardIcon ? <GetIconForDepartment /> : ''}

          <div className={cls['DepartmentFormWrp__Card--flexBtn']}>
            <Button
              variant="outlined"
              onClick={handleClose}
              type="button"
              className={cls['DepartmentFormWrp__Card--Btn']}
            >
              {t('Bekor qilish')}
            </Button>

            <Button
              variant="contained"
              type="submit"
              className={cls['DepartmentFormWrp__Card--Btn']}
            >
              {t('Saqlash')}
            </Button>
          </div>
        </form>
      </div>
    </Dialog>
  );
};

export default EditDepartmentFormDiolog;
