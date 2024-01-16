// Umumiy saytlar uchun
export enum CommonRoutes {
  MAIN = 'main',
  QUEUES = 'queues',
  FORBIDDEN = 'forbidden',
  NOT_FOUND = 'not_found',
  SETTINGSPAGE = 'setting_page',
}

// Admin saytlari uchun
export enum AdminRoutes {
  DEPARTMENT = 'department',
  ADD_DOCTOR = 'add_doctor',
  ADDROOMPAGE = 'add_room_page',
  REPORTS_PATIENT = 'reports_patient',
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

// AddRoomPage
export const getRouteMain = () => '/';
export const getRoute = () => '/login';
export const getRouteNotFound = () => '/*';
export const getRouteAbout = () => '/about';
export const getRouteAdmin = () => '/admin';
export const getRouteQueuesPage = () => '/queues';
export const getRouteForbidden = () => '/forbidden';
export const getRouteReportsPage = () => '/reports';
export const getRouteAddDoctor = () => '/add_doctor';
export const getRouteDepartment = () => '/department';
export const getRouteSettingsPage = () => '/settings';
export const getRouteAddRoomPage = () => '/add_room_age';
export const getRouteReportsPageId = () => '/reports/:id';
export const getRouteReportQueuingTv = () => '/queuing_tv';
export const getRouteReportDoctor = () => '/reports_doctor';
export const getRouteReportControlDoctor = () => '/queues_control_doctor';

export const AppRouteByPathPattern: Record<
  string,
  CommonRoutes | AdminRoutes | DoctorRoutes | ReceptionRoutes
> = {
  [getRouteMain()]: CommonRoutes.MAIN,
  [getRouteNotFound()]: CommonRoutes.NOT_FOUND,
  [getRouteForbidden()]: CommonRoutes.FORBIDDEN,
  [getRouteSettingsPage()]: CommonRoutes.SETTINGSPAGE,

  [getRouteAddDoctor()]: AdminRoutes.ADDROOMPAGE,
  [getRouteDepartment()]: AdminRoutes.DEPARTMENT,
  [getRouteAddRoomPage()]: AdminRoutes.ADDROOMPAGE,
  [getRouteReportsPage()]: AdminRoutes.REPORTS_PATIENT,

  [getRouteReportDoctor()]: DoctorRoutes.REPORTS_DOCTOR,
  [getRouteReportControlDoctor()]: DoctorRoutes.QUEUES_CONTROL_DOCTOR,

  [getRouteQueuesPage()]: ReceptionRoutes.REPORTS,
  [getRouteReportsPage()]: ReceptionRoutes.REPORTS,
  [getRouteReportQueuingTv()]: ReceptionRoutes.QUEUING_TV,
};
