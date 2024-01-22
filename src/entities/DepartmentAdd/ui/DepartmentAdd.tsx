import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';

import { baseUrl } from '../../../../baseurl';
import { DepartmentType } from '../model/types/departmentType';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import { GetIconForDepartment } from '@/shared/ui/GetIconForDepartment';
import { iconsCardDepartments } from '@/shared/ui/GetIconForDepartment/model/helper/source';

import cls from './DepartmentAdd.module.scss';

const DepartmentAdd = () => {
  /* useTranslation */
  const { t } = useTranslation();

  /* useContext */
  const {
    setDepartmentListChanged,
    setIsOpenDepartmentAddCard,
    isOpenDepartmentAddCardIcon,
    setIsOpenDepartmentAddCardIcon,
    setResponseAddDoctorStatusCode,
    isOpenDepartmentAddCardIconIndex,
  } = React.useContext(ButtonsContext);

  /* useState */
  const [inputValue, setInputValue] = React.useState<Number>();

  const [departmentName, setDepartmentName] = React.useState('');

  /* Cookies */
  const token = Cookies.get('token');

  /* handle change functions */
  const handleInputChange = (e: { target: { value: string } }) => {
    const newValue = e.target.value.replace(/\D/g, '');

    if (newValue.length <= 2) {
      setInputValue(Number(newValue));
    }
  };

  /* get img card */
  const ResultIconSrc =
    iconsCardDepartments[isOpenDepartmentAddCardIconIndex].icon;

  /* fetch add */
  const handleButtonSubmit = async () => {
    setDepartmentListChanged(departmentName);

    try {
      const response = await axios.post<DepartmentType>(
        `${baseUrl}/department/create`,
        {
          name: departmentName,
          duration: Number(inputValue),
          image: `${isOpenDepartmentAddCardIconIndex}`,
        },
        {
          maxBodyLength: Infinity,
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
          },
        },
      );
      setResponseAddDoctorStatusCode(200);
      setIsOpenDepartmentAddCard(false);

      return response.data;
    } catch (e: any) {
      setResponseAddDoctorStatusCode('404');
      return console.log(e, 'error');
    }
  };

  /* UI */
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        setIsOpenDepartmentAddCard(false);
      }}
      className={cls.DepartmentAddWrapper}
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

          <input
            id="1"
            min={1}
            max={60}
            required
            type="number"
            maxLength={2}
            value={Number(inputValue)}
            className={cls.InputBulim}
            onChange={handleInputChange}
            placeholder={t("Bemorni ko'rishga ketadigan taxminiy vaqt")}
          />

          <button
            className={`${cls.Btn} ${cls.BtnHover} ${cls.Btn3}`}
            onClick={() => {
              setIsOpenDepartmentAddCardIcon(true);
            }}
            type="button"
          >
            {t("Bo'limga rasm qo'shish")}
          </button>

          <button
            className={`${cls.Btn} ${cls.BtnHover} ${cls.Btn3}`}
            onClick={() => {}}
            type="button"
          >
            {t("Bo'limga rasm yuklash")}
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
              onClick={handleButtonSubmit}
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
