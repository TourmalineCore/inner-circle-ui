import { ReactNode } from 'react';
import { InfoCard } from './InfoCard';

describe('InfoCard', () => {
  it(`
  GIVEN info card
  WHEN render the component 
  THEN see it
  `, () => {
    mountComponent();

    cy
      .getByData('info-card')
      .should('exist');
  });

  it(`
  GIVEN info card
  WHEN isHaveValue property is false 
  THEN does not see value  
  AND see text about it
  `, () => {
    mountComponent({
      isHaveValue: false,
    });

    cy
      .getByData('info-card-value')
      .should('have.text', 'not filled..');
  });

  it(`
  GIVEN info card
  WHEN render the component with all data
  THEN see all data
  `, () => {
    mountComponent();

    cy
      .getByData('info-card')
      .contains('label text');

    cy
      .getByData('info-card')
      .contains('value text');

    cy
      .getByData('info-card')
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
    <InfoCard
      label={label}
      value={value}
      icon={icon}
      isHaveValue={isHaveValue}
      isError={isError}
    />,
  );
}
