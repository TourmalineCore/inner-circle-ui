import { Employee } from '../types/Profile';

export function getProfileInfo({ ...props }: Partial<Employee>) {
  return {
    id: 1,
    fullName: 'name',
    corporateEmail: 'email',
    personalEmail: 'personal email',
    phone: '+79000000000',
    gitHub: 'gitHub',
    gitLab: 'gitLab',
    fullSalary: 100,
    districtCoefficient: 11,
    incomeTax: 12,
    netSalary: 13,
    isSalaryInfoFilled: false,
    isEmployedOfficially: false,
    ...props,
  };
}
