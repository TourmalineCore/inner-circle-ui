import { EmployeeEdit } from "./employees/components/EmployeeEdit/EmployeeEdit"
import { EmployeesPage } from "./employees/EmployeesPage"
import { HomePage } from "./home/HomePage"
import { ProfilePage } from "./profile/ProfilePage"

export const homeRoutes = [
  {
    path: `/`,
    breadcrumb: `Homepage`,
    Component: HomePage,
  },
]

const PROFILE_PATH = `/profile`

export const profileRoutes = [
  {
    path: PROFILE_PATH,
    breadcrumb: `Profile`,
    Component: ProfilePage,
  },
]

const EMPLOYEE_PATH = `/employees`

export const employeesViewRoutes = {
  path: EMPLOYEE_PATH,
  breadcrumb: `Employees`,
  Component: EmployeesPage,
}

export const employeesManageRoutes = [
  {
    path: `${EMPLOYEE_PATH}/edit`,
    breadcrumb: `Edit`,
    Component: EmployeeEdit,
  },
]