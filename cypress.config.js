const { defineConfig } = require('cypress')

module.exports = defineConfig({
  video: false,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./tests/plugins/index.js')(on, config)
    },
    baseUrl: 'http://localhost:9300',
    specPattern: 'tests/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'tests/support/index.js',
  },
})
