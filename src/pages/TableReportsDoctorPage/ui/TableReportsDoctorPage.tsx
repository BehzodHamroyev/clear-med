/* eslint-disable no-constant-condition */
import React from 'react';
import { useTranslation } from 'react-i18next';

import cls from './TableReportsDoctorPage.module.scss';

const tableTitle = [
  'ID',
  'Shifokor',
  'Xona',
  'Qabul boshlanishi',
  'Qabul tugashi',
];

const KorilganBemorlar = [
  {
    id: 1,
    shifokor: 'Umid Rustamov',
    xona: '2',
    qabulboshlanishi: '9:30:24',
    qabultugashi: '9:50:12',
  },
  {
    id: 2,
    shifokor: 'Umid Rustamov',
    xona: '2',
    qabulboshlanishi: '10:00:24',
    qabultugashi: '10:34:53',
  },
  {
    id: 3,
    shifokor: 'Umid Rustamov',
    xona: '2',
    qabulboshlanishi: '11:40:04',
    qabultugashi: '12:10:22',
  },
  {
    id: 4,
    shifokor: 'Umid Rustamov',
    xona: '2',
    qabulboshlanishi: '12:20:02',
    qabultugashi: '12:50:12',
  },
];

const TableReportsDoctorPage = () => {
  const { t } = useTranslation();

  return (
    <table className={cls.TableTitleWrapper}>
      <h3 className={cls.KorilganBemorlar}>
        {t("Jami Ko'rilgan Bemorlar : ")}
        {KorilganBemorlar.length}
        {t(' ta')}
      </h3>

      <thead className={cls.Tablethead}>
        <tr className={cls.tr}>
          {tableTitle.map((title: string) => (
            <th className={cls.th}>{title}</th>
          ))}
        </tr>
      </thead>

      <tbody className={cls.Tabletbody}>
        {KorilganBemorlar.map((item, index) => (
          <tr key={index} className={cls.tr}>
            <td className={cls.td}>{item.id}</td>
            <td className={cls.td}>{item.shifokor}</td>
            <td className={cls.td}>{item.xona}</td>
            <td className={cls.td}>{item.qabulboshlanishi}</td>
            <td className={cls.td}>{item.qabultugashi}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableReportsDoctorPage;
