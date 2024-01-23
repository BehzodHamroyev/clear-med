import React, { useContext } from 'react';

import cls from './GetIconForDepartment.module.scss';
import { iconsCardDepartments } from '../model/helper/source';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';

const GetIconForDepartment = () => {
  const {
    setIsOpenDepartmentAddCardIconIndex,
    setIsOpenDepartmentAddCardIcon,
  } = useContext(ButtonsContext);

  return (
    <div
      className={cls.GetIconForDepartmentWrapper}
      onClick={(e) => {
        e.stopPropagation();
        setIsOpenDepartmentAddCardIcon(false);
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={cls.CardIconsSelector}
      >
        {iconsCardDepartments.map((item, index) => (
          <item.icon
            onClick={() => {
              setIsOpenDepartmentAddCardIconIndex(index);
              setIsOpenDepartmentAddCardIcon(false);
              
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default GetIconForDepartment;
