import { BreadcrumbComponentProps } from 'use-react-router-breadcrumbs'
import { employeesManageRoutes, employeesViewRoutes } from '../pages/employees/routes'
import { profileRoutes } from '../pages/profile/routes'
import { homeRoutes } from '../pages/home/routes'

export function getPageRoutes(accessPermissions: Map<any, boolean>) {
  const routes: {
    path: string,
    breadcrumb: string | ((props: BreadcrumbComponentProps) => string | undefined),
    Component: () => JSX.Element,
  }[] = []

  if (accessPermissions.get(`ViewPersonalProfile`)) {
    routes.push(...profileRoutes)
  }

  if (accessPermissions.get(`ViewContacts`) || accessPermissions.get(`ViewSalaryAndDocumentsData`)) {
    routes.push(employeesViewRoutes)
  }

  if (accessPermissions.get(`EditFullEmployeesData`)) {
    routes.push(...employeesManageRoutes)
  }

  routes.push(...homeRoutes)

  return routes
}