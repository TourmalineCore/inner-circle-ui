import { createContext } from 'react'
import { EmployeesState } from './EmployeesState'

export const EmployeesStateContext = createContext<EmployeesState>(null as unknown as EmployeesState)
