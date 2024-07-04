import { BreadcrumbComponentProps } from 'use-react-router-breadcrumbs';
import { profileRoutes, profileSidebarRoutes } from '../features/profile/routes';
import { SidebarRoutesProps } from '../types';
import {
  employeesManageRoutes, employeesSidebarRoutes, employeesViewRoutes,
} from '../features/employees/routes';
import {
  analyticsRoutes,
  // analyticsSidebarRoutes,
} from '../features/analytics/routes';
import { Permission } from './state/AccessBasedOnPermissionsState';
import {
  accountsSidebarRoutes,
  rolesSidebarRoutes,
  sidebarAccountManagement,
  tenantsSidebarRoutes,
} from '../features/account-management/routers';
import { compensationsAllAccessSidebarRoutes, getRouteForCompensations } from '../features/compensations/routes';
import { documentsSidebarRoutes } from '../features/documents/routes';

export function getAdminRoutes(accessPermissions: Map<keyof typeof Permission, boolean>) {
  const routes: {
    path: string;
    breadcrumb: string | ((props: BreadcrumbComponentProps) => string | undefined);
    Component: () => JSX.Element;
  }[] = [];

  if (accessPermissions.get('ViewPersonalProfile')) {
    routes.push(...profileRoutes);
  }

  if (accessPermissions.get('AccessAnalyticalForecastsPage')) {
    routes.push(...analyticsRoutes);
  }

  if (accessPermissions.get('ViewContacts') || accessPermissions.get('ViewSalaryAndDocumentsData')) {
    routes.push(employeesViewRoutes);
  }

  if (accessPermissions.get('EditFullEmployeesData')) {
    routes.push(...employeesManageRoutes);
  }

  return routes;
}

export function getSidebarRoutes(accessPermissions: Map<keyof typeof Permission, boolean>) {
  const routes: SidebarRoutesProps[] = [];

  const copyAccountManagement = { ...sidebarAccountManagement };

  if (accessPermissions.get('ViewPersonalProfile')) {
    routes.push(...profileSidebarRoutes);
  }

  // if (accessPermissions.get('AccessAnalyticalForecastsPage')) {
  //   routes.push(...analyticsSidebarRoutes);
  // }

  if (accessPermissions.get('ViewContacts') || accessPermissions.get('ViewSalaryAndDocumentsData')) {
    routes.push(...employeesSidebarRoutes);
  }

  if (accessPermissions.get('CanRequestCompensations') && accessPermissions.get('CanManageCompensations')) {
    routes.push(...compensationsAllAccessSidebarRoutes);
  }

  if (accessPermissions.get('CanRequestCompensations') && !accessPermissions.get('CanManageCompensations')) {
    routes.push(...getRouteForCompensations('CanRequestCompensations'));
  }

  if (accessPermissions.get('CanManageCompensations') && !accessPermissions.get('CanRequestCompensations')) {
    routes.push(...getRouteForCompensations('CanManageCompensations'));
  }

  if (accessPermissions.get('CanManageDocuments')) {
    routes.push(...documentsSidebarRoutes);
  }

  if (accessPermissions.get('ViewAccounts') && accessPermissions.get('ViewRoles') && accessPermissions.get('CanManageTenants')) {
    copyAccountManagement.routes = [accountsSidebarRoutes, rolesSidebarRoutes, tenantsSidebarRoutes];

    routes.push(copyAccountManagement);

    return routes;
  }

  if (accessPermissions.get('ViewAccounts')) {
    copyAccountManagement.routes = [accountsSidebarRoutes];

    routes.push(copyAccountManagement);
    return routes;
  }

  if (accessPermissions.get('ViewRoles')) {
    copyAccountManagement.routes = [rolesSidebarRoutes];

    routes.push(copyAccountManagement);

    return routes;
  }

  if (accessPermissions.get('CanManageTenants')) {
    copyAccountManagement.routes = [tenantsSidebarRoutes];

    routes.push(copyAccountManagement);

    return routes;
  }

  return routes;
}
