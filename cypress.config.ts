const { defineConfig } = require('cypress');

module.exports = defineConfig({

  e2e: {
    viewportWidth: 1200,
    viewportHeight: 660,
    specPattern: 'cypress/e2e/**/*.cy.js',
    baseUrl: 'https://tourmalinecore.github.io/React-Admin-Template',
    video: false,
    setupNodeEvents(on, config) {
      //
    },
  },
});
