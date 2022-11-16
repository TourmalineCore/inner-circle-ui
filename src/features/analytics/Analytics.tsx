/* eslint-disable react/no-unstable-nested-components */

import { ClientTable } from '@tourmalinecore/react-table-responsive';
import { formatMoney } from '../../common/utils/formatMoney';
import ContentCard from '../../components/ContentCard/ContentCard';
import DefaultCardHeader from '../../components/DefaultCardHeader/DefaultCardHeader';

import { EmployeesMock } from './mockData/mockData';

type Row<Type> = {
  original: Type
};

type Table<TypeProps> = {
  row: {
    original: TypeProps;
  }
};

function Analytics() {
  const employees = EmployeesMock;
  return (
    <ContentCard
      isStickyHead
      headerContent={(
        <DefaultCardHeader>Employees Table</DefaultCardHeader>
      )}
    >
      <div style={{ paddingTop: 4 }}>
        <ClientTable
          tableId="employees-salary-table"
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
              filter: 'fuzzyText',
              nonMobileColumn: true,
              principalFilterableColumn: true,
              Cell: ({ row }: Table<Employee>) => {
                const { surname, name } = row.original;
                return (<div>{`${surname} ${name}`}</div>);
              },
            },
            {
              Header: 'Pay',
              accessor: 'pay',
              Cell: ({ row }: Table<Employee>) => {
                const { pay } = row.original;
                return (<div>{formatMoney(pay)}</div>);
              },
            },
            {
              Header: 'Rate/h',
              accessor: 'ratePerHour',
              Cell: ({ row }: Table<Employee>) => {
                const { ratePerHour } = row.original;
                return (<div>{formatMoney(ratePerHour)}</div>);
              },
            },
            {
              Header: 'Employment type',
              accessor: 'employmentType',
            },
            {
              Header: 'Hourly Cost (By Fact)',
              accessor: 'hourlyCostFact',
              Cell: ({ row }: Table<Employee>) => {
                const { hourlyCostFact } = row.original;
                return (<div>{formatMoney(hourlyCostFact)}</div>);
              },
            },
            {
              Header: 'Hourly Cost (On Hand)',
              accessor: 'hourlyCostHand',
              Cell: ({ row }: Table<Employee>) => {
                const { hourlyCostHand } = row.original;
                return (<div>{formatMoney(hourlyCostHand)}</div>);
              },
            },
            {
              Header: 'Earnings',
              accessor: 'earnings',
              Cell: ({ row }: Table<Employee>) => {
                const { earnings } = row.original;
                return (<div>{formatMoney(earnings)}</div>);
              },
            },
            {
              Header: 'Expenses',
              accessor: 'expenses',
              Cell: ({ row }: Table<Employee>) => {
                const { expenses } = row.original;
                return (<div>{formatMoney(expenses)}</div>);
              },
            },
            {
              Header: 'Profit',
              accessor: 'profit',
              Cell: ({ row }: Table<Employee>) => {
                const { profit } = row.original;
                return (<div>{formatMoney(profit)}</div>);
              },
            },
            {
              Header: 'Profitability',
              accessor: 'profitAbility',
              Cell: ({ row }: Table<Employee>) => {
                const { profitAbility } = row.original;
                return (<div>{`${profitAbility}%`}</div>);
              },
            },
            {
              Header: 'Gross Salary',
              accessor: 'grossSalary',
              Cell: ({ row }: Table<Employee>) => {
                const { grossSalary } = row.original;
                return (<div>{formatMoney(grossSalary)}</div>);
              },
            },
            {
              Header: 'Net Salary',
              accessor: 'netSalary',
              Cell: ({ row }: Table<Employee>) => {
                const { netSalary } = row.original;
                return (<div>{formatMoney(netSalary)}</div>);
              },
            },
            {
              Header: 'Retainer',
              accessor: 'retainer',
              Cell: ({ row }: Table<Employee>) => {
                const { retainer } = row.original;
                return (<div>{formatMoney(retainer)}</div>);
              },
            },
          ]}
        />
      </div>
    </ContentCard>
  );
}

export default Analytics;
