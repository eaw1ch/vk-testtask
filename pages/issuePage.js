const BasePage = require('./basePage');

class IssuePage extends BasePage {
  constructor(octokit) {
    super(octokit);
    this.createIssueEndpoint = `POST /repos/${process.env.USER}/${process.env.REPO}/issues`;
    this.editIssueEndpoint = `PATCH /repos/${process.env.USER}/${process.env.REPO}/issues`;
    this.lockIssueEndpoint = `PUT /repos/${process.env.USER}/${process.env.REPO}/issues`;
  }

  async createIssue(owner, repo, title, body, assignees, labels) {
    const response = await this.octokit.request(this.createIssueEndpoint, {
      owner,
      repo,
      title,
      body,
      assignees,
      labels,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    });
    return response;
  }

  async editIssue(owner, repo, issue_number, body) {
    const response = await this.octokit.request(this.editIssueEndpoint + `/${issue_number}`, {
      owner,
      repo,
      issue_number,
      body,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    });
    return response;
  }

  async lockIssue(owner, repo, issue_number) {
    const response = await this.octokit.request(this.lockIssueEndpoint + `/${issue_number}/lock`, {
      owner,
      repo,
      issue_number,
      lock_reason: 'off-topic',
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    });
    return response;
  }
}

module.exports = IssuePage;
