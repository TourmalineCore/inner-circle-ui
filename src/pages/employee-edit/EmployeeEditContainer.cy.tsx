import { BrowserRouter } from "react-router-dom"
import { EditedEmployee } from "../../types/employee"
import { EmployeeEditContainer } from "./EmployeeEditContainer"
import { EmployeeEditState } from "./state/EmployeeEditState"
import { EmployeeEditStateContext } from "./state/EmployeeEditStateContext"

export const EMPLOYEE: EditedEmployee = {
  fullName: `Test test test`,
  corporateEmail: `test@tourmalinecore.com`,
  specialization: [
    `Frontend`,
  ],
  birthDate: `20/09/2005`,
  workedTime: `Sometimes`,
  personalEmail: `personalTest@test.ru`,
  phone: `9999999999`,
  gitHub: `@test`,
  gitLab: `@test`,
}
      
describe(`EmployeeEditContainer`, () => {
  beforeEach(() => {
    cy.intercept(
      `GET`,
      `**/employees/**`,
      (req) => {
        req.alias = `getEmployee`
        req.reply({
          statusCode: 200,
          body: {
            fullName: `Test test test`,
            corporateEmail: `test@tourmalinecore.com`,
            specialization: [],
            birthDate: null,
            workedTime: null,
            personalEmail: null,
            phone: null,
            gitHub: null,
            gitLab: null,
          },
        })
      },
    )

    cy.intercept(
      `PUT`,
      `**/employees/update`,
      (req) => {
        req.alias = `updateEmployee`,
        req.reply({
          statusCode: 200,
        })
      },
    ) 
  })

  describe(`Edit Employee`, EditEmployeeTests)
})

function EditEmployeeTests() {
  it(`
  GIVEN filled form
  WHEN user clicks "Save Changes"
  SHOULD send correct payload to API
  `, () => {
    mountComponent()

    cy.wait(`@getEmployee`)

    cy
      .getByData(`birth-date-input`)
      .type(EMPLOYEE.birthDate!)

    cy
      .getByData(`specialization-multiple-select`)
      .click()

    cy
      .contains(EMPLOYEE.specialization[0])
      .click()

    cy
      .getByData(`specialization-multiple-select`)
      .click()

    cy
      .getByData(`worked-time-input`)
      .type(EMPLOYEE.workedTime!)

    cy
      .getByData(`phone-input`)
      .type(EMPLOYEE.phone!)

    cy
      .getByData(`personal-email-input`)
      .type(EMPLOYEE.personalEmail!)
      
    cy
      .getByData(`github-input`)
      .type(EMPLOYEE.gitHub!)

    cy
      .getByData(`gitlab-input`)
      .type(EMPLOYEE.gitLab!)

    cy
      .getByData(`save-button`)
      .click()

    cy
      .wait(`@updateEmployee`)
      .its(`request.body`)
      .should(`deep.equal`, {
        ...EMPLOYEE,
        phone: `+7${EMPLOYEE.phone}`,
        birthDate: `2005-09-20`,
      })
  })
}

function mountComponent() {
  const employeeEditState = new EmployeeEditState()

  cy
    .mount(
      <BrowserRouter>
        <EmployeeEditStateContext.Provider value={employeeEditState}>
          <EmployeeEditContainer />
        </EmployeeEditStateContext.Provider>,
      </BrowserRouter>,
    )
}