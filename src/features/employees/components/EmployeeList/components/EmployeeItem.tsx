import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import { Button } from '@tourmalinecore/react-tc-ui-kit';
import { NumericFormat, PatternFormat } from 'react-number-format';
import moment from 'moment';
import { Employee } from '../../../types';
import { getEmploymentType } from '../../../utils/utils';

function EmployeeItem({
  employee,
}: {
  employee: Employee,
}) {
  const navigate = useNavigate();

  return (
    <li
      key={employee.employeeId}
      className={clsx('employee-item', {
        'employee-item--is-blank': employee.isBlankEmployee,
      })}
    >
      <div>
        <div className="employee-item__name">{employee.fullName}</div>
        <div>{employee.corporateEmail}</div>
      </div>

      <div>
        <div>Contacts</div>
        <ul className="employee-item__contacts-list">
          <li className="employee-item__contacts-item">
            <span className="employee-item__circle" />
            <span>{employee.personalEmail || '--'}</span>
          </li>
          <li className="employee-item__contacts-item">
            <span className="employee-item__circle" />
            <span>
              <PatternFormat
                type="tel"
                displayType="text"
                allowEmptyFormatting
                format={employee.phone ? '+# (###) ### ## ##' : '--'}
                value={employee.phone}
              />
            </span>
          </li>
          <li className="employee-item__contacts-item">
            <span className="employee-item__circle" />
            <span>{employee.gitHub || '--'}</span>
          </li>
          <li className="employee-item__contacts-item">
            <span className="employee-item__circle" />
            <span>{employee.gitLab || '--'}</span>
          </li>
        </ul>
      </div>

      <div>
        <div className="employee-item__net-salary">
          Net salary
          {' '}
          <NumericFormat
            displayType="text"
            thousandSeparator=","
            decimalScale={1}
            value={employee.netSalary}
            valueIsNumericString
            renderText={(value) => <span>{ value || '--'}</span>}
          />
        </div>

        <ul className="employee-item__salary-list">
          <li className="employee-item__salary-item">
            <span className="employee-item__salary-label">Rate Per Hour</span>
            {' '}
            <span>
              <NumericFormat
                displayType="text"
                thousandSeparator=","
                decimalScale={1}
                value={employee.ratePerHour}
                valueIsNumericString
                renderText={(value) => <span>{ value || '--'}</span>}
              />
            </span>
          </li>
          <li className="employee-item__salary-item">
            <span className="employee-item__salary-label">Full Salary</span>
            {' '}
            <span>
              <NumericFormat
                displayType="text"
                thousandSeparator=","
                decimalScale={1}
                value={employee.fullSalary}
                valueIsNumericString
                renderText={(value) => <span>{ value || '--'}</span>}
              />
            </span>
          </li>
          <li className="employee-item__salary-item">
            <span className="employee-item__salary-label">Employment Type</span>
            {' '}
            <span>{getEmploymentType(employee.employmentType) || '--'}</span>
          </li>
          <li className="employee-item__salary-item">
            <span className="employee-item__salary-label">Parking</span>
            {' '}
            <span>
              <NumericFormat
                displayType="text"
                thousandSeparator=","
                decimalScale={1}
                value={employee.parking}
                valueIsNumericString
                renderText={(value) => <span>{ value || '--'}</span>}
              />
            </span>
          </li>
        </ul>
      </div>

      <div>
        <ul className="employee-item__official-documents-list">
          <li className="employee-item__official-documents-item">
            <span>Personnel Number</span>
            {' '}
            {employee.personnelNumber || '--'}
          </li>
          <li className="employee-item__official-documents-item">
            <span>Hire date</span>
            {' '}
            {employee.hireDate ? moment(employee.hireDate).format('DD.MM.YYYY') : '--'}
          </li>
        </ul>
      </div>

      <Button
        className="employee-item__button"
        type="button"
        onClick={() => { navigate(`/employees/edit?${employee.employeeId}`); }}
      >
        Edit
      </Button>

    </li>
  );
}

export default EmployeeItem;
