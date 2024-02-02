import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { styled } from '@mui/material/styles';
import {
  Dialog,
  Select,
  TextField,
  InputLabel,
  FormControl,
} from '@mui/material';

import cls from './AddRoomFormDialog.module.scss';

import { classNames } from '@/shared/lib/classNames/classNames';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';

interface AddRoomFormDialogProps {
  className?: string;
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const AddRoomFormDialog = ({ className }: AddRoomFormDialogProps) => {
  const { t } = useTranslation();

  const { isOpenRoomAddCard, setIsOpenRoomAddCard } =
    useContext(ButtonsContext);

  const handleClose = () => {
    setIsOpenRoomAddCard(false);
  };

  const handleFormSubmit = (e: { stopPropogation: () => void }) => {
    e.stopPropogation();
  };

  return (
    <BootstrapDialog
      className={classNames(cls.AddRoomFormDialog__Container, {}, [className])}
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={isOpenRoomAddCard}
    >
      <div className={classNames(cls.AddRoomFormDialog, {}, [className])}>
        <div className={classNames(cls.AddRoomFormDialog__head)}>
          <p>{t("Xona qo'shish")}</p>
        </div>

        <form
          className={classNames(cls.AddRoomFormDialog__form)}
          onSubmit={() => handleFormSubmit}
        >
          <TextField
            id="outlined-basic"
            label={t('Xona raqami')}
            variant="outlined"
            type="number"
            required
            inputProps={{
              minLength: 1,
              maxLength: 3,
            }}
          />

          <FormControl>
            <InputLabel id="demo-simple-select-label">
              {t("Bo'lim turlari")}
            </InputLabel>
            <Select
              required
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              // value={}
              label={t("Bo'lim turlari")}
              // onChange={}
            >
              {/* {getListOfDepartments
                  ? getListOfDepartments?.map((e, index) => {
                      return (
                        <MenuItem key={e.id} value={`${e.id}`}>
                          {e?.name}
                        </MenuItem>
                      );
                    })
                  : ''} */}
            </Select>
          </FormControl>

          <FormControl>
            <InputLabel id="demo-simple-select-label2">
              {t("Shifokorlar ro'yhati")}
            </InputLabel>

            <Select
              required
              labelId="demo-simple-select-label2"
              id="demo-simple-select"
              // value={}
              label={t("Shifokorlar ro'yhati")}
              // onChange={}
            >
              {/* {getListOfDepartments
                  ? getListOfDepartments?.map((e, index) => {
                      return (
                        <MenuItem key={e.id} value={`${e.id}`}>
                          {e?.name}
                        </MenuItem>
                      );
                    })
                  : ''} */}
            </Select>
          </FormControl>

          <div className={classNames(cls.AddRoomFormDialog__buttons)}>
            <button
              type="button"
              className={classNames(cls['AddRoomFormDialog__buttons--cansel'])}
              onClick={handleClose}
            >
              {t('Bekor qilish')}
            </button>

            <button
              type="submit"
              className={classNames(cls['AddRoomFormDialog__buttons--submit'])}
            >
              {t('Saqlash')}
            </button>
          </div>
        </form>
      </div>
    </BootstrapDialog>
  );
};

export default AddRoomFormDialog;
