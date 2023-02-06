// const env = () => {
//   if (process.env.ENV_KEY === test) {
//     return process.env;
//   }
//   return window.__ENV__;
// };

console.log('PROCESS ENV', process.env);
console.log('1   CONFIG.JS FILE IN OPENED. TRY TO PARSE VALUES FOR COMPONENT. WINDOW EQUAL TO', window);
// if (process.env.REACT_APP_ENV_KEY === 'test') {
// window.__ENV__ = require('../../../public/env-config');
// }
// {
// ENV_KEY: 'local', API_ROOT: 'http://localhost:5000/api', API_ROOT_AUTH: 'http://localhost:5002/api/auth', LINK_TO_SALARY_SERVICE: '/', LINK_TO_ACCOUNT_SERVICE: '/',
// };
console.log('1   WINDOW.__ENV__', window.__ENV__);
// const env = window.__ENV__ ? window.__ENV__ : process.env;
console.log('2   CONFIG.JS FILE IN OPENED. TRY TO PARSE VALUES FOR COMPONENT. WINDOW EQUAL TO', window);

export const {
  ENV_KEY,
  API_ROOT,
  API_ROOT_AUTH,
  LINK_TO_SALARY_SERVICE,
  LINK_TO_ACCOUNT_SERVICE,
} = window.__ENV__;
