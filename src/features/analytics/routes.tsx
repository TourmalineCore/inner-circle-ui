import IconAnalytics from '../../assets/icons/icon-analytics.svg?react'
import IconAnalyticsActive from '../../assets/icons/icon-analytics-active.svg?react'

import { AnalyticsPage } from './AnalyticsPage'

export const analyticsRoutes = [
  {
    path: `/analytics`,
    breadcrumb: `Analytics`,
    Component: AnalyticsPage,
  },
]

export const analyticsSidebarRoutes = [
  {
    path: `/analytics`,
    label: `Analytics`,
    icon: <IconAnalytics />,
    iconActive: <IconAnalyticsActive />,
  },
]
