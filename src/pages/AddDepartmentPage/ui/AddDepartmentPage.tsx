/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useEffect } from 'react';

import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import cls from './AddDepartmentPage.module.scss';

import { baseUrl } from '../../../../baseurl';
import { LoaderAdmin } from '@/widgets/LoaderAdmin';
import { DepartmentAdd } from '@/entities/DepartmentAdd';
import ErrorDialog from '@/shared/ui/ErrorDialog/ErrorDialog';
import { CarbonAdd } from '@/shared/assets/entities/ButtonNavbar';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import { fetchAllDepartments } from '../model/service/fetchAllDepartments';
import { DeleteTools, PenTools } from '@/shared/assets/entities/TableTitle';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import {
  getAllDepartmentsData,
  getAllDepartmentsError,
  getAllDepartmentsIsLoading,
} from '../model/selector/AllDepartmentSelector';

const AddDepartmentPage = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const { isOpenDepartmentAddCard, setIsOpenDepartmentAddCard } =
    useContext(ButtonsContext);

  const allDepartmentsData = useSelector(getAllDepartmentsData);
  const allDepartmentsError = useSelector(getAllDepartmentsError);
  const allDepartmentsIsLoading = useSelector(getAllDepartmentsIsLoading);

  const handleCardAddCard = () => {
    setIsOpenDepartmentAddCard(true);
  };

  useEffect(() => {
    dispatch(fetchAllDepartments({}));
  }, [dispatch]);

  return (
    <div className={cls.AddDepartmentPageWrp}>
      <div className={cls.AddDepartmentPageWrp__Title}>
        <p className={cls['AddDepartmentPageWrp__Title--text']}>
          {t('Bo‘limlar')}{' '}
          <span className={cls['AddDepartmentPageWrp__Title--span']}>
            ({allDepartmentsData ? allDepartmentsData.length : 0})
          </span>{' '}
        </p>

        <div className={cls['AddDepartmentPageWrp__Title--IconDiv']}>
          <CarbonAdd
            onClick={handleCardAddCard}
            className={cls['AddDepartmentPageWrp__Title--Icon']}
          />
        </div>
      </div>

      <table className={cls.AddDepartmentPageWrp__Table}>
        <thead className={cls['AddDepartmentPageWrp__Table--Tablethead']}>
          <tr className={cls['AddDepartmentPageWrp__Table--tr']}>
            <th className={cls['AddDepartmentPageWrp__Table--th']}>
              {t("Bo'lim rasmi")}
            </th>

            <th className={cls['AddDepartmentPageWrp__Table--th']}>
              {t("Bo'lim nomi")}
            </th>

            <th className={cls['AddDepartmentPageWrp__Table--th']}>
              {t('Shifokorlar soni')}
            </th>

            <th className={cls['AddDepartmentPageWrp__Table--th']}>
              {t('Xonalar raqami')}
            </th>

            <th className={cls['AddDepartmentPageWrp__Table--edit']} />
            <th className={cls['AddDepartmentPageWrp__Table--delete']} />
          </tr>
        </thead>
        {allDepartmentsData && allDepartmentsData.length > 0 ? (
          <tbody className={cls['AddDepartmentPageWrp__Table--Tabletbody']}>
            {allDepartmentsData.map((item) => {
              const ImgSvg = `${baseUrl}${item.photo}`;

              return (
                <tr
                  key={item?.id}
                  className={cls['AddDepartmentPageWrp__Table--tr']}
                >
                  <td className={cls['AddDepartmentPageWrp__Table--td']}>
                    <img
                      src={ImgSvg}
                      className={cls['AddDepartmentPageWrp__Table--img']}
                      alt="?"
                    />
                  </td>

                  <td className={cls['AddDepartmentPageWrp__Table--td']}>
                    {item.name}
                  </td>

                  <td className={cls['AddDepartmentPageWrp__Table--td']}>-</td>

                  <td className={cls['AddDepartmentPageWrp__Table--td']}>-</td>

                  <td className={cls['AddDepartmentPageWrp__Table--lastChild']}>
                    {}
                    <PenTools
                      className={cls['AddDepartmentPageWrp__Table--edit']}
                    />
                  </td>

                  <td
                    className={cls['AddDepartmentPageWrp__Table--lastChild2']}
                  >
                    {}
                    <DeleteTools
                      className={cls['AddDepartmentPageWrp__Table--delete']}
                    />
                  </td>

                  {/* {item?.item1 ? <td className={cls.td}>{item.item1}</td> : ''}
                  {item?.item2 ? <td className={cls.td}>{item.item2}</td> : ''}
                  {item?.item3 ? <td className={cls.td}>{item.item3}</td> : ''}
                  {item?.item4 ? <td className={cls.td}>{item.item4}</td> : ''}
                  {item?.item5 ? <td className={cls.td}>{item.item5}</td> : ''}
                  {item?.item6 ? <td className={cls.td}>{item.item6}</td> : ''}
                  {item?.item7 ? <td className={cls.td}>{item.item7}</td> : ''}
                  {item?.item8 ? <td className={cls.td}>{item.item8}</td> : ''} */}

                  {/* {item?.lastChild ? (
                    <td className={`${cls.lastChild}`}>
                      <pre>{item?.lastChild}</pre>{' '}
                      <PenTools
                      // onClick={() => handleCardAddCard(`${item.id}`)}
                      />
                    </td>
                  ) : (
                    ''
                  )} */}
                </tr>
              );
            })}
          </tbody>
        ) : allDepartmentsIsLoading ? (
          <LoaderAdmin />
        ) : allDepartmentsError ? (
          <ErrorDialog isErrorProps={!false} />
        ) : (
          ''
        )}
      </table>

      {isOpenDepartmentAddCard ? <DepartmentAdd /> : ''}
    </div>
  );
};

export default AddDepartmentPage;
