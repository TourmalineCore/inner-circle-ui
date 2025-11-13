import { Specialization } from "../common/constants/specializations"

type BaseEmployee = {
  fullName: string,
  corporateEmail: string,
  personalEmail: string | null,
  gitHub: string | null,
  gitLab: string | null,
}

export type EditedEmployee = BaseEmployee & {
  specializations: Specialization[],
  birthDate: string | null,
  workerTime: string | null,
  phone: string | null,
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
  specializations: Specialization[],
  birthDate: string,
  workerTime: string | null,
  phone: string | null,
};
