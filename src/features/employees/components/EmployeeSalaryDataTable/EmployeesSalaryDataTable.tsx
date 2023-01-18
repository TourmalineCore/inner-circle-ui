/* eslint-disable react/no-unstable-nested-components */
import { ClientTable } from '@tourmalinecore/react-table-responsive';

import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  MouseEventHandler,
} from 'react';

import { useNavigate } from 'react-router-dom';
import { ColleagueFinancesDtoType, EmployeeTypeSwitch } from '../../types';
import { formatMoney } from '../../../../common/utils/formatMoney';

type Row<Type> = {
  original: Type
};
type Table<TypeProps> = {
  row: {
    original: TypeProps;
  }
};

function EmployeesSalaryDataTable({ employeesSalary = [] }:{ employeesSalary: ColleagueFinancesDtoType[] }) {
  const navigate = useNavigate();

  return (

    <ClientTable
      tableId="tc-story-bonus-table"
      data={employeesSalary}
      order={{
        id: 'weightForSorting',
        desc: true,
      }}
      renderMobileTitle={(row : Row<{ fullName: string }>) => row.original.fullName}
      enableTableStatePersistance
      maxStillMobileBreakpoint={1200}
      actions={[
        {
          name: 'edit-row-action',
          show: () => true,
          renderIcon: () => <FontAwesomeIcon icon={faEdit} />,
          renderText: () => 'Edit',
          onClick: (e: MouseEventHandler<HTMLInputElement>, row: Row<ColleagueFinancesDtoType>) => {
            navigate(`/employees/edit-salary/${Number(row.original.id)}`);
          },
        },
      ]}
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
          Header: 'Rate per hour',
          accessor: 'ratePerHour',
          disableFilters: true,
          disableSortBy: true,
          Cell: ({ row }: Table<ColleagueFinancesDtoType>) => {
            const { ratePerHour } = row.original;
            return (<div>{formatMoney(ratePerHour)}</div>);
          },
        },
        {
          Header: 'Pay',
          accessor: 'pay',
          disableFilters: true,
          disableSortBy: true,
          Cell: ({ row }: Table<ColleagueFinancesDtoType>) => {
            const { pay } = row.original;
            return (<div>{formatMoney(pay)}</div>);
          },
        },
        {
          Header: 'Employment Type',
          accessor: 'employmentType',
          disableFilters: true,
          disableSortBy: true,
          Cell: ({ row }: Table<ColleagueFinancesDtoType>) => {
            const { employmentType } = row.original;
            return (<div>{EmployeeTypeSwitch[employmentType]}</div>);
          },
        },
        {
          Header: 'Net Salary',
          accessor: 'netSalary',
          disableFilters: true,
          disableSortBy: true,
          Cell: ({ row }: Table<ColleagueFinancesDtoType>) => {
            const { netSalary } = row.original;
            return (<div>{formatMoney(netSalary)}</div>);
          },
        },
        {
          Header: 'Parking',
          accessor: 'parking',
          disableFilters: true,
          disableSortBy: true,
          Cell: ({ row }: Table<ColleagueFinancesDtoType>) => {
            const { parking } = row.original;
            return (<div>{formatMoney(parking)}</div>);
          },
        },
      ]}
    />
  );
}

export default EmployeesSalaryDataTable;
