import { MemoryRouter } from 'react-router-dom'
import { EmployeeItem } from './EmployeeItem'
import { authService } from '../../../../../common/authService'
import { Employee } from '../../../../../types/employee'

const initialData = {
  employees: [
    {
      employeeId: 1,
      fullName: `Ceo Ceo Ceo`,
      corporateEmail: `ceo@tourmalinecore.com`,
      personalEmail: `ceo@gmail.com`,
      phone: `89999999999`,
      gitHub: `@ceo.github`,
      gitLab: `@ceo.gitlab`,
      isBlankEmployee: true,
      isCurrentEmployee: true,
      isEmployedOfficially: true,
      netSalary: null,
      ratePerHour: null,
      fullSalary: null,
      employmentType: null,
      parking: null,
      personnelNumber: null,
      hireDate: `2020-01-01T00:00:00Z`,
    },
  ],
}

describe(`EmployeeItem`, () => {
  it(`
  GIVEN employees page 
  WHEN user click to the phone
  THEN render massage "Copied!"
  `, () => {
    mountComponent({
      employee: initialData.employees,
    })

    // disable prompt that blocks the test
    cy
      .window()
      .then((win) => {
        cy
          .stub(win, `prompt`)
          .returns(``)
      })

    // spy on the execCommand method, which controls text editing operations,
    // and wait for the 'copy' command of this method to be called during the test
    cy
      .document()
      .then((doc) => {
        cy
          .spy(doc, `execCommand`)
          .as(`execCommand`)
      })

    cy
      .getByData(`employee-phone-number`)
      .click()

    // check call of copy command
    cy
      .get(`@execCommand`)
      .should(`have.been.calledWith`, `copy`)

    cy
      .getByData(`copy-notification`)
      .should(`exist`)
  })
})

function mountComponent({
  employee,
}: {
  employee: Employee[],
}) {

  const mockAuthContext = [
    `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lSWRlbnRpZmllciI6Im1haWxAbWFpbC5ydSIsImNvcnBvcmF0ZUVtYWlsIjoibWFpbEBtYWlsLnJ1IiwidGVuYW50SWQiOiIxIiwiYWNjb3VudElkIjoiMyIsImVtcGxveWVlSWQiOiIyIiwicGVybWlzc2lvbnMiOlsiVmlld0NvbnRhY3RzIiwiVmlld1NhbGFyeUFuZERvY3VtZW50c0RhdGEiXX0.1e0lCH5Omfo2W23gUtkuw3PZeXptn55bFC886Q0rwJk`,
  ]

  cy.mount(
    <MemoryRouter>
      <authService.AuthContext.Provider value={mockAuthContext}>
        <EmployeeItem employee={employee[0]} />
      </authService.AuthContext.Provider>,
    </MemoryRouter>,

  )
}
