import { useEffect, useState } from 'react';

import {
  Button, Input, NativeSelect,
} from '@tourmalinecore/react-tc-ui-kit';
import { useNavigate, useParams } from 'react-router-dom';

import {
  ColleagueFinancesDtoType, EmployeeSalaryUpdateType, EmployeeTypeSwitch,
} from '../../types/index';
import { api } from '../../../../common/api';
import { LINK_TO_SALARY_SERVICE } from '../../../../common/config/config';

function EmployeeEditSalaryPage() {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState<ColleagueFinancesDtoType>({
    id: 0,
    fullName: '',
    ratePerHour: 0,
    pay: 0,
    employmentType: 1,
    netSalary: 0,
    parking: 0,
  });
  const { id } = useParams();

  useEffect(() => { loadEmployeesAsync(); }, []);

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    const updatedForm: ColleagueFinancesDtoType = {
      ...employee,
      [name]: value,
    };

    setEmployee(updatedForm);
  };

  return (
    <div className="employee">
      <div className="employee-info">
        <h3>{employee.fullName}</h3>
      </div>
      <div className="employee-data">
        <div className="employee-data__columns">
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
          <NativeSelect
            options={[{ label: EmployeeTypeSwitch[0.5], value: 0.5 }, { label: EmployeeTypeSwitch[1], value: 1 }]}
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
            name="parking"
            value={employee.parking}
            label="Parking*"
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
    const { data } = await api.get<ColleagueFinancesDtoType>(`${LINK_TO_SALARY_SERVICE}employees/get-finance-for-payroll/${id}`);

    setEmployee(data);
  }

  async function updateEmployeesAsync() {
    const updateEmployee: EmployeeSalaryUpdateType = {
      employeeId: employee.id,
      ratePerHour: employee.ratePerHour,
      pay: employee.pay,
      employmentType: employee.employmentType,
      parkingCostPerMonth: employee.parking,
    };
    await api.put<EmployeeSalaryUpdateType>(`${LINK_TO_SALARY_SERVICE}employees/update-employee-finances`, updateEmployee);
    navigate('/employees');
  }
}

export default EmployeeEditSalaryPage;
