import { ReactComponent as IconProfile } from '../../../../assets/icons/icon-profile.svg';
import { ReactComponent as IconOutlineEmail } from '../../../../assets/icons/icon-outline-email.svg';
import { Employee } from '../../types/Profile';
import { InfoCard } from '../info-card/InfoCard';

export const EmployeeGeneralInfo = ({
  employee,
} : {
  employee: Employee
}) => (
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
);
