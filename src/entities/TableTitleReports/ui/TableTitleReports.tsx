import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { TableInfo } from '../model/types/TableInfo';

import cls from './TableTitle.module.scss';

const TableTitleReports = (props: TableInfo) => {
  const { t } = useTranslation();

  const { Tablethead, Tabletbody, cursor } = props;

  return (
    <table className={cls.TableTitleWrapper}>
      <thead className={cls.Tablethead}>
        <tr className={cls.tr}>
          {Tablethead.map((title: string) => (
            <th key={title} className={cls.th}>
              {t(title)}
              {}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className={cls.Tabletbody}>
        {Tabletbody.filter(
          (item) =>
            item?.name &&
            item?.rooms.length > 0 &&
            item?.rooms[0]?.department_id,
        ).map((item) => (
          <Link
            key={item._id}
            style={{ listStyle: 'none', textDecoration: 'none', color: '#000' }}
            to={`/reports/${item.id}`}
          >
            <tr
              key={item.id}
              className={`${cls.tr} ${cursor ? cls.clicked : ''}`}
            >
              {item.rooms.length > 0 && item.rooms[0]?.department_id?.name ? (
                <td className={cls.td}>
                  {t(item.rooms[0]?.department_id?.name)}
                </td>
              ) : (
                <td className={cls.td}>
                  <span className={cls.td_invalid}>{t("Bo'lim yo'q")}</span>
                </td>
              )}

              {item.rooms.length > 0 && item.rooms[0]?.name ? (
                <td className={cls.td}>{item.rooms[0]?.name}</td>
              ) : (
                <td className={cls.td}>
                  <span className={cls.td_invalid}>{t("Xona yo'q")}</span>
                </td>
              )}

              {item.name ? <td className={cls.td}>{item.name}</td> : ''}

              {item.photo.length > 0 ? (
                <td className={cls.td}>
                  <img
                    className={cls.Img}
                    src={`http://medapi.magicsoft.uz/${item.photo}`}
                    alt="#"
                  />
                </td>
              ) : (
                ''
              )}
            </tr>
          </Link>
        ))}
      </tbody>
    </table>
  );
};

export default TableTitleReports;
