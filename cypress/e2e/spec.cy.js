import { qase } from 'cypress-qase-reporter/dist/mocha';

import AuthView from './pages/AuthView';

describe('Auth tests', () => {
  beforeEach('visit site', () => {
    AuthView.visit();
  });

  qase(1, it('should successfully auth', () => {
    cy.auth();
  }));
});
