export enum AppRoutes {
  MAIN = 'main',
  ABOUT = 'about',
  // LOGIN = 'login',
  ADMIN = 'admin',
  QUEUES = 'queues',
  REPORTS = 'reports',
  FORBIDDEN = 'forbidden',
  NOT_FOUND = 'not_found',
  DEPARTMENT = 'department',
  ADD_DOCTOR = 'add_doctor',
  ADDROOMPAGE = 'add_room_page',
  SETTINGSPAGE = 'setting_page',
  REPORTS_PATIENT = 'reports_patient',
  REPORTS_DOCTOR = 'reports_doctor',
  QUEUES_CONTROL_DOCTOR = 'queues_control_doctor',
}

// AddRoomPage
export const getRouteMain = () => '/';
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
export const getRouteReportDoctor = () => '/reports_doctor';
export const getRouteReportControlDoctor = () => '/queues_control_doctor';

export const AppRouteByPathPattern: Record<string, AppRoutes> = {
  [getRouteMain()]: AppRoutes.MAIN,
  [getRouteAbout()]: AppRoutes.ABOUT,
  [getRouteAdmin()]: AppRoutes.ADMIN,
  [getRouteQueuesPage()]: AppRoutes.REPORTS,
  [getRouteNotFound()]: AppRoutes.NOT_FOUND,
  [getRouteReportsPage()]: AppRoutes.REPORTS,
  [getRouteForbidden()]: AppRoutes.FORBIDDEN,
  [getRouteAddDoctor()]: AppRoutes.ADDROOMPAGE,
  [getRouteDepartment()]: AppRoutes.DEPARTMENT,
  [getRouteAddRoomPage()]: AppRoutes.ADDROOMPAGE,
  [getRouteSettingsPage()]: AppRoutes.SETTINGSPAGE,
  [getRouteReportsPage()]: AppRoutes.REPORTS_PATIENT,

  [getRouteReportDoctor()]: AppRoutes.REPORTS_DOCTOR,
  [getRouteReportControlDoctor()]: AppRoutes.QUEUES_CONTROL_DOCTOR,
};
