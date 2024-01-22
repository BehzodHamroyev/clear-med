import React, { useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import cls from './TableReportsDoctorPage.module.scss';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import { fetchReportControlDoctor } from '../model/service/fetchReportDoctor';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { ButtonNavbar } from '@/entities/ButtonNavbar';
import {
  getreportControlDoctorData,
  getreportControlDoctorError,
  getreportControlDoctorIsLoading,
} from '../model/selector/reportControlDoctorSelector';
import { CheckedIcon, ErrorIcon } from '@/shared/assets/Pages/Doctor';
import { Loader } from '@/widgets/Loader';
import ErrorDialog from '@/shared/ui/ErrorDialog/ErrorDialog';

const tableTitle = [
  'ID',
  'Qabul kuni',
  'Qabul boshlanishi',
  'Qabul tugashi',
  'Xolati',
];

const TableReportsDoctorPage = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const reportList = useSelector(getreportControlDoctorData);
  const reportIsLoading = useSelector(getreportControlDoctorIsLoading);
  const reportError = useSelector(getreportControlDoctorError);

  const { calendarBeginValue, calendarEndValue } = useContext(ButtonsContext);

  // ----- gtmTime convert to Est time -----
  const convertToEst = (gmtTime: any) => {
    return new Date(
      new Date(gmtTime).toLocaleString('uz-UZ'),
    ).toLocaleDateString('uz-UZ');
  };

  useEffect(() => {
    if (calendarBeginValue && calendarEndValue) {
      dispatch(
        fetchReportControlDoctor({
          startDate: calendarBeginValue,
          endDate: calendarEndValue,
          limit: 1000,
          page: 1,
        }),
      );
    } else {
      dispatch(
        fetchReportControlDoctor({
          startDate: convertToEst(new Date()),
          endDate: convertToEst(
            new Date(new Date().getTime() + 24 * 3600 * 1000),
          ),
          limit: 1000,
          page: 1,
        }),
      );
    }
  }, [calendarBeginValue, calendarEndValue, dispatch]);

  if (reportError) {
    console.log(reportError);
  }

  return (
    <>
      <table className={cls.TableTitleWrapper}>
        <ButtonNavbar TableTitle="Hisobot" Calendar />

        {reportList && reportList.length > 0 ? (
          <>
            <div className={cls.TableTitleWrapper__title}>
              <h3 className={cls.KorilganBemorlar}>
                {t("Jami Ko'rilgan Bemorlar : ")}
                {reportList ? reportList.length : 0}
                {t(' ta')}
              </h3>

              <h3 className={cls.KorilganBemorlar}>
                {t('Tasdiqlangan Bemorlar : ')}
                {reportList
                  ? reportList.filter((item) => item.status === 'completed')
                      .length
                  : 0}
                {t(' ta')}
              </h3>

              <h3 className={cls.KorilganBemorlar}>
                {t('Bekor qilingan Bemorlar : ')}
                {reportList
                  ? reportList.filter((item) => item.status === 'rejected')
                      .length
                  : 0}
                {t(' ta')}
              </h3>
            </div>
            <thead className={cls.Tablethead}>
              <tr className={cls.tr}>
                {tableTitle.map((title: string) => (
                  <th key={title} className={cls.th}>
                    {title}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className={cls.Tabletbody}>
              {reportList &&
                reportList.length > 0 &&
                reportList.map((item, index) => (
                  <tr key={item.id} className={cls.tr}>
                    <td className={cls.td}>{item.queues_name}</td>
                    <td className={cls.td}>
                      {item.completed_date?.split('T')[0]}
                    </td>
                    <td className={cls.td}>
                      {item.accepted_date?.split('T')[1].split('.')[0]}
                    </td>
                    <td className={cls.td}>
                      {item.completed_date?.split('T')[1].split('.')[0]}
                    </td>
                    <td className={cls.td}>
                      <img
                        src={
                          item.status === 'completed' ? CheckedIcon : ErrorIcon
                        }
                        alt="rejected"
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </>
        ) : (
          <h2 className={cls.reportEmpty}>
            {t(
              "Bu muddatdagi bemorlar hisoboti bo'sh. Muddatni o'zgartirib ko'ring!",
            )}
          </h2>
        )}
      </table>

      {reportIsLoading && <Loader />}

      {reportError && <ErrorDialog isErrorProps={!false} />}
    </>
  );
};

export default TableReportsDoctorPage;
