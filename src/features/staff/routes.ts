import { faTable } from '@fortawesome/free-solid-svg-icons';

import TablePage from './StaffPage';

export const tableRoutes = [
  {
    path: '/staff',
    breadcrumb: 'Staff',
    Component: TablePage,
  },
];

export const tableSidebarRoutes = [
  {
    path: '/staff',
    label: 'Staff',
    icon: faTable,
  },
];
