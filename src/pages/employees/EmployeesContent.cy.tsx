import { EmployeesState } from "./state/EmployeesState"
import { EmployeesStateContext } from "./state/EmployeesStateContext"
import { EmployeesContent } from "./EmployeesContent"
import { authService } from "../../common/authService"
import { MOCK_TOKEN } from "../../common/constants/mockToken"
import { MemoryRouter } from "react-router-dom"

describe(`EmployeesContent`, () => {
  describe(`Sort By Surname`, sortBySurnameTests)
})

function sortBySurnameTests() {
  it(`
    GIVEN employees page
    WHEN render the component
    SHOULD radio select contain options asc with "Sort by Surname ↑" label and desc with "Sort by Surname ↓" label
  `, () => {
    mountComponent()

    cy.getByData(`radio-select`)
      .click()

    cy.getByData(`radio-select`)
      .find(`input[type="radio"][value="asc"]`)
      .closest(`label`)
      .should(`contain.text`, `Sort by Surname ↑`)

    cy.getByData(`radio-select`)
      .find(`input[type="radio"][value="desc"]`)
      .closest(`label`)
      .should(`contain.text`, `Sort by Surname ↓`)
  },
  )
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
            <EmployeesContent />
          </EmployeesStateContext.Provider>
        </authService.AuthContext.Provider>
      </MemoryRouter>,
    )
}