const { test, expect } = require('@playwright/test');
require('dotenv').config();

test.describe('Редактирование задачи', () => {
  test('должен редактировать содержимое уже созданной задачи', async () => {
    const { Octokit } = await import('@octokit/core');
    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
    const IssuePage = require('../pages/issuePage');
    const issuePage = new IssuePage(octokit);
    // Шаг 1: Определение номера задачи для редактирования
    const issueNumber = 2;

    // Шаг 2: Отправка PATCH запроса для редактирования задачи
    const response = await issuePage.editIssue(
      process.env.OWNER,
      process.env.REPO,
      issueNumber,
      'Я нашел новый баг'
    );

    // Шаг 3: Проверка статуса выполнения запроса
    expect(response.status).toBe(200);
    // Шаг 4: Проверка нового описания задачи
    expect(response.data.body).toBe('Я нашел новый баг');
  });
});
