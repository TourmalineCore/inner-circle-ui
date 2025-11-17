import { MemoryRouter } from "react-router-dom"
import { Employee } from "../../types/employee"
import { Specialization } from "../../common/constants/specializations"
import { EmployeesContainer } from "./EmployeesContainer"
import { EmployeesStateContext } from "./state/EmployeesStateContext"
import { EmployeesState } from "./state/EmployeesState"
import { authService } from "../../common/authService"
import { MOCK_TOKEN } from "../../common/constants/mockToken"

const EMPLOYEES: Employee[] = [
  {
    employeeId: 1,
    fullName: `Ceo Ceo Ceo`,
    corporateEmail: `ceo@tourmalinecore.com`,
    personalEmail: `ceo@gmail.com`,
    specializations: [
      Specialization.BACKEND,
    ],
    birthDate: `2005-09-12`,
    workerTime: `Sometimes`,
    phone: `+70066636367`,
    gitHub: `ceo.github`,
    gitLab: `ceo.gitlab`,
    isBlankEmployee: true,
    isCurrentEmployee: true,
  },
]
      
describe(`EmployeesContainer`, () => {
  beforeEach(() => {
    cy.intercept(
      `GET`,
      `**/all`,
      (req) => {
        req.alias = `getAllEmployees`
        req.reply({
          statusCode: 200,
          body: EMPLOYEES,
        })
      },
    )
  })

  describe(`Employees`, EmployeeTests)
})

function EmployeeTests() {
  it(`
  GIVEN employees Page
  WHEN user goes to the this page
  SHOULD send correct payload to API
  `, () => {
    mountComponent()

    cy.wait(`@getAllEmployees`)

    cy
      .contains(`Ceo Ceo Ceo`)

    cy
      .contains(`Backend`) 
      
    cy
      .contains(`ceo@tourmalinecore.com`)
      
    cy
      .contains(`2005-09-12`) 
      
    cy
      .contains(`Sometimes`)  

    cy
      .contains(`+7 (006) 663 63 67`) 
      
    cy
      .contains(`ceo@gmail.com`) 
      
    cy
      .contains(`ceo.github`)
      
    cy
      .contains(`ceo.gitlab`)
  })
}

function mountComponent() {
  const employeesState = new EmployeesState()

  const mockAuthContext = [
    MOCK_TOKEN,
  ]

  cy
    .mount(
      <MemoryRouter initialEntries={[
        `/employees`,
      ]}>
        <authService.AuthContext.Provider value={mockAuthContext}>
          <EmployeesStateContext.Provider value={employeesState}>
            <EmployeesContainer />
          </EmployeesStateContext.Provider>,
        </authService.AuthContext.Provider>
      </MemoryRouter>,
    )
}