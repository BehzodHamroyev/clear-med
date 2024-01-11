import React from 'react';

import cls from './DoneQueueTableTitleDoctorProfile.module.scss';
import { CheckedIcon, ErrorIcon } from '@/shared/assets/Pages/Doctor';

import { Queue } from '@/pages/QueuesControlDoctor';

interface TableInfo {
  cursor?: boolean;
  Tablethead?: string[];
  Tabletbody?: Queue[];
}

const DoneQueueTableTitleDoctorProfile = (props: TableInfo) => {
  const { Tablethead, Tabletbody, cursor } = props;

  console.log(Tabletbody, 'report');

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
          <tr key={queue.id} className={cls.tr}>
            <td className={cls.td}>{queue.queues_name}</td>
            <td className={cls.td}>{queue.queues_name}</td>
            <td className={cls.td}>{queue.queues_name}</td>
            <td className={cls.td}>{queue.queues_name}</td>
            <td className={cls.td}>
              <img
                src={queue.status === 'completed' ? CheckedIcon : ErrorIcon}
                alt="rejected"
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DoneQueueTableTitleDoctorProfile;
