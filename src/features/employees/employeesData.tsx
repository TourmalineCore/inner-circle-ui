export type EmployeeProps = {
  id?: number;
  name: string;
  surname: string;
  middleName: string;
  workEmail: string;
  personalEmail: string;
  phone: string | null;
  github: string | null;
  gitlab: string | null;
  rateHour: number;
  pay: number;
  employmentType: string;
  parking: number;
  netSalary: number | null
};

export const dataEmployeees: EmployeeProps[] = [
  {
    id: 1,
    name: 'Anton',
    surname: 'Антонов',
    middleName: 'Антонович',
    workEmail: 'anton@tourmaline.com',
    personalEmail: 'anton@mail.com',
    phone: null,
    github: null,
    gitlab: null,
    rateHour: 400,
    pay: 20000,
    employmentType: 'Full Time',
    parking: 1800,
    netSalary: 20010,
  },
  {
    id: 2,
    name: 'Павел',
    surname: 'Павлов',
    middleName: 'Павлович',
    workEmail: 'pavel@tourmaline.com',
    personalEmail: 'pavel@mail.com',
    phone: '+79126781234',
    github: null,
    gitlab: null,
    rateHour: 400,
    pay: 20000,
    employmentType: 'Full Time',
    parking: 1800,
    netSalary: 20010,
  },
];

// eslint-disable-next-line @typescript-eslint/naming-convention
export enum updatePropse {
  add, update,
}

export default function setDataEmployeees(id: number | null, emp: EmployeeProps | undefined, tpprops: updatePropse) {
  if (tpprops === updatePropse.add) {
    if (emp) {
      dataEmployeees.push(emp);
    }
  } else if (tpprops === updatePropse.update) {
    if (emp && id) {
      dataEmployeees[id] = emp;
    }
  }
}
