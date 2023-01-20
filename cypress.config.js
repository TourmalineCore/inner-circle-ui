import { defineConfig } from 'cypress';
import mochawesomeWriter from 'cypress-mochawesome-reporter/plugin';

export default defineConfig({
  e2e: {
    reporter: 'cypress-multi-reporters',
    reporterOptions: {
      configFile: 'reporterOptions.json',
    },
    viewportWidth: 1200,
    viewportHeight: 660,
    specPattern: 'cypress/e2e/**/*.cy.js',
    baseUrl: 'https://tourmalinecore.github.io/React-Admin-Template',
    video: false,
    setupNodeEvents(on, config) {
      mochawesomeWriter(on, config);
    },
  },

  component: {
    reporter: 'cypress-multi-reporters',
    reporterOptions: {
      configFile: 'reporterOptions.json',
    },
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
