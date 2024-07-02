import Skeleton from 'react-loading-skeleton';
import { ReactComponent as IconProfile } from '../../../../assets/icons/icon-profile.svg';
import { ReactComponent as IconOutlineEmail } from '../../../../assets/icons/icon-outline-email.svg';
import { Employee } from '../../types/Profile';
import { InfoCard } from '../components/info-card/InfoCard';

export const GeneralInfo = ({
  employee,
  isLoading,
} : {
  employee: Employee
  isLoading: boolean
}) => (
  <div className="profile__box">
    <h2 className="profile__head">General information</h2>
    {
      isLoading ? (
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
