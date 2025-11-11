import { EditedEmployee } from "../../../types/employee"
import { EmployeeEditState, EMPTY_EMPLOYEE } from "./EmployeeEditState"

describe(`EmployeeEditState`, () => {
  describe(`Initialization`, initializationTests)
  describe(`Employee Edit Data`, employeeEditDataTests)
  describe(`Is Tried To Submit`, isTriedToSubmitTest)
  describe(`Validation`, validationTests)
  describe(`Something filled with in the form`, somethingFilledWithinTheFormTests)
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
    workerTime: ``,
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

    expect(employeeEditState.employee.workerTime)
      .to
      .eq(employeeForInitialization.workerTime)

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
        workerTime: `Sometimes`,
      },
    })

    expect(employeeEditState.employee.workerTime)
      .to
      .eq(`Sometimes`)
  })
  
  it(`
  GIVEN the EmployeeEditState
  WHEN setPhone
  SHOULD set formatted phone number
  `, () => {
    employeeEditState.setPhone({
      phone: `+7 (231) 231-23-12`,
    })

    expect(employeeEditState.employee.phone)
      .to
      .eq(`+72312312312`)
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

function validationTests() {
  let employeeEditState: EmployeeEditState

  beforeEach(() => {
    employeeEditState = new EmployeeEditState()
  })
  
  it(`
  GIVEN an empty birth date
  WHEN isValid is accessed
  SHOULD return false and set birth date error to true
  `, () => {
    employeeEditState.setEmployee({
      employee: {
        specialization: [
          1,
        ],
      },
    })

    employeeEditState.setPhone({
      phone: `+79999999999`,
    })

    employeeEditState.setIsTriedToSubmit()

    expect(employeeEditState.isValid)
      .to
      .be
      .false

    expect(employeeEditState.isBirthDateValid)
      .to
      .be
      .false

    expect(employeeEditState.isPhoneValid)
      .to
      .be
      .true

    expect(employeeEditState.isSpecializationValid)
      .to
      .be
      .true

    expect(employeeEditState.errors)
      .to
      .be
      .deep
      .eq({
        isBirthDateError: true,
        isPhoneError: false,
        isSpecializationError: false,
      })
  })

  it(`
  GIVEN an empty phone
  WHEN isValid is accessed
  SHOULD return false and set phone error to true
  `, () => {
    employeeEditState.setEmployee({
      employee: {
        birthDate: `26/09/2000`,
        specialization: [
          1,
        ],
      },
    })

    employeeEditState.setIsTriedToSubmit()

    expect(employeeEditState.isValid)
      .to
      .be
      .false
      
    expect(employeeEditState.isPhoneValid)
      .to
      .be
      .false

    expect(employeeEditState.isBirthDateValid)
      .to
      .be
      .true
      
    expect(employeeEditState.isSpecializationValid)
      .to
      .be
      .true
      
    expect(employeeEditState.errors)
      .to
      .be
      .deep
      .eq({
        isBirthDateError: false,
        isPhoneError: true,
        isSpecializationError: false,
      })
  })

  it(`
  GIVEN an empty specialization
  WHEN isValid is accessed
  SHOULD return false and set specialization error to true
  `, () => {
    employeeEditState.setEmployee({
      employee: {
        birthDate: `26/09/2000`,
      },
    })
    
    employeeEditState.setPhone({
      phone: `+79999999999`,
    })

    employeeEditState.setIsTriedToSubmit()

    expect(employeeEditState.isValid)
      .to
      .be
      .false
            
    expect(employeeEditState.isSpecializationValid)
      .to
      .be
      .false
      
    expect(employeeEditState.isPhoneValid)
      .to
      .be
      .true

    expect(employeeEditState.isBirthDateValid)
      .to
      .be
      .true
      
    expect(employeeEditState.errors)
      .to
      .be
      .deep
      .eq({
        isBirthDateError: false,
        isPhoneError: false,
        isSpecializationError: true,
      })
  })

  it(`
  GIVEN valid birth date, phone, and specialization
  WHEN isValid is accessed
  SHOULD return true and all errors should be false
  `, () => {
    employeeEditState.setEmployee({
      employee: {
        birthDate: `26/09/2000`,
        specialization: [
          1,
        ],
      },
    })
    
    employeeEditState.setPhone({
      phone: `+79999999999`,
    })

    employeeEditState.setIsTriedToSubmit()

    expect(employeeEditState.isValid)
      .to
      .be
      .true
            
    expect(employeeEditState.isSpecializationValid)
      .to
      .be
      .true
      
    expect(employeeEditState.isPhoneValid)
      .to
      .be
      .true

    expect(employeeEditState.isBirthDateValid)
      .to
      .be
      .true
      
    expect(employeeEditState.errors)
      .to
      .be
      .deep
      .eq({
        isBirthDateError: false,
        isPhoneError: false,
        isSpecializationError: false,
      })
  })

  it(`
  GIVEN an inValid birth date
  WHEN get isBirthDateValid
  SHOULD return false
  `, () => {
    employeeEditState.setEmployee({
      employee: {
        birthDate: `26/09/200`,
      },
    })
    
    expect(employeeEditState.isBirthDateValid)
      .to
      .be
      .false
  })

  it(`
  GIVEN an inValid phone
  WHEN get isPhoneValid
  SHOULD return false
  `, () => {
    employeeEditState.setPhone({
      phone: `+799999`,
    })
    
    expect(employeeEditState.isPhoneValid)
      .to
      .be
      .false
  })
}

function somethingFilledWithinTheFormTests() {
  let employeeEditState: EmployeeEditState

  beforeEach(() => {
    employeeEditState = new EmployeeEditState()
  })
  
  it(`
  GIVEN a new instance
  WHEN no fields are modified
  SHOULD return false for isSomethingFilledWithinTheForm
  `, () => {
    expect(employeeEditState.isSomethingFilledWithinTheForm())
      .to
      .be
      .false
  })

  it(`
  GIVEN a new instance
  WHEN worked time was modified
  SHOULD return true for isSomethingFilledWithinTheForm
  `, () => {
    employeeEditState.setEmployee({
      employee: {
        workerTime: `Sometimes`,
      },
    })

    expect(employeeEditState.isSomethingFilledWithinTheForm())
      .to
      .be
      .true
  })
}