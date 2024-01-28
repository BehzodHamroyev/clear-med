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
  getRouteAddMonitor,
  getRouteAddAdvertisement,
  MonitorRoutes,
  getRouteQueuesPageForMonitor,
} from '@/shared/const/router';

import { RoomPage } from '@/pages/RoomPage';
import { QueuingTv } from '@/pages/QueuingTV';
import { QueuesPage } from '@/pages/QueuesPage';
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
import { AddMonitorPage } from '@/pages/AddMonitorPage';
import { AddAdvertisementPage } from '@/pages/AddAdvertisementPage';

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
  [AdminRoutes.ROOMPAGE]: {
    path: getRouteAddRoomPage(),
    element: <RoomPage />,
  },
  [AdminRoutes.ADD_DOCTOR]: {
    path: getRouteAddDoctor(),
    element: <DoctorsListPage />,
  },
  [AdminRoutes.ADD_MONITOR]: {
    path: getRouteAddMonitor(),
    element: <AddMonitorPage />,
  },
  [AdminRoutes.ADD_ADVERTISEMENT]: {
    path: getRouteAddAdvertisement(),
    element: <AddAdvertisementPage />,
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
  [ReceptionRoutes.REPORTS]: {
    path: getRouteReportsPage(),
    element: <ReportsPage />,
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
  [AdminRoutes.REPORTS_PATIENT]: {
    path: getRouteReportsPageId(),
    element: <ReportsDoctorPage />,
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

export const routeConfigForMonitor: Record<
  CommonRoutes,
  AppRoutesProps | MonitorRoutes
> = {
  [MonitorRoutes.FORBIDDEN]: {
    path: getRouteForbidden(),
    element: <ForbiddenPage />,
  },
  [MonitorRoutes.NOT_FOUND]: {
    path: getRouteNotFound(),
    element: <NotFoundPage />,
  },

  [MonitorRoutes.QUEUES]: {
    path: getRouteQueuesPageForMonitor(),
    element: <QueuesPage />,
  },

  // setting
  [MonitorRoutes.SETTINGSPAGE]: {
    path: getRouteSettingsPage(),
    element: <SettingsPage />,
  },
};
