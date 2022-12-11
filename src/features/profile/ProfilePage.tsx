import React, { useEffect, useState } from 'react';

import { Button } from '@tourmalinecore/react-tc-ui-kit';
import { faPhoneFlip, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import faGithub from '../../assets/icons/faGithub.svg';
import faGitlab from '../../assets/icons/faGitlab.svg';
import ProfileInfo from './components/ProfileInfo/ProfileInfo';
import { Employee } from './types/Profile';
import InfoComponent from './components/InfoComponent/InfoComponent';
import { api } from '../../common/api';

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
      <ProfileInfo
        rows={
          [
            <h2>{employee.fullName}</h2>,
            <InfoComponent
              name="corporateEmail"
              value={`${employee.corporateEmail}`}
              faIcon={faEnvelope}
            />,
            <InfoComponent
              name="personalEmail"
              value={`${employee.personalEmail || 'Not specified'}`}
              faIcon={faEnvelope}
            />,
            <InfoComponent
              name="phone"
              value={`${employee.phone || 'Not specified'}`}
              faIcon={faPhoneFlip}
            />,
            <InfoComponent
              name="gitHub"
              value={`${employee.gitHub || 'Not specified'}`}
              icon={faGithub}
            />,
            <InfoComponent
              name="gitLab"
              value={`${employee.gitLab || 'Not specified'}`}
              icon={faGitlab}
            />,
          ]
        }
        buttons={
          [
            <Button
              type="button"
              className="profile-bt"
              onClick={() => { history('/profile/edit'); }}
            >
              Edit
            </Button>,
          ]
        }
      />
    </div>
  );

  async function loadEmployeesAsync() {
    const { data } = await api.get<Employee>('employees/get-profile');
    setEmployee(data);
  }
}

export default ProfilePage;
