import { BrowserRouter } from 'react-router-dom';
import AccessBasedOnPermissionsState from '../../../../routes/state/AccessBasedOnPermissionsState';
import AccessBasedOnPermissionsStateContext from '../../../../routes/state/AccessBasedOnPermissionsStateContext';
import { Employee } from '../../types';
import { EmployeeList } from './EmployeeList';

describe('EmployeeList', () => {
  it(`
  GIVEN employee list component
  WHEN render the component 
  THEN see it
  `, () => {
    mountComponent();

    cy
      .getByData('employee-list')
      .should('exist');
  });

  it(`
  GIVEN employee list component
  WHEN isLoading property is true 
  THEN see skeleton
  `, () => {
    mountComponent({
      isLoading: true,
    });

    cy
      .get('.employee-list__skeleton')
      .should('exist');
  });

  it(`
  GIVEN employee list component
  WHEN employee list is empty 
  THEN see text about it
  `, () => {
    mountComponent();

    cy
      .getByData('employee-list-empty')
      .contains('List empty');
  });

  it(`
  GIVEN employee list component
  WHEN there is one employee 
  THEN see 1 item in list
  `, () => {
    mountComponent({
      employees: [
        {
          employeeId: 1,
          fullName: 'name',
          corporateEmail: 'email',
          personalEmail: null,
          phone: null,
          gitHub: null,
          gitLab: null,
          netSalary: null,
          ratePerHour: null,
          fullSalary: null,
          employmentType: null,
          parking: null,
          personnelNumber: null,
          hireDate: null,
          isCurrentEmployee: true,
          isBlankEmployee: false,
        },
      ],
    });

    cy
      .getByData('employee-item')
      .should('have.length', 1);
  });

  it(`
  GIVEN employee list component
  WHEN there are three employee 
  THEN see 3 items in list
  `, () => {
    mountComponent({
      employees: [
        {
          employeeId: 1,
          fullName: 'name',
          corporateEmail: 'email',
          personalEmail: null,
          phone: null,
          gitHub: null,
          gitLab: null,
          netSalary: null,
          ratePerHour: null,
          fullSalary: null,
          employmentType: null,
          parking: null,
          personnelNumber: null,
          hireDate: null,
          isCurrentEmployee: true,
          isBlankEmployee: false,
        },
        {
          employeeId: 2,
          fullName: 'name2',
          corporateEmail: 'email2',
          personalEmail: null,
          phone: null,
          gitHub: null,
          gitLab: null,
          netSalary: null,
          ratePerHour: null,
          fullSalary: null,
          employmentType: null,
          parking: null,
          personnelNumber: null,
          hireDate: null,
          isCurrentEmployee: true,
          isBlankEmployee: false,
        },
        {
          employeeId: 3,
          fullName: 'name3',
          corporateEmail: 'email3',
          personalEmail: null,
          phone: null,
          gitHub: null,
          gitLab: null,
          netSalary: null,
          ratePerHour: null,
          fullSalary: null,
          employmentType: null,
          parking: null,
          personnelNumber: null,
          hireDate: null,
          isCurrentEmployee: true,
          isBlankEmployee: false,
        },
      ],
    });

    cy
      .getByData('employee-item')
      .should('have.length', 3);
  });
});

function mountComponent({
  isLoading = false,
  employees = [],
}: {
  isLoading?: boolean;
  employees?: Employee[];
} = {}) {
  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const accessOnPermissionsState = new AccessBasedOnPermissionsState();
  accessOnPermissionsState.accessPermissions.set('ViewSalaryAndDocumentsData', true);

  cy.mount(

    <AccessBasedOnPermissionsStateContext.Provider value={accessOnPermissionsState}>
      <BrowserRouter>
        <EmployeeList
          isLoading={isLoading}
          employees={employees}
        />
      </BrowserRouter>
    </AccessBasedOnPermissionsStateContext.Provider>,
  );
}
