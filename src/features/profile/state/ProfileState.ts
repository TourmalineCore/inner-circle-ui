import { makeAutoObservable } from 'mobx';
import { Employee } from '../types/Profile';

export class ProfileState {
  private _employee: Employee = {
    id: 0,
    fullName: '',
    corporateEmail: '',
    personalEmail: '',
    phone: '',
    gitHub: '',
    gitLab: '',
    fullSalary: 0,
    districtCoefficient: 0,
    incomeTax: 0,
    netSalary: 0,
    isSalaryInfoFilled: false,
    isEmployedOfficially: false,
  };

  private _initEmployee: Employee = {
    ...this._employee,
  };

  private _isLoading: boolean = false;

  private _triedToSubmit: boolean = false;

  private _isEdit: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  initialize({
    employee,
  }: {
    employee: Employee
  }) {
    this._employee = employee;
    this._initEmployee = { ...employee };
  }

  get employeeInfo() {
    return this._employee;
  }

  get initEmployee() {
    return this._initEmployee;
  }

  get isLoading() {
    return this._isLoading;
  }

  get triedToSubmit() {
    return this._triedToSubmit;
  }

  get isEdit() {
    return this._isEdit;
  }

  setIsLoading(value: boolean) {
    this._isLoading = value;
  }

  setTriedToSubmit(value: boolean) {
    this._triedToSubmit = value;
  }

  setIsEdit(value: boolean) {
    this._isEdit = value;
    if (!value) {
      this._employee = { ...this._initEmployee };
    }
  }

  setEmployee(employee: Employee) {
    this._employee = employee;
  }
}
