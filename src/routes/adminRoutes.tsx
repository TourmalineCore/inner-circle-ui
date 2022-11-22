import { BreadcrumbComponentProps } from 'use-react-router-breadcrumbs';
import { homeRoutes, homeSidebarRoutes } from '../features/home/routes';
import { profileRoutes, profileSidebarRoutes } from '../features/profile/routes';
import { employeesRoutes, employeesSidebarRoutes } from '../features/employees/routes';
import { SidebarRoutesProps } from '../types';
import { analyticsRoutes, analyticsSidebarRoutes } from '../features/analytics/routes';

export const adminRoutes: {
  path: string;
  breadcrumb: string | ((props: BreadcrumbComponentProps) => string | undefined);
  Component: () => JSX.Element;
}[] = [
  ...analyticsRoutes,
  ...homeRoutes,
  ...profileRoutes,
  ...employeesRoutes,
];

export const sidebarRoutes: SidebarRoutesProps[] = [
  ...analyticsSidebarRoutes,
  ...homeSidebarRoutes,
  ...profileSidebarRoutes,
  ...employeesSidebarRoutes,
];
