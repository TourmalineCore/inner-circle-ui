import { ProfileState } from '../../state/ProfileState';
import { ProfileStateContext } from '../../state/ProfileStateContext';
import { Employee } from '../../types/Profile';
import { getProfileInfo } from '../../utils/utilsForTests';
import { SalaryInfo } from './SalaryInfo';

const profileState = new ProfileState();

describe('SalaryInfo', () => {
  it(`
  GIVEN salary info
  WHEN render the component 
  THEN see it
  `, () => {
    mountComponent();

    cy
      .getByData('salary-info')
      .should('exist');
  });

  it(`
  GIVEN salary info
  WHEN render the component 
  THEN see component header  
  `, () => {
    mountComponent();

    cy
      .getByData('salary-info-head')
      .should('have.text', 'Salary');
  });

  it(`
  GIVEN salary info
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
  GIVEN salary info
  WHEN render cards
  AND isLoading flag is false
  AND isSalaryInfoFilled property is false
  THEN see text about it
  `, () => {
    mountComponent();

    profileState.setIsLoading(false);

    cy
      .getByData('salary-info-cards')
      .should('have.text', 'Your salary will be filled soon..');
  });

  it(`
  GIVEN salary info
  WHEN render cards
  AND isLoading flag is false
  AND isSalaryInfoFilled property is true
  AND isEmployedOfficially property is false
  THEN see one card
  `, () => {
    mountComponent({
      employee: getProfileInfo(
        {
          isSalaryInfoFilled: true,
        },
      ),
    });

    profileState.setIsLoading(false);

    cy
      .getByData('salary-info-cards')
      .should('exist');

    cy
      .getByData('salary-info-cards')
      .children()
      .should('have.length', 1);
  });

  it(`
  GIVEN salary info
  WHEN render cards
  AND isLoading flag is false
  AND isSalaryInfoFilled property is true
  AND isEmployedOfficially property is true
  THEN see four cards
  `, () => {
    mountComponent({
      employee: getProfileInfo(
        {
          isSalaryInfoFilled: true,
          isEmployedOfficially: true,
        },
      ),
    });

    profileState.setIsLoading(false);

    cy
      .getByData('salary-info-cards')
      .should('exist');

    cy
      .getByData('salary-info-cards')
      .children()
      .should('have.length', 4);
  });

  it(`
  GIVEN salary info
  WHEN render cards
  AND isLoading flag is false
  AND isSalaryInfoFilled property is false
  AND isEmployedOfficially property is true
  THEN see no cards and text about it
  `, () => {
    mountComponent({
      employee: getProfileInfo(
        {
          isEmployedOfficially: true,
        },
      ),
    });

    profileState.setIsLoading(false);

    cy
      .getByData('salary-info-cards')
      .should('have.text', 'Your salary will be filled soon..');
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
      <SalaryInfo />
    </ProfileStateContext.Provider>,
  );
}
