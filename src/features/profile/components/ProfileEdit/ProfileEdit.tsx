import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@tourmalinecore/react-tc-ui-kit';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

import { Employee } from '../../types/Profile';
import InfoComponent from '../InfoComponent/InfoComponent';
import ProfileInfo from '../ProfileInfo/ProfileInfo';
import { api } from '../../../../common/api';

function ProfileEdit() {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState<Employee>();

  useEffect(() => { loadEmployeesAsync(); }, []);

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    const updatedForm: Employee | undefined = employee ? {
      ...employee,
      [name]: value,
    } : undefined;

    setEmployee(updatedForm);
  };

  return (
    <div className="profile">
      <ProfileInfo
        rows={
          [
            <InfoComponent
              value={employee?.fullName || ''}
              text="name"
            />,
            <InfoComponent
              name="corporateEmail"
              value={`${employee?.corporateEmail}`}
              isRedact={false}
              faIcon={faEnvelope}
            />,
            <InfoComponent
              label="Personal Email*"
              name="personalEmail"
              value={`${employee?.personalEmail || ''}`}
              isRedact
              onChange={handleFormChange}
            />,
            <InfoComponent
              label="Phone"
              name="phone"
              value={`${employee?.phone || ''}`}
              isRedact
              onChange={handleFormChange}
            />,
            <InfoComponent
              label="GitHub"
              name="gitHub"
              value={`${employee?.gitHub || ''}`}
              isRedact
              onChange={handleFormChange}
            />,
            <InfoComponent
              label="GitLab"
              name="gitLab"
              value={`${employee?.gitLab || ''}`}
              isRedact
              onChange={handleFormChange}
            />,
          ]
        }
        buttons={
          [
            <Button
              type="button"
              className="profile-bt"
              onClick={() => { navigate('/profile'); }}

            >
              Cancel
            </Button>,
            <Button
              type="button"
              className="profile-bt"
              onClick={() => { updateEmployeesAsync(); }}
            >
              Save changes
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
  async function updateEmployeesAsync() {
    await axios.post('*', employee);
    navigate('/profile');
  }
}

export default ProfileEdit;
