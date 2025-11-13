import { MemoryRouter } from "react-router-dom"
import { EmployeeProfile } from "../../types/employee"
import { Specialization, SPECIALIZATION_LABELS } from "../../common/constants/specializations"
import { EmployeeProfileStateContext } from "./state/EmployeeProfileStateContext"
import { EmployeeProfileState } from "./state/EmployeeProfileState"
import { EmployeeProfileContainer } from "./EmployeeProfileContainer"

export const EMPLOYEE_PROFILE: Omit<EmployeeProfile, 'id' | 'fullName' | 'corporateEmail' | 'birthDate' > = {
  specializations: [
    Specialization.FRONTEND,
  ],
  workerTime: `Sometimes`,
  personalEmail: `personalTest@test.ru`,
  phone: `9999999999`,
  gitHub: `@test`,
  gitLab: `@test`,
}
      
describe(`EmployeeProfileContainer`, () => {
  beforeEach(() => {
    cy.intercept(
      `GET`,
      `**/get-profile`,
      (req) => {
        req.alias = `getEmployeeProfile`
        req.reply({
          statusCode: 200,
          body: {
            id: 1,
            fullName: `Test test test`,
            corporateEmail: `test@tourmalinecore.com`,
            specializations: [],
            birthDate: `2000-09-20`,
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
      `**/update-profile`,
      (req) => {
        req.alias = `updateEmployeeProfile`,
        req.reply({
          statusCode: 200,
        })
      },
    ) 
  })

  describe(`Employee Profile`, EmployeeProfileTests)
})

function EmployeeProfileTests() {
  it(`
  GIVEN filled profile
  WHEN user clicks "Save Changes"
  SHOULD send correct payload to API
  `, () => {
    mountComponent()

    cy.wait(`@getEmployeeProfile`)

    cy
      .getByData(`specializations-multiple-select`)
      .click()

    cy
      .contains(SPECIALIZATION_LABELS[EMPLOYEE_PROFILE.specializations[0]])
      .click()

    cy
      .getByData(`specializations-multiple-select`)
      .click()

    cy
      .getByData(`worker-time-input`)
      .type(EMPLOYEE_PROFILE.workerTime!)

    cy
      .getByData(`phone-input`)
      .type(EMPLOYEE_PROFILE.phone!)

    cy
      .getByData(`personal-email-input`)
      .type(EMPLOYEE_PROFILE.personalEmail!)
      
    cy
      .getByData(`github-input`)
      .type(EMPLOYEE_PROFILE.gitHub!)

    cy
      .getByData(`gitlab-input`)
      .type(EMPLOYEE_PROFILE.gitLab!)

    cy
      .getByData(`save-button`)
      .click()

    cy
      .wait(`@updateEmployeeProfile`)
      .its(`request.body`)
      .should(`deep.equal`, {
        ...EMPLOYEE_PROFILE,
        phone: `+7${EMPLOYEE_PROFILE.phone}`,
      })
  })
}

function mountComponent() {
  const employeeProfileState = new EmployeeProfileState()

  cy
    .mount(
      <MemoryRouter>
        <EmployeeProfileStateContext.Provider value={employeeProfileState}>
          <EmployeeProfileContainer />
        </EmployeeProfileStateContext.Provider>,
      </MemoryRouter>,
    )
}