import { createContext } from 'react'
import { EmployeeEditState } from './EmployeeEditState'

export const EmployeeEditStateContext = createContext<EmployeeEditState>(null as unknown as EmployeeEditState)
