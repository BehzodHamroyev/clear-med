import React, { useEffect } from 'react';

import { useSelector } from 'react-redux';
import cls from './AddDepartmentPage.module.scss';

import { ButtonNavbar } from '@/entities/ButtonNavbar';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import { fetchAllDepartments } from '../model/service/fetchAllDepartments';
import {
  getAllDepartmentsData,
  getAllDepartmentsError,
  getAllDepartmentsIsLoading,
} from '../model/selector/AllDepartmentSelector';
import { LoaderAdmin } from '@/widgets/LoaderAdmin';
import ErrorDialog from '@/shared/ui/ErrorDialog/ErrorDialog';

const AddDepartmentPage = () => {
  const dispatch = useAppDispatch();

  const allDepartmentsData = useSelector(getAllDepartmentsData);
  const allDepartmentsIsLoading = useSelector(getAllDepartmentsIsLoading);
  const allDepartmentsError = useSelector(getAllDepartmentsError);

  useEffect(() => {
    dispatch(fetchAllDepartments({}));
  }, [dispatch]);

  return (
    <div className={cls.AddDepartmentPageWrp}>
      <ButtonNavbar CreateCarbonAdd TableTitle="Bo‘limlar" ItemsLength={1} />

      {allDepartmentsData && allDepartmentsData.length > 0 ? (
        <div>
          <table className={cls.TableTitleWrapper}>
            <thead className={cls.Tablethead}>
              <tr className={cls.tr}>
                {/* {Tablethead.map((title: string, index) => (
                  <th key={index + 1} className={cls.th}>
                    {title}
                  </th>
                ))} */}
              </tr>
            </thead>

            <tbody className={cls.Tabletbody}>
              {/* {Tabletbody.map((item) => {
                return (
                  <tr
                    key={item?.id}
                    className={`${cls.tr} ${cursor ? cls.clicked : ''}`}
                  >
                    {item?.img ? (
                      <td className={cls.td}>
                        <img className={cls.Img} src={item.img} alt="#" />
                      </td>
                    ) : (
                      ''
                    )}

                    {item?.item1 ? (
                      <td className={cls.td}>{item.item1}</td>
                    ) : (
                      ''
                    )}
                    {item?.item2 ? (
                      <td className={cls.td}>{item.item2}</td>
                    ) : (
                      ''
                    )}
                    {item?.item3 ? (
                      <td className={cls.td}>{item.item3}</td>
                    ) : (
                      ''
                    )}
                    {item?.item4 ? (
                      <td className={cls.td}>{item.item4}</td>
                    ) : (
                      ''
                    )}
                    {item?.item5 ? (
                      <td className={cls.td}>{item.item5}</td>
                    ) : (
                      ''
                    )}
                    {item?.item6 ? (
                      <td className={cls.td}>{item.item6}</td>
                    ) : (
                      ''
                    )}
                    {item?.item7 ? (
                      <td className={cls.td}>{item.item7}</td>
                    ) : (
                      ''
                    )}
                    {item?.item8 ? (
                      <td className={cls.td}>{item.item8}</td>
                    ) : (
                      ''
                    )}

                    {item?.lastChild ? (
                      <td className={`${cls.lastChild}`}>
                        <pre>{item?.lastChild}</pre>{' '}
                        <PenTools
                        // onClick={() => handleCardAddCard(`${item.id}`)}
                        />
                      </td>
                    ) : (
                      ''
                    )}

                    {item?.lastInDeleteChild ? (
                      <td className={`${cls.lastChild}`}>
                        <pre>{item?.lastInDeleteChild}</pre>{' '}
                        <DeleteTools
                        // onClick={() => handleCardAddCard(`${item.id}`)}
                        />
                      </td>
                    ) : (
                      ''
                    )}
                  </tr>
                );
              })} */}
            </tbody>
          </table>
        </div>
      ) : (
        <h1>Data yoq</h1>
      )}

      {allDepartmentsIsLoading && <LoaderAdmin />}

      {allDepartmentsError && <ErrorDialog isErrorProps={!false} />}
    </div>
  );
};

export default AddDepartmentPage;
