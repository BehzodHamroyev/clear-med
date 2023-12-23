import React, { useContext, useState } from 'react';

import { useTranslation } from 'react-i18next';
import cls from './DepartmentAdd.module.scss';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import { GetIconForDepartment } from '@/shared/ui/GetIconForDepartment';
import { iconsCardDepartments } from '@/shared/ui/GetIconForDepartment/model/helper/source';

const DepartmentAdd = () => {
  const { t } = useTranslation();
  const {
    setIsOpenDepartmentAddCard,
    isOpenDepartmentAddCardIcon,
    setIsOpenDepartmentAddCardIcon,
    isOpenDepartmentAddCardIconIndex,
    setIsOpenDepartmentAddCardIconIndex,
  } = useContext(ButtonsContext);

  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: { target: { value: string } }) => {
    const newValue = e.target.value.replace(/\D/g, '');

    if (newValue.length <= 2) {
      setInputValue(newValue);
    }
  };

  const ResultIconSrc =
    iconsCardDepartments[isOpenDepartmentAddCardIconIndex].icon;

  return (
    <div
      className={cls.DepartmentAddWrapper}
      onClick={(e) => {
        e.stopPropagation();
        setIsOpenDepartmentAddCard(false);
      }}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={cls.DepartmentAddCard}
      >
        <div className={cls.TitleFlex}>
          <h3 className={cls.CardTitle}>{t('Bo‘lim qo‘shish')}</h3>

          <ResultIconSrc />
        </div>

        <div className={cls.CardBody}>
          <input
            type="text"
            maxLength={20}
            className={cls.InputBulim}
            placeholder={t('Bo‘lim qo‘shish')}
          />

          <label className={cls.labelInput} htmlFor="1">
            {t('Bemorni qabul qilishga ketadigan taxminiy vaqt!')}
            <input
              id="1"
              type="number"
              value={inputValue}
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

          <div className={cls.BtnParnet}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsOpenDepartmentAddCard(false);
              }}
              type="button"
              className={`${cls.Btn} ${cls.Btn1}`}
            >
              {t('Bekor qilish')}
            </button>
            <button type="button" className={`${cls.Btn} ${cls.Btn2}`}>
              {t('Saqlash')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentAdd;
