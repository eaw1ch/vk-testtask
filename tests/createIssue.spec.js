const { test, expect } = require('@playwright/test');
const IssuePage = require('../pages/issuePage');

require('dotenv').config();



test.describe('Создание задачи', () => {
  test('должен создавать новую задачу', async () => {
    const { Octokit } = await import('@octokit/core');
    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
    const IssuePage = require('../pages/issuePage');
    const issuePage = new IssuePage(octokit);

    // Шаг 1: Отправка POST запроса для создания задачи
    const response = await issuePage.createIssue(
      process.env.USER,
      process.env.REPO,
      'Issue1',
      'Я нашел баг',
      ['eaw1ch'],
      ['bug']
    );

    // Шаг 2: Проверка статуса выполнения запроса
    expect(response.status).toBe(201);
    // Шаг 3: Проверка названия созданной задачи
    expect(response.data.title).toBe('Issue1');
    // Шаг 4: Проверка описания созданной задачи
    expect(response.data.body).toBe('Я нашел баг');
    // Шаг 5: Проверка создателя задачи
    expect(response.data.assignees[0].login).toBe(process.env.USER);
    // Шаг 6: Проверка метки созданной задачи
    expect(response.data.labels[0].name).toBe('bug');
  });
});
