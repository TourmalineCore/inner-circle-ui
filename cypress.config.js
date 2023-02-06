import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    viewportWidth: 1200,
    viewportHeight: 660,
    specPattern: 'cypress/e2e/**/*.cy.js',
    video: false,
  },

  component: {
    viewportWidth: 1200,
    viewportHeight: 660,
    video: false,
    specPattern: 'src/**/*.cy.{js,jsx,ts,tsx}',
    devServer: {
      framework: 'create-react-app',
      bundler: 'webpack',
    },
  },
});
