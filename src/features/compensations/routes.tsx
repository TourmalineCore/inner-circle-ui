import { ReactComponent as IconProfile } from '../../assets/icons/icon-profile.svg';
import { ReactComponent as IconProfileActive } from '../../assets/icons/icon-profile-active.svg';
import { LINK_TO_DASHBOARD } from '../../common/config/config';

export const compensationsSidebarRoutes = [
  {
    isWindowRedirectNecessary: true,
    path: `${LINK_TO_DASHBOARD}compensations`,
    label: 'Compensations',
    icon: <IconProfile />,
    iconActive: <IconProfileActive />,
  },
];

export function getRouteForCompensations(permission: string) {
  if (permission === 'ViewPersonalCompensations') {
    return [{
      isWindowRedirectNecessary: true,
      path: `${LINK_TO_DASHBOARD}compensations/my`,
      label: 'Compensations',
      icon: <IconProfile />,
      iconActive: <IconProfileActive />,
    }];
  }

  return [{
    isWindowRedirectNecessary: true,
    path: `${LINK_TO_DASHBOARD}compensations/all`,
    label: 'Compensations',
    icon: <IconProfile />,
    iconActive: <IconProfileActive />,
  }];
}

export const compensationsAllAccessSidebarRoutes = [
  {
    isWindowRedirectNecessary: true,
    path: `${LINK_TO_DASHBOARD}compensations`,
    label: 'Compensations',
    icon: <IconProfile />,
    iconActive: <IconProfile />,
    routes: [
      {
        isWindowRedirectNecessary: true,
        path: `${LINK_TO_DASHBOARD}compensations/my`,
        label: 'My',
        iconMini: <IconProfile />,
      },
      {
        isWindowRedirectNecessary: true,
        path: `${LINK_TO_DASHBOARD}compensations/all`,
        label: 'All',
        iconMini: <IconProfile />,
      }],
  },
];
