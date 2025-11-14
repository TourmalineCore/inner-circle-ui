import { Specialization } from "../common/constants/specializations"

type BaseEmployee = {
  fullName: string,
  corporateEmail: string,
  personalEmail: string | null,
  gitHub: string | null,
  gitLab: string | null,
}

export type EditedEmployee = BaseEmployee & {
  employeeId: number,
  specializations: Specialization[],
  birthDate: string | null,
  workerTime: string | null,
  phone: string | null,
};

export type Employee = EditedEmployee & {
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
