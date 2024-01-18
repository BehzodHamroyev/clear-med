import {
  CommonRoutes,
  AdminRoutes,
  DoctorRoutes,
  ReceptionRoutes,
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
  getRouteReportQueuingTv,
  getRouteReportControlDoctor,
} from '@/shared/const/router';

import { QueuingTv } from '@/pages/QueuingTV';
import { QueuesPage } from '@/pages/QueuesPage';
import { AddRoomPage } from '@/pages/AddRoomPage';
import { ReportsPage } from '@/pages/ReportsPage';
import { SettingsPage } from '@/pages/SettingsPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ForbiddenPage } from '@/pages/ForbiddenPage';
import { AppRoutesProps } from '@/shared/types/router';
import { DepartmentPage } from '@/pages/DepartmentPage';
import { DoctorsListPage } from '@/pages/DoctorsListPage';
import { ReportsDoctorPage } from '@/pages/ReportsDoctorPage';
import { QueuesControlDoctor } from '@/pages/QueuesControlDoctor';
import { TableReportsDoctorPage } from '@/pages/TableReportsDoctorPage';

export const routeConfigForAdmin: Record<
  AdminRoutes | CommonRoutes,
  AppRoutesProps
> = {
  [CommonRoutes.FORBIDDEN]: {
    path: getRouteForbidden(),
    element: <ForbiddenPage />,
  },
  [CommonRoutes.NOT_FOUND]: {
    path: getRouteNotFound(),
    element: <NotFoundPage />,
  },
  [AdminRoutes.DEPARTMENT]: {
    path: getRouteDepartment(),
    element: <DepartmentPage />,
  },
  [AdminRoutes.ADDROOMPAGE]: {
    path: getRouteAddRoomPage(),
    element: <AddRoomPage />,
  },
  [AdminRoutes.ADD_DOCTOR]: {
    path: getRouteAddDoctor(),
    element: <DoctorsListPage />,
  },

  [CommonRoutes.QUEUES]: {
    path: getRouteQueuesPage(),
    element: <QueuesPage />,
  },

  // setting
  [CommonRoutes.SETTINGSPAGE]: {
    path: getRouteSettingsPage(),
    element: <SettingsPage />,
  },

  [AdminRoutes.REPORTS_PATIENT]: {
    path: getRouteReportsPageId(),
    element: <ReportsDoctorPage />,
  },
};

export const routeConfigForDoctor: Record<
  DoctorRoutes | CommonRoutes,
  AppRoutesProps
> = {
  [CommonRoutes.FORBIDDEN]: {
    path: getRouteForbidden(),
    element: <ForbiddenPage />,
  },
  [CommonRoutes.NOT_FOUND]: {
    path: getRouteNotFound(),
    element: <NotFoundPage />,
  },
  [CommonRoutes.QUEUES]: {
    path: getRouteQueuesPage(),
    element: <QueuesPage />,
  },

  // Doctors
  [DoctorRoutes.REPORTS_DOCTOR]: {
    path: getRouteReportDoctor(),
    element: <TableReportsDoctorPage />,
  },
  [DoctorRoutes.QUEUES_CONTROL_DOCTOR]: {
    path: getRouteReportControlDoctor(),
    element: <QueuesControlDoctor />,
  },

  // setting
  [CommonRoutes.SETTINGSPAGE]: {
    path: getRouteSettingsPage(),
    element: <SettingsPage />,
  },
};

export const routeConfigForReception: Record<
  ReceptionRoutes | CommonRoutes,
  AppRoutesProps
> = {
  [CommonRoutes.FORBIDDEN]: {
    path: getRouteForbidden(),
    element: <ForbiddenPage />,
  },
  [CommonRoutes.NOT_FOUND]: {
    path: getRouteNotFound(),
    element: <NotFoundPage />,
  },

  [ReceptionRoutes.REPORTS]: {
    path: getRouteReportsPage(),
    element: <ReportsPage />,
  },

  [CommonRoutes.QUEUES]: {
    path: getRouteQueuesPage(),
    element: <QueuesPage />,
  },

  // QueuingTv
  [ReceptionRoutes.QUEUING_TV]: {
    path: getRouteReportQueuingTv(),
    element: <QueuingTv />,
  },

  // setting
  [CommonRoutes.SETTINGSPAGE]: {
    path: getRouteSettingsPage(),
    element: <SettingsPage />,
  },
};
