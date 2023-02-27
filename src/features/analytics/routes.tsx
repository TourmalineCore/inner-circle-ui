import { ReactComponent as IconAnalytics } from '../../assets/icons/icon-analytics.svg';
import { ReactComponent as IconAnalyticsActive } from '../../assets/icons/icon-analytics-active.svg';

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
    icon: <IconAnalytics />,
    iconActive: <IconAnalyticsActive />,
  },
];
