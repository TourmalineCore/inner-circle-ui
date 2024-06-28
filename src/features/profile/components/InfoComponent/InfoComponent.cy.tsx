import { ReactNode } from 'react';
import { InfoComponent } from './InfoComponent';

describe('InfoComponent', () => {
  it(`
  GIVEN info component
  WHEN render the component 
  THEN see it
  `, () => {
    mountComponent();

    cy
      .getByData('info-component')
      .should('exist');
  });

  it(`
  GIVEN info component
  WHEN isHaveValue property is false 
  THEN does not see value  
  AND see text about it
  `, () => {
    mountComponent({
      isHaveValue: false,
    });

    cy
      .getByData('info-component-value')
      .should('have.text', 'not filled..');
  });

  it(`
  GIVEN info component
  WHEN render the component with all data
  THEN see all data
  `, () => {
    mountComponent();

    cy
      .getByData('info-component')
      .contains('label text');

    cy
      .getByData('info-component')
      .contains('value text');

    cy
      .getByData('info-component')
      .contains('(icon)');
  });
});

function mountComponent({
  label = 'label text',
  value = <>value text</>,
  icon = <>(icon)</>,
  isHaveValue = true,
  isError = false,
}: {
  label?: string;
  value?: ReactNode,
  icon?: ReactNode,
  isHaveValue?: boolean;
  isError?: boolean;
} = {}) {
  cy.mount(
    <InfoComponent
      label={label}
      value={value}
      icon={icon}
      isHaveValue={isHaveValue}
      isError={isError}
    />,
  );
}
