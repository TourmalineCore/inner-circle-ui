import { ChangeEvent, useContext } from 'react';
import { Input } from '@tourmalinecore/react-tc-ui-kit';
import { NumberFormatValues, PatternFormat } from 'react-number-format';
import { observer } from 'mobx-react-lite';
import { ReactComponent as IconPhone } from '../../../../assets/icons/icon-phone.svg';
import { ReactComponent as IconMessage } from '../../../../assets/icons/icon-message.svg';
import { ReactComponent as IconGithub } from '../../../../assets/icons/icon-github.svg';
import { ReactComponent as IconGitlab } from '../../../../assets/icons/icon-gitlab.svg';
import { InfoCard } from '../components/info-card/InfoCard';
import { ProfileStateContext } from '../../state/ProfileStateContext';
import { ProfileSkeleton } from '../components/skeleton/ProfileSkeleton';
import { InfoEditableCard } from './components/info-editable-card/InfoEditableCard';

export const ContactsInfo = observer(({
  editEmployeeAsync,
} : {
  editEmployeeAsync: () => unknown,
}) => {
  const profileState = useContext(ProfileStateContext);

  const employee = profileState.employeeInfo;

  return (
    <div className="profile__box">
      <div className="profile__edit-box">
        <h2 className="profile__head">Contacts</h2>
        {
          !profileState.isLoading && (
            <div className="profile__buttons">
              {
                !profileState.isEdit ? (
                  <button
                    type="button"
                    className="profile__button"
                    onClick={() => profileState.setIsEdit(true)}
                  >
                    Edit
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      className="profile__button"
                      onClick={() => {
                        editEmployeeAsync();
                      }}
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="profile__button"
                      onClick={() => {
                        profileState.setIsEdit(false);
                        profileState.setEmployee(employee);
                        profileState.setTriedToSubmit(false);
                      }}
                    >
                      Cancel
                    </button>
                  </>
                )
              }
            </div>
          )
        }
      </div>
      {
        profileState.isLoading ? (
          <ProfileSkeleton
            id="loading-contacts"
          />
        ) : (
          <>
            <InfoCard
              isHaveValue={profileState.isEdit || !!(employee.phone && employee.phone.length > 9)}
              value={(
                <PatternFormat
                  className="profile__contacts-info"
                  type="tel"
                  format="+7 (###) ### ## ##"
                  customInput={Input}
                  displayType={
                    !profileState.isEdit
                      ? 'text'
                      : 'input'
                  }
                  value={employee.phone}
                  onValueChange={(event: NumberFormatValues) => profileState.setEmployee({ ...employee, phone: event.value })}
                  mask="_"
                  allowEmptyFormatting
                  valueIsNumericString
                />
              )}
              isError={!(employee.phone && employee.phone.length > 9) && profileState.triedToSubmit}
              label="Phone Number"
              icon={<IconPhone />}
            />

            <InfoEditableCard
              value={employee.personalEmail}
              label="Personal Email"
              icon={<IconMessage />}
              onChange={(event: ChangeEvent<HTMLInputElement>) => profileState.setEmployee({
                ...employee,
                personalEmail: event.target.value,
              })}
            />

            <InfoEditableCard
              value={employee.gitHub}
              label="Personal GitHub"
              icon={<IconGithub />}
              onChange={(event: ChangeEvent<HTMLInputElement>) => profileState.setEmployee({
                ...employee,
                gitHub: event.target.value,
              })}
            />

            <InfoEditableCard
              value={employee.gitLab}
              label="Personal GitLab"
              icon={<IconGitlab />}
              onChange={(event: ChangeEvent<HTMLInputElement>) => profileState.setEmployee({
                ...employee,
                gitLab: event.target.value,
              })}
            />
          </>
        )
      }
    </div>
  );
});
