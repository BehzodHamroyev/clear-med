import React, { useContext, useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';
import cls from './DepartmentEdit.module.scss';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import { iconsCardDepartments } from '@/shared/ui/GetIconForDepartment/model/helper/source';
import { GetIconForDepartment } from '@/shared/ui/GetIconForDepartment';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchDepartmentDelete } from '../model/service/departmentDelete';
import { DepartmentEditOrDelete } from '../model/types/DepartmentEditOrDeleteTypes';

const DepartmentEdit = (prop: DepartmentEditOrDelete) => {
  const { tableBody } = prop;

  const { t } = useTranslation();

  const [inputValue, setInputValue] = useState('');

  const dispatch = useAppDispatch();

  const {
    departmentGetId,
    setDepartmentListChanged,
    isOpenDepartmentAddCardIcon,
    setIsOpenDepartmentEditCard,
    isOpenDepartmentAddCardIconIndex,
    setIsOpenDepartmentAddCardIcon,
  } = useContext(ButtonsContext);

  const newDataDepartmendCard = tableBody.filter((item) => {
    return item.id === departmentGetId
      ? {
          id: item.id,
          departmentName: item.duration,
          image: item.img,
        }
      : '';
  });

  const ResultIconSrc =
    iconsCardDepartments[isOpenDepartmentAddCardIconIndex].icon;

  const handleInputChange = (e: { target: { value: string } }) => {
    const newValue = e.target.value.replace(/\D/g, '');

    if (newValue.length <= 2) {
      setInputValue(newValue);
    }
  };

  const DepartmentCardDeleteItem = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    setIsOpenDepartmentEditCard(false);
    dispatch(fetchDepartmentDelete({ idCard: departmentGetId }));
    setDepartmentListChanged(' ');
  };

  useEffect(() => {
    if (newDataDepartmendCard) {
      // @ts-ignore
      setInputValue(newDataDepartmendCard?.[0]?.item1);
    }
  }, [newDataDepartmendCard]);

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

          <ResultIconSrc />
        </div>

        {newDataDepartmendCard.map((item) => (
          <div className={cls.CardBody}>
            <input
              type="text"
              maxLength={20}
              className={cls.InputBulim}
              placeholder={t('Bo‘limni o‘zgartirish')}
            />
            {/*  */}
            <label className={cls.labelInput} htmlFor="1">
              {t('Bemorni qabul qilishga ketadigan taxminiy vaqt!')}
              <input
                id="1"
                type="number"
                onChange={handleInputChange}
                maxLength={2}
                min={1}
                max={60}
                placeholder={t('minut')}
                className={cls.InputBulim}
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

            {/*  */}
            <div className={cls.BtnParnet}>
              <button
                onClick={DepartmentCardDeleteItem}
                type="button"
                className={`${cls.Btn} ${cls.Btn1}`}
              >
                {t('O‘chirib yuborish')}
              </button>
              <button type="button" className={`${cls.Btn} ${cls.Btn2}`}>
                {t('Saqlash')}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DepartmentEdit;
