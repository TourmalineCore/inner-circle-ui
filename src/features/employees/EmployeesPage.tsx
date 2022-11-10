import { ClientTable } from '@tourmalinecore/react-table-responsive';
import axios from 'axios';
import {
  useState,
  useEffect,
} from 'react';
import ContentCard from '../../components/ContentCard/ContentCard';
import DefaultCardHeader from '../../components/DefaultCardHeader/DefaultCardHeader';
import EmployeeProps from './employeesData';

const QUOTE_SERVICE_URL = 'http://localhost:5000/api/employees/list';

type Row<Type> = {
  original: Type
};

function EmployeesPage() {
  const [employees, employeesState] = useState<EmployeeProps[]>([]);
  function fetchQuotes() {
    axios.get<EmployeeProps[]>(QUOTE_SERVICE_URL, {
      method: 'GET',
    }).then((response) => {
      for (let i = 0; i < response.data.length; i++) {
        response.data[i].fullname = `${response.data[i].name} ${response.data[i].surname}`;
        if (!response.data[i].telegram || response.data[i].telegram?.length === 0) {
          response.data[i].telegram = 'Not specified';
        }
      }
      employeesState(response.data);
    });
  }
  useEffect(() => {
    try {
      fetchQuotes();
    } catch (err) {
      console.log(err);
    }
  }, [employeesState]);
  return (
    <ContentCard
      isStickyHead
      headerContent={(
        <DefaultCardHeader>Employees Table</DefaultCardHeader>
      )}
    >
      <div style={{ paddingTop: 4 }}>
        <ClientTable
          tableId="tc-story-bonus-table"
          data={employees}
          order={{
            id: 'weightForSorting',
            desc: true,
          }}
          renderMobileTitle={(row : Row<{ fullname: string }>) => row.original.fullname}
          enableTableStatePersistance
          maxStillMobileBreakpoint={1200}
          isStriped
          columns={[
            {
              Header: 'Employee',
              accessor: 'fullname',
              // Use our custom `fuzzyText` filter on this column
              filter: 'fuzzyText',
              nonMobileColumn: true,
              principalFilterableColumn: true,
            },
            {
              Header: 'Work Email',
              accessor: 'workEmail',
              disableFilters: true,
              disableSortBy: true,
              minWidth: 250,
            },
            {
              Header: 'Email',
              accessor: 'personalEmail',
              disableFilters: true,
              disableSortBy: true,
            },
            {
              Header: 'Phone',
              accessor: 'phone',
              disableFilters: true,
              disableSortBy: true,
            },
            {
              Header: 'Skype',
              accessor: 'skype',
              disableFilters: true,
              disableSortBy: true,
            },
            {
              Header: 'Telegram',
              accessor: 'telegram',
              disableFilters: true,
              disableSortBy: true,
            },
          ]}
        />
      </div>
    </ContentCard>
  );
}

export default EmployeesPage;
