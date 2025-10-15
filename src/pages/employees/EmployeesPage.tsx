import { useMemo } from 'react'
import { EmployeesStateContext } from './state/EmployeesStateContext'
import { EmployeesState } from './state/EmployeesState'
import { authService } from '../../common/authService'
import { EmployeesContainer } from './EmployeesContainer'

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
        <EmployeesContainer />
      </authService.AuthContext.Provider>
    </EmployeesStateContext.Provider>
  )
}
