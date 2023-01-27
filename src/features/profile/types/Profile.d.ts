export type Employee = {
  id: number
  fullName: string;
  corporateEmail: string;
  personalEmail: string;
  phone: string | null;
  gitHub: string | null;
  gitLab: string | null;
};

export type EmployeeUpdateType = {
  employeeId: number,
  personalEmail: string,
  phone: string | null,
  gitHub: string | null,
  gitLab: string | null
};
