// src/shared/ui/TimePicker/TimePicker.tsx
import * as React from 'react';
import { TextField } from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Dayjs } from 'dayjs';

interface TimePickerValueProps {
  value: Dayjs | null;
  onChange: (newValue: Dayjs | null) => void;
}

const TimePickerValue: React.FC<TimePickerValueProps> = ({
  value,
  onChange,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker
        value={value}
        onChange={onChange}
        ampm={false}
        // @ts-ignore
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
};

export default TimePickerValue;
