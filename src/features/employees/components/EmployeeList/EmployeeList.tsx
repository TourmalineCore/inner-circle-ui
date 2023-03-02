import { observer } from 'mobx-react-lite';
import { Employee } from '../../types';
import EmployeeItem from './components/EmployeeItem';

function EmployeeList({
  isLoading,
  employees = [],
}: {
  isLoading: boolean;
  employees: Employee[];
}) {
  if (isLoading) {
    <div>Loading...</div>;
  }

  return (
    <ul className="employee-list">
      {employees.length <= 0 && (<li>List empty</li>)}
      {employees.length > 0 && employees.map((employee) => (
        <EmployeeItem key={employee.employeeId} employee={employee} />
      ))}
    </ul>
  );
}

export default observer(EmployeeList);
