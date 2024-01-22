// Umumiy saytlar uchun
export enum CommonRoutes {
  QUEUES = 'queues',
  FORBIDDEN = 'forbidden',
  NOT_FOUND = 'not_found',
  SETTINGSPAGE = 'setting_page',
}

// Admin saytlari uchun
export enum AdminRoutes {
  DEPARTMENT = 'department',
  ADD_DOCTOR = 'add_doctor',
  ROOMPAGE = 'room_page',
  REPORTS_PATIENT = 'reports_patient',
  REPORTS = 'reports',
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

export const getRouteDepartment = () => '/';
export const getRouteQueuesPage = () => '/queues';
export const getRouteReportsPage = () => '/reports';
export const getRouteAddDoctor = () => '/add_doctor';
export const getRouteAddRoomPage = () => '/add_room_age';
export const getRouteReportsPageId = () => '/reports/:id';

// ----- Reception -----
export const getRouteReportQueuingTv = () => '/';

export const AppRouteByPathPattern: Record<
  string,
  CommonRoutes | AdminRoutes | DoctorRoutes | ReceptionRoutes
> = {
  [getRouteNotFound()]: CommonRoutes.NOT_FOUND,
  [getRouteForbidden()]: CommonRoutes.FORBIDDEN,
  [getRouteSettingsPage()]: CommonRoutes.SETTINGSPAGE,

  [getRouteAddDoctor()]: AdminRoutes.ROOMPAGE,
  [getRouteDepartment()]: AdminRoutes.DEPARTMENT,
  [getRouteAddRoomPage()]: AdminRoutes.ROOMPAGE,
  [getRouteReportsPage()]: AdminRoutes.REPORTS_PATIENT,

  [getRouteReportDoctor()]: DoctorRoutes.REPORTS_DOCTOR,
  [getRouteReportControlDoctor()]: DoctorRoutes.QUEUES_CONTROL_DOCTOR,

  [getRouteQueuesPage()]: ReceptionRoutes.REPORTS,
  [getRouteReportsPage()]: ReceptionRoutes.REPORTS,
  [getRouteReportQueuingTv()]: ReceptionRoutes.QUEUING_TV,
};
