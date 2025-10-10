import './EmployeeList.scss'

import { observer } from 'mobx-react-lite'
import Skeleton from 'react-loading-skeleton'
import { Employee } from '../../types'
import { EmployeeItem } from './components/EmployeeItem'
import clsx from 'clsx'
import { hasAccessPermission } from '../../../../common/utils/tokenUtils'

export const EmployeeList = observer(({
  isLoading,
  employees = [],
}: {
  isLoading: boolean,
  employees: Employee[],
}) => {

  return (
    <ul 
      className={clsx(`employee-list`, {
        'employee-list--two-column': !hasAccessPermission({
          permission: `ViewSalaryAndDocumentsData`,
        }),
      })}
    >
      {isLoading && (<Skeleton className="employee-list__skeleton"
        count={4} />)}
      {employees.length === 0 && (<li>List empty</li>)}
      {employees.length > 0 && employees.map((employee) => (
        <EmployeeItem key={employee.employeeId}
          employee={employee} />
      ))}
    </ul>
  )
})