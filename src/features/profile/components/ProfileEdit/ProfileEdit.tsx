import { useEffect, useState } from 'react';
import { Button, Input } from '@tourmalinecore/react-tc-ui-kit';
import { useNavigate } from 'react-router-dom';

import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Employee, EmployeeUpdateType } from '../../types/Profile';
import { api } from '../../../../common/api';
import '../../../analytics/components/RedactComponent/RedactComponent.css';
import InfoComponent from '../InfoComponent/InfoComponent';
import { LINK_TO_SALARY_SERVICE } from '../../../../common/config/config';

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
      <div className="profile__inner">
        <h2>{employee.fullName}</h2>
        <InfoComponent
          value={employee.corporateEmail}
          icon={<FontAwesomeIcon size={'xl' as SizeProp} icon={faEnvelope} />}
          link={`mailto:${employee.corporateEmail}`}
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
        <div className="profile__buttons">
          <Button
            type="button"
            className="profile__button"
            onClick={() => { navigate('/profile'); }}
          >
            Cancel
          </Button>
          <Button
            type="button"
            className="profile__button"
            onClick={() => { updateEmployeesAsync(); }}
          >
            Save changes
          </Button>
        </div>
      </div>

    </div>
  );
  async function loadEmployeesAsync() {
    const { data } = await api.get<Employee>(`${LINK_TO_SALARY_SERVICE}employees/get-profile`);
    setEmployee(data);
  }

  async function updateEmployeesAsync() {
    const updateEmployee : EmployeeUpdateType = {
      ...employee,
      employeeId: employee.id,
      personalEmail: employee.personalEmail,
      phone: employee.phone || null,
      gitHub: employee.gitHub || null,
      gitLab: employee.gitLab || null,
    };
    await api.put(`${LINK_TO_SALARY_SERVICE}employees/update-profile`, updateEmployee);

    navigate('/profile');
  }
}

export default ProfileEdit;
