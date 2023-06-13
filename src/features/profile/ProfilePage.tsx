import {
  ChangeEvent, useEffect, useState,
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

const initialValues = {
  id: 0,
  fullName: '',
  corporateEmail: '',
  personalEmail: '',
  phone: '',
  gitHub: '',
  gitLab: '',
  fullSalary: 0,
  districtCoefficient: 0,
  incomeTax: 0,
  netSalary: 0,
  isSalaryInfoFilled: false,
  isEmployedOfficially: false,
};

const PLACEHOLDER_TEXT = 'I will be...';

function ProfilePage() {
  const [employee, setEmployee] = useState<Employee>(initialValues);
  const [initEmployee, initSetEmployee] = useState<Employee>(initialValues);

  const [triedToSubmit, setTriedToSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    loadEmployeeAsync();
  }, []);

  return (
    <div className="profile">
      <h1 className="heading">My Profile</h1>
      <div className="profile__inner">
        <div className="profile__box">
          <h2>General information</h2>
          {isLoading && <Skeleton className="profile__skeleton" count={2} containerTestId="loading-general-information" />}
          {!isLoading && (
            <div>
              <InfoComponent isHaveValue={!employee.fullName} value={employee.fullName} label="Name" icon={<IconProfile />} />
              <InfoComponent isHaveValue={!employee.corporateEmail} value={employee.corporateEmail} label="Corporate Email" icon={<IconOutlineEmail />} />
            </div>
          )}
        </div>

        <div className="profile__box">
          <div className="profile__edit-box">
            <h2>Contacts</h2>
            {!isLoading && (
              <div className="profile__buttons">
                {!isEdit ? (
                  <Button
                    className="profile__button"
                    onClick={() => setIsEdit(true)}
                  >
                    Edit
                  </Button>
                ) : (
                  <>
                    <Button
                      className="profile__button"
                      onClick={() => {
                        editEmployeeAsync();
                      }}
                    >
                      Save
                    </Button>
                    <Button
                      className="profile__button"
                      onClick={() => {
                        setIsEdit(false);
                        setEmployee(initEmployee);
                        setTriedToSubmit(false);
                      }}
                    >
                      Cancel
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
                isHaveValue={employee.phone.length < 9}
                value={(
                  <PatternFormat
                    className="profile__contacts-info"
                    type="tel"
                    format="+7 (###) ### ## ##"
                    customInput={Input}
                    displayType={!isEdit ? 'text' : 'input'}
                    value={employee.phone}
                    onValueChange={(event: NumberFormatValues) => setEmployee({ ...employee, phone: event.value })}
                    mask="_"
                    allowEmptyFormatting
                    valueIsNumericString
                    renderText={(formattedValue) => {
                      if (formattedValue === '+7 (___) ___ __ __') {
                        return PLACEHOLDER_TEXT;
                      }

                      return formattedValue;
                    }}
                  />
                )}
                isError={!(employee.phone && employee.phone.length > 9) && triedToSubmit}
                label="Phone Number"
                icon={<IconPhone />}
              />
              <InfoComponent
                isHaveValue={!employee.personalEmail}
                value={!isEdit
                  ? employee.personalEmail
                  : (
                    <Input
                      value={employee.personalEmail}
                      maxLength={40}
                      onChange={(event: ChangeEvent<HTMLInputElement>) => setEmployee({ ...employee, personalEmail: event.target.value })}
                    />
                  )}
                label="Personal Email"
                icon={<IconMessage />}
              />
              <InfoComponent
                isHaveValue={!employee.gitHub}
                value={!isEdit
                  ? employee.gitHub
                  : (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                    >
                      @
                      <Input
                        value={employee.gitHub}
                        maxLength={39}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => setEmployee({ ...employee, gitHub: event.target.value })}
                      />
                    </div>
                  )}
                label="Personal GitHub"
                icon={<IconGithub />}
              />
              <InfoComponent
                isHaveValue={!employee.gitLab}
                value={!isEdit
                  ? employee.gitLab
                  : (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                    >
                      @
                      <Input
                        value={employee.gitLab}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => setEmployee({ ...employee, gitLab: event.target.value })}
                      />
                    </div>
                  )}
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
              {employee.isSalaryInfoFilled ? (
                <>
                  <InfoComponent
                    isHaveValue={employee.fullSalary < 0}
                    value={(
                      <NumericFormat
                        type="text"
                        displayType="text"
                        value={employee.fullSalary}
                        valueIsNumericString
                        allowLeadingZeros
                        thousandSeparator=","
                        suffix=" ₽"
                      />
                    )}
                    label="Full Salary"
                    icon={<IconMoney />}
                  />
                  {employee.isEmployedOfficially && (
                    <InfoComponent
                      isHaveValue={employee.districtCoefficient < 0}
                      value={(
                        <NumericFormat
                          type="text"
                          displayType="text"
                          value={employee.districtCoefficient}
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
                  )}
                  {employee.isEmployedOfficially && (
                    <InfoComponent
                      isHaveValue={employee.incomeTax < 0}
                      value={(
                        <NumericFormat
                          displayType="text"
                          value={employee.incomeTax}
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
                  )}
                  {employee.isEmployedOfficially && (
                    <InfoComponent
                      isHaveValue={employee.netSalary < 0}
                      value={(
                        <NumericFormat
                          displayType="text"
                          value={employee.netSalary}
                          valueIsNumericString
                          thousandSeparator=","
                          suffix=" ₽"
                        />
                      )}
                      label="Net Salary"
                      icon={<IconVirginmoney />}
                    />
                  )}
                </>
              ) : (
                <span style={{ opacity: 0.5 }}>
                  Your salary will be filled soon..
                </span>
              )}

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
      personalEmail: employee.personalEmail,
      gitHub: employee.gitHub,
      gitLab: employee.gitLab,
      phone: `+7${employee.phone}`,
    };

    try {
      await api.put<Employee>(`${LINK_TO_SALARY_SERVICE}employees/update-profile`, updateEmployee);

      loadEmployeeAsync();
      setIsEdit(false);
    } finally {
      setTriedToSubmit(false);
    }
  }
}

export default ProfilePage;
