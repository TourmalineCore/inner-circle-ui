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
      API_ROOT_URL: process.env.API_ROOT_URL,
      AUTH_API_ROOT_URL: process.env.AUTH_API_ROOT_URL,
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
