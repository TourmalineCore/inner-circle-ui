import EmployeeAddPage from './EmployeeAddPage';

describe('EmployeeAddPage', () => {
  it('renders EmployeeAddPage', () => {
    const mockedUsedNavigate = jest.fn();
    jest.mock('react-router-dom', () => ({
        ...jest.requireActual('react-router-dom'),

    useNavigate: () => mockedUsedNavigate,
    }));

    cy.mount(
        <EmployeeAddPage
    />
    );
  })
})