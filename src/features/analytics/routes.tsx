import { ReactComponent as IconAnalitics } from '../../assets/icons/analytics.svg';
import { ReactComponent as IconAnaliticsActive } from '../../assets/icons/analytics-active.svg';

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
    icon: <IconAnalitics />,
    iconActive: <IconAnaliticsActive />,
  },
];
