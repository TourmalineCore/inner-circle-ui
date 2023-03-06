import { createContext } from 'react';
import EmployeesState from './EmployeesState';

// @ts-ignore
const EmployeesStateContext = createContext<EmployeesState>();

export default EmployeesStateContext;
