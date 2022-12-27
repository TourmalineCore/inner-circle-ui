import { BreadcrumbComponentProps } from 'use-react-router-breadcrumbs';
import { profileRoutes, profileSidebarRoutes } from '../features/profile/routes';
import { SidebarRoutesProps } from '../types';
import { employeesRoutes, employeesSidebarRoutes } from '../features/employees/routes';
import { analyticsRoutes, analyticsSidebarRoutes } from '../features/analytics/routes';
import { homeRoutes } from '../features/home/routes';

export const adminRoutes: {
  path: string;
  breadcrumb: string | ((props: BreadcrumbComponentProps) => string | undefined);
  Component: () => JSX.Element;
}[] = [
  ...homeRoutes,
  ...profileRoutes,
  ...analyticsRoutes,
  ...employeesRoutes,
];

export const sidebarRoutes: SidebarRoutesProps[] = [
  ...profileSidebarRoutes,
  ...analyticsSidebarRoutes,
  ...employeesSidebarRoutes,
];
