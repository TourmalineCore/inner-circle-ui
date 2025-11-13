import { defineConfig } from "cypress"
import getCompareSnapshotsPlugin from 'cypress-image-diff-js/plugin'

// eslint-disable-next-line import/no-default-export
export default defineConfig({
  e2e: {
    viewportWidth: 1200,
    viewportHeight: 660,
    specPattern: `cypress/e2e/**/*.cy.ts`,
    baseUrl: process.env.CYPRESS_BASE_URL,
    setupNodeEvents(on, config) {
      return getCompareSnapshotsPlugin(on, config)
    },
    env: {
      API_ROOT: process.env.API_ROOT,
      API_ROOT_AUTH: process.env.API_ROOT_AUTH,
      LINK_TO_SALARY_SERVICE: process.env.LINK_TO_SALARY_SERVICE,
      LINK_TO_ACCOUNT_SERVICE: process.env.LINK_TO_ACCOUNT_SERVICE,
      USER_LOGIN: process.env.USER_LOGIN,
      USER_PASSWORD: process.env.USER_PASSWORD,
    },
    video: true,
    screenshotOnRunFailure: true,
  },
  component: {
    setupNodeEvents(on, config) {
      return getCompareSnapshotsPlugin(on, config)
    },
    video: true,
    screenshotOnRunFailure: true,
    devServer: {
      framework: `react`,
      bundler: `vite`,
    },
  },
})
