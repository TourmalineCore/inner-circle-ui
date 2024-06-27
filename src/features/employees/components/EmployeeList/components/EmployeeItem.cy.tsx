import { BrowserRouter } from 'react-router-dom';
import AccessBasedOnPermissionsState from '../../../../../routes/state/AccessBasedOnPermissionsState';
import AccessBasedOnPermissionsStateContext from '../../../../../routes/state/AccessBasedOnPermissionsStateContext';
import { Employee } from '../../../types';
import EmployeeItem from './EmployeeItem';

function getEmployee({ ...props }: Partial<Employee>) {
  return {
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
    isBlankEmployee: props.isBlankEmployee ?? false,
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
});

function mountComponent({
  hasPermission = true,
  employee,
}: {
  hasPermission?: boolean,
  employee: Employee;
}) {
  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const accessOnPermissionsState = new AccessBasedOnPermissionsState();
  accessOnPermissionsState.accessPermissions.set('ViewSalaryAndDocumentsData', hasPermission);

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
