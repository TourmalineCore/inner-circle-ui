/* eslint-disable jest/no-disabled-tests */
import { create, act } from 'react-test-renderer';
import Indicators from './Indicators';
import { server } from '../../../../mocks/server';

describe('Indicator tests', () => {
  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  it.skip('should successfully render and match to snapshot', () => {
    const component = create(<Indicators />).toJSON();
    expect(component).toMatchSnapshot();
  });
  it('should render with get request with rights values and match to snapshot', async () => {
    let component;
    act(() => {
      component = create(<Indicators />);
    });

    await expect(component).toMatchSnapshot();
  });
});
