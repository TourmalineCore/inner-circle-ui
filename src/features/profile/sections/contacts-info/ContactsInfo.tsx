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
import { ContactsInfoButton } from './components/contacts-info-button/ContactsInfoButton';

export const ContactsInfo = observer(({
  editEmployeeAsync,
} : {
  editEmployeeAsync: () => unknown,
}) => {
  const profileState = useContext(ProfileStateContext);

  const employee = profileState.employeeInfo;
  const initialEmployee = profileState.initEmployee;
  const isDataLoading = profileState.isLoading;
  const isDataEdit = profileState.isEdit;

  return (
    <div
      className="profile__box"
      data-cy="contacts-info"
    >
      <div className="profile__edit-box">
        <h2
          className="profile__head"
          data-cy="contacts-info-head"
        >
          Contacts
        </h2>
        {
          !isDataLoading && (
            <div
              className="profile__buttons"
              data-cy="contacts-info-buttons"
            >
              {
                !isDataEdit ? (
                  <ContactsInfoButton
                    text="Edit"
                    onClick={() => profileState.setIsEdit(true)}
                  />
                ) : (
                  <>
                    <ContactsInfoButton
                      text="Save"
                      onClick={() => {
                        editEmployeeAsync();
                      }}
                    />

                    <ContactsInfoButton
                      text="Cancel"
                      onClick={() => {
                        profileState.setIsEdit(false);
                        profileState.setEmployee(initialEmployee);
                        profileState.setTriedToSubmit(false);
                      }}
                    />
                  </>
                )
              }
            </div>
          )
        }
      </div>
      {
        isDataLoading ? (
          <ProfileSkeleton
            id="loading-contacts"
          />
        ) : (
          <div data-cy="contacts-info-cards">
            <InfoCard
              isHaveValue={isDataEdit || !!(employee.phone && employee.phone.length > 9)}
              value={(
                <PatternFormat
                  className="profile__contacts-info"
                  type="tel"
                  format="+7 (###) ### ## ##"
                  customInput={Input}
                  displayType={
                    !isDataEdit
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
          </div>
        )
      }
    </div>
  );
});
