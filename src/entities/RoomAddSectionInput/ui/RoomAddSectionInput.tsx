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

import {
  fetchDepartmentGetAll,
  getListOfDepartmens,
} from '@/pages/DepartmentPage';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

const RoomAddSectionInput = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const getListOfDepartments = useSelector(getListOfDepartmens);

  const [sectionValue, setSectionValue] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setSectionValue(event.target.value as string);
  };

  React.useEffect(() => {
    dispatch(fetchDepartmentGetAll({}));
  }, [dispatch]);

  return (
    <div>
      <Box sx={{ minWidth: 120, marginTop: '20px', marginBottom: '20px' }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            {t("Bo'lim turlari")}
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={sectionValue}
            label="Bo'lim turlari"
            onChange={handleChange}
          >
            {getListOfDepartments
              ? getListOfDepartments?.map((e, index) => {
                  return <MenuItem value={`${index}0`}>{e?.name}</MenuItem>;
                })
              : ''}
            <MenuItem value={20}>Ankologiya</MenuItem>
            <MenuItem value={30}>Akusher</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </div>
  );
};

export default RoomAddSectionInput;
