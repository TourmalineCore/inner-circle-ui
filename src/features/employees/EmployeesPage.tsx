import { ClientTable } from '@tourmalinecore/react-table-responsive';
import ContentCard from '../../components/ContentCard/ContentCard';
import DefaultCardHeader from '../../components/DefaultCardHeader/DefaultCardHeader';

import {
  data,
} from './employeesData';

type Row<Type> = {
  original: Type
};

function EmployeesPage() {
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
          data={data}
          order={{
            id: 'weightForSorting',
            desc: true,
          }}
          renderMobileTitle={(row : Row<{ employee: string }>) => row.original.employee}
          enableTableStatePersistance
          maxStillMobileBreakpoint={1200}
          isStriped
          columns={[
            {
              Header: 'Employee',
              accessor: 'fullName',
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
