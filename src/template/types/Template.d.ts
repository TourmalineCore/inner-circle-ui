import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface SidebarDataProps {
  iconMini?: IconProp,
  isActive?: boolean,
  isNestedRoutesCollapsed?: boolean,
  label: string,
  path: string,
}

interface SidebarProps extends SidebarDataProps {
  routes?: SidebarDataProps[];
}
