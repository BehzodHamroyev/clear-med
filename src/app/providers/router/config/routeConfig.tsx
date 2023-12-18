import { MainPage } from '@/pages/MainPage';
import { AboutPage } from '@/pages/AboutPage';
import { ForbiddenPage } from '@/pages/ForbiddenPage';

import {
  AppRoutes,
  getRouteMain,
  getRouteAbout,
  getRouteLogin,
  getRouteAdmin,
  getRouteNotFound,
  getRouteForbidden,
  getRouteDepartment,
  getRouteAddRoomPage,
  getRouteAddDoctor,
  getRouteReportsPage,
  getRouteQueuesPage,
  getRouteSettingsPage,
  getRouteReportsPageId,
} from '@/shared/const/router';

import { Login } from '@/features/Auth';
import { AddRoomPage } from '@/pages/AddRoomPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { AppRoutesProps } from '@/shared/types/router';
import { AdminPanelPage } from '@/pages/AdminPanelPage';
import { DepartmentPage } from '@/pages/DepartmentPage';
import { AddDoctorPage } from '@/pages/AddDoctorPage';
import { ReportsPage } from '@/pages/ReportsPage';
import { QueuesPage } from '@/pages/QueuesPage';
import { SettingsPage } from '@/pages/SettingsPage';
import { ReportsDoctorPage } from '@/pages/ReportsDoctorPage';

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
  [AppRoutes.MAIN]: {
    path: getRouteMain(),
    element: <MainPage />,
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
  [AppRoutes.LOGIN]: {
    path: getRouteLogin(),
    element: <Login />,
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
  [AppRoutes.SETTINGSPAGE]: {
    path: getRouteSettingsPage(),
    element: <SettingsPage />,
  },
};
