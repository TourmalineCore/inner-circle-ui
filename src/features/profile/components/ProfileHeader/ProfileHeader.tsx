import { ReactNode } from 'react';

function ProfileHeader({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="profile-header">{children}</div>
  );
}

export default ProfileHeader;
