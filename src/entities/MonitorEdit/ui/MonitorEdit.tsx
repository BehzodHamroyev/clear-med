import React from 'react';
import { useTranslation } from 'react-i18next';

import axios from 'axios';
import Cookies from 'js-cookie';
import { baseUrl } from '../../../../baseurl';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import { fetchMonitorCardEdit } from '../model/service/fetchMonitorCardEdit';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import cls from './monitorEdit.module.scss';

const MonitorEdit = (props: any) => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const {
    setResponseData,
    departmentGetId,
    monitorEditFormOldValue,
    setIsOpenMonitorEditCard,
  } = React.useContext(ButtonsContext);

  const [isAllFormData, setIsAllFormData] = React.useState({
    name: monitorEditFormOldValue,
  });

  const handleInputChangeFormName = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setIsAllFormData({ ...isAllFormData, name: e.target.value });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    dispatch(
      fetchMonitorCardEdit({
        name: isAllFormData.name,
        idCard: departmentGetId,
      }),
    );

    setResponseData(`${Math.random() * 100 + 1}`);
    setIsOpenMonitorEditCard(false);
  };

  const token = Cookies.get('token');

  const handleDeleteCardMonitor = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    setResponseData(`${Math.random() * 100 + 1}`);
    setIsOpenMonitorEditCard(false);

    try {
      const response = await axios.delete<any>(
        `${baseUrl}/users/${departmentGetId}`,
        {
          maxBodyLength: Infinity,
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
          },
        },
      );

      // setResponseAddDoctorStatusCode(200);
      // setIsOpenDepartmentEditCard(false);

      return response.data;
    } catch (e) {
      // return setResponseAddDoctorStatusCode('404');
      return console.log(e);
    }
  };

  /* UI */
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        setIsOpenMonitorEditCard(false);
      }}
      className={cls.DepartmentAddWrapper}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={cls.DepartmentAddCard}
      >
        <h3 className={cls.CardTitle}>{t('Monitorni tahrirlash')}</h3>

        <div className={cls.CardBody}>
          <input
            required
            type="text"
            maxLength={30}
            placeholder={t('Nomi')}
            className={cls.InputBulim}
            value={`${isAllFormData.name}`}
            onChange={(e) => handleInputChangeFormName(e)}
          />

          <div className={cls.BtnParnet}>
            <button
              onClick={(e) => handleDeleteCardMonitor(e)}
              type="button"
              className={`${cls.Btn} ${cls.Btn1}`}
            >
              {t("O'chirib tashlash")}
            </button>

            <button
              type="button"
              className={`${cls.Btn} ${cls.Btn2}`}
              onClick={handleSubmit}
            >
              {t('Saqlash')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonitorEdit;
