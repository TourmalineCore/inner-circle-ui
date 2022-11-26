import { faUser } from '@fortawesome/free-solid-svg-icons';

import ProfilePage from './ProfilePage';
import ProfileEdit from './components/ProfileEdit/ProfileEdit';

export const profileRoutes = [
  {
    path: '/profile',
    breadcrumb: 'Profile',
    Component: ProfilePage,
  },
  {
    path: '/profile/edit',
    breadcrumb: 'Edit',
    Component: ProfileEdit,
  },
];

export const profileSidebarRoutes = [
  {
    path: '/profile',
    label: 'Profile',
    icon: faUser,
  },
];
