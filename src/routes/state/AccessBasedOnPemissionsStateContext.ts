import { createContext } from 'react'
import { AccessBasedOnPemissionsState } from './AccessBasedOnPemissionsState'

export const AccessBasedOnPemissionsStateContext = createContext<AccessBasedOnPemissionsState>(null as unknown as AccessBasedOnPemissionsState)
