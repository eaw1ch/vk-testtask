const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  reporter: [['list'], ['allure-playwright']],
});
