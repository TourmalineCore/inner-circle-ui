import { rest } from 'msw';
import { API_ROOT, LINK_TO_SALARY_SERVICE } from '../common/config/config';

import totalFinanceData from './data/total-finance-data.json';
import getAnalyticsData from './data/get-analytics-data.json';

export const handlers = [
  // Handles a POST /login request
  rest.post(`${API_ROOT}${LINK_TO_SALARY_SERVICE}employees/create`, (req, res, ctx) => res(
    ctx.status(200),
  )),
  // Handles a GET /user request
  rest.get(`${API_ROOT}${LINK_TO_SALARY_SERVICE}finance/get-total-finance`, (req, res, ctx) => res(
    ctx.status(200),
    ctx.json(totalFinanceData),
  )),

  rest.get(`${API_ROOT}${LINK_TO_SALARY_SERVICE}finance/get-analytic`, (req, res, ctx) => res(
    ctx.status(200),
    ctx.json(getAnalyticsData),
  )),
];
