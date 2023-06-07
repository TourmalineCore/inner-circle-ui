import { ReactComponent as IconAccountManagement } from '../../assets/icons/icon-account-management.svg';
import { ReactComponent as IconAnalytics } from '../../assets/icons/icon-analytics.svg';
import { ReactComponent as IconAnalyticsActive } from '../../assets/icons/icon-analytics-active.svg';

export const sidebarAccountManagement : {
  path: string;
  label: string,
  icon: JSX.Element,
  iconActive: JSX.Element,
  routes: {
    path: string,
    label: string,
    iconMini: JSX.Element,
  }[]
} = {
  path: '/',
  label: 'Account management',
  icon: <IconAnalytics />,
  iconActive: <IconAnalyticsActive />,
  routes: [],
};

export const accountsSidebarRoutes = {
  isWindowRedirectNecessary: true,
  path: '/account-management/accounts',
  label: 'Accounts',
  iconMini: <IconAccountManagement />,
};

export const rolesSidebarRoutes = {
  isWindowRedirectNecessary: true,
  path: '/account-management/roles',
  label: 'Roles',
  iconMini: <IconAccountManagement />,
};
