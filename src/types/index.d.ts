import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface SidebarRoutesProps {
  path: string;
  label: string;
  icon?: ReactNode;
  iconActive?: ReactNode;
  routes?: {
    path: string;
    label: string;
    iconMini: IconProp;
  }[];
}
