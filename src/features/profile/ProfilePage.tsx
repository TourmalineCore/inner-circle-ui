import React, { useEffect, useState } from 'react';

import { Button } from '@tourmalinecore/react-tc-ui-kit';
import { faPhoneFlip, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import ProfileInfo from './components/ProfileInfo/ProfileInfo';
import { Employee } from './types/Profile';
import InfoComponent from './components/InfoComponent/InfoComponent';
import { api } from '../../common/api';

function ProfilePage() {
  const [employee, setEmployee] = useState<Employee>();

  const history = useNavigate();

  useEffect(() => { loadEmployeesAsync(); }, []);

  return (
    <div className="profile">
      <ProfileInfo
        rows={
          [
            <InfoComponent
              value={`${employee?.fullName}`}
              text="name"
            />,
            <InfoComponent
              name="corporateEmail"
              value={`${employee?.corporateEmail}`}
              isRedact={false}
              faIcon={faEnvelope}
            />,
            <InfoComponent
              name="personalEmail"
              value={`${employee?.personalEmail || 'Not specified'}`}
              isRedact={false}
              faIcon={faEnvelope}
            />,
            <InfoComponent
              name="phone"
              value={`${employee?.phone || 'Not specified'}`}
              isRedact={false}
              faIcon={faPhoneFlip}
            />,
            <InfoComponent
              name="gitHub"
              value={`${employee?.gitHub || 'Not specified'}`}
              isRedact={false}
              icon="component-label-github"
            />,
            <InfoComponent
              name="gitLab"
              value={`${employee?.gitLab || 'Not specified'}`}
              isRedact={false}
              icon="component-label-gitlub"
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
