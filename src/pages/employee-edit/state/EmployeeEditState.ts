import { makeAutoObservable } from "mobx"
import { EditedEmployee } from "../../../types/employee"

export const EMPTY_EMPLOYEE: EditedEmployee = {
  fullName: ``,
  corporateEmail: ``,
  specialization: [],
  birthDate: null,
  workedTime: null,
  personalEmail: null,
  phone: null,
  gitHub: null,
  gitLab: null,
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
    }
  }

  setEmployee({
    employee,
  }: {
    employee: Partial<EditedEmployee>,
  }) {
    this._employee = {
      ...this._employee,
      ...employee, 
    }
  }

  setIsTriedToSubmit() {
    this._isTriedToSubmit = true
  }

  resetIsTriedToSubmit() {
    this._isTriedToSubmit = false
  }
}
