const { test, expect } = require('@playwright/test');
require('dotenv').config();

test.describe('Блокировка задачи', () => {
  test('должен блокировать задачу', async () => {
    const { Octokit } = await import('@octokit/core');
    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
    const IssuePage = require('../pages/issuePage');
    const issuePage = new IssuePage(octokit);
    // Шаг 1: Определение номера задачи для блокировки
    const issueNumber = 2;

    // Шаг 2: Отправка PUT запроса для блокировки задачи
    const response = await issuePage.lockIssue(
      process.env.OWNER,
      process.env.REPO,
      issueNumber
    );
    
    // Шаг 3: Проверка статуса выполнения запроса
    expect(response.status).toBe(204);
  });
});
