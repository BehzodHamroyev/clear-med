export enum AppRoutes {
  MAIN = 'main',
  ABOUT = 'about',
  FORBIDDEN = 'forbidden',
  NOT_FOUND = 'not_found',
  LOGIN = 'login',
  ADMIN = 'admin',
  DEPARTMENT = 'department',
  ADDROOMPAGE = 'add_room_page',
  ADD_DOCTOR = 'add_doctor',
  REPORTS = 'reports',
}

// AddRoomPage
export const getRouteMain = () => '/';
export const getRouteAbout = () => '/about';
export const getRouteForbidden = () => '/forbidden';
export const getRouteNotFound = () => '/*';
export const getRouteLogin = () => '/login';
export const getRouteAdmin = () => '/admin';
export const getRouteDepartment = () => '/department';
export const getRouteAddRoomPage = () => '/add_room_age';
export const getRouteAddDoctor = () => '/add_doctor';
export const getRouteReportsPage = () => '/reports';

export const AppRouteByPathPattern: Record<string, AppRoutes> = {
  [getRouteMain()]: AppRoutes.MAIN,
  [getRouteAbout()]: AppRoutes.ABOUT,
  [getRouteForbidden()]: AppRoutes.FORBIDDEN,
  [getRouteNotFound()]: AppRoutes.NOT_FOUND,
  [getRouteLogin()]: AppRoutes.LOGIN,
  [getRouteAdmin()]: AppRoutes.ADMIN,
  [getRouteDepartment()]: AppRoutes.DEPARTMENT,
  [getRouteAddRoomPage()]: AppRoutes.ADDROOMPAGE,
  [getRouteAddDoctor()]: AppRoutes.ADDROOMPAGE,
  [getRouteReportsPage()]: AppRoutes.REPORTS,
};
