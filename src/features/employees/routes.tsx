import { ReactComponent as IconEmployees } from '../../assets/icons/icon-employees.svg';
import { ReactComponent as IconEmployeesActive } from '../../assets/icons/icon-employees-active.svg';

import EmployeesPage from './EmployeesPage';
import EmployeeAddPage from './components/EmployeeAddPage/EmployeeAddPage';
import EmployeeEdit from './components/EmployeeEdit/EmployeeEdit';

export const employeesViewRoutes = {
  path: '/employees',
  breadcrumb: 'Employees',
  Component: EmployeesPage,
};

export const employeesManageRoutes = [
  {
    path: '/employees/add',
    breadcrumb: 'Add an employee',
    Component: EmployeeAddPage,
  },
  {
    path: '/employees/edit',
    breadcrumb: 'Edit contact details',
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
