import IconAccountManagement from '../../assets/icons/icon-account-management.svg?react'

export const sidebarAccountManagement : {
  path: string,
  label: string,
  icon: JSX.Element,
  iconActive: JSX.Element,
  routes: {
    path: string,
    label: string,
    iconMini: JSX.Element,
  }[],
} = {
  path: `/`,
  label: `Management`,
  icon: <IconAccountManagement />,
  iconActive: <IconAccountManagement />,
  routes: [],
}

export const accountsSidebarRoutes = {
  isWindowRedirectNecessary: true,
  path: `/account-management/accounts`,
  label: `Accounts`,
  iconMini: <IconAccountManagement />,
}

export const rolesSidebarRoutes = {
  isWindowRedirectNecessary: true,
  path: `/account-management/roles`,
  label: `Roles`,
  iconMini: <IconAccountManagement />,
}

export const tenantsSidebarRoutes = {
  isWindowRedirectNecessary: true,
  path: `/account-management/tenants`,
  label: `Tenants`,
  iconMini: <IconAccountManagement />,
}
