import {
  CommonRoutes,
  AdminRoutes,
  DoctorRoutes,
  ReceptionRoutes,
  getRouteNotFound,
  getRouteForbidden,
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
  MonitorRoutes,
  getRouteQueuesPageForMonitor,
  getRouteMonitorChild,
  getRouteAdvertisementAttachmentMonitor,
  getRouteAddRoomPageFIX,
  getRouteMonitors,
  getRouteMonitorsDetail,
  getRouteAddDoctorsPage,
  getRouteAddAdsPage,
  getRouteAddReceptionsPage,
  getRouteAddRoomForMonitor,
} from '@/shared/const/router';

import { QueuingTv } from '@/pages/reception';
import { ReportsPage } from '@/pages/ReportsPage';
import { SettingsPage } from '@/pages/SettingsPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ForbiddenPage } from '@/pages/ForbiddenPage';
import { AppRoutesProps } from '@/shared/types/router';
import { ReportsDoctorPage } from '@/pages/reportsDoctorPage';
import { QueuesControlDoctor } from '@/pages/doctorPage';
import { TableReportsDoctorPage } from '@/pages/TableReportsDoctorPage';
import { AdvertisementAttachmentMonitor } from '@/entities/AdvertisementAttachmentMonitor';

// ----- Admin -----
import QueuesPageFullScreen from '@/pages/TV/ui/QueuesPageFullScreen';
import { AddAdsPage } from '@/pages/admin/AddAdsPage';
import { AddDepartmentPage } from '@/pages/admin/AddDepartmentPage';
import { AddDoctorPage } from '@/pages/admin/AddDoctorPage';
import { AddMonitorPage } from '@/pages/admin/AddMonitorPage';
import { AddReceptionPage } from '@/pages/admin/AddReceptionPage';
import { AddRoomForMonitorPage } from '@/pages/admin/AddRoomForMonitorPage';
import { AddRoomPage } from '@/pages/admin/AddRoomPage';
import { MonitorsPage } from '@/pages/admin/Monitors';
import { MonitorsDetail } from '@/pages/admin/MonitorsDetail';
import { AttachMonitorOrAdvertisement } from '@/pages/admin/AttachMonitorOrAdvertisement';


export const routeConfigForAdmin: Record<
  AdminRoutes,
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
    element: <AddDepartmentPage />,
  },

  [AdminRoutes.ADD_ROOM_PAGE]: {
    path: getRouteAddRoomPageFIX(),
    element: <AddRoomPage />,
  },
  [AdminRoutes.ADD_RECEPTION]: {
    path: getRouteAddReceptionsPage(),
    element: <AddReceptionPage />,
  },
  [AdminRoutes.ALL_DOCTORS]: {
    path: getRouteAddDoctorsPage(),
    element: <AddDoctorPage />,
  },
  [AdminRoutes.ADD_MONITOR]: {
    path: getRouteAddMonitor(),
    element: <AddMonitorPage />,
  },

  [AdminRoutes.MONITOR_CHILD]: {
    path: getRouteMonitorChild(),
    element: <AttachMonitorOrAdvertisement />,
  },

  [AdminRoutes.ADD_ADS_PAGE]: {
    path: getRouteAddAdsPage(),
    element: <AddAdsPage />,
  },

  [AdminRoutes.ADD_ROOM_FOR_MONITOR]: {
    path: getRouteAddRoomForMonitor(),
    element: <AddRoomForMonitorPage />,
  },

  [AdminRoutes.ADVERTISEMENT_ATTACHMENT_MONITOR]: {
    path: getRouteAdvertisementAttachmentMonitor(),
    element: <AdvertisementAttachmentMonitor />,
  },

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

  [AdminRoutes.MONITORS]: {
    path: getRouteMonitors(),
    element: <MonitorsPage />,
  },

  [AdminRoutes.MONITORS_DETAIL]: {
    path: getRouteMonitorsDetail(),
    element: <MonitorsDetail />,
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
    element: <QueuesPageFullScreen />,
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
  [ReceptionRoutes.QUEUING_TV]: {
    path: getRouteReportQueuingTv(),
    element: <QueuingTv />,
  },
  [CommonRoutes.SETTINGSPAGE]: {
    path: getRouteSettingsPage(),
    element: <SettingsPage />,
  },

  [CommonRoutes.QUEUES]: {
    path: getRouteNotFound(),
    element: <NotFoundPage />,
  },

  [AdminRoutes.MONITORS]: {
    path: getRouteMonitors(),
    element: <MonitorsPage />,
  },

  [AdminRoutes.MONITORS_DETAIL]: {
    path: getRouteMonitorsDetail(),
    element: <MonitorsDetail />,
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
    element: <QueuesPageFullScreen />,
  },

  // setting
  [MonitorRoutes.SETTINGSPAGE]: {
    path: getRouteSettingsPage(),
    element: <SettingsPage />,
  },
};
