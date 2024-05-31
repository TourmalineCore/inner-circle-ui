import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import { Button } from '@tourmalinecore/react-tc-ui-kit';
import { NumericFormat, PatternFormat } from 'react-number-format';
import moment from 'moment';
import { useContext } from 'react';
import { CopyToClipboardButton } from './CopyToClipboardButton';
import { Employee } from '../../../types';
import { getEmploymentType } from '../../../utils/utils';
import AccessBasedOnPemissionsStateContext from '../../../../../routes/state/AccessBasedOnPemissionsStateContext';
import { ReactComponent as IconPhone } from '../../../../../assets/icons/icon-phone.svg';
import { ReactComponent as IconGithub } from '../../../../../assets/icons/icon-github.svg';
import { ReactComponent as IconGitlab } from '../../../../../assets/icons/icon-gitlab.svg';
import { ReactComponent as IconMessage } from '../../../../../assets/icons/icon-outline-email.svg';

function EmployeeItem({
  employee,
}: {
  employee: Employee,
}) {
  const navigate = useNavigate();
  const accessBasedOnPemissionsState = useContext(AccessBasedOnPemissionsStateContext);

  return (
    <li
      key={employee.employeeId}
      className={clsx('employee-item', {
        'employee-item--is-blank': employee.isBlankEmployee,
        'employee-item--half-width': !accessBasedOnPemissionsState.accessPermissions.get('ViewSalaryAndDocumentsData'),
      })}
    >
      <div className="employee-item__inner">
        <div>
          <div className="employee-item__name">{employee.fullName}</div>
          <CopyToClipboardButton text={employee.corporateEmail} notificationPosition="bottom" />
        </div>

        {accessBasedOnPemissionsState.accessPermissions.get('ViewContacts') && (
          <div>
            <div>Contacts</div>
            <ul className="employee-item__contacts-list">
              <li className="employee-item__contacts-item">
                <span className="employee-item__circle"><IconMessage /></span>
                <span>
                  {employee.personalEmail ? <CopyToClipboardButton text={employee.personalEmail} notificationPosition="right" />
                    : '--'}
                </span>
              </li>
              <li className="employee-item__contacts-item">
                <span className="employee-item__circle"><IconPhone /></span>
                <PatternFormat
                  type="tel"
                  displayType="text"
                  allowEmptyFormatting
                  format={employee.phone ? '+# (###) ### ## ##' : '--'}
                  value={employee.phone}
                  renderText={(value) => {
                    if (value !== '--') {
                      return <a href={`tel:${employee.phone}`} title="click to call">{value}</a>;
                    }

                    return '--';
                  }}
                />
              </li>
              <li className="employee-item__contacts-item">
                <span className="employee-item__circle"><IconGithub /></span>
                <span>
                  {employee.gitHub
                    ? <a href={`https://github.com/${employee.gitHub}`} title="link to gitHub" target="_blank" rel="noreferrer">{employee.gitHub}</a>
                    : '--'}

                </span>
              </li>
              <li className="employee-item__contacts-item">
                <span className="employee-item__circle"><IconGitlab /></span>
                <span>
                  {employee.gitLab
                    ? <a href={`https://gitlab.com/${employee.gitLab}`} title="link to gitLab" target="_blank" rel="noreferrer">{employee.gitLab}</a>
                    : '--'}
                </span>
              </li>
            </ul>
          </div>
        )}
        {accessBasedOnPemissionsState.accessPermissions.get('ViewSalaryAndDocumentsData') && (
          <>
            <div>
              <div className="employee-item__net-salary">
                Net salary
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
                  <NumericFormat
                    displayType="text"
                    thousandSeparator=","
                    decimalScale={1}
                    value={employee.ratePerHour}
                    valueIsNumericString
                    renderText={(value) => <span>{ value || '--'}</span>}
                  />
                </li>
                <li className="employee-item__salary-item">
                  <span className="employee-item__salary-label">Full Salary</span>
                  <NumericFormat
                    displayType="text"
                    thousandSeparator=","
                    decimalScale={1}
                    value={employee.fullSalary}
                    valueIsNumericString
                    renderText={(value) => <span>{ value || '--'}</span>}
                  />
                </li>
                <li className="employee-item__salary-item">
                  <span className="employee-item__salary-label">Employment Type</span>
                  <span>{getEmploymentType(employee.employmentType) || '--'}</span>
                </li>
                <li className="employee-item__salary-item">
                  <span className="employee-item__salary-label">Parking</span>
                  <NumericFormat
                    displayType="text"
                    thousandSeparator=","
                    decimalScale={1}
                    value={employee.parking}
                    valueIsNumericString
                    renderText={(value) => <span>{ value || '--'}</span>}
                  />
                </li>
              </ul>
            </div>
            <ul className="employee-item__official-documents-list">
              <li className="employee-item__official-documents-item">
                <span>Personnel Number</span>
                <span>{employee.personnelNumber || '--'}</span>
              </li>
              <li className="employee-item__official-documents-item">
                <span>Hire date</span>
                <span>{employee.hireDate ? moment(employee.hireDate).format('DD.MM.YYYY') : '--'}</span>
              </li>
            </ul>
          </>
        )}

        {accessBasedOnPemissionsState.accessPermissions.get('EditFullEmployeesData') && (
          <Button
            className="employee-item__button"
            type="button"
            onClick={() => { navigate(`/employees/edit?id=${employee.employeeId}`); }}
          >
            Edit
          </Button>
        )}
      </div>
    </li>
  );
}

export default EmployeeItem;
