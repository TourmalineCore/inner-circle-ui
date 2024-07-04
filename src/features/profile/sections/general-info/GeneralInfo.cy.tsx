import { GeneralInfo } from './GeneralInfo';
import { ProfileState } from '../../state/ProfileState';
import { ProfileStateContext } from '../../state/ProfileStateContext';
import { getProfileInfo } from '../../utils/utilsForTests';
import { Employee } from '../../types/Profile';

const profileState = new ProfileState();

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

    profileState.setIsLoading(true);

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

    profileState.setIsLoading(false);

    cy
      .getByData('general-info-cards')
      .should('exist');

    cy
      .getByData('general-info-cards')
      .children()
      .should('have.length', 2);
  });
});

function mountComponent({
  employee = getProfileInfo({}),
} : {
  employee?: Employee
} = {}) {
  profileState.initialize({
    employee,
  });

  cy.mount(
    <ProfileStateContext.Provider value={profileState}>
      <GeneralInfo />
    </ProfileStateContext.Provider>,
  );
}
