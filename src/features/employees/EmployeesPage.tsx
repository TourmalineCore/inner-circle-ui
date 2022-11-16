/* eslint-disable react/no-unstable-nested-components */
import { ClientTable } from '@tourmalinecore/react-table-responsive';
import {
  useState,
  useEffect,
} from 'react';
import ContentCard from '../../components/ContentCard/ContentCard';
import DefaultCardHeader from '../../components/DefaultCardHeader/DefaultCardHeader';
import { EmployeeProps } from './employeesData';
import { api } from '../../common/api';

type Row<Type> = {
  original: Type
};
type Table<TypeProps> = {
  row: {
    original: TypeProps;
  }
};

function EmployeesPage() {
  const [employees, setEmployees] = useState<EmployeeProps[]>([]);

  useEffect(() => {
    loadEmployeesAsync();
  }, []);

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
          renderMobileTitle={(row : Row<{ surname: string }>) => row.original.surname}
          enableTableStatePersistance
          maxStillMobileBreakpoint={1200}
          isStriped
          columns={[
            {
              Header: 'Employee',
              accessor: 'surname',
              // Use our custom `fuzzyText` filter on this column
              filter: 'fuzzyText',
              nonMobileColumn: true,
              principalFilterableColumn: true,
              Cell: ({ row }: Table<EmployeeProps>) => {
                const { surname, name, middleName } = row.original;
                return (<div>{`${surname} ${name} ${middleName}`}</div>);
              },
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
              Cell: ({ row }: Table<EmployeeProps>) => {
                const { personalEmail } = row.original;
                const personalEmailChange = personalEmail || 'Not specified';
                return (<div>{personalEmailChange}</div>);
              },
            },
            {
              Header: 'Phone',
              accessor: 'phone',
              disableFilters: true,
              disableSortBy: true,
              Cell: ({ row }: Table<EmployeeProps>) => {
                const { phone } = row.original;
                const phoneChange = phone || 'Not specified';
                return (<div>{phoneChange}</div>);
              },
            },
            {
              Header: 'Skype',
              accessor: 'skype',
              disableFilters: true,
              disableSortBy: true,
              Cell: ({ row }: Table<EmployeeProps>) => {
                const { skype } = row.original;
                const skypeChange = skype || 'Not specified';
                return (<div>{skypeChange}</div>);
              },
            },
            {
              Header: 'Telegram',
              accessor: 'telegram',
              disableFilters: true,
              disableSortBy: true,
              Cell: ({ row }: Table<EmployeeProps>) => {
                const { telegram } = row.original;
                const telegramChange = telegram || 'Not specified';
                return (<div>{telegramChange}</div>);
              },
            },
          ]}
        />
      </div>
    </ContentCard>
  );

  async function loadEmployeesAsync() {
    const { data } = await api.get<EmployeeProps[]>('/employees/get-general-information');
    setEmployees(data);
  }
}

export default EmployeesPage;
