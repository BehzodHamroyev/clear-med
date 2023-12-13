export enum AppRoutes {
  MAIN = 'main',
  ABOUT = 'about',
  FORBIDDEN = 'forbidden',
  NOT_FOUND = 'not_found',
  LOGIN = 'login',
  ADMIN = 'admin',
}

export const getRouteMain = () => '/';
export const getRouteAbout = () => '/about';
export const getRouteForbidden = () => '/forbidden';
export const getRouteNotFound = () => '/*';
export const getRouteLogin = () => '/login';
export const getRouteAdmin = () => '/admin';

export const AppRouteByPathPattern: Record<string, AppRoutes> = {
  [getRouteMain()]: AppRoutes.MAIN,
  [getRouteAbout()]: AppRoutes.ABOUT,
  [getRouteForbidden()]: AppRoutes.FORBIDDEN,
  [getRouteNotFound()]: AppRoutes.NOT_FOUND,
  [getRouteLogin()]: AppRoutes.LOGIN,
  [getRouteAdmin()]: AppRoutes.ADMIN,
};
