export type EmployeeProfile = {
  id: number,
  fullName: string,
  corporateEmail: string,
  personalEmail: string | null,
  phone: string,
  gitHub: string | null,
  gitLab: string | null,
  fullSalary: number,
  districtCoefficient: number,
  incomeTax: number,
  netSalary: number,
  isSalaryInfoFilled: boolean,
  isEmployedOfficially: boolean,
};

export type EmployeeUpdateType = {
  employeeId: number,
  personalEmail: string,
  phone: string | null,
  gitHub: string | null,
  gitLab: string | null,
};
