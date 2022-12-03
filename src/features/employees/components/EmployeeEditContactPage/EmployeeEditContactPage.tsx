import {
  Button, Input,
} from '@tourmalinecore/react-tc-ui-kit';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../../../common/api';
import { ColleaguesType, EmployeeContactUpdateType } from '../../employeesData';

function EmployeeEditContactPage() {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState<EmployeeContactUpdateType>();
  const { id } = useParams();

  useEffect(() => { loadEmployeesAsync(); }, []);

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    const updatedForm: EmployeeContactUpdateType | undefined = employee ? {
      ...employee,
      [name]: value,
    } : undefined;

    setEmployee(updatedForm);
  };

  return (
    <div className="employee-data">
      <div className="employee-data--inputs">
        <div className="data-rows">
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
        <div className="data-columns">
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
      <div className="employee-data--btns">
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
    const { data } = await api.get<ColleaguesType>('employees/get-colleagues');
    const newemployee = data.colleagueContacts.find((el) => el.id === Number(id));
    const fullName = newemployee?.fullName.split(' ');
    setEmployee(newemployee && fullName ? {
      ...employee,
      employeeId: newemployee.id,
      name: fullName[0],
      surname: fullName[1],
      middleName: fullName[2],
      personalEmail: newemployee.personalEmail,
      corporateEmail: newemployee.corporateEmail,
      phone: newemployee.phone,
      gitHub: newemployee.gitHub,
      gitLab: newemployee.gitLab,
    } : undefined);
  }

  async function updateEmployeesAsync() {
    await api.put<EmployeeContactUpdateType>(
      'employees/update-employee-contacts',
      {
        ...employee,
        phone: employee && employee.phone && employee?.phone?.length > 0 ? employee.phone : null,
        gitHub: employee && employee.gitHub && employee?.gitHub?.length > 0 ? employee.gitHub : null,
        gitLab: employee && employee.gitLab && employee?.gitLab?.length > 0 ? employee.gitLab : null,
      },
    );

    navigate('/employees');
  }
}

export default EmployeeEditContactPage;
