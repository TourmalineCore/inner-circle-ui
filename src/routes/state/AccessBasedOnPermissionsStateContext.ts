import { createContext } from 'react';
import AccessBasedOnPermissionsState from './AccessBasedOnPermissionsState';

const AccessBasedOnPermissionsStateContext = createContext<AccessBasedOnPermissionsState>(null as unknown as AccessBasedOnPermissionsState);

export default AccessBasedOnPermissionsStateContext;
