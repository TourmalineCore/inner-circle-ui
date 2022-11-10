import { BreadcrumbComponentProps } from 'use-react-router-breadcrumbs';
import { homeRoutes, homeSidebarRoutes } from '../features/home/routes';
import { profileRoutes, profileSidebarRoutes } from '../features/profile/routes';
import { nestedPagesRoutes, nestedPagesSidebarRoutes } from '../features/nested/routes';
import { inputsRoutes, inputsSidebarRoutes } from '../features/inputs/routes';
import { employeesRoutes, employeesSidebarRoutes } from '../features/employees/routes';
import { modalRoutes, modalSidebarRoutes } from '../features/modal/routes';
import { SidebarRoutesProps } from '../types';

export const adminRoutes: {
  path: string;
  breadcrumb: string | ((props: BreadcrumbComponentProps) => string | undefined);
  Component: () => JSX.Element;
}[] = [
  ...homeRoutes,
  ...profileRoutes,
  ...nestedPagesRoutes,
  ...inputsRoutes,
  ...employeesRoutes,
  ...modalRoutes,
];

export const sidebarRoutes: SidebarRoutesProps[] = [
  ...homeSidebarRoutes,
  ...profileSidebarRoutes,
  ...nestedPagesSidebarRoutes,
  ...inputsSidebarRoutes,
  ...employeesSidebarRoutes,
  ...modalSidebarRoutes,
];
