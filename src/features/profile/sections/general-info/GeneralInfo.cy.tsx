import { GeneralInfo } from './GeneralInfo';
import { ProfileState } from '../../state/ProfileState';
import { ProfileStateContext } from '../../state/ProfileStateContext';

const state = new ProfileState();

const INITIAL_EMPLOYEE = {
  id: 0,
  fullName: '',
  corporateEmail: '',
  personalEmail: '',
  phone: '',
  gitHub: '',
  gitLab: '',
  fullSalary: 0,
  districtCoefficient: 0,
  incomeTax: 0,
  netSalary: 0,
  isSalaryInfoFilled: false,
  isEmployedOfficially: false,
};

describe('GeneralInfo', () => {
  it(`
  GIVEN general info
  WHEN render the component 
  THEN see it
  `, () => {
    mountComponent();

    cy
      .getByData('general-info')
      .should('exist');
  });

  it(`
  GIVEN general info
  WHEN render the component 
  THEN see component header  
  `, () => {
    mountComponent();

    cy
      .getByData('general-info-head')
      .should('have.text', 'General information');
  });

  it(`
  GIVEN general info
  WHEN render cards
  AND isLoading flag is true
  THEN see skeleton
  `, () => {
    mountComponent();

    state.setIsLoading(true);

    cy
      .getByData('skeleton')
      .should('exist');
  });

  it(`
  GIVEN general info
  WHEN render cards
  AND isLoading flag is false
  THEN see two cards
  `, () => {
    mountComponent();

    state.setIsLoading(false);

    cy
      .getByData('general-info-cards')
      .should('exist');

    cy
      .getByData('general-info-cards')
      .children()
      .should('have.length', 2);
  });
});

function mountComponent() {
  state.initialize({
    employee: INITIAL_EMPLOYEE,
  });

  cy.mount(
    <ProfileStateContext.Provider value={state}>
      <GeneralInfo />
    </ProfileStateContext.Provider>,
  );
}
