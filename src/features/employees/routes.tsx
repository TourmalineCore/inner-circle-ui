import { ReactComponent as IconEmployees } from '../../assets/icons/icon-employees.svg';
import { ReactComponent as IconEmployeesActive } from '../../assets/icons/icon-employees-active.svg';

import { EmployeesPage } from './EmployeesPage';
import EmployeeEdit from './components/EmployeeEdit/EmployeeEdit';

export const employeesViewRoutes = {
  path: '/employees',
  breadcrumb: 'Employees',
  Component: EmployeesPage,
};

export const employeesManageRoutes = [
  {
    path: '/employees/edit',
    breadcrumb: 'Edit',
    Component: EmployeeEdit,
  },
];

export const employeesSidebarRoutes = [
  {
    path: '/employees',
    label: 'Employees',
    icon: <IconEmployees />,
    iconActive: <IconEmployeesActive />,
  },
];
