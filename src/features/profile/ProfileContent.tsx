import { observer } from 'mobx-react-lite';
import { GeneralInfo } from './sections/general-info/GeneralInfo';
import { ContactsInfo } from './sections/contacts-info/ContactsInfo';
import { SalaryInfo } from './sections/salary-info/SalaryInfo';

export const ProfileContent = observer(({
  editEmployeeAsync,
} : {
  editEmployeeAsync: () => unknown
}) => (
  <div className="profile" data-cy="profile">
    <div className="profile__inner">
      <GeneralInfo />
      <ContactsInfo editEmployeeAsync={editEmployeeAsync} />
      <SalaryInfo />
    </div>
  </div>
));
