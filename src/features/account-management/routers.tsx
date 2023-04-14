import { ReactComponent as IconAccountManagement } from '../../assets/icons/icon-account-management.svg';

export const accountManagementSidebarRoutes = [
  {
    isWindowRedirectNecessary: true,
    path: '/account-management',
    label: 'Account Management',
    icon: <IconAccountManagement />,
    iconActive: <IconAccountManagement />,
  },
];
