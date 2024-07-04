import { ProfileState } from '../../state/ProfileState';
import { ProfileStateContext } from '../../state/ProfileStateContext';
import { getProfileInfo } from '../../utils/utilsForTests';
import { Employee } from '../../types/Profile';
import { ContactsInfo } from './ContactsInfo';

const profileState = new ProfileState();

describe('ContactsInfo', () => {
  it(`
  GIVEN contacts info
  WHEN render the component 
  THEN see it
  `, () => {
    mountComponent();

    cy
      .getByData('contacts-info')
      .should('exist');
  });

  it(`
  GIVEN contacts info
  WHEN render the component 
  THEN see component header  
  `, () => {
    mountComponent();

    cy
      .getByData('contacts-info-head')
      .should('have.text', 'Contacts');
  });

  it(`
  GIVEN contacts info
  WHEN render the component 
  AND isEdit flag is false
  THEN see edit button  
  `, () => {
    mountComponent();

    profileState.setIsEdit(false);

    cy
      .getByData('contacts-info-buttons')
      .children()
      .should('have.length', 1);

    cy
      .getByData('contacts-info-buttons')
      .should('have.text', 'Edit');
  });

  it(`
  GIVEN contacts info
  WHEN render the component 
  AND isEdit flag is true
  THEN see save and cancel buttons  
  `, () => {
    mountComponent();

    profileState.setIsEdit(true);

    cy
      .getByData('contacts-info-buttons')
      .children()
      .should('have.length', 2);

    cy
      .getByData('contacts-info-buttons')
      .children()
      .first()
      .should('have.text', 'Save');

    cy
      .getByData('contacts-info-buttons')
      .children()
      .last()
      .should('have.text', 'Cancel');
  });

  it(`
  GIVEN contacts info
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
  GIVEN contacts info
  WHEN render cards
  AND isLoading flag is false
  THEN see four cards
  `, () => {
    mountComponent();

    profileState.setIsLoading(false);

    cy
      .getByData('contacts-info-cards')
      .should('exist');

    cy
      .getByData('contacts-info-cards')
      .children()
      .should('have.length', 4);
  });
});

function mountComponent({
  employee = getProfileInfo({}),
  editEmployeeAsync = () => {},
} : {
  employee?: Employee
  editEmployeeAsync?: () => unknown,
} = {}) {
  profileState.initialize({
    employee,
  });

  cy.mount(
    <ProfileStateContext.Provider value={profileState}>
      <ContactsInfo editEmployeeAsync={editEmployeeAsync} />
    </ProfileStateContext.Provider>,
  );
}
