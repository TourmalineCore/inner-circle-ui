
import { EmployeesPage } from './EmployeesPage'
import { EmployeeEdit } from './components/EmployeeEdit/EmployeeEdit'

export const employeesViewRoutes = {
  path: `/employees`,
  breadcrumb: `Employees`,
  Component: EmployeesPage,
}

export const employeesManageRoutes = [
  {
    path: `/employees/edit`,
    breadcrumb: `Edit`,
    Component: EmployeeEdit,
  },
]