import * as React from 'react';
import { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

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
    if (newValue) {
      const formattedTime = newValue.toISOString();
      console.log({ tillTime: formattedTime });
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['TimePicker', 'TimePicker']}>
        <TimePicker
          label="Controlled picker"
          value={value}
          onChange={handleTimeChange}
          ampm={false}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default TimePickerValue;
