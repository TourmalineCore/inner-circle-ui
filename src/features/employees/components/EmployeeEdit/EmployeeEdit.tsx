import { useEffect, useState, ChangeEvent } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Input, CheckField, Button } from '@tourmalinecore/react-tc-ui-kit';
import { NumberFormatValues, PatternFormat } from 'react-number-format';

import { ReactComponent as IconProfile } from '../../../../assets/icons/profile.svg';
import { api } from '../../../../common/api';
import { LINK_TO_SALARY_SERVICE } from '../../../../common/config/config';
import { Employee } from '../../types';

import DatePickerCustom from './components/DatePickerCustom/DatePickerCustom';
import MyCustomNumberFormat from './components/MyCustomNumberFormat/MyCustomNumberFormat';

const employeeStatusData = {
  current: 'Current/Active',
  fired: 'Fired',
};

const employeeTypeData = {
  1: 'Full time',
  0.5: 'Half time',
};

const employedData = {
  officially: 'Officially',
  unofficially: 'Unofficially',
};

function EmployeeEdit() {
  const navigate = useNavigate();

  const [employee, setEmployee] = useState<Employee>({
    fullName: '',
    corporateEmail: '',
    personalEmail: null,
    phone: null,
    gitHub: null,
    gitLab: null,
    ratePerHour: null,
    fullSalary: null,
    employmentType: 0,
    parking: 0,
    hireDate: null,
    dateDismissal: null,
    isEmployedOfficially: true,
    isFired: false,
    personnelNumber: '',
  });

  const [param] = useSearchParams();
  const id = param.get('id');

  useEffect(() => {
    loadEmployeesAsync();
  }, []);

  const handleFormChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    const updatedForm: Employee = {
      ...employee,
      [name]: value,
    };

    setEmployee(updatedForm);
  };

  return (
    <section className="employee-edit">
      <h1>Employee Profile</h1>
      <div className="employee-edit__info">
        <span className="employee-edit__icon"><IconProfile /></span>
        {employee.fullName}
      </div>
      <div className="employee-edit__info">
        <span className="employee-edit__icon"><IconProfile /></span>
        {employee.corporateEmail}
      </div>

      <div>
        <h3>Contacts</h3>
        <ul>
          <li className="employee-edit__item">
            <span className="employee-edit__label">Phone Number*</span>
            <PatternFormat
              type="tel"
              format="+7 (###) ### ## ##"
              allowEmptyFormatting
              mask="_"
              className="employee-edit__control"
              customInput={Input}
              value={employee.phone}
              valueIsNumericString
              onValueChange={(event: NumberFormatValues) => setEmployee({ ...employee, phone: event.value })}
            />
          </li>
          <li className="employee-edit__item">
            <span className="employee-edit__label">Personal Email</span>
            <Input
              name="personalEmail"
              placeholder="email@mail.ru"
              className="employee-edit__control"
              value={employee.personalEmail || ''}
              onChange={handleFormChange}
            />
          </li>
          <li className="employee-edit__item">
            <span className="employee-edit__label">Personal GitHub</span>
            <div className="employee-edit__git employee-edit__control">
              <span className="employee-edit__sumbol">@</span>
              <Input
                className="employee-edit__control"
                name="gitHub"
                value={employee.gitHub || ''}
                onChange={handleFormChange}
              />
            </div>
          </li>
          <li className="employee-edit__item">
            <span className="employee-edit__label">Personal GitLab</span>
            <div className="employee-edit__git employee-edit__control">
              <span className="employee-edit__sumbol">@</span>
              <Input
                className="employee-edit__control"
                name="gitLab"
                value={employee.gitLab || ''}
                onChange={handleFormChange}
              />
            </div>
          </li>
        </ul>
      </div>

      <div>
        <h3>Salary</h3>
        <ul>
          <li className="employee-edit__item">
            <span className="employee-edit__label">Rate Per Hour *</span>
            <div className="employee-edit__control">
              <MyCustomNumberFormat
                value={employee.ratePerHour || 0}
                onChange={(event: NumberFormatValues) => setEmployee({ ...employee, ratePerHour: Number(event.value) })}
              />
            </div>
          </li>
          <li className="employee-edit__item">
            <span className="employee-edit__label">Full Salary *</span>
            <div className="employee-edit__control">
              <MyCustomNumberFormat
                value={employee.fullSalary || ''}
                onChange={(event: NumberFormatValues) => setEmployee({ ...employee, fullSalary: Number(event.value) })}
              />
            </div>
          </li>
          <li className="employee-edit__item employee-edit__item--radio-list">
            <span className="employee-edit__label">Employment Type *</span>
            <div className="employee-edit__control">
              {Object.entries(employeeTypeData).map(([value, label]) => (
                <CheckField
                  key={value}
                  style={{
                    marginBottom: 16,
                  }}
                  viewType="radio"
                  label={label}
                  checked={value === String(employee.employmentType)}
                  onChange={() => setEmployee({ ...employee, employmentType: Number(value) })}
                />
              ))}
            </div>
          </li>
          <li className="employee-edit__item">
            <span className="employee-edit__label">Parking *</span>
            <div className="employee-edit__control">
              <MyCustomNumberFormat
                value={employee.parking || 0}
                onChange={(event: NumberFormatValues) => setEmployee({ ...employee, parking: Number(event.value) })}
              />
            </div>
          </li>
        </ul>
      </div>

      <div>
        <h3>Documents</h3>
        <ul>
          <li className="employee-edit__item">
            <span className="employee-edit__label">Hire Date *</span>
            <div className="employee-edit__control">
              <DatePickerCustom
                date={employee.hireDate}
                onChange={(date: Date) => setEmployee({ ...employee, hireDate: date })}
              />
            </div>
          </li>
          <li className="employee-edit__item employee-edit__item--radio-list">
            <span className="employee-edit__label">Employee Status *</span>
            <div>
              {Object.entries(employeeStatusData).map(([value, label]) => {
                const valueEmployedFired = employee.isFired ? 'fired' : 'current';

                return (
                  <CheckField
                    key={value}
                    style={{
                      marginBottom: 16,
                    }}
                    viewType="radio"
                    label={label}
                    checked={value === valueEmployedFired}
                    onChange={() => setEmployee({ ...employee, isFired: value === 'fired' })}
                  />
                );
              })}
            </div>
          </li>
          {employee.isFired && (
            <li className="employee-edit__item">
              <span className="employee-edit__label">Date of Dismissal *</span>
              <div className="employee-edit__control">
                <DatePickerCustom
                  date={employee.dateDismissal}
                  onChange={(date: Date) => setEmployee({ ...employee, dateDismissal: date })}
                />
              </div>
            </li>
          )}
          <li className="employee-edit__item employee-edit__item--radio-list">
            <span className="employee-edit__label">Employed *</span>
            <div>
              {Object.entries(employedData).map(([value, label]) => {
                const valueEmployedOfficially = employee.isEmployedOfficially ? 'officially' : 'unofficially';

                return (
                  <CheckField
                    key={value}
                    style={{
                      marginBottom: 16,
                    }}
                    viewType="radio"
                    label={label}
                    checked={value === valueEmployedOfficially}
                    onChange={() => setEmployee({ ...employee, isEmployedOfficially: value === 'officially' })}
                  />
                );
              })}
            </div>
          </li>
          {employee.isEmployedOfficially && (
            <li className="employee-edit__item">
              <span className="employee-edit__label">Personnel Number *</span>
              <PatternFormat
                format="##/##"
                allowEmptyFormatting
                mask="_"
                valueIsNumericString
                name="personnelNumber"
                className="employee-edit__control"
                value={employee.personnelNumber}
                customInput={Input}
                onValueChange={(event: NumberFormatValues) => setEmployee({ ...employee, personnelNumber: event.value })}
              />
            </li>
          )}
        </ul>
      </div>

      <div className="employee-edit__box-buttons">
        <Button onClick={() => navigate('/employees')}>Cancel</Button>
        <Button onClick={() => updateEmployeesAsync()}>Save Changes</Button>
      </div>
    </section>
  );

  async function loadEmployeesAsync() {
    const { data } = await api.get(`${LINK_TO_SALARY_SERVICE}employees/get-finance-for-payroll/${id}`);

    setEmployee(data);
  }

  async function updateEmployeesAsync() {
    const updateEmployee = {
      ...employee,
      phone: `+7${employee.phone}`,
    };

    delete updateEmployee.isFired;
    delete updateEmployee.dateDismissal;

    try {
      await api.put<Employee>(`${LINK_TO_SALARY_SERVICE}employees/update-employee-finances`, updateEmployee);
      navigate('/employees');
    } catch {
      alert('Error');
    }
  }
}

export default EmployeeEdit;
