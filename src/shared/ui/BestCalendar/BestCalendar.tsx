import * as React from 'react';
import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';

import cls from './BestCalendar.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

interface BestCalendarProps {
  className?: string;
}

const ProSpan = styled('span')({
  display: 'inline-block',
  height: '1em',
  width: '1em',
  verticalAlign: 'middle',
  marginLeft: '0.3em',
  marginBottom: '0.08em',
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  backgroundImage: 'url(https://mui.com/static/x/pro.svg)',
});

function Label({
  componentName,
  valueType,
  isProOnly,
}: {
  componentName: string;
  valueType: string;
  isProOnly?: boolean;
}) {
  const content = (
    <span>
      <strong>{componentName}</strong> for {valueType} editing
    </span>
  );

  if (isProOnly) {
    return (
      <Stack direction="row" spacing={0.5} component="span">
        <Tooltip title="Included on Pro package">
          <ProSpan />
        </Tooltip>
        {content}
      </Stack>
    );
  }

  return content;
}

const BestCalendar = ({ className }: BestCalendarProps) => {
  return (
    <div className={classNames(cls.BestCalendar, {}, [className])}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
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
                start: 'Dan',
                end: 'Gacha',
              }}
            />
          </DemoItem>
        </DemoContainer>
      </LocalizationProvider>
    </div>
  );
};

export default BestCalendar;
