import './EmployeeList.scss'

import { observer } from 'mobx-react-lite'
import { Employee } from '../../../../types/employee'
import { EmployeeItem } from '../employee-item/EmployeeItem'

export const EmployeeList = observer(({
  employees = [],
}: {
  employees: Employee[],
}) => {
  return (
    <ul className='employee-list'>
      {
        employees.map((employee) => (
          <EmployeeItem
            key={employee.employeeId}
            employee={employee}
          />
        ))
      }
    </ul>
  )
})
