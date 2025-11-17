import { CopyToClipboard } from './CopyToClipboard'

describe(`CopyToClipboard`, () => {
  it(`
  GIVEN CopyToClipboard component
  WHEN user click to the CopyToClipboard
  THEN render message "Copied"
  `, () => {
    mountComponent()

    // Mock the navigator.clipboard.writeText method
    cy.window()
      .then((win) => {
        cy.stub(win.navigator.clipboard, `writeText`)
          .resolves()
      })

    cy.getByData(`copy-to-clipboard`)
      .click()

    // Check that navigator.clipboard.writeText was called with the correct text
    cy.window()
      .its(`navigator.clipboard.writeText`)
      .should(`have.been.calledWith`, `test`)

    cy.contains(`.copy-to-clipboard__tooltip`, `Copied`)
      .should(`exist`)
  })
})

function mountComponent() {
  cy
    .mount(
      <CopyToClipboard text="test" />,
    )
}
