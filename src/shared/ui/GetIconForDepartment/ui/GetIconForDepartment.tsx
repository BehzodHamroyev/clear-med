import React, { useContext } from 'react';

import { Dialog } from '@mui/material';
import cls from './GetIconForDepartment.module.scss';
import { iconsCardDepartments } from '../model/helper/source';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';

const GetIconForDepartment = () => {
  const {
    isOpenDepartmentAddCardIcon,
    setIsOpenDepartmentAddCardIcon,
    setIsOpenDepartmentAddCardIconIndex,
  } = useContext(ButtonsContext);

  const handleClose = () => {
    setIsOpenDepartmentAddCardIcon(false);
  };

  return (
    <Dialog
      onClose={handleClose}
      open={isOpenDepartmentAddCardIcon}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className={cls.GetIconForDepartmentWrapper}
    >
      <div>
        <div
          onClick={(e) => e.stopPropagation()}
          className={cls.CardIconsSelector}
        >
          {iconsCardDepartments?.map((item, index) => (
            <item.icon
              onClick={() => {
                setIsOpenDepartmentAddCardIconIndex(index);
                setIsOpenDepartmentAddCardIcon(false);
              }}
            />
          ))}
        </div>
      </div>
    </Dialog>
  );
};

export default GetIconForDepartment;
