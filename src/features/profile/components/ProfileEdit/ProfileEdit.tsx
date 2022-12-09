import { useEffect, useState } from 'react';
import { Button } from '@tourmalinecore/react-tc-ui-kit';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

import { Employee, EmployeeUpdateType } from '../../types/Profile';
import InfoComponent from '../InfoComponent/InfoComponent';
import ProfileInfo from '../ProfileInfo/ProfileInfo';
import { api } from '../../../../common/api';

function ProfileEdit() {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState<Employee>({
    id: 0,
    fullName: '',
    corporateEmail: '',
    personalEmail: '',
    phone: '',
    gitHub: '',
    gitLab: '',
  });

  useEffect(() => { loadEmployeesAsync(); }, []);

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    const updatedForm: Employee = {
      ...employee,
      [name]: value,
    };

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
    const fullName = employee.fullName.split(' ');
    const updateEmployee : EmployeeUpdateType = {
      employeeId: employee.id as number,
      name: fullName[0],
      surname: fullName[0],
      middleName: fullName[0],
      corporateEmail: employee.personalEmail,
      personalEmail: employee.personalEmail,
      phone: employee.phone || null,
      gitHub: employee.gitHub,
      gitLab: employee.gitLab,
    };
    await api.put('employees/update-employee-contacts', updateEmployee);
    navigate('/profile');
  }
}

export default ProfileEdit;
