import { makeAutoObservable } from "mobx"
import { EditedEmployee } from "../../../types/employee"
import isEqual from "lodash.isequal"

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

  get isBirthDateValid() {
    const date = this._employee.birthDate
     
    // validates that the date format is 99/99/9999
    // and that the day is no more than the 31st, and the month is the 12th
    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/

    if (!dateRegex.test(date!)) return false
  
    return true
  }

  get isPhoneValid() {
    // more than 9 numbers without counting +7
    return this._employee.phone !== null && this._employee.phone!.slice(2).length > 9
  }

  get isSpecializationValid() {
    return this._employee.specialization?.length > 0
  }

  get isValid() {
    return (
      this.isBirthDateValid &&
      this.isPhoneValid &&
      this.isSpecializationValid
    )
  }

  get errors() {
    return {
      isBirthDateError: !this.isBirthDateValid && this._isTriedToSubmit,
      isSpecializationError: !this.isSpecializationValid && this._isTriedToSubmit,
      isPhoneError: !this.isPhoneValid && this._isTriedToSubmit,
    }
  }

  initialize({
    loadedEmployee,
  }: {
    loadedEmployee: EditedEmployee,
  }) {
    this._employee = loadedEmployee
  }

  setEmployee({
    employee,
  }: {
    employee: Partial<Omit<EditedEmployee, 'fullName' | 'phone' | 'corporateEmail'>>,
  }) {
    this._employee = {
      ...this._employee,
      ...employee, 
    }
  }

  setPhone({
    phone,
  }: {
    phone: string,
  }) {
    this._employee.phone = phone.replace(/[^\d+]/g, ``)
  }

  isSomethingFilledWithinTheForm() { 
    return !isEqual(this._employee, EMPTY_EMPLOYEE)
  }

  setIsTriedToSubmit() {
    this._isTriedToSubmit = true
  }

  resetIsTriedToSubmit() {
    this._isTriedToSubmit = false
  }
}
