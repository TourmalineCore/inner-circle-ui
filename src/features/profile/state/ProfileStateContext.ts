import { createContext } from 'react';
import { ProfileState } from './ProfileState';

export const ProfileStateContext = createContext<ProfileState>(null as unknown as ProfileState);
