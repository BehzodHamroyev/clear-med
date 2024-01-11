import React from 'react';
import { useTranslation } from 'react-i18next';

import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import { fetchDepartmentEdit } from '../model/service/departmentEdit';
import { GetIconForDepartment } from '@/shared/ui/GetIconForDepartment';
import { fetchDepartmentDelete } from '../model/service/departmentDelete';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { iconsCardDepartments } from '@/shared/ui/GetIconForDepartment/model/helper/source';

import {
  UseStateType,
  DepartmentEditOrDelete,
} from '../model/types/departmentDelete';

import cls from './DepartmentEdit.module.scss';

const DepartmentEdit = (prop: DepartmentEditOrDelete) => {
  const { tableBody } = prop;

  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const [inputValue, setInputValue] = React.useState<UseStateType>({
    id: '',
    iconName: null,
    durationTime: '',
    departmentName: '',
  });

  const {
    departmentGetId,
    setDepartmentListChanged,
    isOpenDepartmentAddCardIcon,
    setIsOpenDepartmentEditCard,
    setIsOpenDepartmentAddCardIcon,
    isOpenDepartmentAddCardIconIndex,
  } = React.useContext(ButtonsContext);

  const handleInputChange = (e: { target: { value: string } }) => {
    const newValue = e.target.value.replace(/\D/g, '');

    if (newValue.length <= 2) {
      setInputValue({ ...inputValue, durationTime: newValue });
    }
  };

  const DepartmentCardDeleteItem = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    setIsOpenDepartmentEditCard(false);
    dispatch(fetchDepartmentDelete({ idCard: departmentGetId }));
    setDepartmentListChanged(' ');
  };

  const DepartmentAddCardEditItem = () => {
    dispatch(
      fetchDepartmentEdit({
        idCard: inputValue.id,
        image: `${isOpenDepartmentAddCardIconIndex || 1}`,
        name: inputValue.departmentName,
        duration: Number(inputValue.durationTime),
      }),
    );

    setDepartmentListChanged('Edit');
  };

  const matchingItem = tableBody?.find((item) => item?.id === departmentGetId);

  const ResultIcon = iconsCardDepartments[Number(matchingItem?.imgName)]?.icon;

  React.useEffect(() => {
    if (matchingItem) {
      setInputValue({
        id: `${matchingItem?.id || 1}`,
        departmentName: `${matchingItem?.item1 || 'Bulim yuq'}`,
        durationTime: `${matchingItem?.duration}`,
        iconName: ResultIcon ? <ResultIcon /> : '',
      });
    } else {
      console.log('No matching item found');
    }
  }, [ResultIcon, matchingItem]);

  return (
    <div
      className={cls.DepartmentAddWrapper}
      onClick={(e) => {
        e.stopPropagation();
        setIsOpenDepartmentEditCard(false);
      }}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={cls.DepartmentAddCard}
      >
        <div className={cls.TitleFlex}>
          <h3 className={cls.CardTitle}>{t('Bo‘limni tahrirlash')}</h3>

          {inputValue.iconName ? inputValue.iconName : <div />}
        </div>

        <div className={cls.CardBody}>
          <input
            type="text"
            maxLength={20}
            name="editSection"
            className={cls.InputBulim}
            value={inputValue.departmentName}
            onChange={(e) =>
              setInputValue({ ...inputValue, departmentName: e.target.value })
            }
            placeholder={t('Bo‘limni o‘zgartirish')}
          />

          <label className={cls.labelInput} htmlFor="1">
            {t('Bemorni qabul qilishga ketadigan taxminiy vaqt!')}
            <input
              id="1"
              min={1}
              max={60}
              maxLength={2}
              type="number"
              name="minutes"
              placeholder={t('minut')}
              className={cls.InputBulim}
              onChange={handleInputChange}
              value={inputValue.durationTime}
            />
          </label>

          <button
            className={`${cls.Btn} ${cls.BtnHover} ${cls.Btn3}`}
            onClick={() => {
              setIsOpenDepartmentAddCardIcon(true);
            }}
            type="button"
          >
            {t("Bo'limga rasm qo'shish")}
          </button>

          {isOpenDepartmentAddCardIcon ? <GetIconForDepartment /> : ''}

          <div className={cls.BtnParnet}>
            <button
              onClick={DepartmentCardDeleteItem}
              type="button"
              className={`${cls.Btn} ${cls.Btn1}`}
            >
              {t('O‘chirib yuborish')}
            </button>

            <button
              type="button"
              onClick={DepartmentAddCardEditItem}
              className={`${cls.Btn} ${cls.Btn2}`}
            >
              {t('Saqlash')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentEdit;
