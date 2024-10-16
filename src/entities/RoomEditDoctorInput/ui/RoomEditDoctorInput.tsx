import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import {
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  SelectChangeEvent,
} from '@mui/material';

import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getListOfDoctor } from '@/pages/admin/DoctorsListPage/model/selector/doctorListSelector';
import { fetchDoctorGetAll } from '@/pages/admin/DoctorsListPage/model/service/fetchDoctorGetAll';

export const RoomEditDoctorInput = () => {
  /* useTranslation */
  const { t } = useTranslation();

  /* useAppDispatch */
  const dispatch = useAppDispatch();

  /* useContext */
  const { isDataFormAddRoom, setIsDataFormAddRoom } =
    React.useContext(ButtonsContext);

  /* useState */
  const [doctorValue, setDoctorValue] = React.useState('');

  /* useSelector */
  const getListOfDoctors = useSelector(getListOfDoctor);

  /* halper function */
  const handleChange = (event: SelectChangeEvent) => {
    setDoctorValue(event.target.value as string);
    setIsDataFormAddRoom({
      ...isDataFormAddRoom,
      DoctorName: event.target.value as string,
    });
  };

  /* useEffect */
  React.useEffect(() => {
    dispatch(fetchDoctorGetAll({}));
  }, [dispatch]);

  return (
    <div>
      <Box sx={{ minWidth: 120, marginTop: '20px', marginBottom: '20px' }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            {t("Shifokor ro'yihati")}
          </InputLabel>

          <Select
            value={doctorValue}
            onChange={handleChange}
            id="demo-simple-select"
            label="Shifokor ro'yihati"
            labelId="demo-simple-select-label"
          >
            {getListOfDoctors
              ? getListOfDoctors?.map((e, index) => {
                  return (
                    <MenuItem key={index + 1} value={`${e._id}`}>
                      {e?.name}
                    </MenuItem>
                  );
                })
              : ''}
          </Select>
        </FormControl>
      </Box>
    </div>
  );
};
