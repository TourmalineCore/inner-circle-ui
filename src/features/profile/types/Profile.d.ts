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
  'personalEmail': string,
  'phone': string | null,
  'gitHub': string | null,
  'gitLab': string | null
};
