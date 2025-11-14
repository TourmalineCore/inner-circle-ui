import { EmployeesState } from '../../pages/employees/state/EmployeesState'
import { EmployeesStateContext } from '../../pages/employees/state/EmployeesStateContext'
import { CopyToClipboard } from './CopyToClipboard'

describe(`CopyToClipboard`, () => {
  it(`
  GIVEN any page 
  WHEN must be text to be copied
  THEN render text to be copied
  `, () => {
    mountComponent()

    cy.getByData(`copy-item`)
      .should(`exist`)
  })
})

function mountComponent() {
  const employeesState = new EmployeesState()

  cy
    .mount(
      <EmployeesStateContext.Provider value={employeesState}>
        <CopyToClipboard text="test" />
      </EmployeesStateContext.Provider>,
    )
}
