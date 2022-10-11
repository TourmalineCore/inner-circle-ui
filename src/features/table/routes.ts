import { faTable } from '@fortawesome/free-solid-svg-icons';

import TablePage from './TablePage';

export const tableRoutes = [
  {
    path: '/table',
    breadcrumb: 'Table',
    Component: TablePage,
  },
];

export const tableSidebarRoutes = [
  {
    path: '/table',
    label: 'Table',
    icon: faTable,
  },
];
