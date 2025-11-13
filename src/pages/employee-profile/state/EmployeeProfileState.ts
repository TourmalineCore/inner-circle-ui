import { makeAutoObservable } from "mobx"
import { EmployeeProfile } from "../../../types/employee"
import moment from "moment"

export const EMPTY_EMPLOYEE_PROFILE: EmployeeProfile = {
  id: 0,
  fullName: ``,
  corporateEmail: ``,
  specializations: [],
  birthDate: ``,
  workerTime: null,
  personalEmail: null,
  phone: null,
  gitHub: null,
  gitLab: null,
}

export class EmployeeProfileState {
  private _employeeProfile: EmployeeProfile = {
    ...EMPTY_EMPLOYEE_PROFILE,
  }

  constructor() {
    makeAutoObservable(this)
  }

  private _isTriedToSubmit = false

  get employeeProfile() {
    return this._employeeProfile
  }

  get isTriedToSubmit() {
    return this._isTriedToSubmit
  }

  get isPhoneValid() {
    // more than 9 numbers without counting +7
    return this._employeeProfile.phone !== null && this._employeeProfile.phone!.slice(2).length > 9
  }

  get isSpecializationsValid() {
    return this._employeeProfile.specializations.length > 0
  }

  get isValid() {
    return (
      this.isPhoneValid &&
      this.isSpecializationsValid
    )
  }

  get errors() {
    return {
      isSpecializationsError: !this.isSpecializationsValid && this._isTriedToSubmit,
      isPhoneError: !this.isPhoneValid && this._isTriedToSubmit,
    }
  }

  initialize({
    loadedEmployeeProfile,
  }: {
    loadedEmployeeProfile: EmployeeProfile,
  }) {
    this._employeeProfile = {
      ...loadedEmployeeProfile,
      birthDate: loadedEmployeeProfile.birthDate
        ? moment(loadedEmployeeProfile.birthDate)
          .format(`DD/MM/YYYY`)
        : ``,
    }
  }

  setEmployeeProfile({
    employee,
  }: {
    employee: Partial<Omit<EmployeeProfile, 'fullName' | 'phone' | 'corporateEmail' | 'birthDate'>>,
  }) {
    this._employeeProfile = {
      ...this._employeeProfile,
      ...employee, 
    }
  }

  setPhone({
    phone,
  }: {
    phone: string,
  }) {
    this._employeeProfile.phone = phone.replace(/[^\d+]/g, ``)
  }

  setIsTriedToSubmit() {
    this._isTriedToSubmit = true
  }

  resetIsTriedToSubmit() {
    this._isTriedToSubmit = false
  }
}
