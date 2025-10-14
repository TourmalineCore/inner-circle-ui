import { makeAutoObservable } from 'mobx'
import { EmployeeProfile } from '../types'

export const EMPTY_EMPLOYEE_PROFILE: EmployeeProfile = {
  id: 0,
  fullName: ``,
  corporateEmail: ``,
  personalEmail: ``,
  phone: ``,
  gitHub: ``,
  gitLab: ``,
  fullSalary: 0,
  districtCoefficient: 0,
  incomeTax: 0,
  netSalary: 0,
  isSalaryInfoFilled: false,
  isEmployedOfficially: false,
}

export class EmployeeProfileState {
  private _employeeProfile: EmployeeProfile = {
    ...EMPTY_EMPLOYEE_PROFILE,
  }

  private _initEmployeeProfile: EmployeeProfile | null = null

  private _isLoading = false

  private _isTriedToSubmit = false

  private _isEdit = false

  constructor() {
    makeAutoObservable(this)
  }

  get employeeProfile() {
    return this._employeeProfile
  }

  get isLoading() {
    return this._isLoading
  }

  get isTriedToSubmit() {
    return this._isTriedToSubmit
  }

  get isEdit() {
    return this._isEdit
  }

  get initEmployeeProfile() {
    return this._initEmployeeProfile
  }

  initialize({
    loadedEmployeeProfile,
  }: {
    loadedEmployeeProfile: EmployeeProfile,
  }) {
    this._employeeProfile = loadedEmployeeProfile

    this.setInitEmployeeProfile({
      loadedEmployeeProfile,
    })
  }

  setEmployeeProfile({
    employeeProfile,
  }: {
    employeeProfile: EmployeeProfile,
  }) {
    this._employeeProfile = employeeProfile
  }

  setInitEmployeeProfile ({
    loadedEmployeeProfile,
  }: {
    loadedEmployeeProfile: EmployeeProfile,
  }) {
    this._initEmployeeProfile = loadedEmployeeProfile
  }

  setIsLoading() {
    this._isLoading = true
  }

  resetIsLoading() {
    this._isLoading = false
  }

  setIsTriedToSubmit() {
    this._isTriedToSubmit = true
  }

  resetIsTriedToSubmit() {
    this._isTriedToSubmit = false
  }

  setIsEdit() {
    this._isEdit = true
  }

  resetIsEdit() {
    this._isEdit = false
  }
}
