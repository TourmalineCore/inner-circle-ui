import { Employee } from "../../../types/employee"
import { EmployeesState } from "./EmployeesState"

describe(`EmployeesState`, () => {
  describe(`Initialization`, initializationTests)
  describe(`Employees Data`, employeeEditDataTests)
  describe(`SortTerm`, sortTermTest)
  describe(`FilterTerm`, filterTermTest)
  describe(`SearchTerm`, searchTermTest)
  describe(`Is Loading`, isLoadingTest)
})

const EMPLOYEES_FOR_INITIALIZATION: Employee[] = [
  {
    employeeId: 1,
    fullName: `Ceo Ceo Ceo`,
    corporateEmail: `ceo@tourmalinecore.com`,
    personalEmail: `ceo@gmail.com`,
    specializations: [],
    birthDate: ``,
    workerTime: ``,
    phone: `+70066636367`,
    gitHub: `ceo.github`,
    gitLab: `ceo.gitlab`,
    isBlankEmployee: true,
    isCurrentEmployee: true,
  },
]

function initializationTests() {
  const employeesState = new EmployeesState()
  
  it(`  
  GIVEN a EmployeesState
  WHEN initialize
  SHOULD have default values
  `, () => {
    expect(employeesState.allEmployees)
      .to
      .deep
      .eq([])
  })
}

function employeeEditDataTests() {
  let employeesState: EmployeesState

  beforeEach(() => {
    employeesState = new EmployeesState()

    employeesState.initialize({
      employees: EMPLOYEES_FOR_INITIALIZATION,
    })
  })

  it(`
  GIVEN a EmployeeState
  WHEN set employees data
  SHOULD display new values in the allEmployees object
  `, () => {
    expect(employeesState.allEmployees)
      .to
      .deep
      .eq(EMPLOYEES_FOR_INITIALIZATION)
  })
}

function sortTermTest() {
  const employeesState = new EmployeesState()

  it(`
  GIVEN initial sortTerm = 'asc'
  WHEN updateSortTerm({
    newSortTerm: 'desc',
  })
  SHOULD change sortTerm to 'desc'
  `, () => {
    expect(employeesState.sortTerm)
      .to
      .be
      .eq(`asc`)

    employeesState.updateSortTerm({
      newSortTerm: `desc`,
    })

    expect(employeesState.sortTerm)
      .to
      .be
      .eq(`desc`)
  })
}

function filterTermTest() {
  const employeesState = new EmployeesState()

  it(`
  GIVEN initial filterTerm = 'current'
  WHEN updateFilterTerm({
    newFilterTerm: 'all',
  })
  SHOULD change filterTerm to 'all'
  `, () => {
    expect(employeesState.filterTerm)
      .to
      .be
      .eq(`current`)

    employeesState.updateFilterTerm({
      newFilterTerm: `all`,
    })

    expect(employeesState.filterTerm)
      .to
      .be
      .eq(`all`)
  })
}

function searchTermTest() {
  let employeesState: EmployeesState

  beforeEach(() => {
    employeesState = new EmployeesState()

    employeesState.initialize({
      employees: EMPLOYEES_FOR_INITIALIZATION,
    })
  })

  it(`
  GIVEN initial searchTerm = ''
  WHEN use updateSearchTerm() with some value
  THEN allEmployees should return values depending on the searchTerm value
  `, () => {
    expect(employeesState.allEmployees)
      .to
      .deep
      .eq(EMPLOYEES_FOR_INITIALIZATION)

    employeesState.updateSearchTerm({
      newSearchTerm: `test`,
    })

    expect(employeesState.allEmployees)
      .to
      .deep
      .eq([])

    employeesState.updateSearchTerm({
      newSearchTerm: `Ceo`,
    })

    expect(employeesState.allEmployees)
      .to
      .deep
      .eq(EMPLOYEES_FOR_INITIALIZATION)
  })
}

function isLoadingTest() {
  const employeesState = new EmployeesState()

  it(`
  GIVEN initial isLoading = false
  WHEN setIsLoading()
  SHOULD change value to true
  WHEN resetIsLoading()
  SHOULD change value to false
  `, () => {
    expect(employeesState.isLoading)
      .to
      .be
      .false

    employeesState.setIsLoading()
    expect(employeesState.isLoading)
      .to
      .be
      .true

    employeesState.resetIsLoading()
    expect(employeesState.isLoading)
      .to
      .be
      .false
  })
}