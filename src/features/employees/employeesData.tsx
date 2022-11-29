export type ColleagueContactsType = {
  id: number;
  fullName: string;
  corporateEmail: string;
  personalEmail: string;
  phone: string | null;
  gitHub: string | null;
  gitLab: string | null;
};
export type ColleagueFinancesDtoType = {
  id: number;
  ratePerHour: number;
  pay: number;
  employmentType: number;
  netSalary: number;
  parking: number;
};

export type ColleaguesType = {
  colleagueContacts : ColleagueContactsType[]
  colleagueFinancesDto: ColleagueFinancesDtoType[]
};

export type ColleagueFinancesColumnsType = {
  id: number;
  fullName: string;
  ratePerHour: number;
  pay: number;
  employmentType: number;
  netSalary: number;
  parking: number;
};

export type EmployeeType = {
  name: string;
  surname: string;
  middleName: string;
  corporateEmail: string;
  personalEmail: string;
  phone: string | null;
  gitHub: string | null;
  gitLab: string | null;
  ratePerHour: number;
  pay: number;
  employmentType: number;
  hasParking: boolean;
};

export type EmployeeContactUpdateType = {
  employeeId: number,
  name: string,
  surname: string,
  middleName: string,
  personalEmail: string,
  phone: string | null,
  gitHub: string | null,
  gitLab: string | null
};

export type EmployeeSalaryUpdateType = {
  employeeId: number,
  ratePerHour: number,
  pay: number,
  employmentType: number,
  hasParking: boolean
};

export enum EmployeeTypeSwitch {
  'Full Time' = 0,
  'Half Time' = 1,
}
