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

const RoomAddDoctorInput = () => {
  const { t } = useTranslation();

  const [doctorValue, setDoctorValue] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setDoctorValue(event.target.value as string);
  };

  return (
    <div>
      <Box sx={{ minWidth: 120, marginTop: '20px', marginBottom: '20px' }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            {t("Shifokor ro'yihati")}
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={doctorValue}
            label="Shifokor ro'yihati"
            onChange={handleChange}
          >
            <MenuItem value={10}>{t("Abbos G'ulomov")}</MenuItem>
            <MenuItem value={20}>{t('Behzod Hamroyev')}</MenuItem>
            <MenuItem value={30}>{t('Mironshoh Asadov')}</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </div>
  );
};

export default RoomAddDoctorInput;
