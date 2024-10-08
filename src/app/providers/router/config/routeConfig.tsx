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

import { RoomPage } from '@/pages/RoomPage';
import { QueuingTv } from '@/pages/Reception';
// import { QueuesPage } from '@/pages/QueuesPage';
import { ReportsPage } from '@/pages/ReportsPage';
import { SettingsPage } from '@/pages/SettingsPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ForbiddenPage } from '@/pages/ForbiddenPage';
import { AppRoutesProps } from '@/shared/types/router';
import { AddMonitorPage } from '@/pages/AddMonitorPage';
import { ReportsDoctorPage } from '@/pages/ReportsDoctorPage';
import { QueuesControlDoctor } from '@/pages/QueuesControlDoctor';
import { TableReportsDoctorPage } from '@/pages/TableReportsDoctorPage';
import { AttachMonitorOrAdvertisement } from '@/pages/AttachMonitorOrAdvertisement';
import { AdvertisementAttachmentMonitor } from '@/entities/AdvertisementAttachmentMonitor';

// ----- Admin -----
import { AddRoomPage } from '@/pages/AddRoomPage';
import { AddDepartmentPage } from '@/pages/AddDepartmentPage';
import { AddDoctorPage } from '@/pages/AddDoctorPage';
import { MonitorsPage } from '@/pages/Monitors';
import { MonitorsDetail } from '@/pages/MonitorsDetail';
import { AddAdsPage } from '@/pages/AddAdsPage';
import { AddRoomForMonitorPage } from '@/pages/AddRoomForMonitorPage';
import { AddReceptionPage } from '@/pages/AddReceptionPage';
// eslint-disable-next-line ulbi-tv-plugin/public-api-imports
// import QueuesPage from '@/pages/QueuesPage/ui/QueuesPage';
// eslint-disable-next-line ulbi-tv-plugin/public-api-imports
import QueuesPageFullScreen from '@/pages/QueuesPageFullScreen/ui/QueuesPageFullScreen';

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
    element: <AddDepartmentPage />,
  },

  [AdminRoutes.ROOMPAGE]: {
    path: getRouteAddRoomPage(),
    element: <RoomPage />,
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

  // [AdminRoutes.ADD_DOCTOR]: {
  //   path: getRouteAddDoctor(),
  //   element: <DoctorsListPage />,
  // },

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

  // [AdminRoutes.ADD_ADS_Page]: {
  //   path: getRouteAddAds(),
  //   element: <AddAdsPage />,
  //   // element: <AddAdvertisementPage />,
  // },

  [AdminRoutes.ADD_ROOM_FOR_MONITOR]: {
    path: getRouteAddRoomForMonitor(),
    element: <AddRoomForMonitorPage />,
  },

  [AdminRoutes.ADVERTISEMENT_ATTACHMENT_MONITOR]: {
    path: getRouteAdvertisementAttachmentMonitor(),
    element: <AdvertisementAttachmentMonitor />,
  },

  [CommonRoutes.QUEUES]: {
    path: getRouteQueuesPage(),
    element: <QueuesPageFullScreen />,
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
  // [CommonRoutes.QUEUES]: {
  //   path: getRouteQueuesPage(),
  //   element: <QueuesPage />,
  // },
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
    // element: <QueuesPage />,
    element: <QueuesPageFullScreen />,
  },

  // setting
  [MonitorRoutes.SETTINGSPAGE]: {
    path: getRouteSettingsPage(),
    element: <SettingsPage />,
  },
};
