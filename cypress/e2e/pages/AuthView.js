const INPUT_LOGIN = '#login';
const INPUT_PASSWORD = '#password';
const LOG_IN_BUTTON = 'Log In';

export default class AuthView {
  static visit() {
    cy.visit('/');
    cy.contains('Sign Out').click(); // need remove after
  }

  static enterLogin(login) {
    cy.get(INPUT_LOGIN).type(login);
  }

  static enterPassword(password) {
    cy.get(INPUT_PASSWORD).type(password);
  }

  static tapLogIn() {
    cy.contains(LOG_IN_BUTTON).click();
  }
}
