import { faMoneyCheck } from '@fortawesome/free-solid-svg-icons';

import AnalyticsPage from './AnalyticsPage';

export const analyticsRoutes = [
  {
    path: '/analytics',
    breadcrumb: 'Analytics',
    Component: AnalyticsPage,
  },
];

export const analyticsSidebarRoutes = [
  {
    path: '/analytics',
    label: 'Analytics',
    icon: faMoneyCheck,
  },
];
