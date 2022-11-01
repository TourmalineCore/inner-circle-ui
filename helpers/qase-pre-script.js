const QaseApiHelper = require('./QaseApiHelper');

async function deleteLastTestRun() {
  const response = await QaseApiHelper.getAllTestRuns()
    .then((res) => res.result.entities);
  const idsToDelete = response.filter(({ status_text: statusText }) => statusText === 'active');

  if (idsToDelete.length === 2) {
    QaseApiHelper.deleteTestRun(idsToDelete[0].id);
  }
}

deleteLastTestRun();
