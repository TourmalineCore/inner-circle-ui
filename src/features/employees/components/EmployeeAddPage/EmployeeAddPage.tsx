/* eslint-disable import/order */
import { useState } from 'react';
import {
  Input, Button,
} from '@tourmalinecore/react-tc-ui-kit';
import setDataEmployeees, { EmployeeProps, updatePropse } from '../../employeesData';
import './EmployeeAddPage.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function EmployeeAddPage() {
  const [employee, setEmployee] = useState<EmployeeProps | undefined>({
    name: '',
    surname: '',
    middleName: '',
    workEmail: '',
    personalEmail: '',
    phone: '',
    github: '',
    gitlab: '',
    rateHour: 0,
    pay: 0,
    employmentType: '',
    parking: 0,
    netSalary: 0,
  });
  const navigate = useNavigate();

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
      <div className="employee-data-name">
        <h3>Create a user</h3>
      </div>
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
        </div>
        <div className="data-columns">
          <div className="data-rows">
            <Input
              name="github"
              value={employee?.github}
              label="GitHub"
              onChange={handleFormChange}
            />
            <Input
              name="rateHour"
              value={employee?.rateHour}
              label="Rate per hour*"
              onChange={handleFormChange}
            />
            <Input
              name="pay"
              value={employee?.pay}
              label="Pay*"
              onChange={handleFormChange}
            />

          </div>
          <div className="data-rows">
            <Input
              name="gitlab"
              value={employee?.gitlab}
              label="GitLab"
              onChange={handleFormChange}
            />

            <Input
              name="employmentType"
              value={employee?.employmentType}
              label="Employment Type*"
              onChange={handleFormChange}
            />
            <Input
              name="parking"
              value={employee?.parking}
              label="Parking*"
              onChange={handleFormChange}
            />
          </div>
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
  async function updateEmployeesAsync() {
    try {
      await axios.post('*', employee);
    } catch {
      setDataEmployeees(0, employee, updatePropse.add);
    }
    navigate(-1);
  }
}

export default EmployeeAddPage;
