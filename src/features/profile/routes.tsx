import { ReactComponent as IconProfile } from '../../assets/icons/profile.svg';
import { ReactComponent as IconProfileActive } from '../../assets/icons/profile-active.svg';

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
    icon: <IconProfile />,
    iconActive: <IconProfileActive />,
  },
];
