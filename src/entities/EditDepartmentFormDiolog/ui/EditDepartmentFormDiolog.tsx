import React, { useContext, useEffect, useState } from 'react';

import axios from 'axios';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
import { Button, Dialog, TextField } from '@mui/material';

import cls from './EditDepartmentFormDiolog.module.scss';

import { Loader } from '@/widgets/Loader';
import { baseUrl } from '../../../../baseurl';
import ErrorDialog from '@/shared/ui/ErrorDialog/ErrorDialog';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import { GetIconForDepartment } from '@/shared/ui/GetIconForDepartment';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchAllDepartments } from '../../../pages/AddDepartmentPage/model/service/fetchAllDepartments';
import { iconsCardDepartments } from '@/shared/ui/GetIconForDepartment/model/helper/source';

interface Department {
  name?: string;
  duration?: number;
  image?: string | number;
  photo?: string;
  renderPhoto?: any;
}
interface EditDepartmentTypeSchema {
  isLoading?: boolean;
  error?: boolean;
  data?: Department;
}

export interface EditDepartmentFormDiologTypes {
  editDepartmentId: string;
}

const EditDepartmentFormDiolog = (prop: EditDepartmentFormDiologTypes) => {
  const { editDepartmentId } = prop;

  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const [
    editRoomFormDialogSubmitIsLoading,
    setEditDepartmentFormDialogSubmitIsLoading,
  ] = useState(false);

  // const [resultImg, setResultImg] = useState({ icon: '', isOpen: false });

  const [roomCurrentData, setRoomCurrentData] =
    useState<EditDepartmentTypeSchema>();

  // const ResultIconUrl = `${baseUrlUpload}${roomCurrentData!.data!.photo}`;

  const token = Cookies.get('token');

  const {
    setHasOpenToast,
    isOpenDepartmentEditCard,
    setToastDataForAddRoomForm,
    isOpenDepartmentAddCardIcon,
    setIsOpenDepartmentEditCard,
    setIsOpenDepartmentAddCardIcon,
    isOpenDepartmentAddCardIconIndex,
  } = useContext(ButtonsContext);

  // useEffect(() => {
  //   if (isOpenDepartmentAddCardIconIndex) {
  //     setResultImg({ icon: `${ResultIconArr}`, isOpen: true });
  //   } else {
  //     setResultImg({ icon: `${ResultIconUrl}`, isOpen: false });
  //   }
  // }, [ResultIconArr, ResultIconUrl, isOpenDepartmentAddCardIconIndex]);

  const handleClose = () => {
    setIsOpenDepartmentEditCard(false);
  };

  const fetchRoomData = async () => {
    setRoomCurrentData({
      error: false,
      isLoading: true,
      data: undefined,
    });

    try {
      const response = await axios.get(
        `${baseUrl}/department/${editDepartmentId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data.department) {
        const responceData: Department = response?.data.department;

        const ResultIconArr =
          iconsCardDepartments[Number(responceData.image)].icon;

        setRoomCurrentData({
          error: false,
          isLoading: false,
          data: {
            name: responceData.name,
            duration: responceData.duration,
            photo: responceData.photo,
            image: responceData?.image,
            renderPhoto: <ResultIconArr />,
          },
        });
      }
    } catch (error) {
      setRoomCurrentData({
        isLoading: false,
        error: true,
        data: undefined,
      });
      console.log(error);
    }
  };

  useEffect(() => {
    if (editDepartmentId) {
      fetchRoomData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editDepartmentId]);

  const handleSectionInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRoomCurrentData((prevData) => ({
      ...prevData,
      data: {
        name: event.target.value,
        duration: roomCurrentData?.data?.duration,
        image: roomCurrentData?.data?.image,
      },
    }));
  };

  const handleDurationInputChange = (event: { target: { value: any } }) => {
    setRoomCurrentData((prevData) => ({
      ...prevData,
      data: {
        name: roomCurrentData?.data?.name,
        duration: event.target.value,
        image: roomCurrentData?.data?.image,
      },
    }));
  };

  useEffect(() => {
    const ResultIconArr =
      iconsCardDepartments[Number(isOpenDepartmentAddCardIconIndex)].icon;

    setRoomCurrentData((prevData) => ({
      ...prevData,
      data: {
        name: roomCurrentData?.data?.name,
        duration: roomCurrentData?.data?.duration,
        image: `${isOpenDepartmentAddCardIconIndex}`,
        renderPhoto: <ResultIconArr />,
      },
    }));
  }, [
    isOpenDepartmentAddCardIconIndex,
    roomCurrentData?.data?.duration,
    roomCurrentData?.data?.name,
  ]);

  const handleFormSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    setEditDepartmentFormDialogSubmitIsLoading(true);

    if (
      roomCurrentData?.data?.name &&
      roomCurrentData?.data?.image &&
      roomCurrentData?.data?.duration
    ) {
      try {
        const response = await axios.patch(
          `${baseUrl}/department/${editDepartmentId}`,
          {
            name: roomCurrentData?.data?.name,
            duration: Number(roomCurrentData?.data?.duration),
            image: roomCurrentData?.data?.image,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.data) {
          setEditDepartmentFormDialogSubmitIsLoading(false);

          setIsOpenDepartmentEditCard(false);

          setHasOpenToast(true);

          setToastDataForAddRoomForm({
            toastMessageForAddRoomForm: t("Bo'lim ma'lumotlari yangilandi"),
            toastSeverityForAddRoomForm: 'success',
          });

          dispatch(fetchAllDepartments({}));
        }
      } catch (error) {
        setEditDepartmentFormDialogSubmitIsLoading(false);

        if (axios.isAxiosError(error)) {
          if (error?.response?.status === 403) {
            setToastDataForAddRoomForm({
              toastMessageForAddRoomForm: t(
                "ma'lumotlar yagilanmadi qayta urining!",
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
            error?.response?.status !== 404 &&
            error?.response?.status !== 403
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
    <div>
      {roomCurrentData?.data && (
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

              {/* {ResultIcon ? <ResultIcon /> : ''} */}

              {/* {resultImg?.isOpen ? (
                <ResultIconArr />
              ) : (
                <img src={resultImg.icon} alt="#" />
              )} */}

              {roomCurrentData?.data?.renderPhoto}
            </div>

            <form
              action="#"
              onSubmit={handleFormSubmit}
              className={cls['DepartmentFormWrp__Card--body']}
            >
              <p className={cls['DepartmentFormWrp__Card--txtInput']}>
                {t('Bo‘lim nomi')}
              </p>
              <TextField
                autoFocus
                type="text"
                id="outlined-basic"
                variant="outlined"
                value={roomCurrentData?.data.name}
                inputProps={{ maxLength: 20, minLength: 3, autoFocus: true }}
                onChange={handleSectionInputChange}
                className={cls['DepartmentFormWrp__Card--Input']}
              />

              <p className={cls['DepartmentFormWrp__Card--txtInput']}>
                {t("Bemorni ko'rish vaqti")}
              </p>

              <TextField
                autoFocus
                type="number"
                variant="outlined"
                id="outlined-basic"
                inputProps={{ min: 1 }}
                // label={t("Bemorni ko'rish vaqti")}
                onChange={handleDurationInputChange}
                value={roomCurrentData?.data.duration}
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
      )}

      {roomCurrentData?.isLoading ||
        (editRoomFormDialogSubmitIsLoading && <Loader />)}

      {editRoomFormDialogSubmitIsLoading && <Loader />}

      {roomCurrentData?.error && <ErrorDialog isErrorProps={!false} />}
    </div>
  );
};

export default EditDepartmentFormDiolog;
