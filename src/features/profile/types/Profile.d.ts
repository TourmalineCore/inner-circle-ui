import { ReactNode } from 'react';

type ProfileNavItems = {
  text?: string;
  icon?: ReactNode;
  href: string;
  onClick?: () => unknown;
  active?: boolean;
};

type InfoData = {
  id: number;
  name: string;
  surname: string;
  email: string;
  ratePerHour: number;
  fullSalary: number;
  employmentType: number;
  salary: number;
  hourCostFact: number;
  hourCostForHands: number;
  advancePayment: number;
  income: number;
  expenses: number;
  profit: number;
  profitability: number;
  salaryBeforeTax: number;
  salaryAfterTax: number;
};
