import { createContext } from 'react'
import { EmployeesState } from './EmployeesState'

// @ts-ignore
export const EmployeesStateContext = createContext<EmployeesState>()
