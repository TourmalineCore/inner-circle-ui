import { CopyToClipboardButton } from './CopyToClipboardButton';
import EmployeesState from '../../../../state/EmployeesState';
import EmployeesStateContext from '../../../../state/EmployeesStateContext';

describe('CopyToClipboardButton', () => {
  it(`
  GIVEN any page 
  WHEN must be text to be copied
  THEN render text to be copied
  `, () => {
    mountComponent();

    cy.getByData('copy-item')
      .should('exist');
  });

  it.skip(`
    GIVEN text to be copied
    WHEN click on it
    THEN render copy notification
    `, () => {
    mountComponent();

    cy.getByData('copy-text')
      .click();

    cy.getByData('copy-notification')
      .should('exist');
  });
});

function mountComponent() {
  /* eslint-disable react/jsx-no-constructed-context-values */
  const employeesState = new EmployeesState();

  cy.mount(
    <EmployeesStateContext.Provider value={employeesState}>
      <CopyToClipboardButton text="test" notificationPosition="right" />
    </EmployeesStateContext.Provider>,
  );
}
