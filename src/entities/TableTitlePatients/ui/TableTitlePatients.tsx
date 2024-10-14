import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import cls from './TableTitlePatients.module.scss';

import { CheckedIcon, ErrorIcon } from '@/shared/assets/Pages/Doctor';
import { LazyLoadImage } from 'react-lazy-load-image-component';

interface reportDetailListTtype {
  _id: string;
  department_id: string;
  room_id: string;
  doctor_id: string;
  queues_name: string;
  step: number;
  status: string;
  created_date: string;
  created_time: string;
  __v: 0;
  accepted_date: string;
  completed_date: string;
  id: string;
}

interface TableInfoPatients {
  cursor?: boolean;
  Tablethead: string[];
  TableBody: reportDetailListTtype[];
  TableInfo: {
    all: number;
    counCompleted: number;
    countReject: number;
  };
}

const tableTitle = [
  'ID',
  'Qabul kuni',
  'Qabul boshlanishi',
  'Qabul tugashi',
  'Xolati',
];

const TableTitlePatients = (props: TableInfoPatients) => {
  const { Tablethead, TableBody, TableInfo, cursor } = props;

  const navigate = useNavigate();

  const { t } = useTranslation();

  const handleClickBack = () => {
    navigate('/reports');
  };

  return (
    <table className={cls.TableTitleWrapper}>
      {TableBody && TableBody.length > 0 ? (
        <>
          <div className={cls.TableTitleWrapper__head}>
            <div
              className={cls.TableTitleWrapper__backbtn}
              onClick={() => handleClickBack()}
            >
              {t('Ortga')}
            </div>

            <div className={cls.TableTitleWrapper__title}>
              <p className={cls.KorilganBemorlar}>
                {t("Jami ko'rilgan bemorlar : ")}
                {TableInfo.all}
              </p>

              <p className={cls.KorilganBemorlar} style={{ color: '#148043' }}>
                {t('Tasdiqlangan bemorlar : ')}
                {TableInfo.counCompleted}
              </p>

              <p className={cls.KorilganBemorlar} style={{ color: '#FF0000' }}>
                {t('Bekor qilingan bemorlar : ')}
                {TableInfo.countReject}
              </p>
            </div>
          </div>

          <thead className={cls.Tablethead}>
            <tr className={cls.tr}>
              {tableTitle.map((title: string) => (
                <th key={title} className={cls.th}>
                  {title}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className={cls.Tabletbody}>
            {TableBody &&
              TableBody.length > 0 &&
              TableBody.map((item, index) => (
                <tr key={item.id} className={cls.tr}>
                  <td className={cls.td}>{item.queues_name}</td>
                  <td className={cls.td}>
                    {item.completed_date?.split('T')[0]}
                  </td>
                  <td className={cls.td}>
                    {item.accepted_date?.split('T')[1].split('.')[0]}
                  </td>
                  <td className={cls.td}>
                    {item.completed_date?.split('T')[1].split('.')[0]}
                  </td>
                  <td className={cls.td}>
                    <LazyLoadImage
                      src={
                        item.status === 'completed' ? CheckedIcon : ErrorIcon
                      }
                      alt="rejected"
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </>
      ) : (
        <h2 className={cls.reportEmpty}>
          {t(
            "Bu muddatdagi bemorlar hisoboti bo'sh. Muddatni o'zgartirib ko'ring!",
          )}
        </h2>
      )}
    </table>
  );
};

export default TableTitlePatients;
