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
  getListOfDepartmens,
  fetchDepartmentGetAll,
} from '@/pages/DepartmentPage';

import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

const RoomEditSectionInput = () => {
  /* useTranslation */
  const { t } = useTranslation();

  /* useAppDispatch */
  const dispatch = useAppDispatch();

  /* useSelector */
  const getListOfDepartments = useSelector(getListOfDepartmens);

  /* useState */
  const [sectionValue, setSectionValue] = React.useState('');

  /* useContext */
  const { isDataFormAddRoom, setIsDataFormAddRoom } =
    React.useContext(ButtonsContext);

  /* halper function */
  const handleChange = (event: SelectChangeEvent) => {
    setSectionValue(event.target.value as string);
    setIsDataFormAddRoom({
      ...isDataFormAddRoom,
      SectionName: event.target.value as string,
    });
  };

  /* useEffect */
  React.useEffect(() => {
    dispatch(fetchDepartmentGetAll({}));
  }, [dispatch]);

  /* UI */
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
                  return (
                    <MenuItem key={index + 1} value={`${e.id}`}>
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

export default RoomEditSectionInput;
