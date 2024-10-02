import React, { useContext, useEffect } from 'react';
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
import { getListOfDepartmens } from '@/pages/admin/DepartmentPage/model/selectors/departmentList';
import { fetchDepartmentGetAll } from '@/pages/admin/DepartmentPage/model/service/getAllDepartmentRequest';

const RoomAddSectionInput = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const getListOfDepartments = useSelector(getListOfDepartmens);

  const [sectionValue, setSectionValue] = React.useState('');

  const { isDataFormAddRoom, setIsDataFormAddRoom } =
    useContext(ButtonsContext);

  /* halper function */
  const handleChange = (event: SelectChangeEvent) => {
    setSectionValue(event.target.value as string);
    setIsDataFormAddRoom({
      ...isDataFormAddRoom,
      SectionName: event.target.value as string,
    });
  };

  useEffect(() => {
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
                  return (
                    <MenuItem key={e.id} value={`${e.id}`}>
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

export default RoomAddSectionInput;
