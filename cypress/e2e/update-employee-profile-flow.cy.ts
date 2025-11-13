import { EmployeeProfilePage } from "./pages/employee-profile-page"

describe(`Update Employee Profile Flow `, () => {
  beforeEach(`Authorize and set default employee data`, () => {
    cy.authByApi()
    
    cy.setDefaultEmployeeProfile()
  })

  afterEach(`Set default employee profile`, () => {
    cy.setDefaultEmployeeProfile()
  })

  it(`
    GIVEN employee
    WHEN update the employee's profile
    AND save the changes
    THEN the employee's profile should be updated
  `, () => {    
    EmployeeProfilePage.visit()

    EmployeeProfilePage.updateEmployeeProfile()
  })
})
