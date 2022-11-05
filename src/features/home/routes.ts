import { faHome } from '@fortawesome/free-solid-svg-icons';

import HomePage from './HomePage';

export const homeRoutes = [
  {
    path: '/',
    breadcrumb: 'Главная страница',
    Component: HomePage,
  },
];

export const homeSidebarRoutes = [
  {
    path: '/',
    label: 'Домашняя страница',
    icon: faHome,
  },
];
