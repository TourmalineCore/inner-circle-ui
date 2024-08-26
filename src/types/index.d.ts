import { ReactNode } from 'react';

interface SidebarRoutesProps {
  isWindowRedirectNecessary?: boolean;
  path: string;
  label: string;
  icon?: ReactNode;
  iconActive?: ReactNode;
  routes?: {
    isWindowRedirectNecessary?: boolean;
    path: string;
    label: string;
    iconMini: ReactNode;
  }[];
}
