import React from 'react';
import { useParams } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import cls from './TableTitlePatients.module.scss';
import { TableBody, TableInfoPatients } from '../model/types/TableInfo';

const TableTitlePatients = (props: TableInfoPatients) => {
  const { Tablethead, TableBody, cursor } = props;

  const param: { id?: string } = useParams();
  const idUrl = Number(param?.id);

  const { t } = useTranslation();

  return (
    <table className={cls.TableTitleWrapper}>
      <h3 className={cls.KorilganBemorlar}>
        {t("Jami Ko'rilgan Bemorlar : ")}
        {TableBody.map((item) =>
          item.id === idUrl ? item.KorilganBemorlar?.length : null,
        )}
        {t(' ta')}
      </h3>

      <thead className={cls.Tablethead}>
        <tr className={cls.tr}>
          {Tablethead.map((title: string) => (
            <th className={cls.th}>{title}</th>
          ))}
        </tr>
      </thead>

      <tbody className={cls.Tabletbody}>
        {TableBody.map((item: TableBody) =>
          item.id === idUrl
            ? item.KorilganBemorlar
              ? item.KorilganBemorlar.map((bemorItem) => (
                  <tr
                    key={bemorItem.id}
                    className={`${cls.tr} ${cursor ? cls.clicked : ''}`}
                  >
                    <td className={cls.td}>{bemorItem.id}</td>
                    <td className={cls.td}>{bemorItem.shifokor}</td>
                    <td className={cls.td}>{bemorItem.xona}</td>
                    <td className={cls.td}>{bemorItem.qabulboshlanishi}</td>
                    <td className={cls.td}>{bemorItem.qabultugashi}</td>
                  </tr>
                ))
              : null
            : null,
        )}
      </tbody>
    </table>
  );
};

export default TableTitlePatients;
