import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Button, Input, NativeSelect,
} from '@tourmalinecore/react-tc-ui-kit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SizeProp, IconProp } from '@fortawesome/fontawesome-svg-core';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { ColleaguesType, EmployeeSalaryUpdateType, EmployeeTypeSwitch } from '../../types/index';
import { api } from '../../../../common/api';

function EmployeeEditSalaryPage() {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState<EmployeeSalaryUpdateType>();
  const [employeeName, setEmployeeName] = useState<string>();
  const [employeeEmail, setEmployeeEmail] = useState<string>();
  const { id } = useParams();

  useEffect(() => { loadEmployeesAsync(); }, []);

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    const updatedForm: EmployeeSalaryUpdateType | undefined = employee ? {
      ...employee,
      [name]: value,
    } : undefined;

    setEmployee(updatedForm);
  };

  return (
    <div className="employee-data">
      <div className="employee-data--info">
        <h3>{employeeName}</h3>
        <div>
          <span style={{ marginRight: 10 }}><FontAwesomeIcon size={'xl' as SizeProp} icon={faEnvelope as IconProp} /></span>
          {employeeEmail}
        </div>
      </div>
      <div className="employee-data--inputs">
        <div className="data-columns">
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
    const employeeContact = data.colleagueContacts.find((el) => el.id === Number(id));
    const getEmployee = data.colleagueFinancesDto.find((el) => el.id === Number(id));

    setEmployee(getEmployee ? {
      ...employee,
      employeeId: getEmployee.id,
      ratePerHour: getEmployee.ratePerHour,
      pay: getEmployee.pay,
      employmentType: getEmployee.employmentType,
      parkingCostPerMonth: getEmployee.parking,
    } : undefined);
    setEmployeeName(employeeContact?.fullName);
    setEmployeeEmail(employeeContact?.corporateEmail);
  }

  async function updateEmployeesAsync() {
    await api.put<EmployeeSalaryUpdateType>('employees/update-employee-finances', employee);
    navigate('/employees');
  }
}

export default EmployeeEditSalaryPage;
