import React, { useContext, useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';
import axios from 'axios';
import Cookies from 'js-cookie';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';

import cls from './TableReportsDoctorPage.module.scss';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { ButtonNavbar } from '@/entities/ButtonNavbar';

import { baseUrl } from '../../../../baseurl';
import { CheckedIcon, ErrorIcon } from '@/shared/assets/Pages/Doctor';
import { Loader } from '@/widgets/Loader';
import ErrorDialog from '@/shared/ui/ErrorDialog/ErrorDialog';

interface reportListTtype {
  _id: string;
  department_id: string;
  room_id: string;
  doctor_id: string;
  queues_name: string;
  step: number;
  status: string;
  created_date: string;
  created_time: string;
  __v: 0;
  accepted_date: string;
  completed_date: string;
  id: string;
}

interface TableInfo {
  all: number;
  counCompleted: number;
  countReject: number;
}

const TableReportsDoctorPage = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const tableTitle = [
    'ID',
    t('Qabul kuni'),
    t('Qabul boshlanishi'),
    t('Qabul tugashi'),
    t('Xolati'),
  ];

  const [reportList, setReportList] = useState<reportListTtype[]>();
  const [reportInfo, setReportInfo] = useState<TableInfo>({
    all: 0,
    counCompleted: 0,
    countReject: 0,
  });
  const [reportAllPages, setReportAllPages] = useState<number>();
  const [reportPage, setReportPage] = useState<number>(1);

  const [reportDoctorIsLoading, setReportDoctorIsLoading] =
    useState<boolean>(false);
  const [reportDoctorIsError, setReportDoctorIsError] =
    useState<boolean>(false);

  const { calendarBeginValue, calendarEndValue } = useContext(ButtonsContext);

  const handlePagination = (
    event: React.ChangeEvent<unknown>,
    pageNumber: number,
  ) => {
    setReportPage(pageNumber);
  };

  const fetchReportDoctor = async () => {
    setReportDoctorIsLoading(true);

    setReportDoctorIsError(false);

    const getTokenCookie = Cookies.get('token');

    try {
      const responce = await axios.get(
        // eslint-disable-next-line max-len
        `${baseUrl}/doctor/report?startDate=${calendarBeginValue}&endDate=${calendarEndValue}&limit=25&page=${reportPage}`,

        {
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${getTokenCookie}`,
          },
        },
      );

      if (responce?.data) {
        if (responce.data.pagination.all) {
          setReportAllPages(Math.ceil(responce.data.pagination.all / 25));
        }

        setReportInfo(responce.data.pagination);

        setReportList(responce?.data?.data);

        setReportDoctorIsLoading(false);
      }

      setReportDoctorIsLoading(false);
    } catch (error) {
      console.log(error);

      setReportDoctorIsLoading(false);

      setReportDoctorIsError(true);
    }
  };

  useEffect(() => {
    fetchReportDoctor();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calendarBeginValue, calendarEndValue, reportPage]);

  if (reportError) {
    console.log(reportError);
  }

  return (
    <>
      <table className={cls.TableTitleWrapper}>
        <ButtonNavbar TableTitle={t('Hisobot')} Calendar />

        {reportList && reportList.length > 0 ? (
          <>
            <div className={cls.TableTitleWrapper__title}>
              <h3 className={cls.KorilganBemorlar}>
                {t("Jami ko'rilgan bemorlar : ")}
                {reportInfo.all}
                {t(' ta')}
              </h3>

              <h3 className={cls.KorilganBemorlar} style={{ color: '#0c8541' }}>
                {t('Tasdiqlangan bemorlar : ')}
                {reportInfo.counCompleted}
                {t(' ta')}
              </h3>

              <h3
                className={cls.KorilganBemorlar}
                style={{ color: '#ff0000f4' }}
              >
                {t('Bekor qilingan bemorlar : ')}
                {reportInfo.countReject}
                {t(' ta')}
              </h3>
            </div>
            <thead className={cls.Tablethead}>
              <tr className={cls.tr}>
                {tableTitle?.map((title: string) => (
                  <th key={title} className={cls.th}>
                    {title}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className={cls.Tabletbody}>
              {reportList &&
                reportList.length > 0 &&
                reportList?.map((item, index) => (
                  <tr key={item.id} className={cls.tr}>
                    <td className={cls.td}>{item.queues_name}</td>
                    <td className={cls.td}>
                      {item.completed_date?.split('T')[0]}
                    </td>
                    <td className={cls.td}>
                      {item.accepted_date?.split('T')[1]?.split('.')[0]}
                    </td>
                    <td className={cls.td}>
                      {item.completed_date?.split('T')[1]?.split('.')[0]}
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

            <div className={cls.pagination}>
              <Stack spacing={1}>
                <Pagination
                  count={reportAllPages}
                  variant="outlined"
                  shape="rounded"
                  onChange={(e, pageNumber) => handlePagination(e, pageNumber)}
                />
              </Stack>
            </div>
          </>
        ) : (
          <h3 className={cls.reportEmpty}>
            {t(
              "Bu muddatdagi bemorlar hisoboti bo'sh. Muddatni o'zgartirib ko'ring!",
            )}
          </h3>
        )}
      </table>

      {reportDoctorIsLoading && <Loader />}

      {reportDoctorIsError && <ErrorDialog isErrorProps={!false} />}
    </>
  );
};

export default TableReportsDoctorPage;
