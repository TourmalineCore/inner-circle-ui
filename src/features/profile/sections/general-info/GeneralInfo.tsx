import { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { ReactComponent as IconProfile } from '../../../../assets/icons/icon-profile.svg';
import { ReactComponent as IconOutlineEmail } from '../../../../assets/icons/icon-outline-email.svg';
import { InfoCard } from '../components/info-card/InfoCard';
import { ProfileStateContext } from '../../state/ProfileStateContext';
import { ProfileSkeleton } from '../components/skeleton/ProfileSkeleton';

export const GeneralInfo = observer(() => {
  const profileState = useContext(ProfileStateContext);

  const employee = profileState.employeeInfo;

  return (
    <div
      className="profile__box"
      data-cy="general-info"
    >
      <h2
        className="profile__head"
        data-cy="general-info-head"
      >
        General information
      </h2>
      {
        profileState.isLoading ? (
          <ProfileSkeleton
            count={2}
            id="loading-general-information"
          />
        ) : (
          <div data-cy="general-info-cards">
            <InfoCard
              isHaveValue={!!employee.fullName}
              value={employee.fullName}
              label="Name"
              icon={<IconProfile />}
            />
            <InfoCard
              isHaveValue={!!employee.corporateEmail}
              value={employee.corporateEmail}
              label="Corporate Email"
              icon={<IconOutlineEmail />}
            />
          </div>
        )
      }
    </div>
  );
});
