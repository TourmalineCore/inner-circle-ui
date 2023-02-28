/* eslint-disable react/no-unstable-nested-components */
import { useState, useEffect } from 'react';

import { useSearchParams } from 'react-router-dom';
import ContentCard from '../../components/ContentCard/ContentCard';
import DefaultCardHeader from '../../components/DefaultCardHeader/DefaultCardHeader';
import SearchBar from './components/SearchBar/SearchBar';
import { mockData } from './mock';

import { Employee } from './types';
import EmployeeList from './components/EmployeeList/EmployeeList';
import FilterMenu from './components/FilterMenu/FilterMenu';
import SortMenu from './components/SortMenu/SortMenu';

function EmployeesPage() {
  const [params] = useSearchParams();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isBlankEmployees, setIsBlankEmployees] = useState(true);

  const [searchValue, setSearchValue] = useState('');
  const [filter, setFilter] = useState(params.get('filter') || 'current');
  const [sortBy, setSortBy] = useState('');

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

      <section className="employees-page">
        <h1>Employees</h1>
        <div className="employees-page__box">
          <SearchBar setSearch={setSearchValue} />
          <FilterMenu setFilter={setFilter} isBlankEmployees={isBlankEmployees} />
          <SortMenu setSortBy={setSortBy} />
        </div>

        <div>
          <EmployeeList
            employees={employees}
            search={searchValue}
            filter={filter}
            sort={sortBy}
          />
        </div>
      </section>
    </ContentCard>
  );

  async function loadEmployeesAsync() {
    // const { data } = await api.get<ColleaguesType>(`${LINK_TO_SALARY_SERVICE}employees/get-colleagues`);
    setEmployees(mockData);
    const blank = mockData.some((employee) => employee.isBlankEmployee);

    setIsBlankEmployees(blank);
  }
}

export default EmployeesPage;
