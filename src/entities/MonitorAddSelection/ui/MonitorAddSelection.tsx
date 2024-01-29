import React from 'react';
import { useTranslation } from 'react-i18next';

import {
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  SelectChangeEvent,
} from '@mui/material';

import { useSelector } from 'react-redux';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import { fetchDoctorGetAll, getListOfDoctor } from '@/pages/DoctorsListPage';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

const MonitorAddSelection = () => {
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
            {t('Reklama turi')}
          </InputLabel>

          <Select
            value={doctorValue}
            label="Reklama turi"
            onChange={handleChange}
            id="demo-simple-select"
            labelId="demo-simple-select-label"
          >
            <MenuItem value="Reklamali">Reklamali</MenuItem>
            <MenuItem value="Reklamasiz">Reklamasiz</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </div>
  );
};

export default MonitorAddSelection;
