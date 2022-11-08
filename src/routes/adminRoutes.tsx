import { BreadcrumbComponentProps } from 'use-react-router-breadcrumbs';
import { homeRoutes, homeSidebarRoutes } from '../features/home/routes';
import { profileRoutes, profileSidebarRoutes } from '../features/profile/routes';
import { nestedPagesRoutes, nestedPagesSidebarRoutes } from '../features/nested/routes';
import { inputsRoutes, inputsSidebarRoutes } from '../features/inputs/routes';
import { tableRoutes, tableSidebarRoutes } from '../features/staff/routes';
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
  ...tableRoutes,
  ...modalRoutes,
];

export const sidebarRoutes: SidebarRoutesProps[] = [
  ...homeSidebarRoutes,
  ...profileSidebarRoutes,
  ...nestedPagesSidebarRoutes,
  ...inputsSidebarRoutes,
  ...tableSidebarRoutes,
  ...modalSidebarRoutes,
];
