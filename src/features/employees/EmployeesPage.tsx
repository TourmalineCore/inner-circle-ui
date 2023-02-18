/* eslint-disable react/no-unstable-nested-components */
import { useState, useEffect } from 'react';

import { useSearchParams } from 'react-router-dom';
import ContentCard from '../../components/ContentCard/ContentCard';
import DefaultCardHeader from '../../components/DefaultCardHeader/DefaultCardHeader';
import SearchBar from './components/SearchBar/SearchBar';
import { mockData } from './mock';

import { Employees } from './types';
import EmployeeList from './components/EmployeeList/EmployeeList';
import FilterMenu from './components/FilterMenu/FilterMenu';
import SortMenu from './components/SortMenu/SortMenu';

function EmployeesPage() {
  const [params] = useSearchParams();
  const [employees, setEmployees] = useState<Employees[]>([]);

  const [searchValue, setSearchValue] = useState('');
  const [filterElement, setFilterElement] = useState(params.get('filter') || 'current');
  const [sortBy, setSortBy] = useState('desc');

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
      <section>
        <h1>Employees</h1>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 20,
          borderBottom: '1px solid #C2C2C2',
          paddingBottom: 20,
        }}
        >
          <SearchBar setEmployees={setSearchValue} />
          <FilterMenu setEmployees={setFilterElement} />
          <SortMenu setEmployees={setSortBy} />
        </div>

        <div>
          <EmployeeList employees={employees} search={searchValue} filter={filterElement} sort={sortBy} />
        </div>
      </section>
    </ContentCard>
  );

  async function loadEmployeesAsync() {
    // const { data } = await api.get<ColleaguesType>(`${LINK_TO_SALARY_SERVICE}employees/get-colleagues`);
    setEmployees(mockData);
  }
}

export default EmployeesPage;
