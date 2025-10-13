import { CopyToClipboardButton } from './CopyToClipboardButton'
import { EmployeesState } from '../../../../context/EmployeesState'
import { EmployeesStateContext } from '../../../../context/EmployeesStateContext'

describe(`CopyToClipboardButton`, () => {
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
        <CopyToClipboardButton
          text="test"
          notificationPosition="right"
        />
      </EmployeesStateContext.Provider>,
    )
}
