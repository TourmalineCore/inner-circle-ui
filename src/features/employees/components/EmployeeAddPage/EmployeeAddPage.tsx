/* eslint-disable import/order */
import {
  Input, Button, NativeSelect,
} from '@tourmalinecore/react-tc-ui-kit';
import { useNavigate } from 'react-router-dom';

import { useState } from 'react';

import { EmployeeType, EmployeeTypeSwitch } from '../../types/index';
import { api } from '../../../../common/api';

import './EmployeeAddPage.css';
import { LINK_TO_SALARY_SERVICE } from '../../../../common/config/config';

function EmployeeAddPage() {
  const [employee, setEmployee] = useState<EmployeeType>({
    name: '',
    surname: '',
    middleName: '',
    corporateEmail: '',
    personalEmail: '',
    phone: '',
    gitHub: '',
    gitLab: '',
    ratePerHour: 0,
    pay: 0,
    employmentType: 0,
    parkingCostPerMonth: 0,
  });

  const navigate = useNavigate();

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    const updatedForm: EmployeeType = {
      ...employee,
      [name]: value,
    };

    setEmployee(updatedForm);
  };

  return (
    <div className="employee">
      <div className="employee-name">
        <h3>Create a user</h3>
      </div>
      <div className="employee-data">
        <div className="employee-data__rows">
          <Input
            name="name"
            value={employee.name}
            label="Name*"
            onChange={handleFormChange}
          />
          <Input
            name="surname"
            value={employee.surname}
            label="Surname*"
            onChange={handleFormChange}
          />
          <Input
            name="middleName"
            value={employee.middleName}
            label="Middle Name*"
            onChange={handleFormChange}
          />
        </div>
        <div className="employee-data__columns">
          <div className="employee-data__rows">
            <Input
              name="corporateEmail"
              value={employee.corporateEmail}
              label="Corporate Email*"
              onChange={handleFormChange}
            />
            <div className="input-signature">@tourmalinecore.com</div>
          </div>
          <Input
            name="personalEmail"
            value={employee.personalEmail}
            label="Personal Email*"
            onChange={handleFormChange}
          />
          <Input
            name="phone"
            value={employee.phone}
            label="Phone"
            onChange={handleFormChange}
          />
        </div>
        <div className="employee-data__columns">
          <div className="employee-data__rows">
            <div className="input-signature">@</div>
            <Input
              name="gitHub"
              value={employee.gitHub}
              label="GitHub"
              onChange={handleFormChange}
            />
            <Input
              name="ratePerHour"
              value={employee.ratePerHour}
              label="Rate per hour*"
              onChange={handleFormChange}
            />
            <Input
              name="pay"
              value={employee.pay}
              label="Pay*"
              onChange={handleFormChange}
            />
          </div>
          <div className="employee-data__rows">
            <div className="input-signature">@</div>
            <Input
              name="gitLab"
              value={employee.gitLab}
              label="GitLab"
              onChange={handleFormChange}
            />
            <NativeSelect
              options={[{ label: EmployeeTypeSwitch[0], value: 0 }, { label: EmployeeTypeSwitch[1], value: 1 }]}
              label="Employment Type*"
              name="employmentType"
              value={employee.employmentType}
              onChange={(option: { label: EmployeeTypeSwitch; value: number }) => {
                setEmployee({
                  ...employee,
                  employmentType: option.value,
                });
              }}
              style={{ maxWidth: 300, width: 250, marginTop: 0 }}
            />
            <Input
              name="parkingCostPerMonth"
              value={employee.parkingCostPerMonth}
              label="Parking*"
              onChange={handleFormChange}
            />
          </div>
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
          onClick={() => { createEmployeesAsync(); }}
        >
          Create
        </Button>
      </div>
    </div>
  );
  async function createEmployeesAsync() {
    const updateForm : EmployeeType = {
      ...employee,
      corporateEmail: `${employee.corporateEmail}@tourmalinecore.com`,
      phone: employee.phone || null,
      gitHub: employee.gitHub ? `@${employee.gitHub}` : null,
      gitLab: employee.gitLab ? `@${employee.gitLab}` : null,
      ratePerHour: Number(employee.ratePerHour),
      pay: Number(employee.pay),
      parkingCostPerMonth: Number(employee.parkingCostPerMonth),
    };

    await api.post<EmployeeType>(
      `${LINK_TO_SALARY_SERVICE}employees/create`,
      updateForm,
    );
    navigate('/employees');
  }
}

export default EmployeeAddPage;
