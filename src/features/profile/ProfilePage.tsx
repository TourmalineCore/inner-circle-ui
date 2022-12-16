import React, { useEffect, useState } from 'react';

import { Button } from '@tourmalinecore/react-tc-ui-kit';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as IconGithub } from '../../assets/icons/iconGithub.svg';
import { ReactComponent as IconGitlab } from '../../assets/icons/iconGitlab.svg';
import { ReactComponent as IconPhone } from '../../assets/icons/icon-phone.svg';
import { ReactComponent as Email } from '../../assets/icons/icon-email.svg';
import { Employee } from './types/Profile';
import { api } from '../../common/api';
import InfoComponent from './components/InfoComponent/InfoComponent';

import './ProfilePage.css';

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

  const history = useNavigate();

  useEffect(() => { loadEmployeesAsync(); }, []);

  return (
    <div className="profile">
      <div className="profile-info">
        <h2>{employee.fullName}</h2>
        <InfoComponent
          value={employee.corporateEmail}
          icon={(
            <Email
              style={{
                display: 'block',
                width: 40,
                height: 40,

              }}
            />
          )}
        />
        <InfoComponent
          value={employee.personalEmail}
          icon={(
            <Email
              style={{
                display: 'block',
                width: 40,
                height: 40,

              }}
            />
          )}
        />
        <InfoComponent
          value={employee.phone!}
          icon={(
            <IconPhone
              style={{
                display: 'block',
                width: 40,
                height: 40,

              }}
            />
          )}
        />
        <InfoComponent
          value={employee.gitHub!}
          icon={(
            <IconGithub
              style={{
                display: 'block',
                width: 40,
                height: 40,

              }}
            />
          )}
        />
        <InfoComponent
          value={employee.gitLab!}
          icon={(
            <IconGitlab
              style={{
                display: 'block',
                width: 40,
                height: 40,

              }}
            />
          )}
        />
        <div className="profile-info__buttons">
          <Button
            type="button"
            onClick={() => { history('/profile/edit'); }}
          >
            Edit
          </Button>
        </div>
      </div>
    </div>
  );

  async function loadEmployeesAsync() {
    const { data } = await api.get<Employee>('employees/get-profile');
    setEmployee(data);
  }
}

export default ProfilePage;
