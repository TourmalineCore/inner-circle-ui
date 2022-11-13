import { BreadcrumbComponentProps } from 'use-react-router-breadcrumbs';
import { employeesSalaryRoutes, employeesSalarySidebarRoutes } from '../features/employeesSalary/routes';

import { SidebarRoutesProps } from '../types';

export const adminRoutes: {
  path: string;
  breadcrumb: string | ((props: BreadcrumbComponentProps) => string | undefined);
  Component: () => JSX.Element;
}[] = [
  ...employeesSalaryRoutes,
];

export const sidebarRoutes: SidebarRoutesProps[] = [
  ...employeesSalarySidebarRoutes,
];
