import { EditedEmployee } from "../../../types/employee"
import { EmployeeEditState, EMPTY_EMPLOYEE } from "./EmployeeEditState"

describe(`EmployeeEditState`, () => {
  describe(`Initialization`, initializationTests)
  describe(`Employee Edit Data`, employeeEditDataTests)
  describe(`Is Tried To Submit`, isTriedToSubmitTest)
})

function initializationTests() {
  const employeeEditState = new EmployeeEditState()
  
  it(`  
  GIVEN a EmployeeEditState
  WHEN initialize
  SHOULD have default values
  `, () => {
    expect(employeeEditState.employee)
      .to
      .deep
      .eq(EMPTY_EMPLOYEE)
  })
}

function employeeEditDataTests() {
  let employeeEditState: EmployeeEditState

  const employeeForInitialization: EditedEmployee = {
    fullName: `Ceo Ceo Ceo`,
    corporateEmail: `ceo@tourmalinecore.com`,
    personalEmail: `ceo@gmail.com`,
    specialization: [],
    birthDate: ``,
    workedTime: ``,
    phone: `70066636367`,
    gitHub: `ceo.github`,
    gitLab: `ceo.gitlab`,
  }
  
  beforeEach(() => {
    employeeEditState = new EmployeeEditState()

    employeeEditState.initialize({
      loadedEmployee: employeeForInitialization,
    })
  })

  it(`
  GIVEN the EmployeeEditState
  WHEN set employee data
  SHOULD display new values in the employee object
  `, () => {
    expect(employeeEditState.employee.fullName)
      .to
      .eq(employeeForInitialization.fullName)

    expect(employeeEditState.employee.corporateEmail)
      .to
      .eq(employeeForInitialization.corporateEmail)

    expect(employeeEditState.employee.personalEmail)
      .to
      .eq(employeeForInitialization.personalEmail)

    expect(employeeEditState.employee.gitHub)
      .to
      .eq(employeeForInitialization.gitHub)

    expect(employeeEditState.employee.gitLab)
      .to
      .eq(employeeForInitialization.gitLab)

    expect(employeeEditState.employee.birthDate)
      .to
      .eq(employeeForInitialization.birthDate)

    expect(employeeEditState.employee.workedTime)
      .to
      .eq(employeeForInitialization.workedTime)

    expect(employeeEditState.employee.specialization)
      .to
      .deep
      .eq(employeeForInitialization.specialization)
  })

  it(`
  GIVEN the EmployeeEditState
  WHEN setEmployee
  SHOULD set employee
  `, () => {
    employeeEditState.setEmployee({
      employee: {
        ...employeeForInitialization,
        fullName: `Test Test Test`,
      },
    })

    expect(employeeEditState.employee.fullName)
      .to
      .eq(`Test Test Test`)
  })
}

function isTriedToSubmitTest() {
  const employeeEditState = new EmployeeEditState()

  it(`
  GIVEN initial isTriedToSubmit = false
  WHEN setIsTriedToSubmit()
  SHOULD change value to true
  WHEN resetIsTriedToSubmit()
  SHOULD change value to false
  `, () => {
    expect(employeeEditState.isTriedToSubmit)
      .to
      .be
      .false

    employeeEditState.setIsTriedToSubmit()
    expect(employeeEditState.isTriedToSubmit)
      .to
      .be
      .true

    employeeEditState.resetIsTriedToSubmit()
    expect(employeeEditState.isTriedToSubmit)
      .to
      .be
      .false
  })
}