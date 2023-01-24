/* eslint-disable jest/expect-expect */
/* eslint-disable jest/valid-expect-in-promise */
/// <reference types="@testing-library/cypress" />
import { MemoryRouter } from 'react-router-dom';

import EmployeeAddPage from './EmployeeAddPage';

describe('EmployeeAddPage', () => {
  beforeEach('renders EmployeeAddPage', () => {
    mountEmployeeAddPage();
    interceptCreateEmployeeRequest();
  });

  it('validate request after button click and filled input "name"', () => {
    fillInput('name', 'Ivan');
    clickCreateButton();
    validateRequestValue('name', 'Ivan');
  });

  it('validate request after button click and filled input "surname"', () => {
    fillInput('surname', 'Ivanov');
    clickCreateButton();
    validateRequestValue('surname', 'Ivanov');
  });

  it('validate request after button click and filled input "middleName"', () => {
    fillInput('middleName', 'Ivanovich');
    clickCreateButton();
    validateRequestValue('middleName', 'Ivanovich');
  });

  it('validate request after button click and filled input "corporateEmail"', () => {
    fillInput('corporateEmail', 'iivanov');
    clickCreateButton();
    validateRequestValue('corporateEmail', 'iivanov@tourmalinecore.com');
  });

  it('validate request after button click and filled input "personalEmail"', () => {
    fillInput('personalEmail', 'iivanov@mail.ru');
    clickCreateButton();
    validateRequestValue('personalEmail', 'iivanov@mail.ru');
  });

  it('validate request after button click and filled input "phone" with + sign', () => {
    fillInput('phone', '+79058348727');
    clickCreateButton();
    validateRequestValue('phone', '+79058348727');
  });

  it('validate request after button click and filled input "phone" without + sign', () => {
    fillInput('phone', '89058348727');
    clickCreateButton();
    validateRequestValue('phone', '89058348727');
  });

  it('validate request after button click and filled input "gitHub"', () => {
    fillInput('gitHub', 'iivanov-github');
    clickCreateButton();
    validateRequestValue('gitHub', 'iivanov-github');
  });

  it('validate request after button click and filled input "ratePerHour"', () => {
    fillInput('ratePerHour', '150');
    clickCreateButton();
    validateRequestValue('ratePerHour', 150);
  });

  it('validate request after button click and filled input "pay"', () => {
    fillInput('pay', '25000');
    clickCreateButton();
    validateRequestValue('pay', 25000);
  });

  it('validate request after button click and filled input "gitLab"', () => {
    fillInput('gitLab', 'iivanov-gitlab');
    clickCreateButton();
    validateRequestValue('gitLab', 'iivanov-gitlab');
  });

  it('validate request after button click and filled input "parkingCostPerMonth"', () => {
    fillInput('parkingCostPerMonth', '2000');
    clickCreateButton();
    validateRequestValue('parkingCostPerMonth', 2000);
  });

  it('validate request after button click and selected "employmentType" as full time', () => {
    cy.findByTestId('employmentType-select').select('Full Time');
    clickCreateButton();
    validateRequestValue('employmentType', 0);
  });

  it('validate request after button click and selected "employmentType" as half time', () => {
    cy.findByTestId('employmentType-select').select('Half Time');
    clickCreateButton();
    validateRequestValue('employmentType', 1);
  });
});

function mountEmployeeAddPage() {
  cy.mount(
    <MemoryRouter>
      <EmployeeAddPage />
    </MemoryRouter>,
  );
}

function clickCreateButton() {
  cy.findByRole('button', { name: 'Create' }).click();
}

function fillInput(fieldName, value) {
  cy.findByTestId(`${fieldName}-input`).clear().type(value);
}

function interceptCreateEmployeeRequest() {
  cy.intercept('POST', '**/*employees/create', {
    statusCode: 200,
  }).as('employeerCreate');
}

function validateRequestValue(fieldName, value) {
  cy.wait('@employeerCreate')
    .its('request')
    .then(({ body }) => {
      expect(body[fieldName]).equal(value);
    });
}
