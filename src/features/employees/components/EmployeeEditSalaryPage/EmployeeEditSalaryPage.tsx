import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Button, Input,
} from '@tourmalinecore/react-tc-ui-kit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SizeProp, IconProp } from '@fortawesome/fontawesome-svg-core';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import setDataEmployeees, { dataEmployeees, EmployeeProps, updatePropse } from '../../employeesData';

function EmployeeEditSalaryPage() {
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
      <div className="employee-data--info">
        <h3>{`${employee?.name} ${employee?.surname} ${employee?.middleName}`}</h3>
        <div>
          <span style={{ marginRight: 10 }}><FontAwesomeIcon size={'xl' as SizeProp} icon={faEnvelope as IconProp} /></span>
          {employee?.workEmail}
        </div>
      </div>
      <div className="employee-data--inputs">
        <div className="data-columns">
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
          <Input
            name="employmentType"
            value={employee?.employmentType}
            label="Employment type*"
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

export default EmployeeEditSalaryPage;
