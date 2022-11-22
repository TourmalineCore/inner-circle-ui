/* eslint-disable react/no-unstable-nested-components */
import { ClientTable, SelectColumnFilter } from '@tourmalinecore/react-table-responsive';
import { useEffect, useState } from 'react';
import { api } from '../../common/api';
import { formatMoney, formatNumber } from '../../common/utils/formatMoney';
import { AnalyticsSalaryForSeo } from './types';

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
  const [isLoading, setIsLoading] = useState(true);
  const [employees, setEmployees] = useState<AnalyticsSalaryForSeo[]>([]);

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
      <div style={{ paddingTop: 4 }}>
        <ClientTable
          tableId="analytics-salary-table"
          data={employees}
          order={{
            id: 'weightForSorting',
            desc: true,
          }}
          loading={isLoading}
          renderMobileTitle={(row : Row<{ surname: string }>) => row.original.surname}
          enableTableStatePersistance
          maxStillMobileBreakpoint={800}
          isStriped
          columns={[
            {
              Header: 'Employee',
              accessor: 'surname',
              principalFilterableColumn: true,
              Cell: ({ row }: CellTable<AnalyticsSalaryForSeo>) => {
                const { surname, name } = row.original;

                return (<div>{`${surname} ${name}`}</div>);
              },
              Footer: () => 'Total',
            },
            {
              Header: 'Pay',
              accessor: 'pay',
              ...getSelectFilterOptions('pay', true),
              Cell: ({ row }: CellTable<AnalyticsSalaryForSeo>) => {
                const { pay } = row.original;

                return (<div>{formatMoney(pay)}</div>);
              },
            },
            {
              Header: 'Rate/h',
              accessor: 'ratePerHour',
              ...getSelectFilterOptions('ratePerHour', true),
              Cell: ({ row }: CellTable<AnalyticsSalaryForSeo>) => {
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
              Cell: ({ row }: CellTable<AnalyticsSalaryForSeo>) => {
                const { hourlyCostFact } = row.original;

                return (<div>{formatMoney(hourlyCostFact)}</div>);
              },
            },
            {
              Header: 'Hourly Cost (On Hand)',
              accessor: 'hourlyCostHand',
              disableFilters: true,
              disableSortBy: true,
              Cell: ({ row }: CellTable<AnalyticsSalaryForSeo>) => {
                const { hourlyCostHand } = row.original;

                return (<div>{formatMoney(hourlyCostHand)}</div>);
              },
            },
            {
              Header: 'Earnings',
              accessor: 'earnings',
              disableFilters: true,
              minWidth: 160,
              Cell: ({ row }: CellTable<AnalyticsSalaryForSeo>) => {
                const { earnings } = row.original;

                return (<div>{formatMoney(earnings)}</div>);
              },
              Footer: (row: FooterTable<AnalyticsSalaryForSeo>) => getTotalCost(row, 'earnings'),
            },
            {
              Header: 'Expenses',
              accessor: 'expenses',
              disableFilters: true,
              minWidth: 160,
              Cell: ({ row }: CellTable<AnalyticsSalaryForSeo>) => {
                const { expenses } = row.original;

                return (<div>{formatMoney(expenses)}</div>);
              },
              Footer: (row: FooterTable<AnalyticsSalaryForSeo>) => getTotalCost(row, 'expenses'),
            },
            {
              Header: 'Profit',
              accessor: 'profit',
              disableFilters: true,
              Cell: ({ row }: CellTable<AnalyticsSalaryForSeo>) => {
                const { profit } = row.original;

                return (<div>{formatMoney(profit)}</div>);
              },
              Footer: (row: FooterTable<AnalyticsSalaryForSeo>) => getTotalCost(row, 'profit'),
            },
            {
              Header: 'Profitability',
              accessor: 'profitAbility',
              disableFilters: true,
              Cell: ({ row }: CellTable<AnalyticsSalaryForSeo>) => {
                const { profitAbility } = row.original;

                return (<div>{`${profitAbility}%`}</div>);
              },
              Footer: (row: FooterTable<AnalyticsSalaryForSeo>) => (
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
              Cell: ({ row }: CellTable<AnalyticsSalaryForSeo>) => {
                const { grossSalary } = row.original;

                return (<div>{formatMoney(grossSalary)}</div>);
              },
              Footer: (row: FooterTable<AnalyticsSalaryForSeo>) => getTotalCost(row, 'grossSalary'),
            },
            {
              Header: 'Net Salary',
              accessor: 'netSalary',
              disableSortBy: true,
              ...getSelectFilterOptions('netSalary', true),
              Cell: ({ row }: CellTable<AnalyticsSalaryForSeo>) => {
                const { netSalary } = row.original;

                return (<div>{formatMoney(netSalary)}</div>);
              },
              Footer: (row: FooterTable<AnalyticsSalaryForSeo>) => getTotalCost(row, 'netSalary'),
            },
            {
              Header: 'Retainer',
              accessor: 'retainer',
              disableSortBy: true,
              ...getSelectFilterOptions('retainer', true),
              Cell: ({ row }: CellTable<AnalyticsSalaryForSeo>) => {
                const { retainer } = row.original;

                return (<div>{formatMoney(retainer)}</div>);
              },
              Footer: (row: FooterTable<AnalyticsSalaryForSeo>) => getTotalCost(row, 'retainer'),
            },
            {
              Header: 'Parking Cost (per Month)',
              accessor: 'parkingCostPerMonth',
              disableSortBy: true,
              ...getSelectFilterOptions('parkingCostPerMonth', true),
              Cell: ({ row }: CellTable<AnalyticsSalaryForSeo>) => {
                const { parkingCostPerMonth } = row.original;

                return (<div>{formatMoney(parkingCostPerMonth)}</div>);
              },
              Footer: (row: FooterTable<AnalyticsSalaryForSeo>) => getTotalCost(row, 'parkingCostPerMonth'),
            },
          ]}
        />
      </div>

    </ContentCard>
  );

  async function loadEmployeesAsync() {
    setIsLoading(true);

    try {
      const { data } = await api.get<AnalyticsSalaryForSeo[]>('/finances/get-finance-data');

      setEmployees(data);

      setIsLoading(false);
    } catch {
      // todo: #344qg6j
      setIsLoading(true);
    }
  }

  function getTotalCost(row: FooterTable<AnalyticsSalaryForSeo>, keyOfEmployee: string) {
    const { filteredRows } = row;

    const sumOfEmployeesValues = filteredRows.map((elem) => elem.values[keyOfEmployee as keyof AnalyticsSalaryForSeo] as number)
      .reduce((pre: number, current: number) => pre + current);

    return (
      <div>{formatMoney(sumOfEmployeesValues)}</div>
    );
  }

  function getSelectFilterOptions(keyOfEmployee: string, isFormatNumber: boolean = false) {
    const all = { label: 'All', value: '' };

    const selectFO = Array.from(new Set(employees.map((employee) => employee[keyOfEmployee as keyof AnalyticsSalaryForSeo]))).map((valueOfKey) => ({
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