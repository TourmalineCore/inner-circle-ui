import { EmployeeProfileState, EMPTY_EMPLOYEE_PROFILE } from "./EmployeeProfileState"

describe(`EmployeeProfileState`, () => {
  describe(`Initialization`, initializationTests)
  describe(`Employee Profile Data`, employeeProfileDataTests)
  describe(`Is Tried To Submit`, isTriedToSubmitTest)
  describe(`Is Loading`, isLoadingTest)
  describe(`Is Edit`, isEditTest)
})

function initializationTests() {
  const employeeProfileState = new EmployeeProfileState()
  
  it(`
  GIVEN a EmployeeProfileState
  WHEN initialize
  SHOULD have default values
  `, () => {
    expect(employeeProfileState.employeeProfile)
      .to
      .deep
      .eq(EMPTY_EMPLOYEE_PROFILE)
  })
}

function employeeProfileDataTests() {
  let employeeProfileState: EmployeeProfileState

  const employeeProfileForInitialization = {
    id: 0,
    fullName: `Ceo Ceo Ceo`,
    corporateEmail: `ceo@tourmalinecore.com`,
    personalEmail: `ceo@gmail.com`,
    phone: `70066636367`,
    gitHub: `ceo.github`,
    gitLab: `ceo.gitlab`,
    fullSalary: 0,
    districtCoefficient: 0,
    incomeTax: 0,
    netSalary: 0,
    isSalaryInfoFilled: false,
    isEmployedOfficially: false,
  }
  
  beforeEach(() => {
    employeeProfileState = new EmployeeProfileState()

    employeeProfileState.initialize({
      loadedEmployeeProfile: employeeProfileForInitialization,
    })
  })

  it(`
  GIVEN the EmployeeProfileState
  WHEN set employee profile data
  SHOULD display new values in the employeeProfile object
  `, () => {
    expect(employeeProfileState.employeeProfile)
      .to
      .deep
      .eq(employeeProfileForInitialization)
  })

  it(`
  GIVEN the EmployeeProfileState
  WHEN set employee profile data
  SHOULD display new values in the initEmployeeProfile object
  `, () => {
    expect(employeeProfileState.initEmployeeProfile)
      .to
      .deep
      .eq(employeeProfileForInitialization)
  })

  it(`
  GIVEN the EmployeeProfileState
  WHEN setEmployeeProfile
  SHOULD set employee profile
  `, () => {
    employeeProfileState.setEmployeeProfile({
      employeeProfile: {
        ...employeeProfileForInitialization,
        fullName: `Test Test Test`,
      },
    })

    expect(employeeProfileState.employeeProfile.fullName)
      .to
      .eq(`Test Test Test`)
  })
}

function isTriedToSubmitTest() {
  const employeeProfileState = new EmployeeProfileState()

  it(`
  GIVEN initial isTriedToSubmit = false
  WHEN setIsTriedToSubmit()
  SHOULD change value to true
  WHEN resetIsTriedToSubmit()
  SHOULD change value to false
  `, () => {
    expect(employeeProfileState.isTriedToSubmit)
      .to
      .be
      .false

    employeeProfileState.setIsTriedToSubmit()
    expect(employeeProfileState.isTriedToSubmit)
      .to
      .be
      .true

    employeeProfileState.resetIsTriedToSubmit()
    expect(employeeProfileState.isTriedToSubmit)
      .to
      .be
      .false
  })
}

function isLoadingTest() {
  const employeeProfileState = new EmployeeProfileState()

  it(`
  GIVEN initial isLoading = false
  WHEN setIsLoading()
  SHOULD change value to true
  WHEN resetIsLoading()
  SHOULD change value to false
  `, () => {
    expect(employeeProfileState.isLoading)
      .to
      .be
      .false

    employeeProfileState.setIsLoading()
    expect(employeeProfileState.isLoading)
      .to
      .be
      .true

    employeeProfileState.resetIsLoading()
    expect(employeeProfileState.isLoading)
      .to
      .be
      .false
  })
}

function isEditTest() {
  const employeeProfileState = new EmployeeProfileState()

  it(`
  GIVEN initial isEdit = false
  WHEN setIsEdit()
  SHOULD change value to true
  WHEN resetIsEdit()
  SHOULD change value to false
  `, () => {
    expect(employeeProfileState.isEdit)
      .to
      .be
      .false

    employeeProfileState.setIsEdit()
    expect(employeeProfileState.isEdit)
      .to
      .be
      .true

    employeeProfileState.resetIsEdit()
    expect(employeeProfileState.isEdit)
      .to
      .be
      .false
  })
}