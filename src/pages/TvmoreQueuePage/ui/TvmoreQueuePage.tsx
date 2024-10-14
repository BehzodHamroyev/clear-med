import React from 'react';
import { GoArrowRight } from 'react-icons/go';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import cls from './TvmoreQueuePage.module.scss';
import { TvLogoTemprory } from '@/shared/assets/Pages/tv';
import { updateClock } from '../helperFunctions/updateClock';

const TvmoreQueuePage: React.FC = () => {
  const [currentTime, setCurrentTime] = React.useState<string>('');

  React.useEffect(() => {
    const updateTime = () => {
      setCurrentTime(updateClock());
    };

    updateTime();
    const intervalId = setInterval(updateTime, 10000);

    return () => clearInterval(intervalId);
  }, []);

  const arr = [
    {
      id: 1,
      RoomName: 'Пастки ётоқ',
      queues: [
        'A01',
        'A02',
        'A03',
        'A04',
        'A05',
        'A06',
        'A07',
        'A08',
        'A09',
        'A10',
        'A11',
        'A12',
      ],
      roomNumber: '01',
    },
    {
      id: 2,
      RoomName: 'Юқори ётоқ',
      queues: [
        'B01',
        'B02',
        'B03',
        'B04',
        'B05',
        'B06',
        'B07',
        'B08',
        'B09',
        'B10',
        'B11',
      ],
      roomNumber: '02',
    },
    {
      id: 3,
      RoomName: 'Шифокор қабули',
      queues: [
        'D01',
        'D02',
        'D03',
        'D04',
        'D05',
        'D06',
        'D07',
        'D08',
        'D09',
        'D10',
        'D11',
        'D12',
        'D13',
      ],
      roomNumber: '03',
    },
  ];

  return (
    <div className={cls.TvmoreQueuePageWrp}>
      <div className={cls.TvmoreQueuePageWrp__top}>
        <div className={cls['TvmoreQueuePageWrp__top--left']}>
          <LazyLoadImage
            effect="blur"
            src={TvLogoTemprory}
            alt="TvLogoTemprory"
            className={cls['TvmoreQueuePageWrp__top--leftLogo']}
          />

          <p className={cls['TvmoreQueuePageWrp__top--leftTitle']}>
            Med Navbat
          </p>
        </div>

        <p id="clock" className={cls['TvmoreQueuePageWrp__top--rightClock']}>
          {currentTime}
        </p>
      </div>

      <div className={cls.TvmoreQueuePageWrp__body}>
        <div className={cls['TvmoreQueuePageWrp__body--sections']}>
          {arr.map((item) => (
            <h2
              key={item.id}
              className={cls['TvmoreQueuePageWrp__body--section']}
            >
              {item.RoomName}
            </h2>
          ))}
        </div>

        <div className={cls['TvmoreQueuePageWrp__body--box']}>
          {arr.map((item) => (
            <table className={cls['TvmoreQueuePageWrp__body--table']}>
              <thead className={cls['TvmoreQueuePageWrp__body--thead']}>
                <tr>
                  <th className={cls['TvmoreQueuePageWrp__body--thead1']}>
                    Талон
                  </th>
                  <th className={cls['TvmoreQueuePageWrp__body--thead2']}>
                    Окно №
                  </th>
                </tr>
              </thead>

              <tbody className={cls['TvmoreQueuePageWrp__body--tbody']}>
                {item.queues.map((itemSecond) => (
                  <tr className={cls['TvmoreQueuePageWrp__body--tr']}>
                    <td className={cls['TvmoreQueuePageWrp__body--trStart']}>
                      {itemSecond}
                    </td>

                    <td className={cls['TvmoreQueuePageWrp__body--trCenter']}>
                      <GoArrowRight />
                    </td>

                    <td className={cls['TvmoreQueuePageWrp__body--trEnd']}>
                      {item.roomNumber}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TvmoreQueuePage;
