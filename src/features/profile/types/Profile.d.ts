import { ReactNode } from 'react';

export type ProfileNavItems = {
  text?: string;
  icon?: ReactNode;
  href: string;
  onClick?: () => unknown;
  active?: boolean;
};

export type Employee = {
  id: number;
  name: string;
  surname: string;
  middleName: string;
  workEmail: string;
  personalEmail?: string | null;
  phone?: string | null;
  skype?: string | null;
  telegram?: string | null;
  netSalary: number;
};
