const login = Cypress.env('userLogin');
const password = Cypress.env('userPassword');

const existUser = {
  login,
  password,
};

// eslint-disable-next-line import/prefer-default-export
export { existUser };
