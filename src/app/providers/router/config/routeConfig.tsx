import { MainPage } from '@/pages/MainPage';
import { AboutPage } from '@/pages/AboutPage';
import { ForbiddenPage } from '@/pages/ForbiddenPage';

import {
  AppRoutes,
  getRouteMain,
  getRouteAbout,
  getRouteAdmin,
  getRouteNotFound,
  getRouteForbidden,
  getRouteAddDoctor,
  getRouteDepartment,
  getRouteQueuesPage,
  getRouteAddRoomPage,
  getRouteReportsPage,
  getRouteSettingsPage,
  getRouteReportDoctor,
  getRouteReportsPageId,
  getRouteReportControlDoctor,
  getRouteReportQueuingTv,
} from '@/shared/const/router';

import { QueuesPage } from '@/pages/QueuesPage';
import { AddRoomPage } from '@/pages/AddRoomPage';
import { ReportsPage } from '@/pages/ReportsPage';
import { SettingsPage } from '@/pages/SettingsPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { AddDoctorPage } from '@/pages/AddDoctorPage';
import { AppRoutesProps } from '@/shared/types/router';
import { AdminPanelPage } from '@/pages/AdminPanelPage';
import { DepartmentPage } from '@/pages/DepartmentPage';
import { ReportsDoctorPage } from '@/pages/ReportsDoctorPage';
import { QueuesControlDoctor } from '@/pages/QueuesControlDoctor';
import { TableReportsDoctorPage } from '@/pages/TableReportsDoctorPage';
import { QueuingTv } from '@/pages/QueuingTV';

const profileValue = localStorage.getItem('profile');

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
  [AppRoutes.MAIN]: {
    path: getRouteMain(),
    element:
      profileValue === 'admin' ? (
        <DepartmentPage />
      ) : profileValue === 'doctor' ? (
        <AboutPage />
      ) : profileValue === 'reception' ? (
        <ForbiddenPage />
      ) : (
        <MainPage />
      ),
  },
  [AppRoutes.ABOUT]: {
    path: getRouteAbout(),
    element: <AboutPage />,
  },
  [AppRoutes.FORBIDDEN]: {
    path: getRouteForbidden(),
    element: <ForbiddenPage />,
  },
  [AppRoutes.NOT_FOUND]: {
    path: getRouteNotFound(),
    element: <NotFoundPage />,
  },
  [AppRoutes.ADMIN]: {
    path: getRouteAdmin(),
    element: <AdminPanelPage />,
  },
  [AppRoutes.DEPARTMENT]: {
    path: getRouteDepartment(),
    element: <DepartmentPage />,
  },
  [AppRoutes.ADDROOMPAGE]: {
    path: getRouteAddRoomPage(),
    element: <AddRoomPage />,
  },
  [AppRoutes.ADD_DOCTOR]: {
    path: getRouteAddDoctor(),
    element: <AddDoctorPage />,
  },
  [AppRoutes.REPORTS]: {
    path: getRouteReportsPage(),
    element: <ReportsPage />,
  },
  [AppRoutes.REPORTS_PATIENT]: {
    path: getRouteReportsPageId(),
    element: <ReportsDoctorPage />,
  },
  [AppRoutes.QUEUES]: {
    path: getRouteQueuesPage(),
    element: <QueuesPage />,
  },

  // QueuingTv
  [AppRoutes.QUEUING_TV]: {
    path: getRouteReportQueuingTv(),
    element: <QueuingTv />,
  },

  // Doctors
  [AppRoutes.REPORTS_DOCTOR]: {
    path: getRouteReportDoctor(),
    element: <TableReportsDoctorPage />,
  },
  [AppRoutes.QUEUES_CONTROL_DOCTOR]: {
    path: getRouteReportControlDoctor(),
    element: <QueuesControlDoctor />,
  },

  // setting
  [AppRoutes.SETTINGSPAGE]: {
    path: getRouteSettingsPage(),
    element: <SettingsPage />,
  },
};
