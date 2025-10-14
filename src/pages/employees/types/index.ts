export type ColleagueContactsType = {
  id: number,
  fullName: string,
  corporateEmail: string,
  personalEmail: string,
  phone: string | null,
  gitHub: string | null,
  gitLab: string | null,
};

export type ColleagueFinancesDtoType = {
  id: number,
  fullName: string,
  ratePerHour: number,
  pay: number,
  employmentType: number,
  netSalary: number,
  parking: number,
  employeeStatus: string,
  employed: string,
  selectedDate: null | Date,
};

export type ColleaguesType = {
  colleagueContacts : ColleagueContactsType[],
  colleagueFinancesDto: ColleagueFinancesDtoType[],
};

export type EmployeeType = {
  name: string,
  surname: string,
  middleName: string,
  corporateEmail: string,
  personalEmail: string,
  phone: string | null,
  gitHub: string | null,
  gitLab: string | null,
  ratePerHour: number,
  pay: number,
  employmentType: number,
  parkingCostPerMonth: number,
};

export enum EmployeeTypeSwitch {
  'Full Time' = 1,
  'Half Time' = 0.5,
}

export type EditedEmployee = {
  fullName: string,
  corporateEmail: string,
  personalEmail: string | null,
  phone: string | null,
  gitHub: string | null,
  gitLab: string | null,
  ratePerHour: number | null,
  fullSalary: number | null,
  employmentType: number | null,
  parking: number | null,
  hireDate: Date | null,
  dismissalDate?: Date | null,
  isEmployedOfficially: boolean,
  isCurrentEmployee?: boolean,
  personnelNumber: string | null,
};

export type Employee = {
  employeeId: number,
  fullName: string,
  corporateEmail: string,
  personalEmail: string | null,
  phone: string | null,
  gitHub: string | null,
  gitLab: string | null,
  netSalary: number | null,
  ratePerHour: number | null,
  fullSalary: number | null,
  employmentType: number | null,
  parking: number | null,
  personnelNumber: string | null,
  hireDate: string | null,
  isCurrentEmployee: boolean,
  isBlankEmployee: boolean,
};
