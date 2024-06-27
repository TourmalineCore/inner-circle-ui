import { observer } from 'mobx-react-lite';
import Skeleton from 'react-loading-skeleton';
import clsx from 'clsx';
import { useContext } from 'react';
import { Employee } from '../../types';
import EmployeeItem from './components/EmployeeItem';
import AccessBasedOnPermissionsStateContext from '../../../../routes/state/AccessBasedOnPermissionsStateContext';

export const EmployeeList = observer(({
  isLoading,
  employees = [],
}: {
  isLoading: boolean;
  employees: Employee[];
}) => {
  const accessBasedOnPermissionsState = useContext(AccessBasedOnPermissionsStateContext);
  const hasAccess = !accessBasedOnPermissionsState.accessPermissions.get('ViewSalaryAndDocumentsData');

  return (
    <ul
      data-cy="employee-list"
      className={clsx('employee-list', {
        'employee-list--two-column': !hasAccess,
      })}
    >
      {
        isLoading && (
          <Skeleton
            data-cy="employee-list-skeleton"
            className="employee-list__skeleton"
            count={4}
          />
        )
      }
      {
        employees.length === 0 && (
          <li>List empty</li>
        )
      }
      {
        employees.length > 0 && employees
          .map((employee) => (
            <EmployeeItem
              key={employee.employeeId}
              employee={employee}
            />
          ))
      }
    </ul>
  );
});
