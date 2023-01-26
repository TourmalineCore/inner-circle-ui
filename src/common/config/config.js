// const env = () => {
//   if (process.env.ENV_KEY === test) {
//     return process.env;
//   }
//   return window.__ENV__;
// };

const env = window.__ENV__ ? window.__ENV__ : process.env;

export const {
  ENV_KEY,
  API_ROOT,
  API_ROOT_AUTH,
  LINK_TO_SALARY_SERVICE,
  LINK_TO_ACCOUNT_SERVICE,
} = env;
