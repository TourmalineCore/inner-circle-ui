import { SidebarInfoBox } from './SidebarInfoBox';

const initialData = {
  name: 'nlastname',
};

const initialDataSecond = {
  name: 'anklastname',
};

const initialDataThird = {
  name: 'yulastname',
};

describe('SidebarInfoBox', () => {
  it(`
  GIVEN email starts at first letter of the name and then last name 
  WHEN open sidebar
  THEN render correct user fullName
  `, () => {
    mountComponent({
      infoBoxData: initialData,
    });

    cy
      .getByData('sidebar-infobox')
      .should('have.text', 'Lastname N.');
  });

  it(`
  GIVEN exception email starts at ank and then last name without first letter
  WHEN open sidebar
  THEN render correct user fullName
  `, () => {
    mountComponent({
      infoBoxData: initialDataSecond,
    });

    cy
      .getByData('sidebar-infobox')
      .should('have.text', 'Klastname A.');
  });

  it(`
  GIVEN exception email starts at yu and then last name 
  WHEN open sidebar
  THEN render correct user fullName
  `, () => {
    mountComponent({
      infoBoxData: initialDataThird,
    });

    cy
      .getByData('sidebar-infobox')
      .should('have.text', 'Lastname Y.');
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
