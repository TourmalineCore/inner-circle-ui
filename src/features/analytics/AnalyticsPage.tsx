/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/no-unstable-nested-components */
import { ClientTable } from '@tourmalinecore/react-table-responsive';
import { useEffect, useState } from 'react';
import { api } from '../../common/api';
import { formatMoney } from '../../common/utils/formatMoney';
import {
  GetPreviewType,
  PutPreviewType,
  TotalFinance,
} from './types/index';

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
  const [employees, setEmployees] = useState<(GetPreviewType)[]>([]);
  const [totalFinance, setTotalFinance] = useState<TotalFinance>();

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
          actions={[
            {
              name: 'edit-row-action',
              show: () => true,
              renderText: () => 'Dublicate',
              onClick: (e: any, row: any) => { dublicateEmployee(row.original.id); },
            },
            {
              name: 'edit-row-action',
              show: () => true,
              renderText: () => 'Delete',
              onClick: (e: any, row: any) => { deleteEmployee(row.original.id); },
            },
          ]}
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
              disableFilters: true,
              Cell: ({ row }: CellTable<GetPreviewType>) => {
                const {
                  id: employeeId, ratePerHour, pay, employmentType: employentCof, parkingCostPerMonth, ratePerHourDelta,
                } = row.original;

                const employmentType = employentCof === 1 ? 0 : 1;

                return (
                  <RedactComponent
                    value={formatMoney(ratePerHour)}
                    valueDelta={ratePerHourDelta}
                    onChange={(ratePerHour: number) => {
                      updateEmployeesAsync({
                        employeeId, ratePerHour, pay, employmentType, parkingCostPerMonth,
                      });
                    }}
                  />
                );
              },
            },
            {
              Header: 'Pay',
              accessor: 'pay',
              disableFilters: true,
              Cell: ({ row }: CellTable<GetPreviewType>) => {
                const {
                  id: employeeId, ratePerHour, pay, employmentType: employentCof, parkingCostPerMonth, payDelta,
                } = row.original;

                const employmentType = employentCof === 1 ? 0 : 1;

                return (
                  <RedactComponent
                    value={formatMoney(pay)}
                    valueDelta={payDelta}
                    onChange={(pay: number) => {
                      updateEmployeesAsync({
                        employeeId, ratePerHour, pay, employmentType, parkingCostPerMonth,
                      });
                    }}
                  />
                );
              },
            },
            {
              Header: 'Employment type',
              accessor: 'employmentType',
              disableFilters: true,
            },
            {
              Header: 'Net Salary',
              accessor: 'netSalary',
              disableFilters: true,
              Cell: ({ row }: CellTable<GetPreviewType>) => {
                const { netSalary, netSalaryDelta } = row.original;

                return (
                  <RedactComponent
                    value={formatMoney(netSalary)}
                    valueDelta={netSalaryDelta}
                  />
                );
              },
            },
            {
              Header: 'Hourly Cost (By Fact)',
              accessor: 'hourlyCostFact',
              disableFilters: true,
              Cell: ({ row }: CellTable<GetPreviewType>) => {
                const { hourlyCostFact, hourlyCostFactDelta } = row.original;

                return (
                  <RedactComponent
                    value={formatMoney(hourlyCostFact)}
                    valueDelta={hourlyCostFactDelta}
                  />
                );
              },
            },
            {
              Header: 'Hourly Cost (On Hand)',
              accessor: 'hourlyCostHand',
              disableFilters: true,
              Cell: ({ row }: CellTable<GetPreviewType>) => {
                const { hourlyCostHand, hourlyCostHandDelta } = row.original;
                return (
                  <RedactComponent
                    value={formatMoney(hourlyCostHand)}
                    valueDelta={hourlyCostHandDelta}
                  />
                );
              },
            },
            {
              Header: 'Earnings',
              accessor: 'earnings',
              disableFilters: true,
              minWidth: 160,
              Cell: ({ row }: CellTable<GetPreviewType>) => {
                const { earnings, earningsDelta } = row.original;

                return (
                  <RedactComponent
                    value={formatMoney(earnings)}
                    valueDelta={earningsDelta}
                  />
                );
              },
              Footer: () => (totalFinance ? totalFinance.desiredMetrics.desiredIncome : ''),
            },
            {
              Header: 'Expenses',
              accessor: 'expenses',
              disableFilters: true,
              minWidth: 160,
              Cell: ({ row }: CellTable<GetPreviewType>) => {
                const { expenses, expensesDelta } = row.original;

                return (
                  <RedactComponent
                    value={formatMoney(expenses)}
                    valueDelta={expensesDelta}
                  />
                );
              },
              Footer: () => (totalFinance
                ? formatMoney(Number(totalFinance.totalExpenses.payrollExpense.toFixed(2))) : ''),
            },
            {
              Header: 'Profit',
              accessor: 'profit',
              disableFilters: true,
              Cell: ({ row }: CellTable<GetPreviewType>) => {
                const { profit, profitDelta } = row.original;

                return (
                  <RedactComponent
                    value={formatMoney(profit)}
                    valueDelta={profitDelta}
                  />
                );
              },
              Footer: (row: FooterTable<GetPreviewType>) => getTotalCost(row, 'profit'),
            },
            {
              Header: 'Profitability',
              accessor: 'profitAbility',
              disableFilters: true,
              Cell: ({ row }: CellTable<GetPreviewType>) => {
                const { profitAbility, profitAbilityDelta } = row.original;

                return (
                  <RedactComponent
                    value={`${profitAbility}%`}
                    valueDelta={profitAbilityDelta}
                  />
                );
              },
              Footer: () => `${(totalFinance ? totalFinance.desiredMetrics.desiredProfitability : '')}%`,
            },
          ]}
        />
      </div>

    </ContentCard>
  );

  function dublicateEmployee(idEmployee: number) {
    const copyEmployee = employees.find((el) => el.id === idEmployee);
    if (copyEmployee) {
      setEmployees([...employees, copyEmployee]);
    }
  }

  function deleteEmployee(idEmployee: number) {
    const copyEmployee = employees.find((el) => el.id === idEmployee);
    if (copyEmployee) {
      const index = employees.indexOf(copyEmployee);
      const newEmployees = employees.slice();
      newEmployees.splice(index, 1);
      setEmployees(newEmployees);
    }
  }

  async function loadTotalFinance() {
    const { data: dataTotalFinance } = await api.get<TotalFinance>('finance/get-total-finance');
    setTotalFinance(dataTotalFinance);
  }

  async function loadEmployeesAsync() {
    setIsLoading(true);

    try {
      const { data } = await api.get<GetPreviewType[]>('finance/get-analytic');

      setEmployees(data);

      await loadTotalFinance();

      setIsLoading(false);
    } catch {
      setIsLoading(false);
    }
  }

  async function updateEmployeesAsync(employee: PutPreviewType) {
    const { data } = await api.post<GetPreviewType>('finance/get-preview', employee);

    const index = employees.find((el) => el.id === employee.employeeId);

    if (index) {
      const newemp = employees.slice();
      newemp[newemp.indexOf(index)] = data;
      setEmployees(newemp);
    }
  }

  function getTotalCost(row: FooterTable<GetPreviewType>, keyOfEmployee: string) {
    const { filteredRows } = row;

    const sumOfEmployeesValues = filteredRows.map((elem) => elem.values[keyOfEmployee as keyof GetPreviewType] as number)
      .reduce((pre: number, current: number) => pre + current);

    return (
      <div>{formatMoney(sumOfEmployeesValues)}</div>
    );
  }
}

export default AnalyticsPage;
