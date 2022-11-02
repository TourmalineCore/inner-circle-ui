const QaseApiHelper = require('./QaseApiHelper');

async function completeLastTestRun() {
  const response = await QaseApiHelper.getAllTestRuns()
    .then((res) => res.result.entities);
  const runsToComplete = response.filter((obj) => obj.status_text === 'active' && obj.stats.total === obj.stats.passed + obj.stats.failed + obj.stats.skipped);
  runsToComplete.forEach(async ({ id }) => {
    await QaseApiHelper.completeTestRun(id);
  });
}

completeLastTestRun();
