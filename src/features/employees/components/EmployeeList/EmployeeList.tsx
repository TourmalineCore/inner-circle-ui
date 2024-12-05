import { observer } from 'mobx-react-lite';
import Skeleton from 'react-loading-skeleton';
import clsx from 'clsx';
import { useContext } from 'react';
import { Employee } from '../../types';
import EmployeeItem from './components/EmployeeItem';
import AccessBasedOnPemissionsStateContext from '../../../../routes/state/AccessBasedOnPemissionsStateContext';

function EmployeeList({
  isLoading,
  employees = [],
}: {
  isLoading: boolean;
  employees: Employee[];
}) {
  const accessBasedOnPemissionsState = useContext(AccessBasedOnPemissionsStateContext);

  return (
    <ul className={clsx('employee-list', {
      'employee-list--two-column': !accessBasedOnPemissionsState.accessPermissions.get('ViewSalaryAndDocumentsData'),
    })}
    >
      {isLoading && (<Skeleton className="employee-list__skeleton" count={4} />)}
      {employees.length === 0 && (<li>List empty</li>)}
      {employees.length > 0 && employees.map((employee) => (
        <EmployeeItem key={employee.employeeId} employee={employee} />
      ))}
    </ul>
  );
}

export default observer(EmployeeList);
