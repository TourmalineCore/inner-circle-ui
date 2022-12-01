/* eslint-disable react/no-unstable-nested-components */
import { ClientTable, SelectColumnFilter } from '@tourmalinecore/react-table-responsive';
import { useEffect, useState } from 'react';
import { api } from '../../common/api';
import { formatMoney, formatNumber } from '../../common/utils/formatMoney';
import { AnalyticsSalaryType } from './types';

import ContentCard from '../../components/ContentCard/ContentCard';
import DefaultCardHeader from '../../components/DefaultCardHeader/DefaultCardHeader';
import RedactComponent from './components/RedactComponent/RedactComponent';

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

function AnalyticsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [employees, setEmployees] = useState<AnalyticsSalaryType[]>([]);

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
          renderMobileTitle={(row : Row<{ fullName: string }>) => row.original.fullName}
          enableTableStatePersistance
          maxStillMobileBreakpoint={800}
          isStriped
          columns={[
            {
              Header: 'Employee',
              accessor: 'fullName',
              principalFilterableColumn: true,
              Footer: () => 'Total',
            },
            {
              Header: 'Rate/h',
              accessor: 'ratePerHour',
              ...getSelectFilterOptions('ratePerHour', true),
              Cell: ({ row }: CellTable<AnalyticsSalaryType>) => {
                const { ratePerHour } = row.original;

                return (<RedactComponent value={formatMoney(ratePerHour)} />);
              },
            },
            {
              Header: 'Pay',
              accessor: 'pay',
              ...getSelectFilterOptions('pay', true),
              Cell: ({ row }: CellTable<AnalyticsSalaryType>) => {
                const { pay } = row.original;

                return (<RedactComponent value={formatMoney(pay)} />);
              },
            },
            {
              Header: 'Employment type',
              accessor: 'employmentType',
              ...getSelectFilterOptions('employmentType'),
            },
            {
              Header: 'Net Salary',
              accessor: 'netSalary',
              disableSortBy: true,
              ...getSelectFilterOptions('netSalary', true),
              Cell: ({ row }: CellTable<AnalyticsSalaryType>) => {
                const { netSalary } = row.original;

                return (<RedactComponent value={formatMoney(netSalary)} />);
              },
              Footer: (row: FooterTable<AnalyticsSalaryType>) => getTotalCost(row, 'netSalary'),
            },
            {
              Header: 'Hourly Cost (By Fact)',
              accessor: 'hourlyCostFact',
              disableFilters: true,
              disableSortBy: true,
              Cell: ({ row }: CellTable<AnalyticsSalaryType>) => {
                const { hourlyCostFact } = row.original;

                return (<RedactComponent value={formatMoney(hourlyCostFact)} />);
              },
            },
            {
              Header: 'Hourly Cost (On Hand)',
              accessor: 'hourlyCostHand',
              disableFilters: true,
              disableSortBy: true,
              Cell: ({ row }: CellTable<AnalyticsSalaryType>) => {
                const { hourlyCostHand } = row.original;

                return (<RedactComponent value={formatMoney(hourlyCostHand)} />);
              },
            },
            {
              Header: 'Earnings',
              accessor: 'earnings',
              disableFilters: true,
              minWidth: 160,
              Cell: ({ row }: CellTable<AnalyticsSalaryType>) => {
                const { earnings } = row.original;

                return (<RedactComponent value={formatMoney(earnings)} />);
              },
              Footer: (row: FooterTable<AnalyticsSalaryType>) => getTotalCost(row, 'earnings'),
            },
            {
              Header: 'Expenses',
              accessor: 'expenses',
              disableFilters: true,
              minWidth: 160,
              Cell: ({ row }: CellTable<AnalyticsSalaryType>) => {
                const { expenses } = row.original;

                return (<RedactComponent value={formatMoney(expenses)} />);
              },
              Footer: (row: FooterTable<AnalyticsSalaryType>) => getTotalCost(row, 'expenses'),
            },
            {
              Header: 'Profit',
              accessor: 'profit',
              disableFilters: true,
              Cell: ({ row }: CellTable<AnalyticsSalaryType>) => {
                const { profit } = row.original;

                return (<RedactComponent value={formatMoney(profit)} />);
              },
              Footer: (row: FooterTable<AnalyticsSalaryType>) => getTotalCost(row, 'profit'),
            },
            {
              Header: 'Profitability',
              accessor: 'profitAbility',
              disableFilters: true,
              Cell: ({ row }: CellTable<AnalyticsSalaryType>) => {
                const { profitAbility } = row.original;

                return (<RedactComponent value={`${profitAbility}%`} />);
              },
              Footer: (row: FooterTable<AnalyticsSalaryType>) => (
                <div>
                  {`${(row.filteredRows
                    .map((elem) => elem.values.profitAbility)
                    .reduce((pre: number, current: number) => pre + current) / row.filteredRows.length)
                    .toFixed(2)}%`}
                </div>
              ),
            },
          ]}
        />
      </div>

    </ContentCard>
  );

  async function loadEmployeesAsync() {
    setIsLoading(true);

    try {
      const { data } = await api.get<AnalyticsSalaryType[]>('finance/get-analytic');

      setEmployees(data);

      setIsLoading(false);
    } catch {
      // todo: #344qg6j
      setIsLoading(false);
    }
  }

  function getTotalCost(row: FooterTable<AnalyticsSalaryType>, keyOfEmployee: string) {
    const { filteredRows } = row;

    const sumOfEmployeesValues = filteredRows.map((elem) => elem.values[keyOfEmployee as keyof AnalyticsSalaryType] as number)
      .reduce((pre: number, current: number) => pre + current);

    return (
      <div>{formatMoney(sumOfEmployeesValues)}</div>
    );
  }

  function getSelectFilterOptions(keyOfEmployee: string, isFormatNumber: boolean = false) {
    const all = { label: 'All', value: '' };

    const selectFO = Array.from(new Set(employees.map((employee) => employee[keyOfEmployee as keyof AnalyticsSalaryType]))).map((valueOfKey) => ({
      label: isFormatNumber ? formatNumber(Number(valueOfKey)) : valueOfKey,
      value: valueOfKey,
    }));

    return ({
      Filter: SelectColumnFilter,
      selectFilterOptions: [all, ...selectFO],
    });
  }
}

export default AnalyticsPage;
