import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Cookies from 'js-cookie';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';

import { useTranslation } from 'react-i18next';
import { ButtonNavbar } from '@/entities/ButtonNavbar';

import cls from './ReportsDoctorPage.module.scss';
import { TableTitlePatients } from '@/entities/TableTitlePatients';
import { baseUrl } from '../../../../baseurl';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import { Loader } from '@/widgets/Loader';
import ErrorDialog from '@/shared/ui/ErrorDialog/ErrorDialog';
import { getDoctorListData } from '@/pages/ReportsPage/model/selectors/doctorListSelector';

const tableTitle = [
  'Id',
  'Shifokor',
  'Xona',
  'Qabul boshlanishi',
  'Qabul tugashi',
];

interface reportDetailListTtype {
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

const ReportsDoctorPage = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const doctorList = useSelector(getDoctorListData);

  const [reportDetailList, setReportDetailList] =
    useState<reportDetailListTtype[]>();
  const [reportInfo, setReportInfo] = useState<TableInfo>({
    all: 0,
    counCompleted: 0,
    countReject: 0,
  });

  const [reportDetailAllPages, setReportDetailAllPages] = useState<number>();
  const [reportDetailPage, setReportDetailPage] = useState<number>(1);

  const [reportDoctorDetailIsLoading, setReportDoctorDetailIsLoading] =
    useState<boolean>(false);
  const [reportDoctorDetailIsError, setReportDoctorDetailIsError] =
    useState<boolean>(false);

  const { calendarBeginValue, calendarEndValue } = useContext(ButtonsContext);

  const paramIdUrl: { id?: string } = useParams();

  const handlePagination = (
    event: React.ChangeEvent<unknown>,
    pageNumber: number,
  ) => {
    setReportDetailPage(pageNumber);
  };

  const fetchReportDoctorDetail = async () => {
    setReportDoctorDetailIsLoading(true);

    setReportDoctorDetailIsError(false);

    const getTokenCookie = Cookies.get('token');

    try {
      const responce = await axios.get(
        // eslint-disable-next-line max-len
        `${baseUrl}/doctor/report?startDate=${calendarBeginValue}&endDate=${calendarEndValue}&userId=${paramIdUrl.id}&limit=25&page=${reportDetailPage}`,

        {
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${getTokenCookie}`,
          },
        },
      );

      if (responce?.data) {
        if (responce.data.pagination.all) {
          setReportDetailAllPages(Math.ceil(responce.data.pagination.all / 25));
        }

        setReportInfo(responce.data.pagination);

        setReportDetailList(responce?.data?.data);

        setReportDoctorDetailIsLoading(false);
      }

      setReportDoctorDetailIsLoading(false);
    } catch (error) {
      console.log(error);

      setReportDoctorDetailIsLoading(false);

      setReportDoctorDetailIsError(true);
    }
  };

  useEffect(() => {
    fetchReportDoctorDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calendarBeginValue, calendarEndValue, reportDetailPage]);

  const handleClickBack = () => {
    navigate('/reports');
  };

  return (
    <div className={cls.ReportsDoctorPageWrapper}>
      <ButtonNavbar
        Calendar
        TableTitle={t("Ko'rilgan bemorlar")}
        ItemsLength={
          reportDetailList && reportDetailList?.length > 0
            ? Number(reportDetailList?.length)
            : 0
        }
        doctorName={
          doctorList?.filter((item) => item._id === paramIdUrl.id)[0].name
        }
      />

      {reportDetailList && reportDetailList?.length > 0 ? (
        <>
          <TableTitlePatients
            cursor
            Tablethead={tableTitle}
            TableBody={reportDetailList}
            TableInfo={reportInfo}
          />

          <div className={cls.ReportsDoctorPageWrapper__pagination}>
            <Stack spacing={1}>
              <Pagination
                count={reportDetailAllPages}
                variant="outlined"
                shape="rounded"
                onChange={(e, pageNumber) => handlePagination(e, pageNumber)}
              />
            </Stack>
          </div>
        </>
      ) : (
        <>
          <div
            className={cls.ReportsDoctorPageWrapper__backbtn}
            onClick={() => handleClickBack()}
          >
            {t('Ortga')}
          </div>

          <p className={cls.reportEmpty}>
            {t(
              "Bu muddatdagi bemorlar hisoboti bo'sh. Muddatni o'zgartirib ko'ring!",
            )}
          </p>
        </>
      )}

      {reportDoctorDetailIsLoading && <Loader />}

      {reportDoctorDetailIsError && <ErrorDialog isErrorProps={!false} />}
    </div>
  );
};

export default ReportsDoctorPage;
