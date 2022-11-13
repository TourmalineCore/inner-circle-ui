import { faMoneyCheck } from '@fortawesome/free-solid-svg-icons';

import EmployeesSalaryPage from './EmployeesSalaryPage';

export const employeesSalaryRoutes = [
  {
    path: '/employeesSalary',
    breadcrumb: 'Employees Salary',
    Component: EmployeesSalaryPage,
  },
];

export const employeesSalarySidebarRoutes = [
  {
    path: '/employeesSalary',
    label: 'Employees Salary',
    icon: faMoneyCheck,
  },
];
