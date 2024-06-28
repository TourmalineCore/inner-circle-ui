import { ProfilePage } from './ProfilePage';

describe('ProfilePage', () => {
  it(`
  GIVEN profile component
  WHEN render the component 
  THEN see it
  `, () => {
    mountComponent();

    cy
      .getByData('profile')
      .should('exist');
  });
});

function mountComponent() {
  cy.mount(
    <ProfilePage />,
  );
}
