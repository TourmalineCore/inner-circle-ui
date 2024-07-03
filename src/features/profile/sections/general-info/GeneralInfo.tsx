import Skeleton from 'react-loading-skeleton';
import { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { ReactComponent as IconProfile } from '../../../../assets/icons/icon-profile.svg';
import { ReactComponent as IconOutlineEmail } from '../../../../assets/icons/icon-outline-email.svg';
import { InfoCard } from '../components/info-card/InfoCard';
import { ProfileStateContext } from '../../state/ProfileStateContext';

export const GeneralInfo = observer(() => {
  const profileState = useContext(ProfileStateContext);

  const employee = profileState.employeeInfo;

  return (
    <div className="profile__box">
      <h2 className="profile__head">General information</h2>
      {
        profileState.isLoading ? (
          <Skeleton
            className="profile__skeleton"
            count={2}
            containerTestId="loading-general-information"
          />
        ) : (
          <>
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
          </>
        )
      }
    </div>
  );
});
