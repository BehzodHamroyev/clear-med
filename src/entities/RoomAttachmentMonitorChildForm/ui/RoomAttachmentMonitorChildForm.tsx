/* eslint-disable array-callback-return */
import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { SelectChangeEvent } from '@mui/material/Select';

import { useParams } from 'react-router-dom';
import { Dialog } from '@mui/material';
import cls from './RoomAttachmentMonitorChildForm.module.scss';

import { baseUrl } from '../../../../baseurl';
import { fetchRoomGetAll, getListOfRoom } from '@/pages/RoomPage';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchAllRoomForMonitor } from '../../../pages/AddRoomForMonitorPage/model/service/fetchAllRoomForMonitor';
import { Loader } from '@/widgets/Loader';
import { AddRoomForMonitorOPtions } from '@/shared/ui/AddRoomForMonitorOptions';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const RoomAttachmentMonitorChildForm = () => {
  /* translation */
  const { t } = useTranslation();

  const { id } = useParams();

  /* Cookies */
  const token = Cookies.get('token');

  const dispatch = useAppDispatch();

  const [personName, setPersonName] = React.useState<string[]>([]);

  const [personId, setPersonId] = React.useState<string[]>([]);

  const [addDoctorFormDialogIsLoading, setAddDoctorFormDialogIsLoading] =
    useState(false);

  const getListOfRooms = useSelector(getListOfRoom);

  /* useContext */
  const {
    setHasOpenToast,
    isDataFormAddRoom,
    setIsOpenRoomAddCard,
    setDepartmentListChanged,
    setToastDataForAddRoomForm,
    setResponseAddDoctorStatusCode,
    isOpenRoomAttachmentMonitorChildForm,
    setIsOpenRoomAttachmentMonitorChildForm,
  } = React.useContext(ButtonsContext);

  console.log(personId);

  // eslint-disable-next-line consistent-return
  const handleSubmitAllFormData = async () => {
    setAddDoctorFormDialogIsLoading(true);

    if (id && personName) {
      try {
        const response = await axios.post(
          `${baseUrl}/monitor/${id}`,
          {
            name: personName || '',

            // isDataFormAddRoom?.RoomNumber ? isDataFormAddRoom?.RoomNumber : '',
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
          setAddDoctorFormDialogIsLoading(false);

          setIsOpenRoomAttachmentMonitorChildForm(false);

          setHasOpenToast(true);

          setToastDataForAddRoomForm({
            toastMessageForAddRoomForm: t("Doktor muvaffaqiyatli qo'shildi"),
            toastSeverityForAddRoomForm: 'success',
          });

          dispatch(fetchAllRoomForMonitor({ id }));
        }

        return response.data;
      } catch (error) {
        setAddDoctorFormDialogIsLoading(false);

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
          if (error.response?.status === 403) {
            setToastDataForAddRoomForm({
              toastMessageForAddRoomForm: t('Telefon raqami avval kiritilgan'),
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

  /* halper */
  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    // @ts-ignore
    setPersonId((pre) => {
      // @ts-ignore
      return [...pre, ...value];
    });

    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  React.useEffect(() => {
    dispatch(fetchRoomGetAll({}));
  }, [dispatch]);

  const handleClose = () => {
    setIsOpenRoomAttachmentMonitorChildForm(false);
  };

  /* UI */
  return (
    <Dialog
      onClose={handleClose}
      className={cls.DepartmentAddWrapper}
      aria-labelledby="alert-dialog-title"
      open={isOpenRoomAttachmentMonitorChildForm}
      aria-describedby="alert-dialog-description"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={cls.DepartmentAddCard}
      >
        <h3 className={cls.CardTitle}>{t('Xona biriktirish')}</h3>
        <AddRoomForMonitorOPtions />

        {/* <FormControl sx={{ width: '90%', margin: '10px 20px' }}>
          <InputLabel id="demo-multiple-checkbox-label">Xonalar</InputLabel>
          <Select
            required
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={personName}
            onChange={handleChange}
            input={<OutlinedInput label="Xonalar" />}
            renderValue={(selected) => selected.join(', ')}
            MenuProps={MenuProps}
          >
            {getListOfRooms?.room.map((item: any) => (
              <MenuItem key={item.id} value={item.id}>
                <Checkbox checked={personName.indexOf(item.name) > -1} />
                <ListItemText primary={item.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl> */}
        <div className={cls.CardBody}>
          <div className={cls.BtnParnet}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsOpenRoomAttachmentMonitorChildForm(false);
              }}
              type="button"
              className={`${cls.Btn} ${cls.Btn1}`}
            >
              {t('Bekor qilish')}
            </button>

            <button
              onClick={handleSubmitAllFormData}
              type="button"
              className={`${cls.Btn} ${cls.Btn2}`}
            >
              {t('Saqlash')}
            </button>
          </div>
        </div>
      </div>

      {addDoctorFormDialogIsLoading && <Loader />}
    </Dialog>
  );
};

export default RoomAttachmentMonitorChildForm;
