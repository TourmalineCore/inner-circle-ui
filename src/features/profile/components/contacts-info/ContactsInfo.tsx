import { ChangeEvent } from 'react';
import { Input } from '@tourmalinecore/react-tc-ui-kit';
import { NumberFormatValues, PatternFormat } from 'react-number-format';
import { Employee } from '../../types/Profile';
import { InfoCard } from '../info-card/InfoCard';
import { ReactComponent as IconPhone } from '../../../../assets/icons/icon-phone.svg';
import { ReactComponent as IconMessage } from '../../../../assets/icons/icon-message.svg';
import { ReactComponent as IconGithub } from '../../../../assets/icons/icon-github.svg';
import { ReactComponent as IconGitlab } from '../../../../assets/icons/icon-gitlab.svg';

export const ContactsInfo = ({
  employee,
  isEdit,
  setEmployee,
  triedToSubmit,
} : {
  employee: Employee,
  isEdit: boolean,
  setEmployee: React.Dispatch<React.SetStateAction<Employee>>,
  triedToSubmit: boolean,
}) => (
  <>
    <InfoCard
      isHaveValue={
        isEdit || !!(employee.phone && employee.phone.length > 9)
      }
      value={(
        <PatternFormat
          className="profile__contacts-info"
          type="tel"
          format="+7 (###) ### ## ##"
          customInput={Input}
          displayType={
            !isEdit
              ? 'text'
              : 'input'
          }
          value={employee.phone}
          onValueChange={(event: NumberFormatValues) => setEmployee({ ...employee, phone: event.value })}
          mask="_"
          allowEmptyFormatting
          valueIsNumericString
        />
      )}
      isError={!(employee.phone && employee.phone.length > 9) && triedToSubmit}
      label="Phone Number"
      icon={<IconPhone />}
    />
    <InfoCard
      isHaveValue={
        isEdit || !!employee.personalEmail
      }
      value={
        !isEdit
          ? employee.personalEmail
          : (
            <Input
              value={employee.personalEmail || ''}
              maxLength={40}
              onChange={(event: ChangeEvent<HTMLInputElement>) => setEmployee({ ...employee, personalEmail: event.target.value })}
            />
          )
      }
      label="Personal Email"
      icon={<IconMessage />}
    />
    <InfoCard
      isHaveValue={
        isEdit || !!employee.gitHub
      }
      value={
        !isEdit
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
                onChange={(event: ChangeEvent<HTMLInputElement>) => setEmployee({ ...employee, gitHub: event.target.value })}
              />
            </div>
          )
      }
      label="Personal GitHub"
      icon={<IconGithub />}
    />
    <InfoCard
      isHaveValue={
        isEdit || !!employee.gitLab
      }
      value={
        !isEdit
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
                onChange={(event: ChangeEvent<HTMLInputElement>) => setEmployee({ ...employee, gitLab: event.target.value })}
              />
            </div>
          )
      }
      label="Personal GitLab"
      icon={<IconGitlab />}
    />
  </>
);
