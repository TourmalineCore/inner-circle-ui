/* eslint-disable react/no-unstable-nested-components */

import { ClientTable, SelectColumnFilter } from '@tourmalinecore/react-table-responsive';
import { useEffect, useState } from 'react';
import { api } from '../../common/api';

import { formatMoney, formatNumber } from '../../common/utils/formatMoney';
import ContentCard from '../../components/ContentCard/ContentCard';
import DefaultCardHeader from '../../components/DefaultCardHeader/DefaultCardHeader';

type Row<Type> = {
  original: Type
};

type CellTable<TypeProps> = {
  row: {
    original: TypeProps;
  }
};

type FooterTable<TypeProps> = {
  filteredRows: Array<{
    values: TypeProps;
  }>;
};

function Analytics() {
  const [employees, setEmployees] = useState<Employee[]>();

  useEffect(() => {
    loadEmployeesAsync();
  }, []);

  return (
    <ContentCard
      isStickyHead
      headerContent={(
        <DefaultCardHeader>Analytics</DefaultCardHeader>
      )}
    >
      {employees && (
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
                Cell: ({ row }: CellTable<Employee>) => {
                  const { surname, name } = row.original;

                  return (<div>{`${surname} ${name}`}</div>);
                },
                Footer: () => 'Total',
              },
              {
                Header: 'Pay',
                accessor: 'pay',
                ...getSelectFilterOptions('pay', true),
                Cell: ({ row }: CellTable<Employee>) => {
                  const { pay } = row.original;

                  return (<div>{formatMoney(pay)}</div>);
                },
              },
              {
                Header: 'Rate/h',
                accessor: 'ratePerHour',
                ...getSelectFilterOptions('ratePerHour', true),
                Cell: ({ row }: CellTable<Employee>) => {
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
                disableSortBy: true,
                Cell: ({ row }: CellTable<Employee>) => {
                  const { hourlyCostFact } = row.original;

                  return (<div>{formatMoney(hourlyCostFact)}</div>);
                },
              },
              {
                Header: 'Hourly Cost (On Hand)',
                accessor: 'hourlyCostHand',
                disableFilters: true,
                disableSortBy: true,
                Cell: ({ row }: CellTable<Employee>) => {
                  const { hourlyCostHand } = row.original;

                  return (<div>{formatMoney(hourlyCostHand)}</div>);
                },
              },
              {
                Header: 'Earnings',
                accessor: 'earnings',
                disableFilters: true,
                minWidth: 160,
                Cell: ({ row }: CellTable<Employee>) => {
                  const { earnings } = row.original;

                  return (<div>{formatMoney(earnings)}</div>);
                },
                Footer: (row: FooterTable<Employee>) => getTotalCost(row, 'earnings'),
              },
              {
                Header: 'Expenses',
                accessor: 'expenses',
                disableFilters: true,
                minWidth: 160,
                Cell: ({ row }: CellTable<Employee>) => {
                  const { expenses } = row.original;

                  return (<div>{formatMoney(expenses)}</div>);
                },
                Footer: (row: FooterTable<Employee>) => getTotalCost(row, 'expenses'),
              },
              {
                Header: 'Profit',
                accessor: 'profit',
                disableFilters: true,
                Cell: ({ row }: CellTable<Employee>) => {
                  const { profit } = row.original;
                  return (<div>{formatMoney(profit)}</div>);
                },
                Footer: (row: FooterTable<Employee>) => getTotalCost(row, 'profit'),
              },
              {
                Header: 'Profitability',
                accessor: 'profitAbility',
                disableFilters: true,
                Cell: ({ row }: CellTable<Employee>) => {
                  const { profitAbility } = row.original;
                  return (<div>{`${profitAbility}%`}</div>);
                },
                Footer: (row: FooterTable<Employee>) => (
                  <div>
                    {`${(row.filteredRows
                      .map((elem) => elem.values.profitAbility)
                      .reduce((pre: number, current: number) => pre + current) / row.filteredRows.length)
                      .toFixed(2)}%`}
                  </div>
                ),
              },
              {
                Header: 'Gross Salary',
                accessor: 'grossSalary',
                disableSortBy: true,
                ...getSelectFilterOptions('grossSalary', true),
                Cell: ({ row }: CellTable<Employee>) => {
                  const { grossSalary } = row.original;
                  return (<div>{formatMoney(grossSalary)}</div>);
                },
                Footer: (row: FooterTable<Employee>) => getTotalCost(row, 'grossSalary'),
              },
              {
                Header: 'Net Salary',
                accessor: 'netSalary',
                disableSortBy: true,
                ...getSelectFilterOptions('netSalary', true),
                Cell: ({ row }: CellTable<Employee>) => {
                  const { netSalary } = row.original;
                  return (<div>{formatMoney(netSalary)}</div>);
                },
                Footer: (row: FooterTable<Employee>) => getTotalCost(row, 'netSalary'),
              },
              {
                Header: 'Retainer',
                accessor: 'retainer',
                disableSortBy: true,
                ...getSelectFilterOptions('retainer', true),
                Cell: ({ row }: CellTable<Employee>) => {
                  const { retainer } = row.original;
                  return (<div>{formatMoney(retainer)}</div>);
                },
                Footer: (row: FooterTable<Employee>) => getTotalCost(row, 'retainer'),
              },
              {
                Header: 'Parking Cost (per Month)',
                accessor: 'parkingCostPerMonth',
                disableSortBy: true,
                ...getSelectFilterOptions('parkingCostPerMonth', true),
                Cell: ({ row }: CellTable<Employee>) => {
                  const { parkingCostPerMonth } = row.original;
                  return (<div>{formatMoney(parkingCostPerMonth)}</div>);
                },
                Footer: (row: FooterTable<Employee>) => getTotalCost(row, 'parkingCostPerMonth'),
              },
            ]}
          />
        </div>
      )}
      {!employees && <h1>TODO: Loader</h1>}
    </ContentCard>
  );

  async function loadEmployeesAsync() {
    const { data } = await api.get<Employee[]>('/finances/get-finance-data');

    setEmployees(data);
  }

  function getTotalCost(row: FooterTable<Employee>, keyOfEmployee: string) {
    const { filteredRows } = row;

    const sumOfEmployeesValues = filteredRows.map((elem) => elem.values[keyOfEmployee as keyof Employee] as number).reduce((pre: number, current: number) => pre + current);

    return (
      <div>{formatMoney(sumOfEmployeesValues)}</div>
    );
  }

  function getSelectFilterOptions(keyOfEmployee: string, isFormatNumber: boolean = false) {
    const all = { label: 'All', value: '' };
    if (!employees) {
      return ({
        Filter: SelectColumnFilter,
        selectFilterOptions: [all],
      });
    }

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
