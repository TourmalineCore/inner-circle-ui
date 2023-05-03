import {
  ChangeEvent, Fragment, useEffect, useState,
} from 'react';

import { Button, Input } from '@tourmalinecore/react-tc-ui-kit';
import Skeleton from 'react-loading-skeleton';
import { NumberFormatValues, NumericFormat, PatternFormat } from 'react-number-format';
import { LINK_TO_SALARY_SERVICE } from '../../common/config/config';
import { Employee } from './types/Profile';
import { api } from '../../common/api';
import InfoComponent from './components/InfoComponent/InfoComponent';

import { ReactComponent as IconProfile } from '../../assets/icons/icon-profile.svg';
import { ReactComponent as IconBoxPercent } from '../../assets/icons/icon-box-percent.svg';
import { ReactComponent as IconGithub } from '../../assets/icons/icon-github.svg';
import { ReactComponent as IconGitlab } from '../../assets/icons/icon-gitlab.svg';
import { ReactComponent as IconMessage } from '../../assets/icons/icon-message.svg';
import { ReactComponent as IconMoney } from '../../assets/icons/icon-money.svg';
import { ReactComponent as IconOutlineEmail } from '../../assets/icons/icon-outline-email.svg';
import { ReactComponent as IconPercent } from '../../assets/icons/icon-percent.svg';
import { ReactComponent as IconPhone } from '../../assets/icons/icon-phone.svg';
import { ReactComponent as IconVirginmoney } from '../../assets/icons/icon-virginmoney.svg';
// import CustomPatternFormat from '../employees/components/EmployeeEdit/components/CustomPatternFormat/CustomPatternFormat';

function ProfilePage() {
  const [employee, setEmployee] = useState<Employee>(
    {
      id: 0,
      fullName: '',
      corporateEmail: '',
      personalEmail: '',
      phone: '',
      gitHub: '',
      gitLab: '',
    },
  );

  const [initEmployee, initSetEmployee] = useState<Employee>(
    {
      id: 0,
      fullName: '',
      corporateEmail: '',
      personalEmail: '',
      phone: '',
      gitHub: '',
      gitLab: '',
    },
  );

  const [triedToSubmit, setTriedToSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    loadEmployeeAsync();
  }, []);

  return (
    <div className="profile">
      <h1>My Profile</h1>
      <div className="profile__inner">

        <div className="profile__box">
          <h2>General information</h2>
          {isLoading && <Skeleton className="profile__skeleton" count={2} containerTestId="loading-general-information" />}
          {!isLoading && (
            <div>
              <InfoComponent value={employee.fullName} label="Name" icon={<IconProfile />} />
              <InfoComponent value={employee.corporateEmail} label="Corporate Email" icon={<IconOutlineEmail />} />
            </div>
          )}
        </div>

        <div className="profile__box">
          <div className="profile__edit-box">
            <h2>Contacts</h2>
            {!isLoading && (
              <div className="profile__buttons">
                {!isEdit ? (<Button onClick={() => setIsEdit(true)}>Edit</Button>) : (
                  <>
                    <Button onClick={() => {
                      editEmployeeAsync();
                    }}
                    >
                      Save
                    </Button>
                    <Button onClick={() => {
                      setIsEdit(false);
                      setEmployee(initEmployee);
                      setTriedToSubmit(false);
                    }}
                    >
                      Cansel
                    </Button>
                  </>
                )}
              </div>
            )}

          </div>
          {isLoading && <Skeleton className="profile__skeleton" count={4} containerTestId="loading-contacts" />}
          {!isLoading && (
            <div>
              <InfoComponent
                value={(
                  <PatternFormat
                    className=""
                    type="tel"
                    format="+7 (###) ### ## ##"
                    customInput={Input}
                    displayType={!isEdit ? 'text' : 'input'}
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
              <InfoComponent
                value={!isEdit ? employee.personalEmail : (
                  <Input
                    value={employee.personalEmail}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => setEmployee({ ...employee, personalEmail: event.target.value })}
                  />
                )}
                isError={!employee.personalEmail && triedToSubmit}
                label="Personal Email"
                icon={<IconMessage />}
              />
              <InfoComponent
                value={!isEdit ? employee.gitHub : (
                  <Input
                    value={employee.gitHub}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => setEmployee({ ...employee, gitHub: event.target.value })}
                  />
                )}
                isError={!employee.gitHub && triedToSubmit}
                label="Personal GitHub"
                icon={<IconGithub />}
              />
              <InfoComponent
                value={!isEdit ? employee.gitLab : (
                  <Input
                    value={employee.gitLab}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => setEmployee({ ...employee, gitLab: event.target.value })}
                  />
                )}
                isError={!employee.gitLab && triedToSubmit}
                label="Personal GitLab"
                icon={<IconGitlab />}
              />
            </div>
          )}
        </div>

        <div className="profile__box">
          <h2>Salary</h2>
          {isLoading && <Skeleton className="profile__skeleton" count={4} containerTestId="loading-salary" />}
          {!isLoading && (
            <div>
              <InfoComponent
                value={(
                  <NumericFormat
                    type="text"
                    displayType="text"
                    value={20000}
                    valueIsNumericString
                    allowLeadingZeros
                    thousandSeparator=","
                    suffix=" ₽"
                  />
                )}
                label="Full Salary"
                icon={<IconMoney />}
              />
              <InfoComponent
                value={(
                  <NumericFormat
                    type="text"
                    displayType="text"
                    value={20000}
                    valueIsNumericString
                    allowLeadingZeros
                    style={{
                      color: '#1ED400',
                    }}
                    prefix="+ "
                    thousandSeparator=","
                    suffix=" ₽"
                  />
                )}
                label="District Coefficient (15 %)"
                icon={<IconPercent />}
              />
              <InfoComponent
                value={(
                  <NumericFormat
                    displayType="text"
                    value={20000}
                    valueIsNumericString
                    allowLeadingZeros
                    style={{
                      color: '#DA2228',
                    }}
                    prefix="- "
                    thousandSeparator=","
                    suffix=" ₽"
                  />
                )}
                label="Income Tax (13 %)"
                icon={<IconBoxPercent />}
              />
              <InfoComponent
                value={(
                  <NumericFormat
                    displayType="text"
                    value={20000}
                    valueIsNumericString
                    thousandSeparator=","
                    suffix=" ₽"
                  />
                )}
                label="Net Salary"
                icon={<IconVirginmoney />}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );

  async function loadEmployeeAsync() {
    setIsLoading(true);
    try {
      const { data } = await api.get<Employee>(`${LINK_TO_SALARY_SERVICE}employees/get-profile`);

      const initialData = {
        ...data,
        phone: typeof data.phone === 'string' ? data.phone.split('').slice(2).join('') : data.phone,
      };

      setEmployee(initialData);
      initSetEmployee(initialData);
    } finally {
      setIsLoading(false);
    }
  }

  async function editEmployeeAsync() {
    setTriedToSubmit(true);

    const updateEmployee = {
      ...employee,
      phone: `+7${employee.phone}`,
    };

    try {
      await api.post<Employee>(`${LINK_TO_SALARY_SERVICE}employees/edit-profile`, updateEmployee);
      loadEmployeeAsync();
      setIsEdit(false);
      setTriedToSubmit(false);
    } catch (error) {
      console.log(error);
    }
  }
}

export default ProfilePage;
