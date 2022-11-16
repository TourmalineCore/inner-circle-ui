/* eslint-disable react/no-unstable-nested-components */

import { ClientTable, SelectColumnFilter } from '@tourmalinecore/react-table-responsive';

import { formatMoney, formatNumber } from '../../common/utils/formatMoney';
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
              ...getSelectFilterOptions('pay', true),
              Cell: ({ row }: Table<Employee>) => {
                const { pay } = row.original;
                return (<div>{formatMoney(pay)}</div>);
              },
            },
            {
              Header: 'Rate/h',
              accessor: 'ratePerHour',
              ...getSelectFilterOptions('ratePerHour', true),
              Cell: ({ row }: Table<Employee>) => {
                const { ratePerHour } = row.original;
                return (<div>{formatMoney(ratePerHour)}</div>);
              },
            },
            {
              Header: 'Employment type',
              accessor: 'employmentType',
              ...getSelectFilterOptions('employmentType'),
            },
            {
              Header: 'Hourly Cost (By Fact)',
              accessor: 'hourlyCostFact',
              disableFilters: true,
              Cell: ({ row }: Table<Employee>) => {
                const { hourlyCostFact } = row.original;
                return (<div>{formatMoney(hourlyCostFact)}</div>);
              },
            },
            {
              Header: 'Hourly Cost (On Hand)',
              accessor: 'hourlyCostHand',
              disableFilters: true,
              Cell: ({ row }: Table<Employee>) => {
                const { hourlyCostHand } = row.original;
                return (<div>{formatMoney(hourlyCostHand)}</div>);
              },
            },
            {
              Header: 'Earnings',
              accessor: 'earnings',
              disableFilters: true,
              Cell: ({ row }: Table<Employee>) => {
                const { earnings } = row.original;
                return (<div>{formatMoney(earnings)}</div>);
              },
              Footer: (row: any) => getTotalCost(row, 'earnings'),
            },
            {
              Header: 'Expenses',
              accessor: 'expenses',
              disableFilters: true,
              Cell: ({ row }: Table<Employee>) => {
                const { expenses } = row.original;
                return (<div>{formatMoney(expenses)}</div>);
              },
              Footer: (row: any) => getTotalCost(row, 'expenses'),
            },
            {
              Header: 'Profit',
              accessor: 'profit',
              disableFilters: true,
              Cell: ({ row }: Table<Employee>) => {
                const { profit } = row.original;
                return (<div>{formatMoney(profit)}</div>);
              },
              Footer: (row: any) => getTotalCost(row, 'profit'),
            },
            {
              Header: 'Profitability',
              accessor: 'profitAbility',
              disableFilters: true,
              Cell: ({ row }: Table<Employee>) => {
                const { profitAbility } = row.original;
                return (<div>{`${profitAbility}%`}</div>);
              },
              Footer: (row: any) => (
                <div>{`${row.filteredRows.map((elem: any) => elem.values.profitAbility).reduce((pre: any, current: any) => pre + current) / row.filteredRows.length}%`}</div>
              ),
            },
            {
              Header: 'Gross Salary',
              accessor: 'grossSalary',
              ...getSelectFilterOptions('grossSalary', true),
              Cell: ({ row }: Table<Employee>) => {
                const { grossSalary } = row.original;
                return (<div>{formatMoney(grossSalary)}</div>);
              },
              Footer: (row: any) => getTotalCost(row, 'grossSalary'),
            },
            {
              Header: 'Net Salary',
              accessor: 'netSalary',
              ...getSelectFilterOptions('netSalary', true),
              Cell: ({ row }: Table<Employee>) => {
                const { netSalary } = row.original;
                return (<div>{formatMoney(netSalary)}</div>);
              },
              Footer: (row: any) => getTotalCost(row, 'netSalary'),
            },
            {
              Header: 'Retainer',
              accessor: 'retainer',
              ...getSelectFilterOptions('retainer', true),
              Cell: ({ row }: Table<Employee>) => {
                const { retainer } = row.original;
                return (<div>{formatMoney(retainer)}</div>);
              },
              Footer: (row: any) => getTotalCost(row, 'retainer'),
            },
            {
              Header: 'Parking Cost (per Month)',
              accessor: 'parkingCostPerMonth',
              ...getSelectFilterOptions('parkingCostPerMonth', true),
              Cell: ({ row }: Table<Employee>) => {
                const { parkingCostPerMonth } = row.original;
                return (<div>{formatMoney(parkingCostPerMonth)}</div>);
              },
              Footer: (row: any) => getTotalCost(row, 'parkingCostPerMonth'),
            },
          ]}
        />
      </div>
    </ContentCard>
  );

  function getTotalCost(row: any, keyOfEmployee: string) {
    const sumOfEmployeesValues = row.filteredRows.map((elem: any) => elem.values[keyOfEmployee]).reduce((pre: any, current: any) => pre + current);

    return (
      <div>{formatMoney(sumOfEmployeesValues)}</div>
    );
  }

  function getSelectFilterOptions(keyOfEmployee: string, isFormatNumber: boolean = false) {
    const all = { label: 'All', value: '' };
    const selectFO = Array.from(new Set(employees.map((employee) => employee[keyOfEmployee as keyof Employee]))).map((valueOfKey) => ({
      label: isFormatNumber ? formatNumber(Number(valueOfKey)) : valueOfKey,
      value: valueOfKey,
    }));

    return ({
      Filter: SelectColumnFilter,
      selectFilterOptions: [all, ...selectFO],
    });
  }
}

export default Analytics;
