import React from 'react';

import cls from './TableTitleDoctorProfile.module.scss';

import { Queue } from '@/pages/QueuesControlDoctor';

interface TableInfo {
  cursor?: boolean;
  Tablethead: string[];
  Tabletbody: Queue[];
}

const TableTitleDoctorProfile = (props: TableInfo) => {
  const { Tablethead, Tabletbody, cursor } = props;

  console.log('2024-01-09T04:25:36.099Z');
  console.log('2024-01-09T04:25:36.099Z'.split('T0')[1].split('.')[0]);

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
        {Tabletbody.map((queue) => (
          <tr key={queue.id} className={cls.tr}>
            <td className={cls.td}>{queue.queues_name}</td>
            <td className={cls.td}>
              {queue.accepted_date.split('T0')[1].split('.')[0]}
              {' | '} {queue.accepted_date.split('T0')[0]}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableTitleDoctorProfile;
