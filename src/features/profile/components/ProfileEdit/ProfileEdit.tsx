import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@tourmalinecore/react-tc-ui-kit';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

import { Employee } from '../../types/Profile';
import InfoComponent from '../InfoComponent/InfoComponent';
import ProfileInfo from '../ProfileInfo/ProfileInfo';
import setData, { datae } from '../../EmployData';

const QUOTE_SERVICE_URL = 'http://localhost:5000/api/finances/get-profile-information';

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
              name="github"
              value={`${employee?.github || ''}`}
              isRedact
              onChange={handleFormChange}
            />,
            <InfoComponent
              label="GitLab"
              name="gitlab"
              value={`${employee?.gitlab || ''}`}
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
              onClick={() => { navigate(-1); }}

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
    try {
      const { data } = await axios.get<Employee>(QUOTE_SERVICE_URL);
      setEmployee(data);
    } catch {
      setEmployee(datae);
    }
  }
  async function updateEmployeesAsync() {
    try {
      await axios.post('*', employee);
    } catch {
      setData(employee);
    }
    navigate(-1);
  }
}

export default ProfileEdit;
