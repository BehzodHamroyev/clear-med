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
  ROOMPAGE = 'room_page',
  DEPARTMENT = 'department',
  ADD_DOCTOR = 'add_doctor',
  ADD_MONITOR = 'add_monitor',
  REPORTS_PATIENT = 'reports_patient',
  ADD_ADVERTISEMENT = 'add_advertisement',
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
export const getRouteQueuesPage = () => '/queues';
export const getRouteReportsPage = () => '/reports';
export const getRouteAddDoctor = () => '/add_doctor';
export const getRouteAddMonitor = () => '/add_monitor';
export const getRouteAddRoomPage = () => '/add_room_age';
export const getRouteReportsPageId = () => '/reports/:id';
export const getRouteAddAdvertisement = () => '/add_advertisement';

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

  [getRouteAddDoctor()]: AdminRoutes.ROOMPAGE,
  [getRouteAddRoomPage()]: AdminRoutes.ROOMPAGE,
  [getRouteDepartment()]: AdminRoutes.DEPARTMENT,
  [getRouteAddMonitor()]: AdminRoutes.ADD_MONITOR,
  [getRouteReportsPage()]: AdminRoutes.REPORTS_PATIENT,
  [getRouteAddAdvertisement()]: AdminRoutes.ADD_ADVERTISEMENT,

  [getRouteReportDoctor()]: DoctorRoutes.REPORTS_DOCTOR,
  [getRouteReportControlDoctor()]: DoctorRoutes.QUEUES_CONTROL_DOCTOR,

  [getRouteQueuesPage()]: ReceptionRoutes.REPORTS,
  [getRouteReportsPage()]: ReceptionRoutes.REPORTS,
  [getRouteReportQueuingTv()]: ReceptionRoutes.QUEUING_TV,
  [getRouteReportsPageId()]: ReceptionRoutes.REPORTS_PATIENT,

  [getRouteQueuesPageForMonitor()]: MonitorRoutes.FORBIDDEN,
};
