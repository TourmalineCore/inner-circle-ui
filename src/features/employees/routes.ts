import { faTable } from '@fortawesome/free-solid-svg-icons';

import EmployeesPage from './EmployeesPage';

export const tableRoutes = [
  {
    path: '/employees',
    breadcrumb: 'Employees',
    Component: EmployeesPage,
  },
];

export const tableSidebarRoutes = [
  {
    path: '/employees',
    label: 'Employees',
    icon: faTable,
  },
];
