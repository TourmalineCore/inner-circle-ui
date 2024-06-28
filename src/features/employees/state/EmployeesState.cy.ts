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

  it(`
  GIVEN employees page 
  WHEN called update filter
  THEN get value filter
  `, () => {
    employeesState.updateFilterTerm('all');
    expect(employeesState.filterTerm).eq('all');

    employeesState.updateFilterTerm('current');
    expect(employeesState.filterTerm).eq('current');

    employeesState.updateFilterTerm('fired');
    expect(employeesState.filterTerm).eq('fired');

    employeesState.updateFilterTerm('blank');
    expect(employeesState.filterTerm).eq('blank');
  });

  it(`
  GIVEN employees page 
  WHEN called update sorting
  THEN get update sorting elements
  `, () => {
    employeesState.updateSortTerm('default');
    expect(employeesState.sortTerm).eq('default');

    employeesState.updateSortTerm('desc');
    expect(employeesState.sortTerm).eq('desc');

    employeesState.updateSortTerm('asc');
    expect(employeesState.sortTerm).eq('asc');
  });

  it(`
  GIVEN employees page 
  WHEN called update search
  THEN get update search elements
  `, () => {
    employeesState.updateSearchTerm('text');
    expect(employeesState.searchTerm).eq('text');
  });

  it(`
  GIVEN not blank employee 
  WHEN called isBlankEmployee property
  THEN return false
  `, () => {
    employeesState.changeEmployees([
      getEmployee({}),
    ]);
    expect(employeesState.isBlankEmployees).eq(false);
  });
});
