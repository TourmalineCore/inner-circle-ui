import { BrowserRouter } from 'react-router-dom';
import AccessBasedOnPermissionsState from '../../../../../routes/state/AccessBasedOnPermissionsState';
import AccessBasedOnPermissionsStateContext from '../../../../../routes/state/AccessBasedOnPermissionsStateContext';
import { Employee } from '../../../types';
import EmployeeItem from './EmployeeItem';

const EMPLOYEE = {
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
};

describe('EmployeeItem', () => {
  it(`
  GIVEN employee item component
  WHEN render the component 
  THEN see it
  `, () => {
    mountComponent({
      employee: EMPLOYEE,
    });

    cy
      .getByData('employee-item')
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
