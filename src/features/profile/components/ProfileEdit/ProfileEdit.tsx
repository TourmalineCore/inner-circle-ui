import { useEffect, useState } from 'react';
import { Button, Input } from '@tourmalinecore/react-tc-ui-kit';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as IconEmail } from '../../../../assets/icons/icon-email.svg';
import { Employee, EmployeeUpdateType } from '../../types/Profile';
import { api } from '../../../../common/api';
import InfoComponent from '../InfoComponent/InfoComponent';

import './ProfileEdit.css';

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
      <div className="profile-info">
        <h2>{employee.fullName}</h2>
        <InfoComponent
          value={employee.corporateEmail}
          icon={(
            <IconEmail
              style={{
                display: 'block',
                width: 40,
                height: 40,

              }}
            />
          )}
        />
        <Input
          value={employee.personalEmail}
          label="Personal Email*"
          onChange={handleFormChange}
          name="personalEmail"
        />
        <Input
          value={employee.phone}
          label="Phone"
          onChange={handleFormChange}
          name="phone"
        />
        <Input
          value={employee.gitHub}
          label="GitHub"
          onChange={handleFormChange}
          name="gitHub"
        />
        <Input
          value={employee.gitLab}
          label="GitLab"
          onChange={handleFormChange}
          name="gitLab"
        />
        <div className="profile-info__buttons">
          <Button
            type="button"
            onClick={() => { navigate('/profile'); }}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={() => { updateEmployeesAsync(); }}
          >
            Save changes
          </Button>
        </div>
      </div>

    </div>
  );
  async function loadEmployeesAsync() {
    const { data } = await api.get<Employee>('employees/get-profile');
    setEmployee(data);
  }

  function validation(param: string) {
    if (!param) { return false; }

    return true;
  }

  async function updateEmployeesAsync() {
    if (!validation(employee.personalEmail)) {
      alert('Введите почту');
      return;
    }

    const updateEmployee : EmployeeUpdateType = {
      personalEmail: employee.personalEmail,
      phone: employee.phone || null,
      gitHub: employee.gitHub || null,
      gitLab: employee.gitLab || null,
    };
    await api.put('employees/update-profile', updateEmployee);
    navigate('/profile');
  }
}

export default ProfileEdit;
