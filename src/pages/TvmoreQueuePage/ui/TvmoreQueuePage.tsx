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
        <table className={cls['TvmoreQueuePageWrp__body--table']}>
          <thead className={cls['TvmoreQueuePageWrp__body--thead']}>
            <tr>
              <th className={cls['TvmoreQueuePageWrp__body--thead1']}>Талон</th>
              <th className={cls['TvmoreQueuePageWrp__body--thead2']}>
                Окно №
              </th>
            </tr>
          </thead>

          <tbody className={cls['TvmoreQueuePageWrp__body--tbody']}>
            <tr className={cls['TvmoreQueuePageWrp__body--tr']}>
              <td className={cls['TvmoreQueuePageWrp__body--trStart']}>
                A091 <GoArrowRight />
              </td>
              <td className={cls['TvmoreQueuePageWrp__body--trCenter']}>01</td>
            </tr>

            <tr className={cls['TvmoreQueuePageWrp__body--tr']}>
              <td className={cls['TvmoreQueuePageWrp__body--trStart']}>
                Т045 <GoArrowRight />
              </td>
              <td className={cls['TvmoreQueuePageWrp__body--trCenter']}>03</td>
            </tr>

            <tr className={cls['TvmoreQueuePageWrp__body--tr']}>
              <td className={cls['TvmoreQueuePageWrp__body--trStart']}>
                Т056 <GoArrowRight />
              </td>
              <td className={cls['TvmoreQueuePageWrp__body--trCenter']}>011</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TvmoreQueuePage;
