import { Specialization } from "../../../common/constants/specializations"
import { EmployeeProfile } from "../../../types/employee"
import { EmployeeProfileState, EMPTY_EMPLOYEE_PROFILE } from "./EmployeeProfileState"

describe(`EmployeeProfileState`, () => {
  describe(`Initialization`, initializationTests)
  describe(`Employee Profile Data`, employeeProfileDataTests)
  describe(`Is Tried To Submit`, isTriedToSubmitTest)
  describe(`Validation`, validationTests)
  describe(`Is Saving`, isSavingTest)
})

const EMPLOYEE_PROFILE_FOR_INITIALIZATION: EmployeeProfile = {
  id: 1,
  fullName: `Ceo Ceo Ceo`,
  corporateEmail: `ceo@tourmalinecore.com`,
  personalEmail: `ceo@gmail.com`,
  specializations: [],
  birthDate: ``,
  workerTime: ``,
  phone: `+70066636367`,
  gitHub: `ceo.github`,
  gitLab: `ceo.gitlab`,
}

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

  beforeEach(() => {
    employeeProfileState = new EmployeeProfileState()

    employeeProfileState.initialize({
      loadedEmployeeProfile: EMPLOYEE_PROFILE_FOR_INITIALIZATION,
    })
  })

  it(`
  GIVEN the EmployeeProfileState
  WHEN set employee profile data
  SHOULD display new values in the employee profile object
  `, () => {
    expect(employeeProfileState.employeeProfile)
      .to
      .deep
      .eq(EMPLOYEE_PROFILE_FOR_INITIALIZATION)
  })

  it(`
  GIVEN the EmployeeProfileState
  WHEN setEmployeeProfile
  SHOULD set employee profile
  `, () => {
    employeeProfileState.setEmployeeProfile({
      employeeProfile: {
        ...EMPLOYEE_PROFILE_FOR_INITIALIZATION,
        workerTime: `Sometimes`,
      },
    })

    expect(employeeProfileState.employeeProfile.workerTime)
      .to
      .eq(`Sometimes`)
  })
  
  it(`
  GIVEN the EmployeeProfileState
  WHEN setPhone
  SHOULD set formatted phone number
  `, () => {
    employeeProfileState.setPhone({
      phone: `+7 (231) 231-23-12`,
    })

    expect(employeeProfileState.employeeProfile.phone)
      .to
      .eq(`+72312312312`)
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

function validationTests() {
  let employeeProfileState: EmployeeProfileState

  beforeEach(() => {
    employeeProfileState = new EmployeeProfileState()
  })

  it(`
  GIVEN an empty phone
  WHEN isValid is accessed
  SHOULD return false and set phone error to true
  `, () => {
    employeeProfileState.setEmployeeProfile({
      employeeProfile: {
        specializations: [
          Specialization.FRONTEND,
        ],
      },
    })

    employeeProfileState.setIsTriedToSubmit()

    expect(employeeProfileState.isValid)
      .to
      .be
      .false
      
    expect(employeeProfileState.isPhoneValid)
      .to
      .be
      .false
      
    expect(employeeProfileState.isSpecializationsValid)
      .to
      .be
      .true
      
    expect(employeeProfileState.errors)
      .to
      .be
      .deep
      .eq({
        isPhoneError: true,
        isSpecializationsError: false,
      })
  })

  it(`
  GIVEN an empty specializations
  WHEN isValid is accessed
  SHOULD return false and set specializations error to true
  `, () => {    
    employeeProfileState.setPhone({
      phone: `+79999999999`,
    })

    employeeProfileState.setIsTriedToSubmit()

    expect(employeeProfileState.isValid)
      .to
      .be
      .false
            
    expect(employeeProfileState.isSpecializationsValid)
      .to
      .be
      .false
      
    expect(employeeProfileState.isPhoneValid)
      .to
      .be
      .true
      
    expect(employeeProfileState.errors)
      .to
      .be
      .deep
      .eq({
        isPhoneError: false,
        isSpecializationsError: true,
      })
  })

  it(`
  GIVEN valid birth date, phone, and specializations
  WHEN isValid is accessed
  SHOULD return true and all errors should be false
  `, () => {
    employeeProfileState.setEmployeeProfile({
      employeeProfile: {
        specializations: [
          Specialization.FRONTEND,
        ],
      },
    })
    
    employeeProfileState.setPhone({
      phone: `+79999999999`,
    })

    employeeProfileState.setIsTriedToSubmit()

    expect(employeeProfileState.isValid)
      .to
      .be
      .true
            
    expect(employeeProfileState.isSpecializationsValid)
      .to
      .be
      .true
      
    expect(employeeProfileState.isPhoneValid)
      .to
      .be
      .true
      
    expect(employeeProfileState.errors)
      .to
      .be
      .deep
      .eq({
        isPhoneError: false,
        isSpecializationsError: false,
      })
  })

  it(`
  GIVEN an inValid phone
  WHEN get isPhoneValid
  SHOULD return false
  `, () => {
    employeeProfileState.setPhone({
      phone: `+799999`,
    })
    
    expect(employeeProfileState.isPhoneValid)
      .to
      .be
      .false
  })
}

function isSavingTest() {
  let employeeProfileState: EmployeeProfileState

  beforeEach(() => {
    employeeProfileState = new EmployeeProfileState()
  })
  
  it(`
  GIVEN initial isSaving = false
  WHEN setIsSaving and resetIsSaving are triggered
  SHOULD toggle isSaving to true and then back to false
  `, () => {
    expect(employeeProfileState.isSaving)
      .to
      .be
      .false

    employeeProfileState.setIsSaving()
    expect(employeeProfileState.isSaving)
      .to
      .be
      .true
    
    employeeProfileState.resetIsSaving()
    expect(employeeProfileState.isSaving)
      .to
      .be
      .false
  })
}