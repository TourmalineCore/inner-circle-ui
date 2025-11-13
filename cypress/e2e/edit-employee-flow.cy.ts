import { jwtDecode } from "jwt-decode"
import { EditEmployeePage } from "./pages/edit-employee-page"

describe(`Edit Employee Flow `, () => {
  beforeEach(`Authorize and set default employee data`, () => {
    cy.authByApi()
    
    cy.setDefaultEmployeeData()
  })

  afterEach(`Set default employee data`, () => {
    cy.setDefaultEmployeeData()
  })

  it(`
  GIVEN employee
  WHEN editing the employee's data
  AND save the changes
  THEN the employee's data should be updated
  `, () => {
    const token = Cypress.env(`accessToken`)
    const employeeId = Number(jwtDecode<{employeeId: string,}>(token).employeeId)
    
    EditEmployeePage.visit({
      employeeId,
    })

    EditEmployeePage.editEmployee()
  })
})
