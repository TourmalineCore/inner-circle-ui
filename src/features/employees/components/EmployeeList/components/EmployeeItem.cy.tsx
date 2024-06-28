import { BrowserRouter } from 'react-router-dom';
import AccessBasedOnPermissionsState from '../../../../../routes/state/AccessBasedOnPermissionsState';
import AccessBasedOnPermissionsStateContext from '../../../../../routes/state/AccessBasedOnPermissionsStateContext';
import { Employee } from '../../../types';
import { EmployeeItem } from './EmployeeItem';
import { getEmployee } from '../../../utils/utilsForTests';

describe('EmployeeItem', () => {
  it(`
  GIVEN employee item component
  WHEN render the component 
  THEN see it
  `, () => {
    mountComponent({
      employee: getEmployee({}),
    });

    cy
      .getByData('employee-item')
      .should('exist');
  });

  it(`
  GIVEN employee item component
  WHEN employee is blank 
  THEN employee item has another style
  `, () => {
    mountComponent({
      employee: getEmployee(
        {
          isBlankEmployee: true,
        },
      ),
    });

    cy
      .get('.employee-item--is-blank')
      .should('exist');
  });

  it(`
  GIVEN employee item component
  WHEN has not permission ViewSalaryAndDocumentsData
  THEN employee item has half width
  `, () => {
    mountComponent({
      hasViewSalaryAndDocumentsDataPermission: false,
      employee: getEmployee({}),
    });

    cy
      .get('.employee-item--half-width')
      .should('exist');
  });

  it(`
  GIVEN employee item component
  WHEN render the component 
  AND has all permissions
  THEN see all employee information data
  `, () => {
    mountComponent({
      employee: getEmployee({}),
    });

    cy.contains('name');

    cy.contains('email');

    cy.contains('personal email');

    cy.contains('+7 (911) 111 11 11');

    cy.contains('github');

    cy.contains('gitlab');

    cy.contains('100');

    cy.contains('101');

    cy.contains('102');

    cy.contains('Half Time');

    cy.contains('103');

    cy.contains('11/23');

    cy.contains('11.11.2023');
  });

  it(`
  GIVEN employee item component
  WHEN has EditFullEmployeesData permission
  THEN see edit button
  `, () => {
    mountComponent({
      employee: getEmployee({}),
    });

    cy
      .getByData('employee-item-button')
      .should('exist');
  });

  it(`
  GIVEN employee item component
  WHEN has not EditFullEmployeesData permission
  THEN do not see edit button
  `, () => {
    mountComponent({
      hasEditFullEmployeesDataPermission: false,
      employee: getEmployee({}),
    });

    cy
      .getByData('employee-item-button')
      .should('not.exist');
  });

  it(`
  GIVEN employee item component
  WHEN render the component 
  AND has no ViewSalaryAndDocumentsData permission
  THEN do not see employee salary and documents data
  `, () => {
    mountComponent({
      hasViewSalaryAndDocumentsDataPermission: false,
      employee: getEmployee({}),
    });

    cy
      .getByData('employee-item')
      .should('not.contain', '100');

    cy
      .getByData('employee-item')
      .should('not.contain', '101');

    cy
      .getByData('employee-item')
      .should('not.contain', '102');

    cy
      .getByData('employee-item')
      .should('not.contain', 'Half Time');

    cy
      .getByData('employee-item')
      .should('not.contain', '103');

    cy
      .getByData('employee-item')
      .should('not.contain', '11/23');

    cy
      .getByData('employee-item')
      .should('not.contain', '11.11.2023');
  });
});

function mountComponent({
  hasViewContactsPermission = true,
  hasViewSalaryAndDocumentsDataPermission = true,
  hasEditFullEmployeesDataPermission = true,
  employee,
}: {
  hasViewContactsPermission?: boolean,
  hasViewSalaryAndDocumentsDataPermission?: boolean,
  hasEditFullEmployeesDataPermission?: boolean,
  employee: Employee;
}) {
  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const accessOnPermissionsState = new AccessBasedOnPermissionsState();
  accessOnPermissionsState.accessPermissions.set('ViewContacts', hasViewContactsPermission);
  accessOnPermissionsState.accessPermissions.set('ViewSalaryAndDocumentsData', hasViewSalaryAndDocumentsDataPermission);
  accessOnPermissionsState.accessPermissions.set('EditFullEmployeesData', hasEditFullEmployeesDataPermission);

  cy.mount(

    <AccessBasedOnPermissionsStateContext.Provider value={accessOnPermissionsState}>
      <BrowserRouter>
        <EmployeeItem
          employee={employee}
        />
      </BrowserRouter>
    </AccessBasedOnPermissionsStateContext.Provider>,
  );
}
