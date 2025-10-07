import { ReactNode } from 'react'

interface SidebarDataProps {
  iconMini?: ReactNode,
  isActive?: boolean,
  isNestedRoutesCollapsed?: boolean,
  label: string,
  path: string,
}

interface SidebarProps extends SidebarDataProps {
  routes?: SidebarDataProps[],
}
