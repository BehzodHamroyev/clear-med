/* eslint-disable max-len */
import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';

import cls from './AddRoomForMonitorPage.module.scss';

import { CarbonAdd } from '@/shared/assets/entities/ButtonNavbar';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { GetAllRoomAtachmentMonitorReducer } from '../model/slice/getAllRoomAtachmentMonitorSlice';

import {
  ReducersList,
  DynamicModuleLoader,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

import {
  getIsError,
  getIsLoading,
  GetAllRoomForMonitorData,
} from '../model/selector/GetAllMonitorSelectorSlice';
import { Loader } from '@/widgets/Loader';
import ErrorDialog from '@/shared/ui/ErrorDialog/ErrorDialog';
import { fetchAllRoomForMonitor } from '../model/service/fetchAllRoomForMonitor';
import { RoomAttachmentMonitorChildForm } from '@/entities/RoomAttachmentMonitorChildForm';
import { RoomAttachmentMonitorChildFormEdit } from '@/entities/RoomAttachmentMonitorChildFormEdit';
import { DeleteTools } from '@/shared/assets/entities/TableTitle';

const Svg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="21"
    viewBox="0 0 24 21"
    fill="none"
  >
    <path
      d="M9.72901 20.6361C9.98206 20.8744 10.32 21.005 10.6699 20.9998C11.0198 20.9947 11.3536 20.8541 11.5993 20.6085C11.8449 20.3628 11.9828 20.0318 11.9831 19.6869C11.9834 19.3419 11.8461 19.0107 11.6009 18.7647L4.44139 11.8096H22.6668C23.0204 11.8096 23.3595 11.6712 23.6095 11.4247C23.8595 11.1782 24 10.844 24 10.4954C24 10.1468 23.8595 9.81256 23.6095 9.56609C23.3595 9.31962 23.0204 9.18115 22.6668 9.18115H4.45072L11.6022 2.23535C11.8475 1.98929 11.9847 1.65806 11.9844 1.31311C11.9841 0.968164 11.8463 0.637163 11.6006 0.39153C11.3549 0.145897 11.0211 0.00532555 10.6712 0.000148224C10.3213 -0.0050291 9.98339 0.125603 9.73034 0.363856L0.496332 9.32966C0.339121 9.4825 0.214287 9.6646 0.129082 9.8654C0.0438771 10.0662 0 10.2817 0 10.4993C0 10.717 0.0438771 10.9325 0.129082 11.1333C0.214287 11.3341 0.339121 11.5162 0.496332 11.669L9.72901 20.6361Z"
      fill="black"
    />
  </svg>
);

const reudcer: ReducersList = {
  GetAllRoomAtachmentMonitorSlice: GetAllRoomAtachmentMonitorReducer,
};

const AddRoomForMonitorPage = () => {
  const { id } = useParams();

  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const getError = useSelector(getIsError);
  const getLoading = useSelector(getIsLoading);
  const getData = useSelector(GetAllRoomForMonitorData);

  console.log(getData?.monitor?.name, 'vjvjvjvj');

  const {
    isOpenRoomAttachmentMonitorChildForm,
    setIsOpenRoomAttachmentMonitorChildForm,
    isOpenRoomAttachmentMonitorChildFormedit,
    setIsOpenRoomAttachmentMonitorChildFormEdit,
    departmentGetId,
  } = useContext(ButtonsContext);

  React.useEffect(() => {
    dispatch(
      fetchAllRoomForMonitor({
        id: id || departmentGetId,
      }),
    );
  }, [departmentGetId, dispatch, id]);

  /* UI */
  return (
    <DynamicModuleLoader reducers={reudcer}>
      {getLoading && <Loader />}

      {getError && <ErrorDialog isErrorProps={!false} />}

      <div>
        <div className={cls.AddRoomForMonitorWrapper}>
          {/* Title */}
          <div className={cls.AddRoomForMonitorWrapper__Title}>
            <Link
              className={cls['AddRoomForMonitorWrapper__Title--btn']}
              to={`/add_monitor/${id}`}
            >
              {Svg}
              {t('Ortga')}
            </Link>
            <p className={cls['AddRoomForMonitorWrapper__Title--content']}>
              {t('Monitorga biriktirilgan xonalar')}{' '}
              <span>({getData?.monitor.rooms.length})</span>
            </p>
            <CarbonAdd
              onClick={() => setIsOpenRoomAttachmentMonitorChildForm(true)}
              className={cls['AddRoomForMonitorWrapper__Title--create']}
            />
          </div>

          {/* Body */}

          <table className={cls.AddRoomForMonitorWrapper__Table}>
            <thead
              className={cls['AddRoomForMonitorWrapper__Table--Tablethead']}
            >
              <tr className={cls['AddRoomForMonitorWrapper__Table--tr']}>
                <th className={cls['AddRoomForMonitorWrapper__Table--th']}>
                  {t('Xona raqami')}
                </th>

                <th className={cls['AddRoomForMonitorWrapper__Table--th']}>
                  {t('Bo‘limlar')}
                </th>

                <th className={cls['AddRoomForMonitorWrapper__Table--th']}>
                  {t('Shifokorlar')}
                </th>

                <th className={cls['AddRoomForMonitorWrapper__Table--delete']}>
                  {}
                </th>
              </tr>
            </thead>

            {getData?.monitor.rooms && getData?.monitor.rooms.length > 0 ? (
              <tbody
                className={cls['AddRoomForMonitorWrapper__Table--Tabletbody']}
              >
                <tr className={cls['AddRoomForMonitorWrapper__Table--tr']}>
                  <td className={cls['AddRoomForMonitorWrapper__Table--td']}>
                    {getData?.monitor?.rooms ? (
                      getData?.monitor?.rooms.map((item) => {
                        return <p>{item?.name}</p>;
                      })
                    ) : (
                      <p
                        className={
                          cls['AddRoomForMonitorWrapper__Table--invalid']
                        }
                      >
                        {t("Xona raqami yo'q")}
                      </p>
                    )}
                  </td>

                  <td className={cls['AddRoomForMonitorWrapper__Table--td']}>
                    {getData?.monitor?.rooms ? (
                      getData?.monitor?.rooms.map((item) => {
                        return <p>{item?.department_id?.name}</p>;
                      })
                    ) : (
                      <p
                        className={
                          cls['AddRoomForMonitorWrapper__Table--invalid']
                        }
                      >
                        {t("Xona yo'q")}
                      </p>
                    )}
                  </td>

                  <td className={cls['AddRoomForMonitorWrapper__Table--td']}>
                    {getData?.monitor?.rooms ? (
                      getData?.monitor?.rooms.map((item) => {
                        return <p>{item?.doctor_id?.name}</p>;
                      })
                    ) : (
                      <p
                        className={
                          cls['AddRoomForMonitorWrapper__Table--invalid']
                        }
                      >
                        {t("Doktor yo'q")}
                      </p>
                    )}
                  </td>

                  <td
                    className={
                      cls['AddRoomForMonitorWrapper__Table--lastChild2']
                    }
                    // onClick={() => handleClickDeleteDepartment(item?.id)}
                  >
                    {}
                    <DeleteTools
                      className={cls['AddRoomForMonitorWrapper__Table--delete']}
                    />
                  </td>
                </tr>
              </tbody>
            ) : (
              <p className={cls['AddRoomForMonitorWrapper__Table--txt']}>
                Biriktirilgan xonalar mavjud emas!
              </p>
            )}
          </table>
        </div>

        {isOpenRoomAttachmentMonitorChildForm ? (
          <RoomAttachmentMonitorChildForm />
        ) : (
          ''
        )}

        {isOpenRoomAttachmentMonitorChildFormedit ? (
          <RoomAttachmentMonitorChildFormEdit />
        ) : (
          ''
        )}
      </div>
    </DynamicModuleLoader>
  );
};

export default AddRoomForMonitorPage;
