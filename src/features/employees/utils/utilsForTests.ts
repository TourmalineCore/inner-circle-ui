import { Employee } from '../types';

export function getEmployee({ ...props }: Partial<Employee>) {
  return {
    employeeId: 1,
    fullName: 'name',
    corporateEmail: 'email',
    personalEmail: 'personal email',
    phone: '79111111111',
    gitHub: 'github',
    gitLab: 'gitlab',
    netSalary: 100,
    ratePerHour: 101,
    fullSalary: 102,
    employmentType: 0.5,
    parking: 103,
    personnelNumber: '11/23',
    hireDate: '11.11.23',
    isCurrentEmployee: true,
    isBlankEmployee: false,
    ...props,
  };
}
