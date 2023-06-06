import { createContext } from 'react';
import RoutesState from './RoutesState';

const RoutesStateContext = createContext<RoutesState>(null as unknown as RoutesState);

export default RoutesStateContext;
