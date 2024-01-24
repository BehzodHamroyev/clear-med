import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Cookies from 'js-cookie';

import { useTranslation } from 'react-i18next';
import { ButtonNavbar } from '@/entities/ButtonNavbar';

import cls from './ReportsDoctorPage.module.scss';
import { TableTitlePatients } from '@/entities/TableTitlePatients';
import { baseUrl } from '../../../../baseurl';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import { Loader } from '@/widgets/Loader';
import ErrorDialog from '@/shared/ui/ErrorDialog/ErrorDialog';
// eslint-disable-next-line ulbi-tv-plugin/public-api-imports
import { getDoctorListData } from '@/pages/ReportsPage/model/selectors/doctorListSelector';

const tableTitle = [
  'Id',
  'Shifokor',
  'Xona',
  'Qabul boshlanishi',
  'Qabul tugashi',
];

const TableBody = [
  {
    id: 1,
    item1: 'Nervopotolog',
    item2: 'Umid Rustamov',
    item3: 2,
    KorilganBemorlar: [
      {
        id: 1,
        shifokor: 'Umid Rustamov',
        xona: '2',
        qabulboshlanishi: '9:30:24',
        qabultugashi: '9:50:12',
      },
      {
        id: 2,
        shifokor: 'Umid Rustamov',
        xona: '2',
        qabulboshlanishi: '10:00:24',
        qabultugashi: '10:34:53',
      },
      {
        id: 3,
        shifokor: 'Umid Rustamov',
        xona: '2',
        qabulboshlanishi: '11:40:04',
        qabultugashi: '12:10:22',
      },
      {
        id: 4,
        shifokor: 'Umid Rustamov',
        xona: '2',
        qabulboshlanishi: '12:20:02',
        qabultugashi: '12:50:12',
      },
    ],
  },
  {
    id: 2,
    item1: 'Ginekolog',
    item2: 'Hamroyev Behzod',
    item3: 3,
    KorilganBemorlar: [
      {
        id: 1,
        shifokor: 'Hamroyev Behzod',
        xona: '3',
        qabulboshlanishi: '9:30:24',
        qabultugashi: '9:50:12',
      },
    ],
  },
  {
    id: 3,
    item1: 'Akulist',
    item2: "G'ulomov Abbos",
    item3: 4,
    KorilganBemorlar: [
      {
        id: 1,
        shifokor: "G'ulomov Abbos",
        xona: '4',
        qabulboshlanishi: '9:30:24',
        qabultugashi: '9:50:12',
      },
    ],
  },
  {
    id: 4,
    item1: 'Pediator',
    item2: 'Tojiboyev Abdulaziz',
    item3: 5,
    KorilganBemorlar: [
      {
        id: 1,
        shifokor: 'Tojiboyev Abdulaziz',
        xona: '5',
        qabulboshlanishi: '9:30:24',
        qabultugashi: '9:50:12',
      },
    ],
  },
  {
    id: 5,
    item1: 'Glaznoy',
    item2: "Xusainov Ulug'bek",
    item3: 6,
    KorilganBemorlar: [],
  },
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

const ReportsDoctorPage = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const doctorList = useSelector(getDoctorListData);

  const [reportDetailList, setReportDetailList] =
    useState<reportDetailListTtype[]>();
  const [reportDetailLimit, setReportDetailLimit] = useState<number>(20);
  const [reportDetailPage, setReportDetailPage] = useState<number>(1);

  const [reportDoctorDetailIsLoading, setReportDoctorDetailIsLoading] =
    useState<boolean>(false);
  const [reportDoctorDetailIsError, setReportDoctorDetailIsError] =
    useState<boolean>(false);

  const { calendarBeginValue, calendarEndValue } = useContext(ButtonsContext);

  const paramIdUrl: { id?: string } = useParams();

  const fetchReportDoctorDetail = async () => {
    setReportDoctorDetailIsLoading(true);

    setReportDoctorDetailIsError(false);

    const getTokenCookie = Cookies.get('token');

    try {
      const responce = await axios.get(
        // eslint-disable-next-line max-len
        `${baseUrl}/doctor/report?startDate=${calendarBeginValue}&endDate=${calendarEndValue}&limit=${reportDetailLimit}&page=${reportDetailPage}&userId=${paramIdUrl.id}`,

        {
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${getTokenCookie}`,
          },
        },
      );

      if (responce) {
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
  }, [calendarBeginValue, calendarEndValue]);

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
        <TableTitlePatients
          cursor
          Tablethead={tableTitle}
          TableBody={reportDetailList}
        />
      ) : (
        <>
          <div
            className={cls.ReportsDoctorPageWrapper__backbtn}
            onClick={() => handleClickBack()}
          >
            {t('Ortga qaytish')}
          </div>

          <h3 className={cls.reportEmpty}>
            {t(
              "Bu muddatdagi bemorlar hisoboti bo'sh. Muddatni o'zgartirib ko'ring!",
            )}
          </h3>
        </>
      )}

      {reportDoctorDetailIsLoading && <Loader />}

      {reportDoctorDetailIsError && <ErrorDialog isErrorProps={!false} />}
    </div>
  );
};

export default ReportsDoctorPage;
