import EmployeesState from '../../state/EmployeesState';
import EmployeesStateContext from '../../state/EmployeesStateContext';
import { SearchBar } from './SearchBar';

describe('SearchBar', () => {
  it(`
  GIVEN search bae component
  WHEN render the component 
  THEN see it
  `, () => {
    mountComponent();

    cy.getByData('search-bar')
      .should('exist');
  });
});

function mountComponent() {
  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const employeesState = new EmployeesState();

  cy.mount(
    <EmployeesStateContext.Provider value={employeesState}>
      <SearchBar />
    </EmployeesStateContext.Provider>,
  );
}
