import { makeAutoObservable } from "mobx"
import { EditedEmployee } from "../../../types/employee"

export const EMPTY_EMPLOYEE: EditedEmployee = {
  fullName: ``,
  corporateEmail: ``,
  personalEmail: null,
  phone: null,
  gitHub: null,
  gitLab: null,
  ratePerHour: 0,
  fullSalary: null,
  employmentType: null,
  parking: 0,
  hireDate: null,
  dismissalDate: new Date(),
  isEmployedOfficially: true,
  isCurrentEmployee: true,
  personnelNumber: ``,
}

export class EmployeeEditState {
  private _employee: EditedEmployee = {
    ...EMPTY_EMPLOYEE,
  }

  constructor() {
    makeAutoObservable(this)
  }

  private _isTriedToSubmit = false

  get employee() {
    return this._employee
  }

  get isTriedToSubmit() {
    return this._isTriedToSubmit
  }

  initialize({
    loadedEmployee,
  }: {
    loadedEmployee: EditedEmployee,
  }) {
    this._employee = {
      ...loadedEmployee,
      phone: loadedEmployee.phone
        ? loadedEmployee.phone
          .split(``)
          .slice(2)
          .join(``)
        : null,
      hireDate: loadedEmployee.hireDate
        ? new Date(loadedEmployee.hireDate)
        : new Date(),
      dismissalDate: loadedEmployee.dismissalDate
        ? new Date(loadedEmployee.dismissalDate)
        : new Date(),
      personnelNumber: loadedEmployee.personnelNumber
        ? loadedEmployee.personnelNumber.replace(`/`, ``)
        : loadedEmployee.personnelNumber,
    }
  }

  setEmployee({
    employee,
  }: {
    employee: EditedEmployee,
  }) {
    this._employee = employee
  }

  setIsTriedToSubmit() {
    this._isTriedToSubmit = true
  }

  resetIsTriedToSubmit() {
    this._isTriedToSubmit = false
  }
}
