import AnalyticsPageTable from './AnalyticsPageTable';

import { MemoryRouter } from 'react-router-dom';

describe('AnalyticsPageTable tests', () => {
  beforeEach(() => {
    mockGetAnalytic();
    mountAnalyticsPageTable();
    waitResponse();
  });
})

function mountAnalyticsPageTable() {
  cy.mount(
    <MemoryRouter>
      <AnalyticsPageTable />
    </MemoryRouter>,
  );
}

function mockGetAnalytic() {
  cy.intercept('GET', '/api/salary/finance/get-analytic', {
    statusCode: 200,
    fixture: "get-analytics-data.json",
  })
  .as('getAnalytic');
}

function waitResponse() {
  cy.wait('@getAnalytic');
}