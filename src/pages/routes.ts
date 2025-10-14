import { EmployeeEdit } from "./employees/components/EmployeeEdit/EmployeeEdit"
import { EmployeesPage } from "./employees/EmployeesPage"
import { EmployeeProfilePage } from "./employee-profile/EmployeeProfilePage"

const DEFAULT_PATH = `/employees`

export const employeeProfileRoutes = {
  path: `${DEFAULT_PATH}/profile`,
  breadcrumb: `Profile`,
  Component: EmployeeProfilePage,
}

export const employeesViewRoutes = {
  path: DEFAULT_PATH,
  breadcrumb: `Employees`,
  Component: EmployeesPage,
}

export const employeesManageRoutes = {
  path: `${DEFAULT_PATH}/edit`,
  breadcrumb: `Edit`,
  Component: EmployeeEdit,
}