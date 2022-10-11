import {
  faNetworkWired,
  faClipboard,
} from '@fortawesome/free-solid-svg-icons';

import NestedPagesRoot from './NestedPagesRoot';
import CardPage from './components/CardPage';

export const nestedPagesRoutes = [
  {
    path: '/nested',
    breadcrumb: 'Nested Pages',
    Component: NestedPagesRoot,
  },
  {
    path: '/nested/card-page',
    breadcrumb: 'Card Page',
    Component: CardPage,
  },
];

export const nestedPagesSidebarRoutes = [
  {
    path: '/nested',
    label: 'Nested Pages',
    icon: faNetworkWired,
    routes: [
      {
        path: '/nested/card-page',
        label: 'Card Page',
        iconMini: faClipboard,
      },
    ],
  },
];
