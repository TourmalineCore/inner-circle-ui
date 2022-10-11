import { ReactNode } from 'react';

type ProfileNavItems = {
  text?: string;
  icon?: ReactNode;
  href: string;
  onClick?: () => unknown;
  active?: boolean;
};
