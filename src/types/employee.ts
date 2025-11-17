import { Specialization } from "../common/constants/specializations"

export type Employee = {
  employeeId: number,
  fullName: string,
  corporateEmail: string,
  specializations: Specialization[],
  birthDate: string | null,
  workerTime: string | null,
  phone: string | null,
  isCurrentEmployee: boolean,
  isBlankEmployee: boolean,
  personalEmail: string | null,
  gitHub: string | null,
  gitLab: string | null,
};

export type EditedEmployee = Omit<Employee, 'isCurrentEmployee' | 'isBlankEmployee'>;

export type EmployeeProfile = Omit<Employee, 'employeeId' | 'isCurrentEmployee' | 'isBlankEmployee'> & {
  id: number,
};
