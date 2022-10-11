import { faWindowMaximize } from '@fortawesome/free-solid-svg-icons';

import ModalPage from './ModalPage';

export const modalRoutes = [
  {
    path: '/modal',
    breadcrumb: 'Modal',
    Component: ModalPage,
  },
];

export const modalSidebarRoutes = [
  {
    path: '/modal',
    label: 'Modal',
    icon: faWindowMaximize,
  },
];
