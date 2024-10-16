// Umumiy saytlar uchun
export enum CommonRoutes {
  QUEUES = 'queues',
  FORBIDDEN = 'forbidden',
  NOT_FOUND = 'not_found',
  SETTINGSPAGE = 'setting_page',
}

// Admin saytlari uchun
export enum AdminRoutes {
  REPORTS = 'reports',
  ADD_ADS_PAGE = 'add_ads',
  DEPARTMENT = 'department',
  ADD_ROOM_PAGE = 'add-room',
  ALL_DOCTORS = 'all_doctors',
  ADD_RECEPTION = 'add-reception',
  ADD_MONITOR = 'add_monitor',
  MONITOR_CHILD = 'monitor_child',
  REPORTS_PATIENT = 'reports_patient',
  ADD_ROOM_FOR_MONITOR = 'add_room_for_monitor',
  ADVERTISEMENT_ATTACHMENT_MONITOR = 'advertisement_attachment_monitor',
  FORBIDDEN = 'forbidden',
  NOT_FOUND = 'not_found',
  SETTINGSPAGE = 'setting_page',
}

// Doctor saytlari uchun
export enum DoctorRoutes {
  REPORTS_DOCTOR = 'reports_doctor',
  QUEUES_CONTROL_DOCTOR = 'queues_control_doctor',
}

// Reception saytlari uchun
export enum ReceptionRoutes {
  REPORTS = 'reports',
  QUEUING_TV = 'queuing_tv',
  REPORTS_PATIENT = 'reports_patient',
}

export enum MonitorRoutes {
  QUEUES = 'queues',
  FORBIDDEN = 'forbidden',
  NOT_FOUND = 'not_found',
  SETTINGSPAGE = 'setting_page',
}

// ----- Common -----
export const getRoute = () => '/login';
export const getRouteNotFound = () => '/*';
export const getRouteAbout = () => '/about';
export const getRouteForbidden = () => '/forbidden';
export const getRouteSettingsPage = () => '/settings';

// ----- Doctor -----
export const getRouteReportDoctor = () => '/reports';
export const getRouteReportControlDoctor = () => '/';

// ----- Admin -----
export const getRouteDepartment = () => '/';
export const getRouteAddAdsPage = () => '/add_ads';
export const getRouteQueuesPage = () => '/queues';
export const getRouteReportsPage = () => '/reports';
export const getRouteAddMonitor = () => '/add_monitor';
export const getRouteAddRoomPageFIX = () => '/add-room';
export const getRouteAddRoomPage = () => '/add_room_age';
export const getRouteReportsPageId = () => '/reports/:id';
export const getRouteAddDoctorsPage = () => '/add-doctors';
export const getRouteAddReceptionsPage = () => '/add-reception';

export const getRouteMonitorChild = () => '/add_monitor/:id';

export const getRouteAddRoomForMonitor = () =>
  '/add_monitor/:id/add_room_for_monitor';

export const getRouteAdvertisementAttachmentMonitor = () =>
  '/add_monitor/:id/advertisement_attachment_monitor';

export const getRouteMonitors = () => '/monitors';
export const getRouteMonitorsDetail = () => '/monitors/:id';

// ----- Reception -----
export const getRouteReportQueuingTv = () => '/';

// ----- Monitor -----
export const getRouteQueuesPageForMonitor = () => '/';

export const AppRouteByPathPattern: Record<
  string,
  CommonRoutes | AdminRoutes | DoctorRoutes | ReceptionRoutes | MonitorRoutes
> = {
  [getRouteNotFound()]: CommonRoutes.NOT_FOUND,
  [getRouteForbidden()]: CommonRoutes.FORBIDDEN,
  [getRouteSettingsPage()]: CommonRoutes.SETTINGSPAGE,

  [getRouteAddAdsPage()]: AdminRoutes.ADD_ADS_PAGE,
  [getRouteDepartment()]: AdminRoutes.DEPARTMENT,
  [getRouteAddMonitor()]: AdminRoutes.ADD_MONITOR,
  // [getRouteAddDoctorsPage()]: AdminRoutes.ROOMPAGE,
  [getRouteAddReceptionsPage()]: AdminRoutes.ADD_RECEPTION,
  [getRouteMonitorChild()]: AdminRoutes.MONITOR_CHILD,
  [getRouteReportsPage()]: AdminRoutes.REPORTS_PATIENT,
  [getRouteAddRoomPageFIX()]: AdminRoutes.ADD_ROOM_PAGE,
  [getRouteAddRoomForMonitor()]: AdminRoutes.ADD_ROOM_FOR_MONITOR,
  [getRouteAdvertisementAttachmentMonitor()]:
    AdminRoutes.ADVERTISEMENT_ATTACHMENT_MONITOR,

  [getRouteReportDoctor()]: DoctorRoutes.REPORTS_DOCTOR,
  [getRouteReportControlDoctor()]: DoctorRoutes.QUEUES_CONTROL_DOCTOR,

  [getRouteQueuesPage()]: ReceptionRoutes.REPORTS,
  [getRouteReportsPage()]: ReceptionRoutes.REPORTS,
  // [getRouteReportQueuingTv()]: ReceptionRoutes.QUEUING_TV,
  [getRouteReportsPageId()]: ReceptionRoutes.REPORTS_PATIENT,

  [getRouteQueuesPageForMonitor()]: MonitorRoutes.FORBIDDEN,

  // [getRouteMonitors()]: AdminRoutes.MONITORS,
  // [getRouteMonitorsDetail()]: AdminRoutes.MONITORS_DETAIL,
};
