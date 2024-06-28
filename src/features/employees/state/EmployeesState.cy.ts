import { getEmployee } from '../components/EmployeeList/components/EmployeeItem.cy';
import EmployeesState from './EmployeesState';

const employeesState = new EmployeesState();

describe('EmployeesState', () => {
  it(`
  GIVEN employees page 
  WHEN initialized
  THEN return all employees
  `, () => {
    employeesState.changeEmployees([
      getEmployee({}),
    ]);
    expect(employeesState.allEmployees).to.has.lengthOf(1);
  });
});
