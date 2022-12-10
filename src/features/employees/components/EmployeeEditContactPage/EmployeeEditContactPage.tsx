import {
  Button, Input,
} from '@tourmalinecore/react-tc-ui-kit';
import { useNavigate, useParams } from 'react-router-dom';

import { useEffect, useState } from 'react';

import { api } from '../../../../common/api';
import { ColleagueContactsType, EmployeeContactUpdateType } from '../../types/index';

function EmployeeEditContactPage() {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState<EmployeeContactUpdateType>(
    {
      employeeId: 0,
      name: '',
      surname: '',
      middleName: '',
      personalEmail: '',
      corporateEmail: '',
      phone: '',
      gitHub: '',
      gitLab: '',
    },
  );
  const { id } = useParams();

  useEffect(() => { loadEmployeesAsync(); }, []);

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    const updatedForm: EmployeeContactUpdateType = {
      ...employee,
      [name]: value,
    };

    setEmployee(updatedForm);
  };

  return (
    <div className="employee">
      <div className="employee-data">
        <div className="employee-data__rows">
          <Input
            name="name"
            value={employee?.name}
            label="Name*"
            onChange={handleFormChange}
          />
          <Input
            name="surname"
            value={employee?.surname}
            label="Surname*"
            onChange={handleFormChange}
          />
          <Input
            name="middleName"
            value={employee?.middleName}
            label="Middle Name*"
            onChange={handleFormChange}
          />
        </div>
        <div className="employee-data__columns">
          <Input
            name="corporateEmail"
            value={employee?.corporateEmail}
            label="Corporate Email*"
            onChange={handleFormChange}
          />
          <Input
            name="personalEmail"
            value={employee?.personalEmail}
            label="Personal Email*"
            onChange={handleFormChange}
          />
          <Input
            name="phone"
            value={employee?.phone}
            label="Phone"
            onChange={handleFormChange}
          />
          <Input
            name="gitHub"
            value={employee?.gitHub}
            label="GitHub"
            onChange={handleFormChange}
          />
          <Input
            name="gitLab"
            value={employee?.gitLab}
            label="GitLab"
            onChange={handleFormChange}
          />
        </div>
      </div>
      <div className="employee-buttons">
        <Button
          type="button"
          onClick={() => { navigate('/employees'); }}
        >
          Cancel
        </Button>
        <Button
          type="button"
          onClick={() => { updateEmployeesAsync(); }}
        >
          Edit
        </Button>
      </div>
    </div>
  );

  async function loadEmployeesAsync() {
    const { data } = await api.get<ColleagueContactsType>(`employees/get-contact-details/${id}`);
    const fullName = data.fullName.split(' ');
    setEmployee({
      ...employee,
      employeeId: data.id,
      name: fullName[0],
      surname: fullName[1],
      middleName: fullName[2],
      personalEmail: data.personalEmail,
      corporateEmail: data.corporateEmail,
      phone: data.phone,
      gitHub: data.gitHub,
      gitLab: data.gitLab,
    });
  }

  async function updateEmployeesAsync() {
    await api.put<EmployeeContactUpdateType>(
      'employees/update-employee-contacts',
      {
        ...employee,
        phone: employee.phone || null,
        gitHub: employee.gitHub || null,
        gitLab: employee.gitHub || null,
      },
    );

    navigate('/employees');
  }
}

export default EmployeeEditContactPage;
