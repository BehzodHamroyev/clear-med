import React from 'react';

import { TableInfo } from '../model/types/TableInfo';

import cls from './TableTitleDoctorProfile.module.scss';

const TableTitleDoctorProfile = (props: TableInfo) => {
  const { Tablethead, Tabletbody, cursor } = props;

  return (
    <table className={cls.TableTitleWrapper}>
      <thead className={cls.Tablethead}>
        <tr className={cls.tr}>
          {Tablethead.map((title: string) => (
            <th className={cls.th}>{title}</th>
          ))}
        </tr>
      </thead>

      <tbody className={cls.Tabletbody}>
        {Tabletbody.map((item) => (
          <tr key={item.id} className={cls.tr}>
            {item.item1 ? <td className={cls.td}>{item.item1}</td> : ''}
            {item.item2 ? <td className={cls.td}>{item.item2}</td> : ''}
            {item.item3 ? <td className={cls.td}>{item.item3}</td> : ''}
            {item.img ? (
              <td className={cls.td}>
                <img className={cls.Img} src={item?.img} alt="#" />
              </td>
            ) : (
              ''
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableTitleDoctorProfile;
