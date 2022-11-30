/* eslint-disable import/order */
import { useState } from 'react';
import {
  Input, Button, NativeSelect,
} from '@tourmalinecore/react-tc-ui-kit';
import { EmployeeType, EmployeeTypeSwitch } from '../../employeesData';
import './EmployeeAddPage.css';
import { useNavigate } from 'react-router-dom';
import { api } from '../../../../common/api';

function EmployeeAddPage() {
  const [employee, setEmployee] = useState<EmployeeType | undefined>({
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

    const updatedForm: EmployeeType | undefined = employee ? {
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
        </div>
        <div className="data-columns">
          <div className="data-rows">
            <Input
              name="gitHub"
              value={employee?.gitHub}
              label="GitHub"
              onChange={handleFormChange}
            />
            <Input
              name="ratePerHour"
              value={employee?.ratePerHour}
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
              name="gitLab"
              value={employee?.gitLab}
              label="GitLab"
              onChange={handleFormChange}
            />
            <NativeSelect
              options={[{ label: EmployeeTypeSwitch[0], value: 0 }, { label: EmployeeTypeSwitch[1], value: 1 }]}
              label="Employment Type*"
              name="employmentType"
              value={employee?.employmentType}
              onChange={(option: { label: EmployeeTypeSwitch; value: number }) => {
                setEmployee(employee
                  ? {
                    ...employee,
                    employmentType: option.value,
                  } : undefined);
              }}
              style={{ maxWidth: 300, width: 250, marginTop: 0 }}
            />
            <Input
              name="parkingCostPerMonth"
              value={employee?.parkingCostPerMonth}
              label="Parking*"
              onChange={handleFormChange}
            />
          </div>
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
          Create
        </Button>
      </div>
    </div>
  );
  async function updateEmployeesAsync() {
    console.log(employee);
    await api.post<EmployeeType>('employees/create', employee);
    navigate('/employees');
  }
}

export default EmployeeAddPage;
