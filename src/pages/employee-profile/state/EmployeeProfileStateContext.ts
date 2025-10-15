import { createContext } from 'react'
import { EmployeeProfileState } from './EmployeeProfileState'

export const EmployeeProfileStateContext = createContext<EmployeeProfileState>(null as unknown as EmployeeProfileState)
