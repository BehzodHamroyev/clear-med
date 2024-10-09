import React, { useEffect, useState } from 'react';
import { GoArrowRight } from 'react-icons/go';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import cls from './TvPage.module.scss';
import { TvLogoTemprory } from '@/shared/assets/Pages/tv';
import { updateClock } from '../helperFunctions/updateClock';

const TvPage: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(updateClock());
    };

    updateTime();
    const intervalId = setInterval(updateTime, 10000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={cls.tvPageWrp}>
      <div className={cls.tvPageWrp__top}>
        <div className={cls['tvPageWrp__top--left']}>
          <LazyLoadImage
            effect="blur"
            src={TvLogoTemprory}
            alt="TvLogoTemprory"
            className={cls['tvPageWrp__top--leftLogo']}
          />

          <p className={cls['tvPageWrp__top--leftTitle']}>Med Navbat</p>
        </div>

        <p id="clock" className={cls['tvPageWrp__top--rightClock']}>
          {currentTime}
        </p>
      </div>

      <div className={cls.tvPageWrp__body}>
        {/* <div className={cls['tvPageWrp__body--video']}></div> */}

        <table className={cls['tvPageWrp__body--table']}>
          <thead className={cls['tvPageWrp__body--thead']}>
            <tr>
              <th className={cls['tvPageWrp__body--thead1']}>Талон</th>
              <th className={cls['tvPageWrp__body--thead2']}>Окно №</th>
              <th className={cls['tvPageWrp__body--thead3']}>Статус</th>
            </tr>
          </thead>

          <tbody className={cls['tvPageWrp__body--tbody']}>
            <tr className={cls['tvPageWrp__body--tr']}>
              <td className={cls['tvPageWrp__body--trStart']}>
                A091 <GoArrowRight />
              </td>
              <td className={cls['tvPageWrp__body--trCenter']}>01</td>
              <td
                className={`${cls['tvPageWrp__body--trEnd']} ${cls.summoned}`}
              >
                Вызван
              </td>
            </tr>

            <tr className={cls['tvPageWrp__body--tr']}>
              <td className={cls['tvPageWrp__body--trStart']}>
                Т045 <GoArrowRight />
              </td>
              <td className={cls['tvPageWrp__body--trCenter']}>03</td>
              <td className={`${cls['tvPageWrp__body--trEnd']} ${cls.served}`}>
                Обслуживается
              </td>
            </tr>

            <tr className={cls['tvPageWrp__body--tr']}>
              <td className={cls['tvPageWrp__body--trStart']}>
                Т056 <GoArrowRight />
              </td>
              <td className={cls['tvPageWrp__body--trCenter']}>011</td>
              <td className={`${cls['tvPageWrp__body--trEnd']} ${cls.finish}`}>
                Обслужен
              </td>
            </tr>
            <tr className={cls['tvPageWrp__body--tr']}>
              <td className={cls['tvPageWrp__body--trStart']}>
                A091 <GoArrowRight />
              </td>
              <td className={cls['tvPageWrp__body--trCenter']}>01</td>
              <td
                className={`${cls['tvPageWrp__body--trEnd']} ${cls.summoned}`}
              >
                Вызван
              </td>
            </tr>

            <tr className={cls['tvPageWrp__body--tr']}>
              <td className={cls['tvPageWrp__body--trStart']}>
                Т045 <GoArrowRight />
              </td>
              <td className={cls['tvPageWrp__body--trCenter']}>03</td>
              <td className={`${cls['tvPageWrp__body--trEnd']} ${cls.served}`}>
                Обслуживается
              </td>
            </tr>

            <tr className={cls['tvPageWrp__body--tr']}>
              <td className={cls['tvPageWrp__body--trStart']}>
                Т056 <GoArrowRight />
              </td>
              <td className={cls['tvPageWrp__body--trCenter']}>011</td>
              <td className={`${cls['tvPageWrp__body--trEnd']} ${cls.finish}`}>
                Обслужен
              </td>
            </tr>
            <tr className={cls['tvPageWrp__body--tr']}>
              <td className={cls['tvPageWrp__body--trStart']}>
                A091 <GoArrowRight />
              </td>
              <td className={cls['tvPageWrp__body--trCenter']}>01</td>
              <td
                className={`${cls['tvPageWrp__body--trEnd']} ${cls.summoned}`}
              >
                Вызван
              </td>
            </tr>

            <tr className={cls['tvPageWrp__body--tr']}>
              <td className={cls['tvPageWrp__body--trStart']}>
                Т045 <GoArrowRight />
              </td>
              <td className={cls['tvPageWrp__body--trCenter']}>03</td>
              <td className={`${cls['tvPageWrp__body--trEnd']} ${cls.served}`}>
                Обслуживается
              </td>
            </tr>

            <tr className={cls['tvPageWrp__body--tr']}>
              <td className={cls['tvPageWrp__body--trStart']}>
                Т056 <GoArrowRight />
              </td>
              <td className={cls['tvPageWrp__body--trCenter']}>011</td>
              <td className={`${cls['tvPageWrp__body--trEnd']} ${cls.finish}`}>
                Обслужен
              </td>
            </tr>

            <tr className={cls['tvPageWrp__body--tr']}>
              <td className={cls['tvPageWrp__body--trStart']}>
                A091 <GoArrowRight />
              </td>
              <td className={cls['tvPageWrp__body--trCenter']}>01</td>
              <td
                className={`${cls['tvPageWrp__body--trEnd']} ${cls.summoned}`}
              >
                Вызван
              </td>
            </tr>

            <tr className={cls['tvPageWrp__body--tr']}>
              <td className={cls['tvPageWrp__body--trStart']}>
                Т045 <GoArrowRight />
              </td>
              <td className={cls['tvPageWrp__body--trCenter']}>03</td>
              <td className={`${cls['tvPageWrp__body--trEnd']} ${cls.served}`}>
                Обслуживается
              </td>
            </tr>

            <tr className={cls['tvPageWrp__body--tr']}>
              <td className={cls['tvPageWrp__body--trStart']}>
                Т056 <GoArrowRight />
              </td>
              <td className={cls['tvPageWrp__body--trCenter']}>011</td>
              <td className={`${cls['tvPageWrp__body--trEnd']} ${cls.finish}`}>
                Обслужен
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TvPage;
