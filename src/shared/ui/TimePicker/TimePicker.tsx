import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

export default function TimePickerValue() {
  const [value, setValue] = React.useState<Dayjs | null>(
    dayjs('2022-04-17T15:30'),
  );

  const handleTimeChange = (newValue: Dayjs | null) => {
    setValue(newValue);
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
}
