import { ContactsInfoButton } from './ContactsInfoButton';

describe('ContactsInfoButton', () => {
  it(`
  GIVEN button
  WHEN render the component 
  THEN see it
  `, () => {
    mountComponent();

    cy
      .getByData('button')
      .should('exist');
  });

  it(`
  GIVEN button
  WHEN render the component 
  THEN see it's text 
  `, () => {
    mountComponent();

    cy
      .getByData('button')
      .should('have.text', 'tap');
  });
});

function mountComponent({
  onClick = () => {},
  text = 'tap',
} : {
  onClick?: () => unknown,
  text?: string,
} = {}) {
  cy.mount(
    <ContactsInfoButton
      onClick={onClick}
      text={text}
    />,
  );
}
