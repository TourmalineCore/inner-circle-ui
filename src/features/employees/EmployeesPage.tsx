/* eslint-disable react/no-unstable-nested-components */
import {
  Button,
} from '@tourmalinecore/react-tc-ui-kit';
import { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { api } from '../../common/api';
import { LINK_TO_SALARY_SERVICE } from '../../common/config/config';

import ContentCard from '../../components/ContentCard/ContentCard';
import DefaultCardHeader from '../../components/DefaultCardHeader/DefaultCardHeader';

import EmployeesContactDetailsTable from './components/EmployeeContactDetailsTable/EmployeesContactDetailsTable';
import EmployeesSalaryDataTable from './components/EmployeeSalaryDataTable/EmployeesSalaryDataTable';
import { ColleagueContactsType, ColleagueFinancesDtoType, ColleaguesType } from './types';

function EmployeesPage() {
  const [employeesContact, setEmployeesContact] = useState<ColleagueContactsType[]>([]);
  const [employeesSalary, setEmployeesSalary] = useState<ColleagueFinancesDtoType[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    loadEmployeesAsync();
  }, []);

  return (
    <>
      <ContentCard
        style={{ margin: 20 }}
        isStickyHead
        headerContent={(
          <DefaultCardHeader>Contact details</DefaultCardHeader>
        )}
      >
        <div style={{ paddingTop: 4 }}>
          <EmployeesContactDetailsTable
            employeesContact={employeesContact}
            loadEmployeesAsync={loadEmployeesAsync}
          />
        </div>
        <Button
          style={{ marginTop: 20 }}
          onClick={() => { navigate('/employees/add'); }}
        >
          Аdd an employee

        </Button>
      </ContentCard>
      <ContentCard
        style={{ margin: 20 }}
        isStickyHead
        headerContent={(
          <DefaultCardHeader>Salary data</DefaultCardHeader>
        )}
      >
        <div className="table" style={{ paddingTop: 4 }}>
          <EmployeesSalaryDataTable employeesSalary={employeesSalary} />
        </div>
      </ContentCard>
    </>
  );

  async function loadEmployeesAsync() {
    const { data } = await api.get<ColleaguesType>(`${LINK_TO_SALARY_SERVICE}employees/get-colleagues`);
    setEmployeesContact(data.colleagueContacts);
    setEmployeesSalary(data.colleagueFinancesDto);
  }
}

export default EmployeesPage;
