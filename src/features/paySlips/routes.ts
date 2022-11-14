import { faRubleSign } from '@fortawesome/free-solid-svg-icons';

import PaySlipsPage from './PaySlipsPage';

export const paySlipsRoutes = [
  {
    path: '/pay-slips',
    breadcrumb: 'Pay Slips',
    Component: PaySlipsPage,
  },
];

export const paySlipsSidebarRoutes = [
  {
    path: '/pay-slips',
    label: 'Pay Slips',
    icon: faRubleSign,
  },
];
