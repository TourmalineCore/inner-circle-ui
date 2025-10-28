import { EmployeesPage } from "./employees/EmployeesPage"
import { EmployeeProfilePage } from "./employee-profile/EmployeeProfilePage"
import { EmployeeEditPage } from "./employee-edit/EmployeeEditPage"

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
  Component: EmployeeEditPage,
}