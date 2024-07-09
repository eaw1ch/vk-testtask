const { defineConfig } = require('@playwright/test');
const allureConfig = require('./utils/allureConfig');

module.exports = defineConfig({
  ...allureConfig,
  use: {
    trace: 'on-first-retry',
    headless: true,
  },
});
