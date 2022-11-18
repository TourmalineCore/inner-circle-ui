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
  personalEmail: string | null | undefined;
  phone: string | null | undefined;
  skype: string | null | undefined;
  telegram: string | null | undefined;
  netSalary: number | undefined;
};
