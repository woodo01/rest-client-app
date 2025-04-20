import { HTTP_METHOD } from 'next/dist/server/web/http';

export interface ProtectedRoute {
  needAuth: boolean;
  path: string | string[];
}

const routes = {
  main: '/',
  login: '/sign-in',
  register: '/sign-up',
  history: '/history',
  variables: '/variables',
  rest: ({ method }: { method: HTTP_METHOD }): string => {
    return `/${method}`;
  },
};

export const protectedRoutes: ProtectedRoute[] = [
  {
    path: [
      routes.rest({ method: 'GET' }),
      routes.rest({ method: 'POST' }),
      routes.rest({ method: 'PUT' }),
      routes.rest({ method: 'DELETE' }),
      routes.rest({ method: 'PATCH' }),
      routes.rest({ method: 'HEAD' }),
      routes.rest({ method: 'OPTIONS' }),
    ],
    needAuth: true,
  },
  {
    path: routes.login,
    needAuth: false,
  },
  {
    path: routes.register,
    needAuth: false,
  },
  {
    path: routes.history,
    needAuth: true,
  },
  {
    path: routes.variables,
    needAuth: true,
  },
] as const;

export default routes;
