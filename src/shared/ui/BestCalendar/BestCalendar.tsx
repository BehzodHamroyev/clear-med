import React, { useContext } from 'react';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import 'dayjs/locale/de';

import cls from './BestCalendar.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';

interface BestCalendarProps {
  className?: string;
}

const BestCalendar = ({ className }: BestCalendarProps) => {
  const { setCalendarBeginValue, setCalendarEndValue } =
    useContext(ButtonsContext);

  // ----- gtmTime convert to Est time -----
  const convertToEst = (gmtTime: any) => {
    return new Date(
      new Date(gmtTime).toLocaleString('uz-UZ'),
    ).toLocaleDateString('uz-UZ');
  };

  // ----- changed or selected Calendar -----
  const handleDateChange = (newDateRange: any) => {
    if (newDateRange[0]?.$d) {
      setCalendarBeginValue(convertToEst(newDateRange[0]?.$d));
    }
    if (newDateRange[1]?.$d) {
      setCalendarEndValue(convertToEst(newDateRange[1]?.$d));
    }
  };

  return (
    <div className={classNames(cls.BestCalendar, {}, [className])}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
        <DemoContainer components={['DateRangePicker']}>
          <DemoItem component="DateRangePicker">
            <DateRangePicker
              sx={{
                padding: '0px',
                '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': {
                  paddingBottom: '8px ',
                },
                '& .css-1d3z3hw-MuiOutlinedInput-notchedOutline': {
                  top: '0px',
                },
              }}
              localeText={{
                start: 'dan',
                end: 'gacha',
              }}
              onChange={handleDateChange}
              format="DD/MM/YYYY"
            />
          </DemoItem>
        </DemoContainer>
      </LocalizationProvider>
    </div>
  );
};

export default BestCalendar;
