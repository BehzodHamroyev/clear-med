export enum AppRoutes {
  MAIN = 'main',
  ABOUT = 'about',
  FORBIDDEN = 'forbidden',
  NOT_FOUND = 'not_found',
  LOGIN = 'login',
}

export const getRouteMain = () => '/';
// export const getRouteSettings = () => '/settings';
export const getRouteAbout = () => '/about';
// export const getRouteProfile = (id: string) => `/profile/${id}`;
// export const getRouteArticles = () => '/articles';
// export const getRouteArticleDetails = (id: string) => `/articles/${id}`;
// export const getRouteArticleCreate = () => '/articles/new';
// export const getRouteArticleEdit = (id: string) => `/articles/${id}/edit`;
// export const getRouteAdmin = () => '/admin';
export const getRouteForbidden = () => '/forbidden';
export const getRouteNotFound = () => '/*';
export const getRouteLogin = () => '/login';

export const AppRouteByPathPattern: Record<string, AppRoutes> = {
  [getRouteMain()]: AppRoutes.MAIN,
  [getRouteAbout()]: AppRoutes.ABOUT,
  [getRouteForbidden()]: AppRoutes.FORBIDDEN,
  [getRouteNotFound()]: AppRoutes.NOT_FOUND,
  [getRouteLogin()]: AppRoutes.LOGIN,
};
