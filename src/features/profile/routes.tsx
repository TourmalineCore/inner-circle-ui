import { ReactComponent as IconProfile } from '../../assets/icons/icon-profile.svg';
import { ReactComponent as IconProfileActive } from '../../assets/icons/icon-profile-active.svg';

import { ProfilePage } from './ProfilePage';

export const profileRoutes = [
  {
    path: '/profile',
    breadcrumb: 'Profile',
    Component: ProfilePage,
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
