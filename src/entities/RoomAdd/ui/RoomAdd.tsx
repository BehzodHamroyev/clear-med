import React, { useContext } from 'react';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { useTranslation } from 'react-i18next';
import cls from './RoomAdd.module.scss';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';

const RoomAdd = () => {
  const { t } = useTranslation();
  const { setIsOpenRoomAddCard } = useContext(ButtonsContext);

  const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  return (
    <div
      className={cls.DepartmentAddWrapper}
      onClick={(e) => {
        e.stopPropagation();
        setIsOpenRoomAddCard(false);
      }}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={cls.DepartmentAddCard}
      >
        <h3 className={cls.CardTitle}>{t('Xona qo‘shish')}</h3>
        <div className={cls.CardBody}>
          <input
            type="text"
            maxLength={20}
            className={cls.InputBulim}
            placeholder={t('Xona raqami')}
          />

          

          <Box sx={{ minWidth: 120, marginTop: '20px', marginBottom: '20px' }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                {t("Bo'lim turlari")}
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Bo'lim turlari"
                onChange={handleChange}
              >
                <MenuItem value={10}>Ginekologiya</MenuItem>
                <MenuItem value={20}>Ankologiya</MenuItem>
                <MenuItem value={30}>Akusher</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ minWidth: 120, marginTop: '20px', marginBottom: '20px' }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                {t("Shifokor ro'yihati")}
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Shifokor ro'yihati"
                onChange={handleChange}
              >
                <MenuItem value={10}>{t("Abbos G'ulomov")}</MenuItem>
                <MenuItem value={20}>{t('Behzod Hamroyev')}</MenuItem>
                <MenuItem value={30}>{t('Mironshoh Asadov')}</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <div className={cls.BtnParnet}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsOpenRoomAddCard(false);
              }}
              type="button"
              className={`${cls.Btn} ${cls.Btn1}`}
            >
              {t('Bekor qilish')}
            </button>
            <button type="button" className={`${cls.Btn} ${cls.Btn2}`}>
              {t('Saqlash')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomAdd;

// 

