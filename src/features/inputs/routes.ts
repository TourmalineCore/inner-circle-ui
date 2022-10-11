import { faKeyboard } from '@fortawesome/free-solid-svg-icons';

import InputsPage from './InputsPage';

export const inputsRoutes = [
  {
    path: '/inputs',
    breadcrumb: 'Inputs',
    Component: InputsPage,
  },
];

export const inputsSidebarRoutes = [
  {
    path: '/inputs',
    label: 'Inputs',
    icon: faKeyboard,
  },
];
