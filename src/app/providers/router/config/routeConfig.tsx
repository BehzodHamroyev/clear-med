import { MainPage } from '@/pages/MainPage';
import { AboutPage } from '@/pages/AboutPage';
import { ForbiddenPage } from '@/pages/ForbiddenPage';

import {
  AppRoutes,
  getRouteMain,
  getRouteAbout,
  getRouteForbidden,
  getRouteNotFound,
  getRouteLogin,
  getRouteAdmin,
} from '@/shared/const/router';

import { AppRoutesProps } from '@/shared/types/router';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { Login } from '@/features/Auth';
import { AdminPanelPage } from '@/pages/AdminPanelPage';

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
};
