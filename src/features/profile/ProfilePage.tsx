import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Button } from '@tourmalinecore/react-tc-ui-kit';
import { faPhoneFlip, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import ProfileInfo from './components/ProfileInfo/ProfileInfo';
import { Employee } from './types/Profile';
import InfoComponent from './components/InfoComponent/InfoComponent';
import { datae } from './EmployData';

const QUOTE_SERVICE_URL = 'http://localhost:5000/api/finances/get-profile-information';

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
              value={`${employee?.surname} ${employee?.name} ${employee?.middleName}`}
              text="name"
            />,
            <InfoComponent
              name="workEmail"
              value={`${employee?.workEmail}`}
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
              name="github"
              value={`${employee?.github || 'Not specified'}`}
              isRedact={false}
              icon="component-label-github"
            />,
            <InfoComponent
              name="gitlab"
              value={`${employee?.gitlab || 'Not specified'}`}
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
    try {
      const { data } = await axios.get<Employee>(QUOTE_SERVICE_URL);
      setEmployee(data);
    } catch {
      setEmployee(datae);
    }
  }
}

export default ProfilePage;
