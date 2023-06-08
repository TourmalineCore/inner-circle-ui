import { createContext } from 'react';
import AccessBasedOnPemissionsState from './AccessBasedOnPemissionsState';

const AccessBasedOnPemissionsStateContext = createContext<AccessBasedOnPemissionsState>(null as unknown as AccessBasedOnPemissionsState);

export default AccessBasedOnPemissionsStateContext;
