import { faHome } from '@fortawesome/free-solid-svg-icons';

import HomePage from './HomePage';

export const homeRoutes = [
  {
    path: '/',
    breadcrumb: 'Homepage',
    Component: HomePage,
  },
];

export const homeSidebarRoutes = [
  {
    path: '/',
    label: 'Homepage',
    icon: faHome,
  },
];
