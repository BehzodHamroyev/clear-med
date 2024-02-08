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

import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import { fetchDoctorGetAll } from '@/pages/DoctorsListPage';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

const MonitorAddSelection = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const {
    isDataFormAddRoom,
    setIsDataFormAddRoom,
    setIsMonitorAddSelectionFormAdvertisement,
  } = React.useContext(ButtonsContext);

  const [doctorValue, setDoctorValue] = React.useState('');

  /* halper function */
  const handleChange = (event: SelectChangeEvent) => {
    setDoctorValue(event.target.value as any);

    if (event.target.value === '1') {
      setIsMonitorAddSelectionFormAdvertisement(true);
    } else {
      setIsMonitorAddSelectionFormAdvertisement(false);
    }

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
      <Box sx={{ minWidth: 120, marginBottom: '20px' }}>
        <FormControl required fullWidth>
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
            <MenuItem value="1">{t('Reklamali')}</MenuItem>
            <MenuItem value="2">{t('Reklamasiz')}</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </div>
  );
};

export default MonitorAddSelection;
