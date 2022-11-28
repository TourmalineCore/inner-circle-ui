import { ReactNode } from 'react';

export type ProfileNavItems = {
  text?: string;
  icon?: ReactNode;
  href: string;
  onClick?: () => unknown;
  active?: boolean;
};

export type Employee = {
  id: number | undefined;
  name: string | undefined;
  surname: string | undefined;
  middleName: string | undefined;
  workEmail: string | undefined;
  personalEmail: string | undefined;
  phone: string | undefined;
  github: string | undefined;
  gitlab: string | undefined;
};
