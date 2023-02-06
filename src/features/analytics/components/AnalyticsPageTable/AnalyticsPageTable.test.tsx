/* eslint-disable jest/no-disabled-tests */
import {
  render, screen,
} from '@testing-library/react';
import AnalyticsPageTable from './AnalyticsPageTable';
import { server } from '../../../../mocks/server';

describe('AnalyticsPageTable tests', () => {
  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  it('should successfully render and match to snapshot', () => {
    const component = render(<AnalyticsPageTable />);
    expect(component).toMatchSnapshot();
  });
  it('should render with get request with rights values and match to snapshot', async () => {
    const component = render(<AnalyticsPageTable />);
    const rerenderedIndicators = await screen.findByTestId('content-card');
    expect(rerenderedIndicators).toBeInTheDocument();
    expect(component).toMatchSnapshot();
  });
});
