import { BreadcrumbComponentProps } from 'use-react-router-breadcrumbs';
import { homeRoutes, homeSidebarRoutes } from '../features/home/routes';
import { profileRoutes, profileSidebarRoutes } from '../features/profile/routes';
import { employeesRoutes, employeesSidebarRoutes } from '../features/employees/routes';
import { analyticsRoutes, analyticsSidebarRoutes } from '../features/analytics/routes';

import { SidebarRoutesProps } from '../types';

export const adminRoutes: {
  path: string;
  breadcrumb: string | ((props: BreadcrumbComponentProps) => string | undefined);
  Component: () => JSX.Element;
}[] = [
  ...homeRoutes,
  ...profileRoutes,
  ...employeesRoutes,
  ...analyticsRoutes,
];

export const sidebarRoutes: SidebarRoutesProps[] = [
  ...homeSidebarRoutes,
  ...profileSidebarRoutes,
  ...employeesSidebarRoutes,
  ...analyticsSidebarRoutes,
];
