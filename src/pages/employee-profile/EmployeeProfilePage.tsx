import { useMemo} from 'react'
import { EmployeeProfileStateContext } from './state/EmployeeProfileStateContext'
import { EmployeeProfileContainer } from './EmployeeProfileContainer'
import { EmployeeProfileState } from './state/EmployeeProfileState'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export function EmployeeProfilePage() {
  const employeeProfileState = useMemo(
    () => new EmployeeProfileState(),
    [],
  )
  
  return (
    <EmployeeProfileStateContext.Provider value={employeeProfileState}>
      <EmployeeProfileContainer />
      <ToastContainer />
    </EmployeeProfileStateContext.Provider>
  )
}
