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

    cy.getByData('employee-list')
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

    cy.get('.employee-list__skeleton')
      .should('exist');
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
      <EmployeeList
        isLoading={isLoading}
        employees={employees}
      />
    </AccessBasedOnPermissionsStateContext.Provider>,
  );
}
