import { matchPath, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  AppRouteByPathPattern,
  CommonRoutes,
  AdminRoutes,
  DoctorRoutes,
  ReceptionRoutes,
  MonitorRoutes,
} from '@/shared/const/router';

export function useRouteChange() {
  const location = useLocation();
  const [appRoute, setAppRoute] = useState<
    CommonRoutes | AdminRoutes | DoctorRoutes | ReceptionRoutes | MonitorRoutes
  >();

  useEffect(() => {
    Object.entries(AppRouteByPathPattern).forEach(([pattern, route]) => {
      if (matchPath(pattern, location.pathname)) {
        setAppRoute(route);
      }
    });
  }, [location.pathname]);

  return appRoute;
}
