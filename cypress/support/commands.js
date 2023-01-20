import { existUser } from '../e2e/constants/index';
import AuthView from '../e2e/pages/AuthenticationView';

// custom command for authentication on app
Cypress.Commands.add('auth', () => {
  const { login } = existUser;
  const { password } = existUser;

  AuthView.enterLogin(login);
  AuthView.enterPassword(password);

  AuthView.tapLogIn();
});
