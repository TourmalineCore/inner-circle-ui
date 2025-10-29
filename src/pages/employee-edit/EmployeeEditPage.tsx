import { useMemo } from 'react'
import { authService } from '../../common/authService'
import { EmployeeEditState } from './state/EmployeeEditState'
import { EmployeeEditStateContext } from './state/EmployeeEditStateContext'
import { EmployeesEditContainer } from './EmployeeEditContainer'

export function EmployeeEditPage() {
  const employeeEditState = useMemo(
    () => new EmployeeEditState(),
    [],
  )

  return (
    <EmployeeEditStateContext.Provider value={employeeEditState}>
      <authService.AuthContext.Provider
        value={[
          authService.getAuthToken(),
        ]}
      >
        <EmployeesEditContainer />
      </authService.AuthContext.Provider>
    </EmployeeEditStateContext.Provider>
  )
}
