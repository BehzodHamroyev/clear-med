import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { SerializedError } from '@reduxjs/toolkit';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: (e: React.MouseEvent) => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2, background: '#800000' }} {...other}>
      {children}
    </DialogTitle>
  );
}

export interface ErrorDialogProps {
  isErrorProps: boolean;
  errorProps?: FetchBaseQueryError | SerializedError | string;
}

export default function ErrorDialog({
  isErrorProps,
  errorProps,
}: ErrorDialogProps) {
  React.useEffect(() => {
    // body tegiga overflow: hidden stilini qo'shish
    document.body.style.overflow = 'hidden';

    // useEffect ichidagi funksiya olib tashlanishida body tegiga qo'shilgan stilni olib tashlash
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpen(false);
  };

  const handleReload = () => {
    window.location.reload();
  };

  const handleHomePage = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate('/');
  };

  React.useEffect(() => {
    if (isErrorProps) {
      handleClickOpen();
    }
  }, [isErrorProps]);

  const ErrorDialogClicked = () => {
    handleReload();
  };

  return (
    <div onClick={ErrorDialogClicked}>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          <div style={{ display: 'flex', gap: '20px' }}>
            <Typography sx={{ fontSize: '22px', color: 'white' }}>
              {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                // errorProps?.data?.error?.status
              }
            </Typography>
            <Typography sx={{ fontSize: '22px', color: 'white' }}>
              {/* {errorProps?.status} */}
            </Typography>
          </div>
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography
            sx={{ fontSize: '18px', textAlign: 'center' }}
            gutterBottom
          >
            {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              // errorProps?.data?.message
            }
            Xatolik sodir bo`ldi. Qaytadan bajaring
          </Typography>
        </DialogContent>
        <DialogActions
          sx={{ justifyContent: 'space-between', background: '#800000' }}
        >
          <Button
            sx={{ fontSize: '16px', color: 'white' }}
            autoFocus
            onClick={handleHomePage}
          >
            Bosh sahifaga qaytish
          </Button>
          <Button
            sx={{ fontSize: '16px', color: 'white' }}
            autoFocus
            onClick={handleReload}
          >
            Qayta bajarish
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
