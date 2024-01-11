import React, { useContext, useState } from 'react';

import { useTranslation } from 'react-i18next';
import cls from './DepartmentAdd.module.scss';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import { GetIconForDepartment } from '@/shared/ui/GetIconForDepartment';
import { iconsCardDepartments } from '@/shared/ui/GetIconForDepartment/model/helper/source';
import { fetchDepartmentAdd } from '../model/service/departmentAddResponse';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

const DepartmentAdd = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const {
    setIsOpenDepartmentAddCard,
    isOpenDepartmentAddCardIcon,
    setIsOpenDepartmentAddCardIcon,
    isOpenDepartmentAddCardIconIndex,
    setDepartmentListChanged,
  } = useContext(ButtonsContext);

  const [inputValue, setInputValue] = useState<Number>();
  const [departmentName, setDepartmentName] = useState('');

  const handleInputChange = (e: { target: { value: string } }) => {
    const newValue = e.target.value.replace(/\D/g, '');

    if (newValue.length <= 2) {
      setInputValue(Number(newValue));
    }
  };

  const ResultIconSrc =
    iconsCardDepartments[isOpenDepartmentAddCardIconIndex].icon;

  const handleButtonClick = () => {
    dispatch(
      fetchDepartmentAdd({
        name: departmentName,
        image: 'NervopotologIcon',
        duration: Number(inputValue),
      }),
    );

    setDepartmentListChanged(departmentName);
  };

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

        <form action="#" className={cls.CardBody}>
          <input
            type="text"
            maxLength={20}
            minLength={3}
            min={3}
            required
            onChange={(e) => setDepartmentName(e.target.value)}
            className={cls.InputBulim}
            placeholder={t('Bo‘lim qo‘shish')}
          />

          <label className={cls.labelInput} htmlFor="1">
            {t('Bemorni qabul qilishga ketadigan taxminiy vaqt!')}
            <input
              id="1"
              type="number"
              value={Number(inputValue)}
              onChange={handleInputChange}
              maxLength={2}
              required
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
            <button
              onClick={handleButtonClick}
              type="button"
              className={`${cls.Btn} ${cls.Btn2}`}
            >
              {t('Saqlash')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DepartmentAdd;
