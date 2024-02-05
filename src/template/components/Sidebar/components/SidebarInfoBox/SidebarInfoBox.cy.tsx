import { SidebarInfoBox } from './SidebarInfoBox';

const initialData = {
  name: 'nlastname',
};

const initialDataSecond = {
  name: 'anklastname',
};

describe('SidebarInfoBox', () => {
  it(`
  GIVEN one of ui pages
  WHEN open sidebar
  THEN render user fullName
  `, () => {
    mountComponent({
      infoBoxData: initialData,
    });

    cy.getByData('sidebar-infobox').should('have.text', 'Lastname N.');
  });

  it(`
  GIVEN one of ui pages 
  WHEN open sidebar
  THEN render user fullName
  `, () => {
    mountComponent({
      infoBoxData: initialDataSecond,
    });

    cy.getByData('sidebar-infobox').should('have.text', 'Klastname A.');
  });
});

function mountComponent({
  infoBoxData,
}: {
  infoBoxData: {
    photoUrl?: string;
    name: string;
    email?: string;
  };
}) {
  cy.mount(
    <SidebarInfoBox {...infoBoxData} />,
  );
}
