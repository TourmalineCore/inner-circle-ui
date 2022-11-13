import { ReactNode } from 'react';

type ProfileNavItems = {
  text?: string;
  icon?: ReactNode;
  href: string;
  onClick?: () => unknown;
  active?: boolean;
};

type Employee = {
  id: number;
  name: string;
  surname: string;
  workEmail: string;
  personalEmail: string;
  phone: string;
  skype: string;
  telegram: string;
  pay: number;
  ratePerHour: number;
  employmentType: number;
  hasParking: boolean;
  hourlyCostFact: number;
  hourlyCostHand: number;
  earnings: number;
  expenses: number;
  profit: number;
  profitAbility: number;
  grossSalary: number;
  retainer: number;
  netSalary: number;
};
