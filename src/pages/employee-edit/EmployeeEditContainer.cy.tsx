import { MemoryRouter } from "react-router-dom"
import { EditedEmployee } from "../../types/employee"
import { EmployeeEditContainer } from "./EmployeeEditContainer"
import { EmployeeEditState } from "./state/EmployeeEditState"
import { EmployeeEditStateContext } from "./state/EmployeeEditStateContext"
import { Specialization, SPECIALIZATION_LABELS } from "../../common/constants/specializations"

export const EMPLOYEE: EditedEmployee = {
  employeeId: 1,
  fullName: `Test test test`,
  corporateEmail: `test@tourmalinecore.com`,
  specializations: [
    Specialization.FRONTEND,
  ],
  birthDate: `2005-09-26`,
  workerTime: `Sometimes`,
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
            employeeId: 1,
            fullName: `Test test test`,
            corporateEmail: `test@tourmalinecore.com`,
            specializations: [],
            birthDate: null,
            workerTime: null,
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
      .getByData(`specializations-multiple-select`)
      .click()

    cy
      .contains(SPECIALIZATION_LABELS[EMPLOYEE.specializations[0]])
      .click()

    cy
      .getByData(`specializations-multiple-select`)
      .click()

    cy
      .getByData(`worker-time-input`)
      .type(EMPLOYEE.workerTime!)

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
      })
  })
}

function mountComponent() {
  const employeeEditState = new EmployeeEditState()

  cy
    .mount(
      <MemoryRouter>
        <EmployeeEditStateContext.Provider value={employeeEditState}>
          <EmployeeEditContainer />
        </EmployeeEditStateContext.Provider>,
      </MemoryRouter>,
    )
}