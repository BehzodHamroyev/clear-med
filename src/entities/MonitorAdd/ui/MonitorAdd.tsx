import React from 'react';
import { useTranslation } from 'react-i18next';

import { FormDataInState } from '../model/types/doctorAddTypes';
import { EyeIcon, HideIcon } from '@/shared/assets/Pages/LoginPage';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import { MonitorAddSelection } from '@/entities/MonitorAddSelection';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import cls from './MonitorAdd.module.scss';
import { fetchCreateNewMonitorForMonitorPage } from '../model/service/fetchCreateNewMonitorForMonitorPage';

const MonitorAdd = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const {
    setIsOpenMonitorAddCard,
    isMonitorAddSelectionFormAdvertisement,
    setResponseData,
  } = React.useContext(ButtonsContext);

  const [hideEye, setHideEye] = React.useState(false);

  const [isAllFormData, setIsAllFormData] = React.useState<FormDataInState>({
    name: '',
    login: '',
    password: '',
    exprience: false,
  });

  const handleInputChangeFormName = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setIsAllFormData({ ...isAllFormData, name: e.target.value });
  };

  function handleInputChangeFormPhoneNumber(event: any, name: string) {
    setIsAllFormData({ ...isAllFormData, login: event.target.value });
  }

  function handleInputChangeFormPassword(event: any, name: string) {
    setIsAllFormData({ ...isAllFormData, password: event });
  }

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    dispatch(
      fetchCreateNewMonitorForMonitorPage({
        name: isAllFormData.name,
        login: `${isAllFormData.login}`,
        password: `${isAllFormData.password}`,
        addvertising: isAllFormData.exprience,
      }),
    );

    setResponseData(`${Math.random() * 100 + 1}`);
    setIsOpenMonitorAddCard(false);
  };

  React.useEffect(() => {
    setIsAllFormData({
      ...isAllFormData,
      exprience: isMonitorAddSelectionFormAdvertisement,
    });
  }, [isAllFormData, isMonitorAddSelectionFormAdvertisement]);

  /* UI */
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        setIsOpenMonitorAddCard(false);
      }}
      className={cls.DepartmentAddWrapper}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={cls.DepartmentAddCard}
      >
        <h3 className={cls.CardTitle}>{t("Monitor qo'shish")}</h3>

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
          <input
            required
            type="number"
            maxLength={9}
            minLength={9}
            min={9}
            max={9}
            placeholder={t('Login')}
            className={cls.InputBulim}
            value={`${isAllFormData.login}`}
            onChange={(e) => handleInputChangeFormPhoneNumber(e, 'PhoneNumber')}
          />

          {/* <Input
            maxLength={20}
            id="PhoneNumber"
            autoComplete="off"
            name="PhoneNumber"
            placeholder={t('Login')}
            rules={{ required: true }}
            className={cls.InputBulim}
            value={`${isAllFormData.login}`}
            onChange={(e) => handleInputChangeFormPhoneNumber(e, 'PhoneNumber')}
          /> */}

          <div className={cls.PhoneNumberInputWrapper}>
            <input
              required
              min={8}
              minLength={8}
              maxLength={14}
              id="UserPassword"
              autoComplete="off"
              name="UserPassword"
              placeholder="Parol"
              className={cls.InputBulim}
              value={isAllFormData.password}
              type={hideEye ? 'text' : 'password'}
              onChange={(e) =>
                handleInputChangeFormPassword(e.target.value, 'UserPassword')
              }
            />

            {hideEye ? (
              <EyeIcon
                className={cls.FixValueBnt}
                onClick={() => setHideEye(false)}
              />
            ) : (
              <HideIcon
                className={cls.FixValueBnt}
                onClick={() => setHideEye(true)}
              />
            )}
          </div>

          <MonitorAddSelection />

          <div className={cls.BtnParnet}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsOpenMonitorAddCard(false);
              }}
              type="button"
              className={`${cls.Btn} ${cls.Btn1}`}
            >
              {t('Bekor qilish')}
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

export default MonitorAdd;
