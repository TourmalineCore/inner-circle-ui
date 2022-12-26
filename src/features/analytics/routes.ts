import { faMoneyCheck } from '@fortawesome/free-solid-svg-icons';

import AnalyticsPage from './AnalyticsPage';

export const analyticsRoutes = [
  {
    path: '/',
    breadcrumb: 'Analytics',
    Component: AnalyticsPage,
  },
];

export const analyticsSidebarRoutes = [
  {
    path: '/',
    label: 'Analytics',
    icon: faMoneyCheck,
  },
];
