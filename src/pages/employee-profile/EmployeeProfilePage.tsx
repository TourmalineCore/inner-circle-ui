import { useMemo} from 'react'
import { EmployeeProfileStateContext } from './state/EmployeeProfileStateContext'
import { EmployeeProfileContainer } from './EmployeeProfileContainer'
import { EmployeeProfileState } from './state/EmployeeProfileState'

export function EmployeeProfilePage() {
  const employeeProfileState = useMemo(
    () => new EmployeeProfileState(),
    [],
  )
  
  return (
    <EmployeeProfileStateContext.Provider value={employeeProfileState}>
      <EmployeeProfileContainer />
    </EmployeeProfileStateContext.Provider>
  )
}
