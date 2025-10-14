import { useMemo } from 'react'
import { EmployeesStateContext } from './state/EmployeesStateContext'
import { EmployeesState } from './state/EmployeesState'
import { authService } from '../../common/authService'
import { EmployeeContainer } from './EmployeeContainer'

export function EmployeesPage() {
  const employeesState = useMemo(
    () => new EmployeesState(),
    [],
  )

  return (
    <EmployeesStateContext.Provider value={employeesState}>
      <authService.AuthContext.Provider
        value={[
          authService.getAuthToken(),
        ]}
      >
        <EmployeeContainer />
      </authService.AuthContext.Provider>
    </EmployeesStateContext.Provider>
  )
}
