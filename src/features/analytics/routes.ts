import { faMoneyCheck } from '@fortawesome/free-solid-svg-icons';

import Analytics from './Analytics';

export const analyticsRoutes = [
  {
    path: '/analytics',
    breadcrumb: 'Analytics',
    Component: Analytics,
  },
];

export const analyticsSidebarRoutes = [
  {
    path: '/analytics',
    label: 'Analytics',
    icon: faMoneyCheck,
  },
];
