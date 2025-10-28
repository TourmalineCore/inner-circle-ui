import { makeAutoObservable } from 'mobx'
import { getFiltering, getSearch, getSorted } from '../utils/utils'
import { Employee } from '../../../types/employee'

export class EmployeesState {
  private _allEmployees: Employee[] = []

  private _searchTerm = ``

  private _filterTerm = `current`

  private _sortTerm = `default`

  private _isLoading = false

  constructor() {
    makeAutoObservable(this)
  }

  get allEmployees() {
    return this._allEmployees
      .slice()
      .sort((firstEmployee: Employee, secondEmployee: Employee) => getSorted(firstEmployee, secondEmployee, this._sortTerm))
      .filter((employee) => getFiltering(employee, this._filterTerm))
      .filter((employee) => getSearch(employee.fullName, this._searchTerm))
  }

  get sortTerm() {
    return this._sortTerm
  }

  get filterTerm() {
    return this._filterTerm
  }

  get isBlankEmployees() {
    return this._allEmployees.some((employee) => employee.isBlankEmployee)
  }

  get isLoading() {
    return this._isLoading
  }

  updateSearchTerm(newSearchTerm: string) {
    this._searchTerm = newSearchTerm
  }

  updateFilterTerm(newFilterTerm: string) {
    this._filterTerm = newFilterTerm
  }

  updateSortTerm(newSortTerm: string) {
    this._sortTerm = newSortTerm
  }

  initialize({
    employees,
  }: {
    employees: Employee[],
  }) {
    this._allEmployees = employees
  }

  setIsLoading() {
    this._isLoading = true
  }

  resetIsLoading() {
    this._isLoading = false
  }
}
