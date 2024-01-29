import React from 'react';

import cls from './TableTitleDoctorProfile.module.scss';

import { Queue } from '@/pages/QueuesControlDoctor';

interface TableInfo {
  cursor?: boolean;
  Tablethead?: string[];
  Tabletbody?: Queue[];
}

const TableTitleDoctorProfile = (props: TableInfo) => {
  const { Tablethead, Tabletbody, cursor } = props;

  return (
    <table className={cls.TableTitleWrapper}>
      <thead className={cls.Tablethead}>
        <tr className={cls.tr}>
          {Tablethead?.map((title: string) => (
            <th key={title} className={cls.th}>
              {title}
            </th>
          ))}
        </tr>
      </thead>

      <tbody className={cls.Tabletbody}>
        {Tabletbody?.map((queue) => (
          <tr key={queue?.id} className={cls.tr}>
            <td className={cls.td}>{queue?.queues_name}</td>
            <td className={cls.td}>
              {queue?.created_time?.split('T')[1].split('.')[0]}
              {/* {' | '} {queue.created_time.split('T')[0]} */}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableTitleDoctorProfile;
