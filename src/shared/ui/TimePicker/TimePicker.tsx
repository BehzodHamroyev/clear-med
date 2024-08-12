import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import TextField from '@mui/material/TextField';

interface TimePickerValueProps {
  value: Dayjs | null;
  onChange: (newValue: Dayjs | null) => void;
}

const TimePickerValue: React.FC<TimePickerValueProps> = ({
  value,
  onChange,
}) => {
  const handleTimeChange = (newValue: Dayjs | null) => {
    onChange(newValue);
  };

  // Ensure the default value includes the current year
  const defaultValue = value || dayjs().startOf('day');

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker
        label="Ishlash vaqti"
        value={defaultValue}
        onChange={handleTimeChange}
        ampm={false}
        // @ts-ignore
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
};

export default TimePickerValue;
