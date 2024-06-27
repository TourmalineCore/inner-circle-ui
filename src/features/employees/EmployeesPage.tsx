import {
  useContext, useEffect, useMemo, useState,
} from 'react';
import { observer } from 'mobx-react-lite';
import { SearchBar } from './components/SearchBar/SearchBar';
import { EmployeeList } from './components/EmployeeList/EmployeeList';
import { SortMenu } from './components/SortMenu/SortMenu';
import EmployeesStateContext from './context/EmployeesStateContext';
import EmployeesState from './context/EmployeesState';
import { LINK_TO_SALARY_SERVICE } from '../../common/config/config';
import { api } from '../../common/api';
import AccessBasedOnPermissionsStateContext from '../../routes/state/AccessBasedOnPermissionsStateContext';
import { FilterMenu } from './components/FilterMenu/FilterMenu';

export const EmployeesPage = observer(() => {
  const employeesState = useMemo(() => new EmployeesState(), []);
  const accessBasedOnPermissionsState = useContext(AccessBasedOnPermissionsStateContext);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadEmployeesAsync();
  }, []);

  return (
    <EmployeesStateContext.Provider value={employeesState}>

      <section className="employees-page">

        {employeesState.isBlankEmployees
          && accessBasedOnPermissionsState.accessPermissions.get('ViewSalaryAndDocumentsData')
          && <div className="employees-page__notification">You have blank employees. Please fill in their profiles.</div>}

        <div className="employees-page__box">
          <div><SearchBar /></div>
          { accessBasedOnPermissionsState.accessPermissions.get('ViewSalaryAndDocumentsData') && <FilterMenu />}
          <SortMenu />
        </div>

        <div>
          <EmployeeList
            isLoading={isLoading}
            employees={employeesState.allEmployees}
          />
        </div>
      </section>
    </EmployeesStateContext.Provider>
  );

  async function loadEmployeesAsync() {
    if (accessBasedOnPermissionsState.accessPermissions.get('ViewContacts') && !accessBasedOnPermissionsState.accessPermissions.get('ViewSalaryAndDocumentsData')) {
      employeesState.updateFilterTerm('all');
    }

    setIsLoading(true);

    try {
      const { data } = await api.get(`${LINK_TO_SALARY_SERVICE}employees/all `);

      employeesState.changeEmployees(data);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  }
});
