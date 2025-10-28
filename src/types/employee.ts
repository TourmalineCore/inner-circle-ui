type BaseEmployee = {
  fullName: string,
  corporateEmail: string,
  personalEmail: string | null,
  gitHub: string | null,
  gitLab: string | null,
}

export type EditedEmployee = BaseEmployee & {
  phone: string | null,
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

export type Employee = BaseEmployee & {
  employeeId: number,
  phone: string | null,
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

export type EmployeeProfile = BaseEmployee & {
  id: number,
  phone: string,
  fullSalary: number,
  districtCoefficient: number,
  incomeTax: number,
  netSalary: number,
  isSalaryInfoFilled: boolean,
  isEmployedOfficially: boolean,
};
