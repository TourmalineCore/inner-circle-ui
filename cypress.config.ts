import { defineConfig } from 'cypress'

defineConfig({
  e2e: {
    viewportWidth: 1200,
    viewportHeight: 660,
    specPattern: `cypress/e2e/**/*.cy.js`,
    baseUrl: `https://tourmalinecore.github.io/React-Admin-Template`,
    video: false,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setupNodeEvents(on, config) {},
  },

  component: {
    devServer: {
      framework: `react`,
      bundler: `vite`,
    },
  },
})
