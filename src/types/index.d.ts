import { ReactNode } from 'react';

interface SidebarRoutesProps {
  path: string;
  label: string;
  icon?: ReactNode;
  iconActive?: ReactNode;
  routes?: {
    path: string;
    label: string;
    iconMini: ReactNode;
  }[];
}
