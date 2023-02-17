/* eslint-disable react/no-unstable-nested-components */
import { useState, useEffect } from 'react';

import ContentCard from '../../components/ContentCard/ContentCard';
import DefaultCardHeader from '../../components/DefaultCardHeader/DefaultCardHeader';
import { mockData } from './mock';

import {
  Employees,
} from './types';

function EmployeesPage() {
  const [employees, setEmployees] = useState<Employees[]>([]);

  // const navigate = useNavigate();

  useEffect(() => {
    loadEmployeesAsync();
  }, []);

  return (
    <ContentCard
      style={{ margin: 20 }}
      isStickyHead
      headerContent={(
        <DefaultCardHeader>Salary data</DefaultCardHeader>
      )}
    >
      <div className="table" style={{ paddingTop: 4 }}>

        {/* <EmployeesSalaryDataTable employeesSalary={employeesSalary} /> */}

        <div>
          <div>Filter</div>
          <div>Sort</div>
          <div>Sort Name</div>

          <div>
            <ul>
              {employees.map((employee) => (
                <li key={employee.employeeId}>
                  <div>
                    <div>{employee.fullName}</div>
                    <div>{employee.corporateEmail}</div>
                    <div>{employee.personalEmail}</div>
                    <div>{employee.personalEmail}</div>
                    <div>{employee.phone}</div>
                    <div>{employee.gitHub}</div>
                    <div>{employee.gitLab}</div>
                    <div>{employee.netSalary}</div>
                    <div>{employee.ratePerHour}</div>
                    <div>{employee.fullSalary}</div>
                    <div>{employee.employmentType}</div>
                    <div>{employee.parking}</div>
                    <div>{employee.personnelNumber}</div>
                    <div>{employee.hireDate}</div>
                    <button type="button">Edit</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </ContentCard>
  );

  async function loadEmployeesAsync() {
    // const { data } = await api.get<ColleaguesType>(`${LINK_TO_SALARY_SERVICE}employees/get-colleagues`);
    setEmployees(mockData);
  }
}

export default EmployeesPage;
