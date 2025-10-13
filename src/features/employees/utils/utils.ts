import { Employee } from '../types'

// ToDo ask backend to change contract
export enum EmploymentType {
  'Half Time' = 0.5,
  'Full Time' = 1,
}

export function getEmploymentType(employmentType: EmploymentType | null) {
  if (employmentType === null) {
    return employmentType
  }

  switch (employmentType) {
    case 0.5:
      return EmploymentType[0.5]
    case 1:
      return EmploymentType[1]
    default: return EmploymentType[1]
  }
}

export function getSorted(firstEmployee: Employee, secondEmployee: Employee, sortTerm: string) {
  if (sortTerm === `desc`) {
    return firstEmployee.fullName.toLowerCase() < secondEmployee.fullName.toLowerCase()
      ? 1
      : -1
  } if (sortTerm === `asc`) {
    return firstEmployee.fullName.toLowerCase() > secondEmployee.fullName.toLowerCase()
      ? 1
      : -1
  }

  return 1
}

export function getFiltering(employee: Employee, filterTerm: string) {
  if (filterTerm === `current`) {
    return employee.isCurrentEmployee
  } if (filterTerm === `fired`) {
    return !employee.isCurrentEmployee
  } if (filterTerm === `blank`) {
    return employee.isBlankEmployee
  }

  return employee
}

export function getSearch(searchElement: string, searchTerm: string) {
  return searchElement
    .toLowerCase()
    .includes(searchTerm.
      toLowerCase()
      .trim())
}
