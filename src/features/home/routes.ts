import { faHome } from '@fortawesome/free-solid-svg-icons';

import HomePage from './HomePage';

export const homeRoutes = [
  {
    path: '/',
    breadcrumb: 'Home',
    Component: HomePage,
  },
];

export const homeSidebarRoutes = [
  {
    path: '/',
    label: 'Home',
    icon: faHome,
  },
];
