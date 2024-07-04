import { useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { ProfileStateContext } from './state/ProfileStateContext';
import { ProfileState } from './state/ProfileState';
import { ProfileContainer } from './sections/ProfileContainer';

export const ProfilePage = observer(() => {
  const profileState = useMemo(
    () => new ProfileState(),
    [],
  );

  return (
    <ProfileStateContext.Provider value={profileState}>
      <ProfileContainer />
    </ProfileStateContext.Provider>
  );
});
