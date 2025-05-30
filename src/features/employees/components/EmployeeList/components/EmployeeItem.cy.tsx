/* eslint-disable react/jsx-no-constructed-context-values */
import { MemoryRouter } from 'react-router-dom';
import { Employee } from '../../../types';
import EmployeeItem from './EmployeeItem';
import AccessBasedOnPemissionsStateContext from '../../../../../routes/state/AccessBasedOnPemissionsStateContext';
import AccessBasedOnPemissionsState, { Permission } from '../../../../../routes/state/AccessBasedOnPemissionsState';

const initialData = {
  employees: [
    {
      employeeId: 1,
      fullName: 'Ceo Ceo Ceo',
      corporateEmail: 'ceo@tourmalinecore.com',
      personalEmail: 'ceo@gmail.com',
      phone: '89999999999',
      gitHub: '@ceo.github',
      gitLab: '@ceo.gitlab',
      isBlankEmployee: true,
      isCurrentEmployee: true,
      isEmployedOfficially: true,
      netSalary: null,
      ratePerHour: null,
      fullSalary: null,
      employmentType: null,
      parking: null,
      personnelNumber: null,
      hireDate: '2020-01-01T00:00:00Z',
    },
  ],
};

describe('EmployeeItem', () => {
  it(`
    GIVEN employees page 
    WHEN user click to the phone
    THEN render massage "Copied!"
    `, () => {
    mountComponent({
      employee: initialData.employees,
    });

    // disable prompt that blocks the test
    cy.window().then((win) => {
      cy.stub(win, 'prompt').returns('');
    });
    // spy on the execCommand method, which controls text editing operations,
    // and wait for the 'copy' command of this method to be called during the test
    cy.document().then((doc) => {
      cy.spy(doc, 'execCommand').as('execCommand');
    });

    cy.getByData('employee-phone-number')
      .click();

    // check call of copy command
    cy.get('@execCommand').should('have.been.calledWith', 'copy');

    cy.getByData('copy-notification')
      .should('exist');
  });
});

function mountComponent({
  employee,
}: {
  employee: Employee[];
}) {
  const accessState = new AccessBasedOnPemissionsState();
  accessState.checkPermissionFromToken([
    Permission.ViewContacts,
  ]);

  cy.mount(
    <MemoryRouter>
      <AccessBasedOnPemissionsStateContext.Provider value={accessState}>
        <EmployeeItem employee={employee[0]} />
      </AccessBasedOnPemissionsStateContext.Provider>
    </MemoryRouter>,
  );
}
