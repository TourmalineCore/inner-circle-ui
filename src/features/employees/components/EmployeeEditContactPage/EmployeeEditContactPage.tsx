import {
  Button, Input,
} from '@tourmalinecore/react-tc-ui-kit';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import setDataEmployeees, { dataEmployeees, EmployeeProps, updatePropse } from '../../employeesData';

function EmployeeEditContactPage() {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState<EmployeeProps>();
  const { id } = useParams();

  useEffect(() => { loadEmployeesAsync(); }, []);

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    const updatedForm: EmployeeProps | undefined = employee ? {
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
            name="workEmail"
            value={employee?.workEmail}
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
            name="github"
            value={employee?.github}
            label="GitHub"
            onChange={handleFormChange}
          />
          <Input
            name="gitlab"
            value={employee?.gitlab}
            label="GitLab"
            onChange={handleFormChange}
          />
        </div>
      </div>
      <div className="employee-data--btns">
        <Button
          type="button"
          onClick={() => { navigate(-1); }}
        >
          Cancel
        </Button>
        <Button
          type="button"
          onClick={() => { updateEmployeesAsync(); }}
        >
          Create
        </Button>
      </div>
    </div>
  );

  async function loadEmployeesAsync() {
    try {
      const { data } = await axios.get<EmployeeProps>('*');
      setEmployee(data);
    } catch {
      setEmployee(dataEmployeees[Number(id) - 1]);
    }
  }

  async function updateEmployeesAsync() {
    try {
      await axios.post('*', employee);
    } catch {
      setDataEmployeees(Number(id) - 1, employee, updatePropse.update);
    }
    navigate(-1);
  }
}

export default EmployeeEditContactPage;
