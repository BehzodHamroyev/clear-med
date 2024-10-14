import React from 'react';
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

import { baseUrl } from '../../../../baseurl';
import { RoomAddTypes } from '../model/types/roomAddTypes';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';

import cls from './AttachmentRoomMonitorChildEdit.module.scss';

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
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

const AttachmentRoomMonitorChild = () => {
  /* translation */
  const { t } = useTranslation();

  /* Cookies */
  const token = Cookies.get('token');

  /* useContext */
  const {
    setHasOpenToast,
    isDataFormAddRoom,
    setIsOpenRoomAddCard,
    setDepartmentListChanged,
    responseAddRoomStatusCode,
    setResponseAddDoctorStatusCode,
    setIsOpenAttachmentRoomMonitorChildEdit,
  } = React.useContext(ButtonsContext);

  /* fetch data */
  const handleSubmitAllFormData = async () => {
    setDepartmentListChanged(`${Math.random() * 100 + 1}`);
    try {
      const response = await axios.post<RoomAddTypes>(
        `${baseUrl}/room/create`,
        {
          department_id: isDataFormAddRoom?.SectionName
            ? isDataFormAddRoom?.SectionName
            : '',
          doctor_id: isDataFormAddRoom?.DoctorName
            ? isDataFormAddRoom?.DoctorName
            : '',
          name: Number(
            isDataFormAddRoom?.RoomNumber ? isDataFormAddRoom?.RoomNumber : '0',
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

  /* UI */
  return (
    <div
      className={cls.DepartmentAddWrapper}
      onClick={(e) => {
        e.stopPropagation();
        setIsOpenAttachmentRoomMonitorChildEdit(false);
      }}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={cls.DepartmentAddCard}
      >
        <p className={cls.CardTitle}>{t('Reklamani Tahrirlash')}</p>

        <FormControl sx={{ width: '90%', margin: '10px 20px' }}>
          <InputLabel id="demo-multiple-checkbox-label">
            {t('Reklamalar')}
          </InputLabel>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={personName}
            onChange={handleChange}
            input={<OutlinedInput label={t('Reklamalar')} />}
            renderValue={(selected) => selected.join(', ')}
            MenuProps={MenuProps}
          >
            {names?.map((name) => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={personName.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <div className={cls.CardBody}>
          <div className={cls.BtnParnet}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsOpenAttachmentRoomMonitorChildEdit(false);
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

export default AttachmentRoomMonitorChild;
