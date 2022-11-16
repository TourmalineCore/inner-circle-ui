import { BreadcrumbComponentProps } from 'use-react-router-breadcrumbs';
import { SidebarRoutesProps } from '../types';
import { analyticsRoutes, analyticsSidebarRoutes } from '../features/analytics/routes';

export const adminRoutes: {
  path: string;
  breadcrumb: string | ((props: BreadcrumbComponentProps) => string | undefined);
  Component: () => JSX.Element;
}[] = [
  ...analyticsRoutes,
];

export const sidebarRoutes: SidebarRoutesProps[] = [
  ...analyticsSidebarRoutes,
];
