/* eslint-disable react/no-unstable-nested-components */
import { ClientTable } from '@tourmalinecore/react-table-responsive';
import { useState, useEffect } from 'react';

import { api } from '../../common/api';
import { EmployeeProps } from './types';

import ContentCard from '../../components/ContentCard/ContentCard';
import DefaultCardHeader from '../../components/DefaultCardHeader/DefaultCardHeader';

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
          maxStillMobileBreakpoint={800}
          isStriped
          columns={[
            {
              Header: 'Employee',
              accessor: 'surname',
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

                return (<div>{checkSpecifiedData(personalEmail)}</div>);
              },
            },
            {
              Header: 'Phone',
              accessor: 'phone',
              disableFilters: true,
              disableSortBy: true,
              Cell: ({ row }: Table<EmployeeProps>) => {
                const { phone } = row.original;

                return (<div>{checkSpecifiedData(phone)}</div>);
              },
            },
            {
              Header: 'Skype',
              accessor: 'skype',
              disableFilters: true,
              disableSortBy: true,
              Cell: ({ row }: Table<EmployeeProps>) => {
                const { skype } = row.original;

                return (<div>{checkSpecifiedData(skype)}</div>);
              },
            },
            {
              Header: 'Telegram',
              accessor: 'telegram',
              disableFilters: true,
              disableSortBy: true,
              Cell: ({ row }: Table<EmployeeProps>) => {
                const { telegram } = row.original;

                return (<div>{checkSpecifiedData(telegram)}</div>);
              },
            },
          ]}
        />
      </div>
    </ContentCard>
  );

  function checkSpecifiedData(value: string | null) {
    return value || 'Not specified';
  }

  async function loadEmployeesAsync() {
    const { data } = await api.get<EmployeeProps[]>('finances/get-contact-information');

    setEmployees(data);
  }
}

export default EmployeesPage;
