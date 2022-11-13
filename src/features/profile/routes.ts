import { faUser } from '@fortawesome/free-solid-svg-icons';
import { BreadcrumbComponentProps } from 'use-react-router-breadcrumbs';

import ProfilePage from './ProfilePage';

export const profileRoutes = [
  {
    path: '/profile',
    breadcrumb: 'Salary information',
    Component: ProfilePage,
  },
  {
    path: '/profile/:tabId',
    breadcrumb: (props: BreadcrumbComponentProps) => props.match.params.tabId,
    Component: ProfilePage,
  },
];

export const profileSidebarRoutes = [
  {
    path: '/profile',
    label: 'Salary',
    icon: faUser,
  },
];
