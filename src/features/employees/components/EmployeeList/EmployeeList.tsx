/* eslint-disable default-case */
import { Button } from '@tourmalinecore/react-tc-ui-kit';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { Employee } from '../../types';

function EmployeeList({
  employees = [],
  filter,
  sort,
  search,
}: {
  employees: Employee[],
  filter: string;
  sort: string;
  search: string;
}) {
  const navigate = useNavigate();

  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);

  if (employees) {
    <div>Loading...</div>;
  }

  useEffect(() => {
    setFilteredEmployees(employees);
  }, [employees]);

  useEffect(() => {
    getFilteredData(filter);
  }, [employees, filter, sort, search]);

  return (
    <ul className="employee-list">
      {filteredEmployees.length <= 0 && (<li>List empty</li>)}
      {filteredEmployees.length > 0 && filteredEmployees.map((employee) => (
        <li
          key={employee.employeeId}
          className={clsx('employee-list__item', {
            'employee-list__item--is-blank': employee.isBlankEmployee,
          })}
        >
          <div>
            <div>{employee.fullName}</div>
            <div>{employee.corporateEmail}</div>
          </div>
          <div>
            <div className="">Contacts</div>
            <div>{employee.personalEmail}</div>
            <div>{employee.personalEmail}</div>
            <div>{employee.phone}</div>
            <div>{employee.gitHub}</div>
            <div>{employee.gitLab}</div>
          </div>
          <div>
            <div>{employee.netSalary}</div>
            <div>{employee.ratePerHour}</div>
            <div>{employee.fullSalary}</div>
            <div>{employee.employmentType}</div>
            <div>{employee.parking}</div>
          </div>
          <div>{employee.personnelNumber}</div>
          <div>{employee.hireDate}</div>
          <Button onClick={() => { navigate(`/employees/${employee.employeeId}/edit`); }} type="button">Edit</Button>
        </li>
      ))}
    </ul>
  );

  function getSort(firstEmployee: Employee, secondEmployee: Employee) {
    if (sort === 'desc') {
      return firstEmployee.fullName.toLowerCase() > secondEmployee.fullName.toLowerCase() ? 1 : -1;
    }

    return firstEmployee.fullName.toLowerCase() < secondEmployee.fullName.toLowerCase() ? 1 : -1;
  }

  function getFilteredData(filterElement: string) {
    const processedData = [...employees]
      .sort(getSort)
      .filter((item) => item.fullName.toLowerCase().includes(search.toLowerCase().trim()));

    switch (filterElement) {
      case 'all': {
        setFilteredEmployees(processedData);

        break;
      }
      case 'fired': {
        const newEmployees = processedData.filter((item) => !item.isCurrentEmployee);

        setFilteredEmployees(newEmployees);
        break;
      }
      case 'blank': {
        const newEmployees = processedData.filter((item) => item.isBlankEmployee);

        setFilteredEmployees(newEmployees);
        break;
      }
      default: {
        const newEmployees = processedData.filter((item) => item.isCurrentEmployee);

        setFilteredEmployees(newEmployees);
        break;
      }
    }
  }
}

export default EmployeeList;
