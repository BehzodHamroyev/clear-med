import React, { useContext } from 'react';

import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';

interface ToastProps {
  severity: string;
  message: string;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Toast = ({ severity, message }: ToastProps) => {
  const { hasOpenToast, setHasOpenToast } = useContext(ButtonsContext);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setHasOpenToast(false);
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar
        open={hasOpenToast}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={
            severity === 'success'
              ? 'success'
              : severity === 'warning'
              ? 'warning'
              : severity === 'info'
              ? 'info'
              : severity === 'error'
              ? 'error'
              : 'success'
          }
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default Toast;
