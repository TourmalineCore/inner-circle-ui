// ToDo ask backend to change contract
export enum EmploymentType {
  'Half Time' = 0.5,
  'Full Time' = 1,
}

export function getEmploymentType(employmentType: EmploymentType) {
  switch (employmentType) {
    case 0.5:
      return EmploymentType[0.5];
    case 1:
      return EmploymentType[1];
    default: return EmploymentType[1];
  }
}
