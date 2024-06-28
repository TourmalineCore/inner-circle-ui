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
});

function mountComponent({
  label = '',
  value = <>value</>,
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
