import { BreadcrumbComponentProps } from 'use-react-router-breadcrumbs'
import { employeeProfileRoutes, employeesViewRoutes, employeesManageRoutes } from '../pages/routes'

export function getPageRoutes(accessPermissions: Map<any, boolean>) {
  const routes: {
    path: string,
    breadcrumb: string | ((props: BreadcrumbComponentProps) => string | undefined),
    Component: () => JSX.Element,
  }[] = []

  if (accessPermissions.get(`ViewPersonalProfile`)) {
    routes.push(employeeProfileRoutes)
  }

  if (accessPermissions.get(`ViewContacts`) || accessPermissions.get(`ViewSalaryAndDocumentsData`)) {
    routes.push(employeesViewRoutes)
  }

  if (accessPermissions.get(`EditFullEmployeesData`)) {
    routes.push(employeesManageRoutes)
  }

  return routes
}