import { MemoryRouter } from 'react-router-dom'
import { EmployeeItem } from './EmployeeItem'
import { Employee } from '../../../../types/employee'
import { authService } from '../../../../common/authService'

const initialData = {
  employees: [
    {
      employeeId: 1,
      fullName: `Ceo Ceo Ceo`,
      corporateEmail: `ceo@tourmalinecore.com`,
      personalEmail: `ceo@gmail.com`,
      phone: `+79999999999`,
      gitHub: `@ceo.github`,
      gitLab: `@ceo.gitlab`,
      isBlankEmployee: true,
      isCurrentEmployee: true,
      birthDate: null,
      specializations: [],
      workerTime: null,
    },
  ],
}

describe(`EmployeeItem`, () => {
  it(`
  GIVEN employees page 
  WHEN user click to the phone
  THEN render message "Copied"
  `, () => {
    // Mock the navigator.clipboard.writeText method
    cy.window()
      .then((win) => {
        cy.stub(win.navigator.clipboard, `writeText`)
          .resolves()
      })

    mountComponent({
      employee: initialData.employees,
    })

    cy
      .getByData(`employee-phone-number`)
      .click()

    // Check that navigator.clipboard.writeText was called with the correct text
    cy.window()
      .its(`navigator.clipboard.writeText`)
      .should(`have.been.calledWith`, `+79999999999`)

    cy.contains(`.copy-to-clipboard__tooltip`, `Copied`)
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

  cy
    .mount(
      <MemoryRouter>
        <authService.AuthContext.Provider value={mockAuthContext}>
          <EmployeeItem employee={employee[0]} />
        </authService.AuthContext.Provider>,
      </MemoryRouter>,
    )
}
