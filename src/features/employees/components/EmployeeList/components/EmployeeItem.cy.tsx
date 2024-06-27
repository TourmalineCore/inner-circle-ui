import { BrowserRouter } from 'react-router-dom';
import AccessBasedOnPermissionsState from '../../../../../routes/state/AccessBasedOnPermissionsState';
import AccessBasedOnPermissionsStateContext from '../../../../../routes/state/AccessBasedOnPermissionsStateContext';
import { Employee } from '../../../types';
import { EmployeeItem } from './EmployeeItem';

function getEmployee({ ...props }: Partial<Employee>) {
  return {
    employeeId: 1,
    fullName: 'name',
    corporateEmail: 'email',
    personalEmail: 'personal email',
    phone: '79111111111',
    gitHub: 'github',
    gitLab: 'gitlab',
    netSalary: 100,
    ratePerHour: 101,
    fullSalary: 102,
    employmentType: 0.5,
    parking: 103,
    personnelNumber: '11/23',
    hireDate: '11.11.23',
    isCurrentEmployee: true,
    isBlankEmployee: false,
    ...props,
  };
}

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
});

function mountComponent({
  hasViewContactsPermission = true,
  hasViewSalaryAndDocumentsDataPermission = true,
  employee,
}: {
  hasViewContactsPermission?: boolean,
  hasViewSalaryAndDocumentsDataPermission?: boolean,
  employee: Employee;
}) {
  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const accessOnPermissionsState = new AccessBasedOnPermissionsState();
  accessOnPermissionsState.accessPermissions.set('ViewContacts', hasViewContactsPermission);
  accessOnPermissionsState.accessPermissions.set('ViewSalaryAndDocumentsData', hasViewSalaryAndDocumentsDataPermission);

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
