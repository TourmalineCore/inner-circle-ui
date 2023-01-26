/* eslint-disable jest/no-disabled-tests */
import {
  render, screen,
} from '@testing-library/react';
import Indicators from './Indicators';
import { server } from '../../../../mocks/server';

describe('Indicator tests', () => {
  beforeAll(() => server.listen());

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => server.close());

  it('should successfully render and match to snapshot', () => {
    const component = render(<Indicators />);
    expect(component).toMatchSnapshot();
  });
  it('should render with get request with rights values and match to snapshot', async () => {
    const component = render(<Indicators />);
    const rerenderedIndicators = await screen.findByTestId('indicators');
    expect(rerenderedIndicators).toBeInTheDocument();
    expect(component).toMatchSnapshot();
  });
});
