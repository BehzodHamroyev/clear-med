import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select, { SelectChangeEvent } from '@mui/material/Select';

// import { useSelector } from 'react-redux';
import { useSelector } from 'react-redux';
import { baseUrl } from '../../../../baseurl';
import { RoomAddTypes } from '../model/types/roomAddTypes';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';

import cls from './RoomAttachmentMonitorChildForm.module.scss';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchRoomGetAll, getListOfRoom } from '@/pages/RoomPage';

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

const names = [
  '1-xona',
  '2-xona',
  '3-xona',
  '4-xona',
  '5-xona',
  '6-xona',
  '7-xona',
  '8-xona',
  '9-xona',
  '10-xona',
];

const RoomAttachmentMonitorChildForm = () => {
  /* translation */
  const { t } = useTranslation();

  /* Cookies */
  const token = Cookies.get('token');

  const dispatch = useAppDispatch();

  const [roomData, setRoomData] = useState<any>({});

  /* useContext */
  const {
    setHasOpenToast,
    isDataFormAddRoom,
    setIsOpenRoomAddCard,
    setDepartmentListChanged,
    setResponseAddDoctorStatusCode,
    setIsOpenRoomAttachmentMonitorChildForm,
  } = React.useContext(ButtonsContext);

  /* fetch data */
  const handleSubmitAllFormData = async () => {
    setDepartmentListChanged(`${Math.random() * 100 + 1}`);
    try {
      const response = await axios.post<RoomAddTypes>(
        `${baseUrl}/monitor/${12121}`,
        {
          name: Number(
            isDataFormAddRoom?.RoomNumber ? isDataFormAddRoom?.RoomNumber : '',
          ),
        },
        {
          maxBodyLength: Infinity,
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
          },
        },
      );

      setIsOpenRoomAddCard(false);
      setResponseAddDoctorStatusCode(200);

      return response.data;
    } catch (e) {
      return setResponseAddDoctorStatusCode('404');
    }
  };

  /* useState */
  const [personName, setPersonName] = React.useState<string[]>([]);

  /* halper */
  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  /* selectors */

  useEffect(() => {
    setRoomData('');
  }, []);
  const getListOfRooms = useSelector(getListOfRoom);
  console.log(getListOfRooms);

  React.useEffect(() => {
    dispatch(fetchRoomGetAll({}));
  }, [dispatch]);

  // const roomData = useSelector(getListOfRoom);

  /* UI */
  return (
    <div
      className={cls.DepartmentAddWrapper}
      onClick={(e) => {
        e.stopPropagation();
        setIsOpenRoomAttachmentMonitorChildForm(false);
      }}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={cls.DepartmentAddCard}
      >
        <h3 className={cls.CardTitle}>{t('Xona biriktirish')}</h3>
        <FormControl sx={{ width: '90%', margin: '10px 20px' }}>
          <InputLabel id="demo-multiple-checkbox-label">Xonalar</InputLabel>
          <Select
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
              <MenuItem key={item.id} value={item.name}>
                <Checkbox checked={personName.indexOf(item.name) > -1} />
                <ListItemText primary={item.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

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
    </div>
  );
};

export default RoomAttachmentMonitorChildForm;
