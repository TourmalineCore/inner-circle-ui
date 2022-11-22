import { faRubleSign } from '@fortawesome/free-solid-svg-icons';
import { BreadcrumbComponentProps } from 'use-react-router-breadcrumbs';

import PaySlipsPage from './PaySlipsPage';

export const paySlipsRoutes = [
  {
    path: '/pay-slips',
    breadcrumb: 'Pay Slips',
    Component: PaySlipsPage,
  },
  {
    path: '/pay-slips/:id',
    breadcrumb: (props: BreadcrumbComponentProps) => props.match.params.id,
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
