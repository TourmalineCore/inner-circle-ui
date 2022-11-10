import { faUsers } from '@fortawesome/free-solid-svg-icons';

import EmployeesPage from './EmployeesPage';

export const employeesRoutes = [
  {
    path: '/employees',
    breadcrumb: 'Employees',
    Component: EmployeesPage,
  },
];

export const employeesSidebarRoutes = [
  {
    path: '/employees',
    label: 'Employees',
    icon: faUsers,
  },
];
