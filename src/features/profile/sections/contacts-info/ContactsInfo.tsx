import { ChangeEvent, useContext } from 'react';
import { Input } from '@tourmalinecore/react-tc-ui-kit';
import { NumberFormatValues, PatternFormat } from 'react-number-format';
import Skeleton from 'react-loading-skeleton';
import { observer } from 'mobx-react-lite';
import { ReactComponent as IconPhone } from '../../../../assets/icons/icon-phone.svg';
import { ReactComponent as IconMessage } from '../../../../assets/icons/icon-message.svg';
import { ReactComponent as IconGithub } from '../../../../assets/icons/icon-github.svg';
import { ReactComponent as IconGitlab } from '../../../../assets/icons/icon-gitlab.svg';
import { InfoCard } from '../components/info-card/InfoCard';
import { ProfileStateContext } from '../../state/ProfileStateContext';

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
          <Skeleton
            className="profile__skeleton"
            count={4}
            containerTestId="loading-contacts"
          />
        ) : (
          <>
            <InfoCard
              isHaveValue={
                profileState.isEdit || !!(employee.phone && employee.phone.length > 9)
              }
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
            <InfoCard
              isHaveValue={
                profileState.isEdit || !!employee.personalEmail
              }
              value={
                !profileState.isEdit
                  ? employee.personalEmail
                  : (
                    <Input
                      value={employee.personalEmail || ''}
                      maxLength={40}
                      onChange={(event: ChangeEvent<HTMLInputElement>) => profileState.setEmployee({ ...employee, personalEmail: event.target.value })}
                    />
                  )
              }
              label="Personal Email"
              icon={<IconMessage />}
            />
            <InfoCard
              isHaveValue={
                profileState.isEdit || !!employee.gitHub
              }
              value={
                !profileState.isEdit
                  ? employee.gitHub
                  : (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                    >
                      @
                      <Input
                        value={employee.gitHub || ''}
                        maxLength={39}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => profileState.setEmployee({ ...employee, gitHub: event.target.value })}
                      />
                    </div>
                  )
              }
              label="Personal GitHub"
              icon={<IconGithub />}
            />
            <InfoCard
              isHaveValue={
                profileState.isEdit || !!employee.gitLab
              }
              value={
                !profileState.isEdit
                  ? employee.gitLab
                  : (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                    >
                      @
                      <Input
                        value={employee.gitLab || ''}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => profileState.setEmployee({ ...employee, gitLab: event.target.value })}
                      />
                    </div>
                  )
              }
              label="Personal GitLab"
              icon={<IconGitlab />}
            />
          </>
        )
      }
    </div>
  );
});
